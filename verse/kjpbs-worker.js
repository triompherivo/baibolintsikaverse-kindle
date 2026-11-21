"use strict";
importScripts("kjpbs-core.js");
let engine;
let metadata;
let loading;
async function load() {
  if (engine) return;
  if (!loading) loading = (async () => {
    const started = performance.now();
    const [json, binary] = await Promise.all([
      fetch("data/kjpbs/kjv1769.json"),
      fetch("data/kjpbs/kjv1769.tokens.bin")
    ]);
    if (!json.ok || !binary.ok) throw Error("La base KJV CCDB est indisponible.");
    const [corpus, tokens] = await Promise.all([json.json(), binary.arrayBuffer()]);
    if (corpus.documentChunks) {
      const chunks = await Promise.all(corpus.documentChunks.map(async (name) => {
        const response = await fetch("data/kjpbs/" + name);
        if (!response.ok) throw Error("Une partie de la base KJV CCDB est indisponible.");
        return response.json();
      }));
      corpus.documents = chunks.flat();
      delete corpus.documentChunks;
    }
    engine = VerseKJPBS.createEngine(corpus, tokens);
    metadata = {
      info: corpus.info,
      books: corpus.books,
      indexedWordCount: engine.indexedWordCount,
      loadMilliseconds: performance.now() - started
    };
  })().catch((error) => {
    loading = null;
    throw error;
  });
  return loading;
}
self.onmessage = async ({ data }) => {
  const { id, type } = data || {};
  try {
    await load();
    let value;
    switch (type) {
      case "load":
        value = metadata;
        break;
      case "search":
        value = engine.search(data.snapshot, { limit: 50 });
        break;
      case "page":
        value = engine.page(data.options || {});
        break;
      case "passage":
        value = engine.passage(data.options || {});
        break;
      default:
        throw Error("Commande CCDB inconnue.");
    }
    self.postMessage({ id, ok: true, value });
  } catch (error) {
    self.postMessage({ id, ok: false, error: (error == null ? void 0 : error.message) || "La recherche CCDB a \xE9chou\xE9." });
  }
};
