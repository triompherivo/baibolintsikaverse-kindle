(function(root, factory) {
  "use strict";
  const api = factory(root);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BVDefinitionCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function(root) {
  "use strict";
  const limits = Object.freeze({ maxImportBytes: 20 * 1024 * 1024, maxSources: 1e3, maxEntries: 1e5, maxTextLength: 1e5, maxTemplateLength: 1e5, history: 500 });
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  const string = (value, fallback = "") => value == null ? fallback : String(value);
  const clone = (value) => value === void 0 ? void 0 : JSON.parse(JSON.stringify(value));
  const invalid = (message) => new Error("D\xE9finition : " + message);
  const id = (prefix) => prefix + "-" + (root.crypto && typeof root.crypto.randomUUID === "function" ? root.crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
  const iso = (value) => new Date(value === void 0 ? Date.now() : value).toISOString();
  const text = (value) => {
    const result = string(value);
    if (result.length > limits.maxTextLength) throw invalid("texte trop long (100 000 caract\xE8res maximum).");
    return result;
  };
  function readJSON(input) {
    if (typeof input !== "string") return clone(input);
    if (input.length > limits.maxImportBytes || new TextEncoder().encode(input).byteLength > limits.maxImportBytes) throw invalid("fichier trop volumineux (20 Mio maximum).");
    try {
      return JSON.parse(input.replace(/^\uFEFF/, ""));
    } catch (_) {
      throw invalid("le fichier JSON est invalide.");
    }
  }
  function safeURL(input) {
    const value = string(input).trim();
    if (!value || /[\u0000-\u001f\u007f]/.test(value)) throw invalid("adresse HTTP ou HTTPS attendue.");
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      throw invalid("adresse HTTP ou HTTPS absolue attendue.");
    }
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname || url.username || url.password) throw invalid("seules les adresses HTTP/HTTPS sans identifiants sont accept\xE9es.");
    return url.href;
  }
  function stripHebrewMarks(value) {
    return string(value).normalize("NFD").replace(/[\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7]/g, "").normalize("NFC");
  }
  function normalizeSearch(value, options = {}) {
    let result = string(value).normalize("NFC");
    if (options.stripHebrewMarks !== false) result = stripHebrewMarks(result);
    if (options.caseSensitive !== true) result = result.toLocaleLowerCase(options.locale || "und");
    return result.trim().replace(/\s+/gu, " ");
  }
  function normalizeSource(raw, options = {}) {
    if (!object(raw)) throw invalid("source invalide.");
    const result = clone(raw);
    result.id = string(raw.id || options.id || id("source"));
    result.type = string(raw.type || "custom");
    result.name = text(raw.name || raw.display && raw.display.name || raw.options && raw.options.name || "Source personnelle");
    result.enabled = typeof raw.enabled === "boolean" ? raw.enabled : raw.disabled !== true;
    result.options = object(raw.options) ? clone(raw.options) : {};
    if (!own(result.options, "url") && own(raw, "url")) result.options.url = string(raw.url);
    if (!own(result.options, "css") && own(raw, "css")) result.options.css = string(raw.css);
    if (result.type === "custom" || result.type === "custom-audio") {
      result.options.url = string(result.options.url);
      result.options.css = string(result.options.css);
    }
    return result;
  }
  function defaultSources() {
    return [
      { id: "wikipedia", name: "Wikipedia", url: 'https://{{ lang | default: "fr" }}.wikipedia.org/w/index.php?search={{ str | url_encode }}' },
      { id: "wiktionary", name: "Wiktionary", url: 'https://{{ lang | default: "fr" }}.wiktionary.org/w/index.php?search={{ str | url_encode }}' },
      { id: "translate", name: "Google Traduction", url: 'https://translate.google.com/?sl=auto&tl={{ lang | default: "fr" | url_encode }}&text={{ str | url_encode }}&op=translate' },
      { id: "youglish", name: "YouGlish", url: "https://youglish.com/pronounce/{{ str | url_encode }}/english" },
      { id: "pealim", name: "Pealim \xB7 \u05E2\u05D1\u05E8\u05D9\u05EA", url: "https://www.pealim.com/search/?q={{ str | url_encode }}" }
    ].map((item) => normalizeSource({ id: item.id, type: "custom", name: item.name, enabled: true, builtin: true, options: { url: item.url, css: "" } }));
  }
  function createState(overrides = {}) {
    return normalizeState({ schema: "baibolintsika-definition", version: 1, settings: { language: "fr", stripHebrewMarks: true, historyEnabled: true, maxHistory: limits.history, theme: "system", fontFamily: "", fontSize: 17, css: "", trigger: "button" }, sources: defaultSources(), history: [], collections: [], dictionaries: [], compatibility: {}, ...clone(overrides) });
  }
  function normalizeEntry(raw) {
    if (!object(raw)) raw = { text: string(raw) };
    return { ...clone(raw), id: string(raw.id || id("entry")), text: text(raw.text === void 0 ? raw.word === void 0 ? raw.term : raw.word : raw.text), definition: text(raw.definition || ""), note: text(raw.note || ""), tags: Array.isArray(raw.tags) ? raw.tags.map((value) => string(value)) : [], createdAt: string(raw.createdAt || iso()) };
  }
  function normalizeState(raw) {
    if (!object(raw)) throw invalid("sauvegarde invalide.");
    for (const key of ["sources", "history", "collections", "dictionaries"]) if (raw[key] !== void 0 && !Array.isArray(raw[key])) throw invalid("la propri\xE9t\xE9 " + key + " doit \xEAtre une liste.");
    if ((raw.sources || []).length > limits.maxSources) throw invalid("trop de sources.");
    if ((raw.history || []).length > limits.maxEntries) throw invalid("trop d\u2019entr\xE9es.");
    const result = { ...clone(raw), schema: "baibolintsika-definition", version: 1, settings: { language: "fr", stripHebrewMarks: true, historyEnabled: true, maxHistory: limits.history, theme: "system", fontFamily: "", fontSize: 17, css: "", trigger: "button", ...clone(raw.settings || {}) }, sources: (raw.sources || []).map((item) => normalizeSource(item)), history: (raw.history || []).map(normalizeEntry), collections: (raw.collections || []).map((item) => {
      if (!object(item) || !Array.isArray(item.entries || [])) throw invalid("collection invalide.");
      if ((item.entries || []).length > limits.maxEntries) throw invalid("collection trop volumineuse.");
      return { ...clone(item), id: string(item.id || id("collection")), name: text(item.name || "Collection"), entries: (item.entries || []).map(normalizeEntry) };
    }), dictionaries: clone(raw.dictionaries || []), compatibility: clone(raw.compatibility || {}) };
    const used = /* @__PURE__ */ new Set();
    for (const source of result.sources) {
      if (used.has(source.id)) source.id = id("source");
      used.add(source.id);
    }
    return result;
  }
  function upsertSource(state, source) {
    const result = normalizeState(state), normalized = normalizeSource(source);
    const index = result.sources.findIndex((item) => item.id === normalized.id);
    if (index < 0) {
      if (result.sources.length >= limits.maxSources) throw invalid("trop de sources.");
      result.sources.push(normalized);
    } else result.sources[index] = normalized;
    return result;
  }
  function removeSource(state, sourceId) {
    const result = normalizeState(state);
    result.sources = result.sources.filter((item) => item.id !== sourceId);
    return result;
  }
  function reorderSources(state, sourceIds) {
    const result = normalizeState(state), ranks = new Map(sourceIds.map((value, index) => [value, index]));
    result.sources.sort((a, b) => (ranks.has(a.id) ? ranks.get(a.id) : sourceIds.length) - (ranks.has(b.id) ? ranks.get(b.id) : sourceIds.length));
    return result;
  }
  function extractSourceList(document) {
    if (Array.isArray(document)) return { list: document, path: [] };
    if (!object(document)) return null;
    if (document.manifest && document.manifest.schema === "client-backup" && [2, 3].includes(document.manifest.version)) {
      const list = document.data && document.data.settings && document.data.settings.sources && document.data.settings.sources.list;
      if (object(list)) {
        const entries = Object.entries(list).map(([key, source], position) => ({ key, source, position }));
        entries.sort((a, b) => (Number.isFinite(Number(a.source.index)) ? Number(a.source.index) : Infinity) - (Number.isFinite(Number(b.source.index)) ? Number(b.source.index) : Infinity) || a.position - b.position);
        return { list: entries.map((item) => item.source), keys: entries.map((item) => item.key), path: ["data", "settings", "sources", "list"], indexed: true };
      }
    }
    for (const path of [["sources"], ["settings", "sources"], ["data", "sources"], ["data", "settings", "sources"]]) {
      let value = document;
      for (const key of path) value = value && value[key];
      if (Array.isArray(value)) return { list: value, path };
    }
    return null;
  }
  function importSettings(input, options = {}) {
    const document = readJSON(input);
    if (document && document.schema === "baibolintsika-definition") return normalizeState(document);
    const found = extractSourceList(document);
    if (!found || !found.list.length) throw invalid("aucune source reconnue dans le JSON.");
    if (found.list.length > limits.maxSources) throw invalid("trop de sources.");
    const isBundle = object(document) && object(document.manifest) && document.manifest.schema === "definer-source-bundle";
    if (isBundle && document.manifest.version !== 1) throw invalid("version de bundle Definer non prise en charge.");
    if (isBundle && (typeof document.manifest.appId !== "string" || !document.manifest.appId.trim())) throw invalid("le manifeste Definer ne contient pas d\u2019appId.");
    const state = options.baseState ? normalizeState(options.baseState) : createState({ sources: [] });
    if (options.mode === "replace") state.sources = [];
    const importId = id("import");
    const sourceIds = [];
    const importedSources = found.list.map((wrapper, index) => {
      if (!object(wrapper)) throw invalid("source import\xE9e invalide.");
      const wrapped = object(wrapper.source), original = wrapped ? wrapper.source : wrapper;
      const source = normalizeSource(original, { id: id("source") });
      if (state.sources.some((item) => item.id === source.id) || sourceIds.includes(source.id)) source.id = id("source");
      source._definer = { importId, index, wrapped, ...found.indexed ? { key: found.keys[index] } : {}, original: clone(original), wrapper: clone(wrapper), baseline: { name: source.name, enabled: source.enabled, type: source.type, options: clone(source.options) } };
      if (found.indexed) {
        const settings = document.data.settings, key = found.keys[index];
        const relations = {};
        for (const [field, section] of [["routines", "lookup-source-routines"], ["recipes", "lookup-source-recipes"]]) {
          const value = settings[section] && settings[section].list && settings[section].list[key];
          if (Array.isArray(value)) relations[field] = clone(value);
          else if (object(value)) relations[field] = Object.values(value).filter(object).map(clone);
          else relations[field] = [];
        }
        source._definer.wrapper = { source: clone(original), ...relations };
      }
      sourceIds.push(source.id);
      return source;
    });
    if (state.sources.length + importedSources.length > limits.maxSources) throw invalid("trop de sources apr\xE8s import.");
    state.sources.push(...importedSources);
    const format = isBundle ? "definer-source-bundle" : found.indexed ? "client-backup" : "unverified-json";
    state.compatibility.definerImports = [...state.compatibility.definerImports || [], { id: importId, document: clone(document), path: found.path, indexed: found.indexed === true, sourceIds, format }];
    state.compatibility.lastImport = { format, sourceCount: importedSources.length, warnings: compatibilityWarnings(importedSources) };
    return state;
  }
  function sourceForDefiner(source) {
    if (source._definer) {
      const info = source._definer, result = clone(info.original), baseline = info.baseline;
      if (source.name !== baseline.name) result.display = { ...clone(result.display || {}), name: source.name };
      if (source.enabled !== baseline.enabled) result.disabled = !source.enabled;
      if (source.type !== baseline.type) result.type = source.type;
      if (JSON.stringify(source.options) !== JSON.stringify(baseline.options)) result.options = clone(source.options);
      if (info.wrapped) return { ...clone(info.wrapper), source: result, ...Array.isArray(source.routines) ? { routines: clone(source.routines) } : {}, ...Array.isArray(source.recipes) ? { recipes: clone(source.recipes) } : {} };
      return result;
    }
    return { source: { type: source.type, role: source.type === "custom-audio" ? "audio" : "text", disabled: !source.enabled, display: { name: source.name }, options: clone(source.options) }, routines: clone(source.routines || []), recipes: clone(source.recipes || []) };
  }
  function exportSettings(rawState, options = {}) {
    const state = normalizeState(rawState);
    if (options.format !== "definer") return JSON.stringify(state, null, 2);
    const imported = (state.compatibility.definerImports || []).find((item) => item.id === options.importId) || (state.compatibility.definerImports || []).at(-1);
    const selected = options.sourceIds ? new Set(options.sourceIds) : null;
    let document, path, sources;
    if (imported && options.allSources !== true) {
      document = clone(imported.document);
      path = imported.path;
      sources = state.sources.filter((item) => item._definer && item._definer.importId === imported.id && (!selected || selected.has(item.id)));
    } else {
      document = { manifest: { schema: "definer-source-bundle", version: 1, appId: "baibolintsika-verse", appVersion: "1", exportedAt: iso(options.now) }, sources: [] };
      path = ["sources"];
      sources = state.sources.filter((item) => (!selected || selected.has(item.id)) && item.type !== "local");
    }
    const list = sources.map((source) => {
      const value = sourceForDefiner(source);
      return path.length === 1 && path[0] === "sources" && document.manifest && !object(value.source) ? { source: value, routines: [], recipes: [] } : value;
    });
    if (imported && imported.indexed && options.allSources !== true) {
      let parent = document;
      for (const key of path.slice(0, -1)) parent = parent[key];
      const values = Object.fromEntries(sources.map((source, index) => [source._definer.key, list[index]]));
      const ordered = {};
      for (const key of Object.keys(parent[path.at(-1)])) if (own(values, key)) ordered[key] = values[key];
      parent[path.at(-1)] = ordered;
    } else if (!path.length) document = list;
    else {
      let parent = document;
      for (const key of path.slice(0, -1)) parent = parent[key];
      parent[path.at(-1)] = list;
    }
    return JSON.stringify(document, null, 2);
  }
  function compatibilityWarnings(sources) {
    const warnings = [];
    for (const source of sources) {
      if (!["custom", "custom-audio", "local", "offline-dictionary", "script", "ai", "web-speech", "speech-synthesizer", "speech", "wiktionary-pronunciation", "wikipedia", "wikidata", "wiktionary", "google-translate", "open-images", "bing-images", "youglish", "lumtionary", "lum-dictionary", "lum-translator"].includes(source.type.replace(/_/g, "-"))) warnings.push(source.name + " : type \xAB " + source.type + " \xBB conserv\xE9, ex\xE9cution non disponible.");
      if (source.options && Array.isArray(source.options.dnr) && source.options.dnr.length) warnings.push(source.name + " : r\xE8gles r\xE9seau DNR conserv\xE9es ; leur ex\xE9cution d\xE9pend du navigateur.");
      const wrapper = source._definer && source._definer.wrapper;
      if (wrapper && Array.isArray(wrapper.routines) && wrapper.routines.length) warnings.push(source.name + " : routines import\xE9es ; leur ex\xE9cution exige l\u2019activation explicite des routines de cette source.");
      if (wrapper && Array.isArray(wrapper.recipes) && wrapper.recipes.length) warnings.push(source.name + " : recettes conserv\xE9es pour l\u2019enregistrement des \xE9l\xE9ments de collection.");
    }
    return warnings;
  }
  function languageInfo(code) {
    const value = string(code || "fr"), base = value.split(/[-_]/)[0].toLowerCase();
    const names = { fr: ["French", "fran\xE7ais", "fra"], en: ["English", "English", "eng"], he: ["Hebrew", "\u05E2\u05D1\u05E8\u05D9\u05EA", "heb"], mg: ["Malagasy", "Malagasy", "mlg"], el: ["Greek", "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", "ell"], de: ["German", "Deutsch", "deu"], es: ["Spanish", "espa\xF1ol", "spa"], it: ["Italian", "italiano", "ita"], ar: ["Arabic", "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", "ara"], ja: ["Japanese", "\u65E5\u672C\u8A9E", "jpn"] };
    let name = names[base] ? names[base][0] : base, nativeName = names[base] ? names[base][1] : base;
    try {
      name = new Intl.DisplayNames(["en"], { type: "language" }).of(value) || name;
      nativeName = new Intl.DisplayNames([value], { type: "language" }).of(value) || nativeName;
    } catch (_) {
    }
    return { code: value, base, iso6393: names[base] ? names[base][2] : "", iso6392: names[base] ? names[base][2] : "", name, nativeName };
  }
  function buildLookupContext(lookupText, input = {}) {
    const result = clone(input), str = text(lookupText), date = new Date(input.timestamp === void 0 ? Date.now() : input.timestamp);
    const lang = string(input.lang || input.language || "fr"), langInfo = languageInfo(lang);
    const pad = (value) => String(value).padStart(2, "0");
    Object.assign(result, { str, text: str, str_encoded: encodeURIComponent(str), char_count: [...str].length, word_count: str.trim() ? str.trim().split(/\s+/u).length : 0, lang, lang_info: langInfo, lang_iso2: langInfo.base, lang_name: langInfo.name, lang_native: langInfo.nativeName, langs: Array.isArray(input.langs) ? clone(input.langs) : [lang], ui_lang: input.ui_lang || "fr", browser_locale: input.browser_locale || root.navigator && root.navigator.language || "fr-FR", app_name: "BaibolintsikaVerse", datetime_iso: date.toISOString(), date: date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()), time: date.toLocaleTimeString(), timestamp: date.getTime(), timezone: date.getTimezoneOffset(), weekday: date.getDay(), month: date.getMonth(), year: date.getFullYear(), day: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds(), millisecond: date.getMilliseconds(), newline: "\n", random_number: Math.floor(Math.random() * 1e3), random_string: Math.random().toString(36).slice(2, 8), hebrew_without_niqqud: stripHebrewMarks(str) });
    result.langs_info = result.langs.map(languageInfo);
    result.langs_iso2 = result.langs_info.map((item) => item.base);
    result.langs_names = result.langs_info.map((item) => item.name);
    result.langs_native = result.langs_info.map((item) => item.nativeName);
    const uiInfo = languageInfo(result.ui_lang);
    result.ui_lang_info = uiInfo;
    result.ui_lang_iso2 = uiInfo.base;
    result.ui_lang_name = uiInfo.name;
    result.ui_lang_native = uiInfo.nativeName;
    if (input.src_lang) {
      result.src_lang_info = languageInfo(input.src_lang);
      result.src_lang_name = result.src_lang_info.name;
    }
    const pageURL = input.url || input.page_url || "";
    if (pageURL) {
      try {
        const parsed = new URL(safeURL(pageURL));
        Object.assign(result, { url: parsed.href, path: parsed.pathname, origin: parsed.origin, domain: parsed.hostname, protocol: parsed.protocol, query: parsed.search, hash: parsed.hash, port: parsed.port });
      } catch (_) {
        result.url = "";
      }
    }
    return result;
  }
  let liquidEngine;
  function getLiquid() {
    if (liquidEngine) return liquidEngine;
    let library = root.liquidjs;
    if ((!library || !library.Liquid) && typeof require === "function") {
      try {
        library = require("./vendor/liquid.browser.umd.js");
      } catch (_) {
      }
    }
    if (!library || !library.Liquid) throw invalid("LiquidJS est absent ; le mod\xE8le ne peut pas \xEAtre ex\xE9cut\xE9.");
    const deny = () => {
      throw invalid("les fichiers Liquid externes ne sont pas disponibles.");
    };
    liquidEngine = new library.Liquid({ strictFilters: true, strictVariables: false, ownPropertyOnly: true, parseLimit: 1e5, renderLimit: 1500, memoryLimit: 1e6, fs: { exists: async () => false, existsSync: () => false, readFile: deny, readFileSync: deny, resolve: deny, dirname: () => "", contains: () => false, sep: "/" } });
    liquidEngine.registerFilter("url_encode", (value) => encodeURIComponent(string(value)).replace(/%20/g, "+"));
    liquidEngine.registerFilter("strip_hebrew_marks", stripHebrewMarks);
    liquidEngine.registerFilter("with_prefix", (value, prefix, separator = "") => value == null || value === "" ? "" : string(prefix) + string(separator) + string(value));
    liquidEngine.registerFilter("with_suffix", (value, suffix, separator = "") => value == null || value === "" ? "" : string(value) + string(separator) + string(suffix));
    liquidEngine.registerFilter("normalize_whitespace", (value) => string(value).trim().replace(/\s+/gu, " "));
    liquidEngine.registerFilter("number_of_words", (value) => string(value).trim() ? string(value).trim().split(/\s+/u).length : 0);
    liquidEngine.registerFilter("unaccent", (value) => string(value).normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "").normalize("NFC"));
    return liquidEngine;
  }
  async function renderTemplate(template, context = {}, options = {}) {
    if (typeof template !== "string" || template.length > limits.maxTemplateLength) throw invalid("mod\xE8le Liquid invalide ou trop volumineux.");
    if (options.kind === "url") template = template.replace(/\{(str|lang)\}/g, (match, key, offset, whole) => whole[offset - 1] === "{" || whole[offset + match.length] === "}" ? match : encodeURIComponent(string(context[key])));
    return getLiquid().parseAndRender(template, clone(context));
  }
  async function resolveSource(rawSource, lookupText, context = {}) {
    const source = normalizeSource(rawSource), variables = buildLookupContext(lookupText, context);
    if (!source.enabled) throw invalid("cette source est d\xE9sactiv\xE9e.");
    if (["local", "offline-dictionary"].includes(source.type)) return { sourceId: source.id, type: "local", dictionaryId: source.options.dictionaryId, variables, css: source.options.css || "" };
    const kind = source.type.replace(/_/g, "-"), lang = /^[a-z]{2,3}(?:-[a-z]{2})?$/i.test(variables.lang) ? variables.lang : "fr";
    if (["web-speech", "speech-synthesizer", "speech"].includes(kind)) return { sourceId: source.id, type: "speech", variables };
    if (kind === "ai") return { sourceId: source.id, type: "ai", variables };
    if (kind === "wiktionary-pronunciation") return { sourceId: source.id, type: "pronunciation", variables, url: "https://" + lang + ".wiktionary.org/wiki/" + encodeURIComponent(lookupText), apiURL: "https://" + lang + ".wiktionary.org/w/api.php?action=parse&format=json&prop=text&page=" + encodeURIComponent(lookupText) };
    const templates = {
      wikipedia: "https://" + lang + ".wikipedia.org/w/index.php?search={{ str | url_encode }}",
      wikidata: "https://www.wikidata.org/w/index.php?title=Special:Search&search={{ str | url_encode }}",
      wiktionary: "https://" + lang + ".wiktionary.org/w/index.php?search={{ str | url_encode }}",
      "google-translate": "https://translate.google.com/?sl=auto&tl=" + lang + "&text={{ str | url_encode }}&op=translate",
      "open-images": "https://commons.wikimedia.org/w/index.php?title=Special:MediaSearch&type=image&search={{ str | url_encode }}",
      "bing-images": "https://commons.wikimedia.org/w/index.php?title=Special:MediaSearch&type=image&search={{ str | url_encode }}",
      youglish: "https://youglish.com/pronounce/{{ str | url_encode }}/english",
      lumtionary: "https://" + lang + ".wiktionary.org/w/index.php?search={{ str | url_encode }}",
      "lum-dictionary": "https://" + lang + ".wiktionary.org/w/index.php?search={{ str | url_encode }}",
      "lum-translator": "https://translate.google.com/?sl=auto&tl=" + lang + "&text={{ str | url_encode }}&op=translate"
    };
    if (templates[kind]) return { sourceId: source.id, type: "custom", name: source.name, url: safeURL(await renderTemplate(templates[kind], variables)), css: source.options.css || "", variables, warnings: kind.startsWith("lum") ? ["Cette source utilise une alternative ind\xE9pendante ; les services propri\xE9taires Lum ne sont pas appel\xE9s."] : [] };
    if (!["custom", "custom-audio"].includes(source.type)) throw invalid("le type de source \xAB " + source.type + " \xBB est conserv\xE9 mais ne peut pas \xEAtre ex\xE9cut\xE9.");
    const rendered = await renderTemplate(source.options.url, variables, { kind: "url" });
    return { sourceId: source.id, type: source.type, name: source.name, url: safeURL(rendered), css: source.options.css || "", variables, warnings: compatibilityWarnings([source]) };
  }
  function recordLookup(state, entry, options = {}) {
    const result = normalizeState(state);
    if (result.settings.historyEnabled === false) return result;
    const normalized = normalizeEntry({ ...entry, createdAt: entry.createdAt || iso(options.now) });
    const previous = result.history.find((item) => item.text === normalized.text && item.sourceId === normalized.sourceId);
    if (previous) {
      normalized.id = previous.id;
      normalized.lookupCount = (Number(previous.lookupCount) || 1) + 1;
    }
    result.history = [normalized, ...result.history.filter((item) => item.id !== normalized.id)];
    const requested = Number(result.settings.maxHistory);
    const max = Number.isFinite(requested) ? Math.min(limits.maxEntries, Math.max(0, Math.floor(requested))) : limits.history;
    result.history = result.history.slice(0, max);
    return result;
  }
  function clearHistory(state) {
    const result = normalizeState(state);
    result.history = [];
    return result;
  }
  function removeHistoryEntry(state, entryId) {
    const result = normalizeState(state);
    result.history = result.history.filter((item) => item.id !== entryId);
    return result;
  }
  function createCollection(state, name, options = {}) {
    const result = normalizeState(state);
    result.collections.push({ id: string(options.id || id("collection")), name: text(name || "Collection"), createdAt: iso(options.now), entries: [] });
    return result;
  }
  function upsertCollectionEntry(state, collectionId, entry) {
    const result = normalizeState(state), collection = result.collections.find((item) => item.id === collectionId);
    if (!collection) throw invalid("collection introuvable.");
    const normalized = normalizeEntry(entry), index = collection.entries.findIndex((item) => item.id === normalized.id);
    if (index < 0) {
      if (collection.entries.length >= limits.maxEntries) throw invalid("collection trop volumineuse.");
      collection.entries.push(normalized);
    } else collection.entries[index] = normalized;
    return result;
  }
  function removeCollectionEntry(state, collectionId, entryId) {
    const result = normalizeState(state), collection = result.collections.find((item) => item.id === collectionId);
    if (!collection) throw invalid("collection introuvable.");
    collection.entries = collection.entries.filter((item) => item.id !== entryId);
    return result;
  }
  function updateCollection(state, collectionId, changes) {
    const result = normalizeState(state), collection = result.collections.find((item) => item.id === collectionId);
    if (!collection) throw invalid("collection introuvable.");
    if (own(changes, "name")) collection.name = text(changes.name);
    if (own(changes, "description")) collection.description = text(changes.description);
    return result;
  }
  function removeCollection(state, collectionId) {
    const result = normalizeState(state);
    result.collections = result.collections.filter((item) => item.id !== collectionId);
    return result;
  }
  function escapeHTML(value) {
    return string(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function exportEntries(entries, format = "json") {
    if (!Array.isArray(entries) || entries.length > limits.maxEntries) throw invalid("liste d\u2019entr\xE9es invalide.");
    const rows = entries.map(normalizeEntry);
    if (format === "json") return JSON.stringify(rows, null, 2);
    if (format === "csv") {
      const columns = ["text", "definition", "note", "tags", "sourceName", "url", "createdAt", "id"];
      const cell = (value) => '"' + string(value).replace(/"/g, '""') + '"';
      return [columns.join(","), ...rows.map((row) => columns.map((key) => cell(key === "tags" ? row.tags.join("; ") : row[key])).join(","))].join("\r\n") + "\r\n";
    }
    if (format === "markdown" || format === "md") {
      const escapeMD = (value) => string(value).replace(/[\\`*_{}\[\]<>#+.!|~]/g, "\\$&");
      return rows.map((row) => "## " + escapeMD(row.text) + "\n\n" + row.definition + (row.note ? "\n\n" + row.note : "") + (row.tags.length ? "\n\n" + row.tags.map((tag) => "#" + escapeMD(tag)).join(" ") : "") + (row.url ? "\n\nSource : " + escapeMD(row.url) : "")).join("\n\n---\n\n") + (rows.length ? "\n" : "");
    }
    if (format === "anki" || format === "tsv") {
      const cell = (value) => escapeHTML(value).replace(/\t/g, "&#9;").replace(/\r\n|\r|\n/g, "<br>");
      return "#separator:tab\n#html:true\n#columns:Front	Back	Tags\n" + rows.map((row) => [cell(row.text), cell([row.definition, row.note, row.url].filter(Boolean).join("\n\n")), row.tags.map((tag) => tag.replace(/\s+/g, "_").replace(/[\t\r\n]/g, "")).join(" ")].join("	")).join("\n") + (rows.length ? "\n" : "");
    }
    throw invalid("format d\u2019export inconnu.");
  }
  function parseDelimited(input, separator = ",") {
    const result = [], row = [];
    let current = "", quoted = false, quoteClosed = false;
    const addRow = () => {
      row.push(current);
      current = "";
      quoteClosed = false;
      if (row.some((value) => value !== "")) result.push(row.splice(0));
      else row.length = 0;
      if (result.length > limits.maxEntries + 1) throw invalid("trop de lignes dans le dictionnaire.");
    };
    for (let at = 0; at < input.length; at++) {
      const char = input[at];
      if (quoted) {
        if (char === '"') {
          if (input[at + 1] === '"') {
            current += '"';
            at++;
          } else {
            quoted = false;
            quoteClosed = true;
          }
        } else current += char;
      } else if (char === '"' && current === "" && !quoteClosed) quoted = true;
      else if (char === separator) {
        row.push(current);
        current = "";
        quoteClosed = false;
      } else if (char === "\r" || char === "\n") {
        if (char === "\r" && input[at + 1] === "\n") at++;
        addRow();
      } else if (quoteClosed && !/\s/.test(char)) throw invalid("CSV invalide apr\xE8s un guillemet fermant.");
      else if (!quoteClosed) current += char;
    }
    if (quoted) throw invalid("guillemets CSV non ferm\xE9s.");
    if (current || row.length || quoteClosed) addRow();
    return result;
  }
  function parseDictionary(input, format = "json", options = {}) {
    if (typeof input !== "string") input = JSON.stringify(input);
    if (input.length > limits.maxImportBytes || new TextEncoder().encode(input).byteLength > limits.maxImportBytes) throw invalid("dictionnaire trop volumineux (20 Mio maximum).");
    let original, rawEntries;
    if (format === "json") {
      original = readJSON(input);
      if (Array.isArray(original)) rawEntries = original;
      else if (object(original) && Array.isArray(original.entries)) rawEntries = original.entries;
      else if (object(original)) rawEntries = Object.entries(original).map(([term, definition]) => ({ term, definition }));
      else throw invalid("dictionnaire JSON invalide.");
    } else if (format === "csv" || format === "tsv") {
      const rows = parseDelimited(input.replace(/^\uFEFF/, ""), format === "tsv" ? "	" : options.separator || ",");
      const aliases = ["word", "term", "headword", "text", "mot", "entr\xE9e", "entry"];
      const meaningAliases = ["definition", "meaning", "translation", "d\xE9finition", "traduction", "sens"];
      const first = (rows[0] || []).map((value) => value.toLowerCase().trim());
      const termIndex = first.findIndex((value) => aliases.includes(value)), definitionIndex = first.findIndex((value) => meaningAliases.includes(value));
      const header = options.header === true || options.header !== false && termIndex >= 0 && definitionIndex >= 0;
      rawEntries = rows.slice(header ? 1 : 0).map((row) => ({ term: row[header && termIndex >= 0 ? termIndex : 0] || "", definition: row[header && definitionIndex >= 0 ? definitionIndex : 1] || "", fields: row }));
      original = { format, rows };
    } else throw invalid("format de dictionnaire inconnu (JSON, CSV ou TSV attendu).");
    if (rawEntries.length > limits.maxEntries) throw invalid("trop d\u2019entr\xE9es dans le dictionnaire.");
    const entries = rawEntries.map((raw) => {
      if (Array.isArray(raw)) raw = { term: raw[0], definition: raw[1] };
      if (!object(raw)) throw invalid("entr\xE9e de dictionnaire invalide.");
      const term = text(raw.term === void 0 ? raw.word === void 0 ? raw.headword === void 0 ? raw.text : raw.headword : raw.word : raw.term);
      let meaning = raw.definition === void 0 ? raw.meaning === void 0 ? raw.translation === void 0 ? raw.value : raw.translation : raw.meaning : raw.definition;
      if (Array.isArray(meaning)) meaning = meaning.map((value) => typeof value === "object" ? JSON.stringify(value) : string(value)).join("\n");
      else if (object(meaning)) meaning = JSON.stringify(meaning);
      return { ...clone(raw), term, definition: text(meaning), searchKey: normalizeSearch(term) };
    }).filter((entry) => entry.term.trim());
    return { id: string(options.id || id("dictionary")), name: text(options.name || "Dictionnaire local"), format, entries, original };
  }
  function searchDictionary(dictionary, query, options = {}) {
    if (!dictionary || !Array.isArray(dictionary.entries)) throw invalid("dictionnaire invalide.");
    const needle = normalizeSearch(query, options);
    if (!needle) return [];
    const mode = options.mode || "exact", max = Math.max(1, Math.min(limits.maxEntries, Number(options.limit) || 100));
    const results = [];
    for (const entry of dictionary.entries) {
      const key = normalizeSearch(entry.term, options);
      if (mode === "contains" ? key.includes(needle) : mode === "prefix" ? key.startsWith(needle) : key === needle) results.push(clone(entry));
      if (results.length >= max) break;
    }
    return results;
  }
  function addDictionary(state, dictionary) {
    const result = normalizeState(state);
    if (!dictionary || !Array.isArray(dictionary.entries)) throw invalid("dictionnaire invalide.");
    const index = result.dictionaries.findIndex((item) => item.id === dictionary.id);
    if (index < 0) result.dictionaries.push(clone(dictionary));
    else result.dictionaries[index] = clone(dictionary);
    return result;
  }
  return Object.freeze({ limits, createState, normalizeState, normalizeSource, defaultSources, upsertSource, updateSource: upsertSource, removeSource, reorderSources, importSettings, exportSettings, compatibilityWarnings, safeURL, stripHebrewMarks, normalizeSearch, languageInfo, buildLookupContext, renderTemplate, resolveSource, normalizeEntry, recordLookup, clearHistory, removeHistoryEntry, createCollection, updateCollection, removeCollection, upsertCollectionEntry, removeCollectionEntry, exportEntries, parseDelimited, parseDictionary, searchDictionary, addDictionary, escapeHTML });
});
