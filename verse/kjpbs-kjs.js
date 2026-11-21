(function(root) {
  "use strict";
  const limits = Object.freeze({ maxBytes: 2 * 1024 * 1024, maxPhrases: 256, maxPhraseLength: 32768 });
  const scopes = ["unscoped", "wholeBible", "testament", "book", "chapter", "verse", "category"];
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const invalid = (message) => new Error(`Fichier .kjs invalide : ${message}`);
  const utf8Length = (text) => new TextEncoder().encode(text).byteLength;
  function inputText(input) {
    if (typeof input === "string") {
      if (input.length > limits.maxBytes || utf8Length(input) > limits.maxBytes) throw invalid("la taille maximale est de 2 Mio.");
      return input.replace(/^\uFEFF/, "");
    }
    let bytes;
    if (input instanceof ArrayBuffer) bytes = new Uint8Array(input);
    else if (ArrayBuffer.isView(input)) bytes = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    else throw invalid("texte ou contenu de fichier attendu.");
    if (bytes.byteLength > limits.maxBytes) throw invalid("la taille maximale est de 2 Mio.");
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^\uFEFF/, "");
    } catch (_) {
      const chunks = [];
      for (let index = 0; index < bytes.length; index += 8192) chunks.push(String.fromCharCode(...bytes.subarray(index, index + 8192)));
      return chunks.join("");
    }
  }
  function keyName(raw) {
    return raw.trim().replace(/%U([0-9a-f]{4})|%([0-9a-f]{2})/gi, (_, wide, byte) => String.fromCharCode(parseInt(wide || byte, 16))).replace(/\//g, "\\");
  }
  function decodeValue(raw) {
    let value = "", quoted = false, hadQuote = false, at = 0;
    const escapes = { a: "\x07", b: "\b", f: "\f", n: "\n", r: "\r", t: "	", v: "\v", '"': '"', "'": "'", "?": "?", "\\": "\\" };
    while (at < raw.length && (raw[at] === " " || raw[at] === "	")) at++;
    for (; at < raw.length; at++) {
      const char = raw[at];
      if (char === '"') {
        quoted = !quoted;
        hadQuote = true;
        continue;
      }
      if (char === ";" && !quoted) break;
      if (char === "\\") {
        if (++at === raw.length) break;
        const next = raw[at];
        if (own(escapes, next)) {
          value += escapes[next];
          continue;
        }
        if (next === "x") {
          let hex = "";
          while (at + 1 < raw.length && /[0-9a-f]/i.test(raw[at + 1])) hex += raw[++at];
          if (hex) value += String.fromCharCode(parseInt(hex, 16) & 65535);
          continue;
        }
        if (/[0-7]/.test(next)) {
          let octal = next;
          while (octal.length < 3 && at + 1 < raw.length && /[0-7]/.test(raw[at + 1])) octal += raw[++at];
          value += String.fromCharCode(parseInt(octal, 8));
          continue;
        }
        if (next === "\r" || next === "\n") {
          if ((raw[at + 1] === "\r" || raw[at + 1] === "\n") && raw[at + 1] !== next) at++;
        }
        continue;
      }
      if (!quoted && hadQuote && (char === " " || char === "	")) continue;
      value += char;
    }
    if (quoted) throw invalid("guillemets non ferm\xE9s.");
    if (!hadQuote) value = value.replace(/[ \t]+$/, "");
    if (value.startsWith("@@")) return value.slice(1);
    if (value.startsWith("@String(") && value.endsWith(")")) return value.slice(8, -1);
    return value;
  }
  function encodeValue(value) {
    let text = value.startsWith("@") ? "@" + value : value;
    let escaped = "", afterHex = false;
    const escapes = { "\x07": "\\a", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\v": "\\v", '"': '\\"', "\\": "\\\\" };
    for (let at = 0; at < text.length; at++) {
      const char = text[at], code = text.charCodeAt(at);
      if (afterHex && /[0-9a-f]/i.test(char)) {
        escaped += "\\x" + code.toString(16);
        continue;
      }
      afterHex = false;
      if (own(escapes, char)) escaped += escapes[char];
      else if (code < 32 || code >= 127) {
        escaped += "\\x" + code.toString(16);
        afterHex = true;
      } else escaped += char;
    }
    return !text || /[,;#="\\\s]/.test(text) ? '"' + escaped + '"' : escaped;
  }
  function parseINI(text) {
    if (text.includes("\0")) throw invalid("le fichier contient un caract\xE8re nul.");
    const sections = /* @__PURE__ */ Object.create(null);
    let section = "", logical = "";
    sections[section] = /* @__PURE__ */ Object.create(null);
    const lines = text.split(/\r\n|\n\r|\n|\r/);
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      logical += line;
      let backslashes = 0;
      for (let at = line.length - 1; at >= 0 && line[at] === "\\"; at--) backslashes++;
      if (backslashes % 2 && index + 1 < lines.length) {
        logical += "\n";
        continue;
      }
      const full = logical.trim();
      logical = "";
      if (!full || full.startsWith(";") || full.startsWith("#")) continue;
      const header = /^\[([^\]]+)\]\s*(?:;.*)?$/.exec(full);
      if (header) {
        section = keyName(header[1]);
        if (!own(sections, section)) sections[section] = /* @__PURE__ */ Object.create(null);
        continue;
      }
      const equals = full.indexOf("=");
      if (equals < 1) throw invalid(`ligne ${index + 1} sans cl\xE9 ou signe =.`);
      sections[section][keyName(full.slice(0, equals))] = decodeValue(full.slice(equals + 1));
    }
    if (!own(sections, "KJVPureBibleSearch")) throw invalid("section [KJVPureBibleSearch] absente.");
    return sections;
  }
  function orderedBooks(books) {
    if (!Array.isArray(books) || !books.length) throw invalid("la liste des livres CCDB est absente.");
    const ordinals = /* @__PURE__ */ new Set(), numbers = /* @__PURE__ */ new Set();
    for (const book of books) {
      if (!Number.isInteger(book.ordinal) || book.ordinal < 1 || book.ordinal > 255 || !Number.isInteger(book.databaseNumber) || book.databaseNumber < 1 || ordinals.has(book.ordinal) || numbers.has(book.databaseNumber)) throw invalid("la liste des livres CCDB est incoh\xE9rente.");
      ordinals.add(book.ordinal);
      numbers.add(book.databaseNumber);
    }
    return [...books].sort((a, b) => a.ordinal - b.ordinal);
  }
  function boolValue(raw, fallback = false) {
    return raw === void 0 ? fallback : !["", "0", "false"].includes(raw.toLowerCase());
  }
  function integerValue(raw, fallback = 0) {
    if (raw === void 0) return fallback;
    const text = raw.trim(), value = Number(text);
    return /^[+-]?\d+$/.test(text) && Number.isInteger(value) && value >= -2147483648 && value <= 2147483647 ? value : 0;
  }
  function searchWithin(raw, books) {
    if (raw === void 0 || raw === "" || raw === "0") return { selectedBookNumbers: [], selectsEntireBible: true, includeSuperscriptions: true, includeColophons: true };
    if (raw === "-") return { selectedBookNumbers: [], selectsEntireBible: false, includeSuperscriptions: false, includeColophons: false };
    const tokens = raw.split(",").map((token) => token.trim());
    if (tokens.some((token) => !/^\d+$/.test(token) || !Number.isSafeInteger(Number(token)) || Number(token) > 4294967295)) throw invalid("SearchWithin contient un index de livre incorrect.");
    const indexes = new Set(tokens.map(Number)), selected = [];
    for (const book of books) if (indexes.has(book.ordinal * 16777216)) selected.push(book.databaseNumber);
    const all = selected.length === books.length;
    return { selectedBookNumbers: all ? [] : selected.sort((a, b) => a - b), selectsEntireBible: all, includeSuperscriptions: indexes.has(2), includeColophons: indexes.has(1) };
  }
  function criterion(phrase, index) {
    var _a, _b;
    if (phrase.length > limits.maxPhraseLength) throw invalid(`la phrase ${index} d\xE9passe ${limits.maxPhraseLength} caract\xE8res.`);
    return { id: ((_b = (_a = root.crypto) == null ? void 0 : _a.randomUUID) == null ? void 0 : _b.call(_a)) || `kjs-${index}`, phrase, caseSensitive: false, accentSensitive: false, excluded: false, disabled: false, constraint: 0 };
  }
  function decode(input, availableBooks) {
    const values = parseINI(inputText(input)), books = orderedBooks(availableBooks);
    const settings = values.SearchCriteria || {}, phrases = values.SearchPhrases || {};
    let count = 0;
    if (own(phrases, "size")) {
      if (!/^\d+$/.test(phrases.size)) throw invalid("le nombre de phrases est incorrect.");
      count = Number(phrases.size);
    } else {
      for (const key of Object.keys(phrases)) {
        const match = /^(\d+)\\/.exec(key);
        if (match) count = Math.max(count, Number(match[1]));
      }
    }
    if (!Number.isSafeInteger(count) || count > limits.maxPhrases) throw invalid(`le maximum est de ${limits.maxPhrases} phrases.`);
    const criteria = [];
    for (let index = 1; index <= count; index++) {
      const prefix = index + "\\";
      if (!own(phrases, prefix + "Phrase")) continue;
      const item = criterion(phrases[prefix + "Phrase"], index);
      item.caseSensitive = boolValue(phrases[prefix + "CaseSensitive"]);
      item.accentSensitive = boolValue(phrases[prefix + "AccentSensitive"]);
      item.excluded = boolValue(phrases[prefix + "Exclude"]);
      item.disabled = boolValue(phrases[prefix + "Disabled"]);
      const constraint = integerValue(phrases[prefix + "Constraint"]);
      item.constraint = Number.isInteger(constraint) && constraint >= 0 && constraint <= 3 ? constraint : 0;
      criteria.push(item);
    }
    if (!criteria.length) criteria.push(criterion("", 1));
    const within = searchWithin(settings.SearchWithin, books);
    within.includeSuperscriptions = boolValue(settings.IncludeSuperscriptions, within.includeSuperscriptions);
    within.includeColophons = boolValue(settings.IncludeColophons, within.includeColophons);
    const rawScope = integerValue(settings.SearchScope, -1);
    const scopeMode = rawScope >= -1 && rawScope <= 5 ? scopes[rawScope + 1] : "unscoped";
    return { snapshot: { criteria, scopeMode, ...within, hyphenSensitive: boolValue(settings.HyphenSensitive), resultsLayout: "bookChapterTree" }, databaseUUID: values.KJVPureBibleSearch["BibleDatabase\\UUID"] || null };
  }
  function encode(snapshot, databaseUUID, availableBooks) {
    var _a;
    const books = orderedBooks(availableBooks);
    if (!snapshot || !Array.isArray(snapshot.criteria)) throw invalid("les crit\xE8res de recherche sont absents.");
    if (snapshot.criteria.length > limits.maxPhrases) throw invalid(`le maximum est de ${limits.maxPhrases} phrases.`);
    if (typeof databaseUUID !== "string" || !databaseUUID.trim()) throw invalid("l\u2019identifiant de la base CCDB est absent.");
    const scopeIndex = scopes.indexOf(snapshot.scopeMode);
    if (scopeIndex < 0) throw invalid("la port\xE9e de recherche est inconnue.");
    const selected = new Set(snapshot.selectedBookNumbers || []), known = new Set(books.map((book) => book.databaseNumber));
    for (const number of selected) if (!known.has(number)) throw invalid(`le livre CCDB ${number} est inconnu.`);
    const indexes = [];
    if (snapshot.includeColophons) indexes.push(1);
    if (snapshot.includeSuperscriptions) indexes.push(2);
    for (const book of books) if (snapshot.selectsEntireBible || selected.has(book.databaseNumber)) indexes.push(book.ordinal * 16777216);
    const lines = ["[KJVPureBibleSearch]", "AppVersion=3.0.0", "BibleDatabase\\UUID=" + encodeValue(databaseUUID), "KJSFileVersion=2", "", "[SearchCriteria]", "SearchScope=" + (scopeIndex - 1), "SearchWithin=" + encodeValue(indexes.length ? indexes.join(",") : "-")];
    if (snapshot.hyphenSensitive) lines.push("HyphenSensitive=true");
    lines.push("", "[SearchPhrases]");
    let count = 0;
    for (const item of snapshot.criteria) {
      if (!item || typeof item.phrase !== "string") throw invalid("une phrase de recherche est incorrecte.");
      if (item.phrase.length > limits.maxPhraseLength) throw invalid(`la phrase ${count + 1} d\xE9passe ${limits.maxPhraseLength} caract\xE8res.`);
      if (!item.phrase.trim()) continue;
      const constraint = (_a = item.constraint) != null ? _a : 0;
      if (!Number.isInteger(constraint) || constraint < 0 || constraint > 3) throw invalid("la contrainte d\u2019une phrase est inconnue.");
      const prefix = ++count + "\\";
      lines.push(prefix + "AccentSensitive=" + !!item.accentSensitive, prefix + "CaseSensitive=" + !!item.caseSensitive, prefix + "Constraint=" + constraint, prefix + "Disabled=" + !!item.disabled, prefix + "Exclude=" + !!item.excluded, prefix + "Phrase=" + encodeValue(item.phrase));
    }
    lines.push("size=" + count);
    const text = lines.join("\n") + "\n";
    if (utf8Length(text) > limits.maxBytes) throw invalid("la taille maximale est de 2 Mio.");
    return text;
  }
  const api = Object.freeze({ decode, encode, limits });
  root.VerseKJPBSKJS = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(globalThis);
