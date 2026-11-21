(function(root) {
  "use strict";
  const collections = { ffpm: "FFPM", antema: "Antema", tsanta: "Tsanta", ff: "FF fanampiny" };
  function decode(value) {
    return String(value || "").replace(/(?:\\+|\/)([ntr])/g, (_, code) => ({ n: "\n", t: "	", r: "\r" })[code]).replace(/\r\n?/g, "\n");
  }
  const fold = (value) => String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
  function numberKey(value) {
    return fold(value).replace(/^(?:ffpm|hira|hymne)\s*[-:#]?\s*/, "").replace(/^#\s*/, "").replace(/^(ff|tsanta|antema)\s*[-:#]?\s*0*(\d+)$/, "$1-$2").replace(/^0+(?=\d)/, "");
  }
  function category(number) {
    return /^(Antema|Tsanta|FF)-/i.test(number) ? number.split("-")[0].toLowerCase() : "ffpm";
  }
  function label(hymn) {
    return hymn.category === "ffpm" ? "FFPM " + hymn.number : hymn.number.replace("-", " ");
  }
  function stanzas(text) {
    const result = [];
    let block = null;
    const flush = () => {
      if (block == null ? void 0 : block.lines.length) result.push(block);
      block = null;
    };
    for (const raw of decode(text).split("\n")) {
      const content = raw.trim();
      if (!content) {
        flush();
        continue;
      }
      const numbered = raw.startsWith("	") ? null : content.match(/^(\d{1,2})[.)]?\s+(.+)$/);
      const refrain = content.match(/^(Fiv(?:erenana)?\.?|Isan['’ -]?andininy|Refrain)(?:\s*[:：]\s*|\s+|$)(.*)$/i);
      if (numbered) {
        flush();
        block = { number: numbered[1], refrain: false, lines: [] };
      } else if (refrain) {
        flush();
        block = { number: null, refrain: true, lines: [] };
      } else if (!block) block = { number: null, refrain: false, lines: [] };
      const line = numbered ? numbered[2] : refrain ? refrain[2] : content;
      if (line) block.lines.push({ text: line, indent: numbered || refrain ? 0 : Math.min(2, (raw.match(/^\s*/)[0].match(/\t/g) || []).length) });
    }
    flush();
    return result;
  }
  function createIndex(data) {
    const records = Array.isArray(data) ? data : data == null ? void 0 : data.RECORDS;
    if (!Array.isArray(records) || !records.length) throw Error("Le recueil de chants est indisponible.");
    const ids = /* @__PURE__ */ new Set(), numbers = /* @__PURE__ */ new Set();
    return records.map((row) => {
      if (!Number.isInteger(row.id) || ids.has(row.id) || typeof row.number !== "string" || numbers.has(row.number) || !row.title || !row.text) throw Error("Le recueil de chants contient une entr\xE9e invalide.");
      ids.add(row.id);
      numbers.add(row.number);
      const hymn = { id: row.id, number: row.number, title: decode(row.title).trim(), text: decode(row.text).trim(), category: category(row.number) };
      hymn.stanzas = stanzas(hymn.text);
      hymn.numberKey = numberKey(hymn.number);
      hymn.titleKey = fold(hymn.title);
      hymn.textKey = fold(hymn.text);
      hymn.searchKey = fold(label(hymn) + " " + collections[hymn.category] + " " + hymn.title + " " + hymn.text);
      return hymn;
    });
  }
  function terms(query) {
    return [...String(query).matchAll(/"([^"]+)"|(\S+)/g)].map((match) => fold(match[1] || match[2])).filter(Boolean);
  }
  function search(index, query = "", collection = "all") {
    const words = terms(query), key = numberKey(query), numeric = /^(?:(?:ff|tsanta|antema)-)?\d+(?:\(\d+\))?$/.test(key);
    const collectionQuery = { ff: "ff", ffpm: "ffpm", tsanta: "tsanta", antema: "antema" }[fold(query)];
    const results = [];
    for (const hymn of index) {
      if (collection !== "all" && hymn.category !== collection) continue;
      if (collectionQuery && hymn.category !== collectionQuery) continue;
      let score = 0;
      if (numeric) {
        const localKey = collection !== "all" && !key.includes("-") ? hymn.numberKey.replace(/^[a-z]+-/, "") : hymn.numberKey;
        if (localKey === key) score = 400;
        else if (localKey.startsWith(key)) score = 300;
        else if (collection === "all" && !key.includes("-") && hymn.numberKey.endsWith("-" + key)) score = 200;
        else continue;
      } else if (words.length) {
        if (!words.every((word) => hymn.searchKey.includes(word))) continue;
        const phrase = words.join(" ");
        score = hymn.titleKey === phrase ? 250 : hymn.titleKey.startsWith(phrase) ? 220 : words.every((word) => hymn.titleKey.includes(word)) ? 180 : hymn.textKey.includes(phrase) ? 140 : 100;
      }
      results.push({ hymn, score });
    }
    return results.sort((a, b) => b.score - a.score || a.hymn.id - b.hymn.id).map((result) => result.hymn);
  }
  function snippet(hymn, query = "", length = 112) {
    const text = hymn.text.replace(/\s+/g, " ").trim(), key = fold(text);
    const positions = terms(query).map((word) => key.indexOf(word)).filter((position) => position >= 0);
    const start = positions.length ? Math.max(0, Math.min(...positions) - 28) : 0;
    return (start ? "\u2026" : "") + text.slice(start, start + length).trim() + (text.length > start + length ? "\u2026" : "");
  }
  function exact(index, query, collection = "all") {
    const key = numberKey(query);
    return index.find((hymn) => (collection === "all" || hymn.category === collection) && (hymn.numberKey === key || collection !== "all" && hymn.numberKey.replace(/^[a-z]+-/, "") === key));
  }
  root.BVHymns = { collections, decode, fold, numberKey, category, label, stanzas, createIndex, search, snippet, exact };
})(globalThis);
