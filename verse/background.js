"use strict";
const cache = /* @__PURE__ */ new Map();
async function data(name) {
  if (![...BV.versions, "tsk", "hiraffpm"].includes(name)) throw Error("Version inconnue.");
  if (!cache.has(name)) cache.set(name, fetch(browser.runtime.getURL(`data/${name}.json`)).then((r) => {
    if (!r.ok) throw Error("Ressource biblique indisponible.");
    return r.json();
  }).catch((e) => {
    cache.delete(name);
    throw e;
  }));
  return cache.get(name);
}
async function openReader(url) {
  var _a, _b, _c;
  const platform = await ((_b = (_a = browser.runtime).getPlatformInfo) == null ? void 0 : _b.call(_a));
  if ((platform == null ? void 0 : platform.os) === "ios" || !((_c = browser.windows) == null ? void 0 : _c.create)) await browser.tabs.create({ url });
  else {
    try {
      await browser.windows.create({ url, type: "popup", width: 880, height: 820 });
    } catch {
      await browser.tabs.create({ url });
    }
  }
  return { opened: true };
}
async function passage(ref, version, context = false) {
  if (!BV.valid(ref)) throw Error("R\xE9f\xE9rence biblique invalide.");
  const bible = await data(version), book = bible[ref.book];
  const chapters = [...new Set(ref.parts.map((p) => p.chapter))];
  const rows = [];
  const missing = [];
  for (const chapter of chapters) {
    const verses = (book == null ? void 0 : book[chapter]) || [];
    for (const [verse, text] of verses) {
      const selected = ref.wholeChapter || ref.parts.some((p) => p.chapter === chapter && verse >= p.from && verse <= p.to);
      if (context || selected) rows.push({ chapter, verse, text, selected });
    }
    if (!ref.wholeChapter) {
      for (const p of ref.parts.filter((p2) => p2.chapter === chapter)) for (let v = p.from; v <= p.to; v++) if (!verses.some((r) => r[0] === v)) missing.push(`${chapter}:${v}`);
    }
  }
  return { ref, version, label: BV.label(ref, version), rows, missing };
}
async function handle(message, sender) {
  if (typeof (message == null ? void 0 : message.type) === "string" && message.type.startsWith("definition:")) return BVDefinitionBackground.handle(message, sender);
  const version = message.version || "1MG1865";
  switch (message.type) {
    case "passage":
      return passage(message.ref, version, !!message.context);
    case "open": {
      if (!BV.valid(message.ref)) throw Error("R\xE9f\xE9rence invalide.");
      if (!BV.versions.includes(version)) throw Error("Version inconnue.");
      const params = new URLSearchParams({ selection: JSON.stringify(message.ref), version });
      if (message.chapterReader === true) params.set("chapterReader", "1");
      if (message.searchQuery) {
        BV.compileQuery(message.searchQuery);
        params.set("search", message.searchQuery);
      }
      const url = browser.runtime.getURL("reader.html") + "?" + params;
      return openReader(url);
    }
    case "reading:open": {
      if (!["reading-daily", "reading-teny", "plan90"].includes(message.module)) throw Error("Module inconnu.");
      return openReader(browser.runtime.getURL("reader.html") + "?" + new URLSearchParams({ readingModule: message.module }));
    }
    case "kjpbs:open":
      return openReader(browser.runtime.getURL("reader.html") + "?kjpbs=1");
    case "hymn:open": {
      const hymns = await data("hiraffpm");
      const hymn = hymns.RECORDS.find((item) => item.number === message.number);
      if (!hymn) throw Error("Ce num\xE9ro de chant est introuvable.");
      return openReader(browser.runtime.getURL("reader.html") + "?" + new URLSearchParams({ hymn: hymn.number }));
    }
    case "interlinear:open": {
      const { corpus, book, chapter, verse } = message;
      if (!["hebrew", "greek"].includes(corpus) || !Number.isInteger(book) || book < 1 || book > 66 || !Number.isInteger(chapter) || chapter < 1 || chapter > 150 || !Number.isInteger(verse) || verse < 1 || verse > 176) throw Error("R\xE9f\xE9rence interlin\xE9aire invalide.");
      const params = new URLSearchParams({ interlinear: corpus, ibook: book, ichapter: chapter, iverse: verse });
      return openReader(browser.runtime.getURL("reader.html") + "?" + params);
    }
    case "search": {
      const query = BV.compileQuery(message.query), bible = await data(version), counts = {}, results = [];
      let total = 0;
      const offset = Math.max(0, Math.min(4e4, Number(message.offset) || 0));
      const filter = Number(message.book) || 0;
      for (const book of BV.books) for (const [chapter, verses] of Object.entries(bible[book.id])) for (const [verse, text] of verses) if (query.matches(text)) {
        counts[book.id] = (counts[book.id] || 0) + 1;
        if (!filter || filter === book.id) {
          if (total >= offset && results.length < 50) results.push({ book: book.id, chapter: +chapter, verse, text, highlights: query.ranges(text) });
          total++;
        }
      }
      return { total, counts, results, offset };
    }
    case "crossrefs": {
      if (!BV.valid(message.ref)) throw Error("R\xE9f\xE9rence invalide.");
      const refs = await data("tsk"), result = {};
      for (const part of message.ref.parts) for (let verse = part.from; verse <= part.to; verse++) {
        result[`${part.chapter}:${verse}`] = (refs[`${message.ref.book}:${part.chapter}:${verse}`] || []).map(([book, chapter, from, to]) => ({ book, chapter, parts: [{ chapter, from, to }], wholeChapter: false }));
      }
      return result;
    }
    default:
      throw Error("Commande inconnue.");
  }
}
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const reply = handle(message, sender).then((value) => ({ ok: true, value })).catch((error) => ({ ok: false, error: error.message }));
  if (typeof sendResponse === "function") {
    reply.then(sendResponse);
    return true;
  }
  return reply;
});
