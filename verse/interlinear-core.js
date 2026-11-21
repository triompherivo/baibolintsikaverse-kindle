(() => {
  "use strict";
  const strong = (value) => {
    const match = /^([HG])0*(\d+)$/i.exec(String(value || ""));
    return match ? match[1].toUpperCase() + Number(match[2]) : null;
  };
  const surface = (value) => String(value).replaceAll("/", "");
  const original = (row) => row.words.map((word) => surface(word[0])).join(" ");
  class Repository {
    constructor(read = async (path) => {
      const response = await fetch("data/interlinear/" + path);
      if (!response.ok) throw Error("Cette ressource interlin\xE9aire est indisponible.");
      return response.json();
    }) {
      this.read = read;
      this.cache = /* @__PURE__ */ new Map();
    }
    async get(path) {
      if (this.cache.has(path)) {
        const promise2 = this.cache.get(path);
        this.cache.delete(path);
        this.cache.set(path, promise2);
        return promise2;
      }
      const promise = this.read(path).catch((error) => {
        this.cache.delete(path);
        throw error;
      });
      this.cache.set(path, promise);
      if (this.cache.size > 10) this.cache.delete(this.cache.keys().next().value);
      return promise;
    }
    catalog() {
      return this.get("catalog.json");
    }
    morphology() {
      return this.get("morphology.json");
    }
    summary(prefix) {
      if (!["H", "G"].includes(prefix)) throw Error("Langue inconnue.");
      return this.get(`lexicon/${prefix}-index.json`);
    }
    chapter(corpus, book, chapter) {
      if (!["hebrew", "greek"].includes(corpus) || !Number.isInteger(book) || !Number.isInteger(chapter) || book < 1 || book > 66 || chapter < 1 || chapter > 150) throw Error("Chapitre invalide.");
      return this.get(`${corpus}/${book}/${chapter}.json`);
    }
    async definition(value) {
      const code = strong(value);
      if (!code) throw Error("Num\xE9ro Strong invalide.");
      const entries = await this.get(`lexicon/${code[0]}${Math.floor(Number(code.slice(1)) / 100)}.json`);
      return entries[code] || null;
    }
  }
  const api = { strong, surface, original, Repository };
  globalThis.BVInterlinear = api;
  if (typeof module !== "undefined") module.exports = api;
})();
