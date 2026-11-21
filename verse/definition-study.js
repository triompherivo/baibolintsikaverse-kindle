(function(root, factory) {
  "use strict";
  const core = root.BVDefinitionCore || (typeof require === "function" ? require("./definition-core.js") : null);
  const api = factory(root, core);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BVDefinitionStudy = api;
  if (root.document) {
    const start = () => {
      if (root.BVDefinitionIntegration) void api.mount(root.BVDefinitionIntegration);
    };
    root.document.addEventListener("bv-definition-ready", start);
    if (root.document.readyState === "loading") root.document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function(root, C) {
  "use strict";
  const clone = (value) => value === void 0 ? void 0 : JSON.parse(JSON.stringify(value));
  const obj = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  const text = (value, max = 1e5) => {
    const result = String(value != null ? value : "");
    if (result.length > max) throw Error("Texte trop long.");
    return result;
  };
  const id = (prefix) => {
    var _a, _b;
    return prefix + "-" + (((_b = (_a = root.crypto) == null ? void 0 : _a.randomUUID) == null ? void 0 : _b.call(_a)) || Date.now().toString(36) + Math.random().toString(36).slice(2));
  };
  const kinds = Object.freeze(["mixed", "raw", "dictionary", "flashcards", "notes", "prompts"]);
  const labels = Object.freeze({ mixed: "Mixte", raw: "Texte brut", dictionary: "Dictionnaire", flashcards: "Cartes m\xE9moire", notes: "Notes", prompts: "Prompts IA" });
  const presets = Object.freeze({
    openai: { name: "OpenAI", endpoint: "https://api.openai.com/v1/chat/completions" },
    openrouter: { name: "OpenRouter", endpoint: "https://openrouter.ai/api/v1/chat/completions" },
    ollama: { name: "Ollama local", endpoint: "http://localhost:11434/v1/chat/completions" },
    lmstudio: { name: "LM Studio local", endpoint: "http://localhost:1234/v1/chat/completions" },
    compatible: { name: "API compatible OpenAI", endpoint: "" },
    anthropic: { name: "Anthropic", endpoint: "https://api.anthropic.com/v1/messages" },
    gemini: { name: "Gemini", endpoint: "https://generativelanguage.googleapis.com/v1beta" }
  });
  function isLoopback(url) {
    return ["localhost", "127.0.0.1", "[::1]"].includes(new URL(url).hostname);
  }
  function endpoint(value, localOnly = false) {
    const url = new URL(C.safeURL(text(value, 16384)));
    if (url.search || url.hash) throw Error("Adresse API sans param\xE8tres ni fragment attendue.");
    if (localOnly && !isLoopback(url.href)) throw Error("AnkiConnect doit rester sur localhost, 127.0.0.1 ou ::1.");
    if (url.protocol !== "https:" && !isLoopback(url.href)) throw Error("Les API distantes doivent utiliser HTTPS.");
    return url.href;
  }
  function normalizeProvider(raw = {}) {
    const type = Object.hasOwn(presets, raw.type) ? raw.type : "compatible";
    return { id: text(raw.id || id("provider"), 200), type, name: text(raw.name || presets[type].name, 200), endpoint: endpoint(raw.endpoint || presets[type].endpoint), model: text(raw.model || "", 200), maxTokens: Math.max(1, Math.min(32768, Number(raw.maxTokens) || 2048)), systemRole: raw.systemRole === "developer" ? "developer" : "system" };
  }
  const defaultPrompts = () => [
    { id: "definition", name: "D\xE9finition et nuances", system: "Tu aides \xE0 \xE9tudier les mots. R\xE9ponds en {{ lang_name }}. Distingue les sens attest\xE9s des hypoth\xE8ses.", template: "Explique \xAB {{ str }} \xBB.\n{% if sentence != blank %}Phrase : {{ sentence }}{% endif %}\n{% if result != blank %}R\xE9sultat de la source : {{ result }}{% endif %}" },
    { id: "hebrew", name: "\xC9tude de l\u2019h\xE9breu", system: "Tu es un assistant p\xE9dagogique en h\xE9breu. R\xE9ponds en {{ lang_name }}. Signale les ambigu\xEFt\xE9s et ne pr\xE9sente pas une \xE9tymologie incertaine comme un fait.", template: "\xC9tudie \xAB {{ str }} \xBB : racine, cat\xE9gorie, niqqud, morphologie, sens biblique et moderne. Donne deux exemples traduits.\nContexte : {{ sentence }}" },
    { id: "translate", name: "Traduire dans le contexte", system: "R\xE9ponds en {{ lang_name }}.", template: "Traduis et explique \xAB {{ str }} \xBB.\nPhrase : {{ sentence }}\nParagraphe : {{ paragraph }}" }
  ];
  function normalizePrompt(raw = {}) {
    return { id: text(raw.id || id("prompt"), 200), name: text(raw.name || "Mon prompt", 200), system: text(raw.system || ""), template: text(raw.template || raw.prompt || "{{ str }}") };
  }
  function normalizeStudy(raw = {}) {
    var _a, _b, _c, _d, _e;
    return {
      version: 1,
      providers: (Array.isArray(raw.providers) ? raw.providers : []).map(normalizeProvider).slice(0, 50),
      prompts: (Array.isArray(raw.prompts) ? raw.prompts : defaultPrompts()).map(normalizePrompt).slice(0, 500),
      conversations: (Array.isArray(raw.conversations) ? raw.conversations : []).slice(-200).map((thread) => ({ id: text(thread.id || id("thread"), 200), key: text(thread.key || "", 5e5), providerId: text(thread.providerId, 200), promptId: text(thread.promptId, 200), lookup: text(thread.lookup, 2e3), updatedAt: text(thread.updatedAt || (/* @__PURE__ */ new Date()).toISOString(), 100), messages: (Array.isArray(thread.messages) ? thread.messages : []).filter((message) => ["user", "assistant"].includes(message.role)).slice(-60).map((message) => ({ role: message.role, content: text(message.content) })) })),
      recipes: (Array.isArray(raw.recipes) ? raw.recipes : []).map(normalizeRecipe).slice(0, 1e3),
      anki: { endpoint: endpoint(((_a = raw.anki) == null ? void 0 : _a.endpoint) || "http://127.0.0.1:8765", true), deck: text(((_b = raw.anki) == null ? void 0 : _b.deck) || "", 1e3), model: text(((_c = raw.anki) == null ? void 0 : _c.model) || "", 1e3), fields: obj((_d = raw.anki) == null ? void 0 : _d.fields) ? clone(raw.anki.fields) : {}, tags: Array.isArray((_e = raw.anki) == null ? void 0 : _e.tags) ? raw.anki.tags.map((tag) => text(tag, 100)) : ["BaibolintsikaVerse"] }
    };
  }
  function studyState(state) {
    const next = C.normalizeState(state);
    next.study = normalizeStudy(next.study);
    return next;
  }
  function sourceContext(lookup, context = {}, result = {}) {
    const allowed = {};
    for (const key of ["lang", "ui_lang", "src_lang", "sentence", "paragraph", "text_before", "text_after", "url", "page_url", "page_title", "page_lang", "page_dir", "title", "timestamp"]) if (["string", "number"].includes(typeof context[key])) allowed[key] = context[key];
    const built = C.buildLookupContext(text(lookup, 2e3), allowed);
    const source = { id: text(result.sourceId, 200), name: text(result.sourceName, 200), url: text(result.url, 16384), text: text(result.definition || result.result || ""), html: text(result.html || "") };
    return { ...built, source, result: source.text, definition: source.text, note: text(result.note || ""), ai: text(result.ai || "") };
  }
  function threadKey(provider, prompt, lookup) {
    return JSON.stringify([provider.id, provider.endpoint, provider.model, prompt.id, prompt.system, prompt.template, text(lookup, 2e3)]);
  }
  async function prepareAI(study, providerId, promptId, lookup, context = {}, result = {}, followup = "") {
    var _a;
    const normalized = normalizeStudy(study), provider = normalized.providers.find((item) => item.id === providerId), prompt = normalized.prompts.find((item) => item.id === promptId);
    if (!provider) throw Error("Configurez un fournisseur IA.");
    if (!provider.model.trim()) throw Error("Indiquez le mod\xE8le disponible chez ce fournisseur.");
    if (!prompt) throw Error("Choisissez un prompt.");
    const variables = sourceContext(lookup, context, result), key = threadKey(provider, prompt, lookup);
    const thread = normalized.conversations.find((item) => item.key === key);
    const system = await C.renderTemplate(prompt.system, variables);
    const user = followup.trim() ? text(followup) : await C.renderTemplate(prompt.template, variables);
    if (!user.trim()) throw Error("Le prompt rendu est vide.");
    const previous = thread ? clone(thread.messages) : [];
    const history = previous.slice(-58);
    while (((_a = history[0]) == null ? void 0 : _a.role) === "assistant") history.shift();
    return { study: normalized, provider, prompt, key, system, user, history, thread, lookup: text(lookup, 2e3) };
  }
  function secretFor(provider, secrets = {}) {
    var _a;
    const saved = (_a = secrets.providers) == null ? void 0 : _a[provider.id];
    if (!(saved == null ? void 0 : saved.apiKey)) return "";
    if (saved.origin !== new URL(provider.endpoint).origin) throw Error("L\u2019adresse du fournisseur a chang\xE9 : enregistrez \xE0 nouveau sa cl\xE9 pour cette adresse.");
    return text(saved.apiKey, 16384);
  }
  function aiRequest(prepared, secrets = {}) {
    const { provider, system, user, history } = prepared;
    const key = secretFor(provider, secrets), messages = [...history, { role: "user", content: user }];
    const headers = { "Content-Type": "application/json" };
    let url = provider.endpoint, body;
    if (["openai", "openrouter", "anthropic", "gemini"].includes(provider.type) && !key) throw Error("Ajoutez votre cl\xE9 API personnelle pour ce fournisseur.");
    if (provider.type === "anthropic") {
      if (key) headers["x-api-key"] = key;
      headers["anthropic-version"] = "2023-06-01";
      headers["anthropic-dangerous-direct-browser-access"] = "true";
      body = { model: provider.model, max_tokens: provider.maxTokens, system, messages, stream: false };
    } else if (provider.type === "gemini") {
      const base = url.replace(/\/$/, "");
      url = /:generateContent$/.test(base) ? base : base + "/models/" + encodeURIComponent(provider.model.replace(/^models\//, "")) + ":generateContent";
      if (key) headers["x-goog-api-key"] = key;
      body = { contents: messages.map((message) => ({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: message.content }] })), generationConfig: { maxOutputTokens: provider.maxTokens } };
      if (system) body.systemInstruction = { parts: [{ text: system }] };
    } else {
      if (key) headers.Authorization = "Bearer " + key;
      body = { model: provider.model, messages: [...system ? [{ role: provider.systemRole, content: system }] : [], ...messages], stream: false };
    }
    return { url, method: "POST", headers, body: JSON.stringify(body), credentials: "omit", redirect: "error" };
  }
  function parseJSONResponse(response, service) {
    if (!response || !Number.isInteger(response.status)) throw Error(service + " : r\xE9ponse HTTP invalide.");
    if (response.status < 200 || response.status >= 300) throw Error(service + " : erreur HTTP " + response.status + ". V\xE9rifiez l\u2019adresse, le mod\xE8le et votre acc\xE8s.");
    if (typeof response.body !== "string" || response.body.length > 8 * 1024 * 1024) throw Error(service + " : r\xE9ponse invalide ou trop volumineuse.");
    try {
      return JSON.parse(response.body);
    } catch {
      throw Error(service + " : r\xE9ponse JSON attendue.");
    }
  }
  function aiAnswer(provider, response) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const data = parseJSONResponse(response, provider.name);
    if (data.error) throw Error(provider.name + " : le service a refus\xE9 la requ\xEAte.");
    let answer;
    if (provider.type === "anthropic") answer = (_a = data.content) == null ? void 0 : _a.filter((item) => item.type === "text").map((item) => item.text).join("\n");
    else if (provider.type === "gemini") answer = (_e = (_d = (_c = (_b = data.candidates) == null ? void 0 : _b[0]) == null ? void 0 : _c.content) == null ? void 0 : _d.parts) == null ? void 0 : _e.filter((item) => typeof item.text === "string" && !item.thought).map((item) => item.text).join("\n");
    else {
      const content = (_h = (_g = (_f = data.choices) == null ? void 0 : _f[0]) == null ? void 0 : _g.message) == null ? void 0 : _h.content;
      answer = typeof content === "string" ? content : content == null ? void 0 : content.filter((item) => item.type === "text").map((item) => item.text).join("\n");
    }
    if (!(answer == null ? void 0 : answer.trim())) throw Error(provider.name + " : aucune r\xE9ponse textuelle (refus, limite ou mod\xE8le incompatible).");
    return text(answer);
  }
  async function runAI(options) {
    var _a;
    const prepared = options.prepared || await prepareAI(options.study, options.providerId, options.promptId, options.lookup, options.context, options.result, options.followup || "");
    const answer = aiAnswer(prepared.provider, await options.transport(aiRequest(prepared, options.secrets)));
    const thread = { id: ((_a = prepared.thread) == null ? void 0 : _a.id) || id("thread"), key: prepared.key, providerId: prepared.provider.id, promptId: prepared.prompt.id, lookup: prepared.lookup, updatedAt: (/* @__PURE__ */ new Date()).toISOString(), messages: [...prepared.history, { role: "user", content: prepared.user }, { role: "assistant", content: answer }] };
    const study = prepared.study;
    study.conversations = [...study.conversations.filter((item) => item.key !== thread.key), thread].slice(-200);
    return { study, answer, thread, user: prepared.user };
  }
  async function saveProviderSecret(storage, provider, apiKey) {
    const current = await storage.get("definitionSecrets"), secrets = obj(current.definitionSecrets) ? clone(current.definitionSecrets) : {};
    secrets.providers = obj(secrets.providers) ? secrets.providers : {};
    if (apiKey === "") delete secrets.providers[provider.id];
    else secrets.providers[provider.id] = { apiKey: text(apiKey, 16384), origin: new URL(provider.endpoint).origin };
    await storage.set({ definitionSecrets: secrets });
  }
  function normalizeRecipe(raw = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const mappings = raw.mappings || raw.fields || ((_a = raw.options) == null ? void 0 : _a.mappings);
    const normalized = {};
    if (Array.isArray(mappings)) for (const entry of mappings) {
      const name = (entry == null ? void 0 : entry.field) || (entry == null ? void 0 : entry.name) || (entry == null ? void 0 : entry.key);
      if (["__proto__", "constructor", "prototype"].includes(name)) throw Error("Nom de champ de recette invalide.");
      if (name) normalized[text(name, 200)] = text((_d = (_c = (_b = entry.template) != null ? _b : entry.value) != null ? _c : entry.content) != null ? _d : "");
    }
    else if (obj(mappings)) for (const [name, value] of Object.entries(mappings)) {
      if (["__proto__", "constructor", "prototype"].includes(name)) throw Error("Nom de champ de recette invalide.");
      normalized[text(name, 200)] = text(obj(value) ? (_g = (_f = (_e = value.template) != null ? _e : value.value) != null ? _f : value.content) != null ? _g : "" : value);
    }
    return { id: text(raw.id || id("recipe"), 200), name: text(raw.name || ((_h = raw.display) == null ? void 0 : _h.name) || "Ma recette", 200), collectionId: text(raw.collectionId || raw.collection || "", 200), sourceId: text(raw.sourceId || "", 200), mappings: normalized };
  }
  function importedRecipes(state) {
    var _a, _b, _c;
    const recipes = [];
    for (const source of state.sources || []) {
      for (const raw of ((_b = (_a = source._definer) == null ? void 0 : _a.wrapper) == null ? void 0 : _b.recipes) || []) recipes.push(normalizeRecipe({ ...raw, id: "import-" + source.id + "-" + (raw.id || recipes.length), sourceId: source.id }));
    }
    const imports = ((_c = state.compatibility) == null ? void 0 : _c.definerImports) || [];
    for (const item of imports) {
      const seen = /* @__PURE__ */ new Set();
      const visit = (value, depth = 0) => {
        if (!obj(value) || depth > 7) return;
        for (const [key, child] of Object.entries(value)) {
          if (/lookup-source-recipes|^recipes$/.test(key)) {
            const list = Array.isArray(child) ? child : obj(child == null ? void 0 : child.list) ? Object.values(child.list) : [];
            for (const recipe of list) {
              if (!obj(recipe)) continue;
              const signature = JSON.stringify(recipe);
              if (seen.has(signature)) continue;
              seen.add(signature);
              recipes.push(normalizeRecipe({ ...recipe, id: "backup-" + item.id + "-" + (recipe.id || recipes.length) }));
            }
          } else if (obj(child)) visit(child, depth + 1);
        }
      };
      visit(item.document);
    }
    return recipes;
  }
  async function mapRecipe(recipe, context) {
    const normalized = normalizeRecipe(recipe), fields = {};
    if (!Object.keys(normalized.mappings).length) throw Error("Cette recette ne contient aucun mapping Liquid ex\xE9cutable.");
    for (const [name, template] of Object.entries(normalized.mappings)) fields[name] = await C.renderTemplate(template, context);
    return fields;
  }
  function collectionEntry(kind, raw, extra = {}) {
    const type = kinds.includes(kind) ? kind : "mixed";
    const fields = obj(raw.fields) ? clone(raw.fields) : {};
    return C.normalizeEntry({ ...clone(extra), ...clone(raw), type, text: raw.text || raw.front || raw.title || fields.text || fields.front || "", definition: raw.definition || raw.back || fields.definition || fields.back || "", note: raw.note || raw.content || fields.note || "", fields, tags: Array.isArray(raw.tags) ? raw.tags : [] });
  }
  function saveCollectionEntry(state, collectionId, raw) {
    const next = studyState(state), collection = next.collections.find((item) => item.id === collectionId);
    if (!collection) throw Error("Choisissez une collection.");
    return C.upsertCollectionEntry(next, collectionId, collectionEntry(raw.type || collection.type || "mixed", raw));
  }
  function collectionDictionary(state, collectionId) {
    const next = studyState(state), collection = next.collections.find((item) => item.id === collectionId);
    if (!(collection == null ? void 0 : collection.entries.length)) throw Error("Cette collection est vide.");
    const dictionary = C.parseDictionary(JSON.stringify(collection.entries.map((entry) => ({ word: entry.text, definition: entry.definition || entry.note, tags: entry.tags }))), "json", { name: collection.name });
    let result = C.addDictionary(next, dictionary);
    const existing = result.sources.find((source) => source.collectionId === collection.id);
    result = C.upsertSource(result, { id: existing == null ? void 0 : existing.id, type: "local", name: collection.name, collectionId: collection.id, options: { dictionaryId: dictionary.id } });
    if (existing == null ? void 0 : existing.options.dictionaryId) result.dictionaries = result.dictionaries.filter((item) => item.id !== existing.options.dictionaryId || item.id === dictionary.id);
    return result;
  }
  async function applyRecipe(state, recipe, context, collectionId) {
    var _a, _b, _c;
    const fields = await mapRecipe(recipe, context), next = studyState(state);
    const collection = next.collections.find((item) => item.id === (collectionId || recipe.collectionId));
    if (!collection) throw Error("Choisissez la collection de destination.");
    const raw = { fields, text: fields.text || fields.front || fields.word || context.str, definition: fields.definition || fields.back || fields.result || context.result || context.ai, note: fields.note || fields.notes || "", tags: typeof fields.tags === "string" ? fields.tags.split(/[,\s]+/u).filter(Boolean) : [], sourceId: (_a = context.source) == null ? void 0 : _a.id, sourceName: (_b = context.source) == null ? void 0 : _b.name, url: ((_c = context.source) == null ? void 0 : _c.url) || context.url || "", recipeId: recipe.id };
    return C.upsertCollectionEntry(next, collection.id, collectionEntry(collection.type || "mixed", raw));
  }
  function ankiConfig(raw = {}) {
    return normalizeStudy({ anki: raw }).anki;
  }
  async function ankiCall(transport, config, action, params = {}, key = "") {
    const url = endpoint(config.endpoint || "http://127.0.0.1:8765", true);
    const payload = { action, version: 6, params };
    if (key) payload.key = text(key, 16384);
    const data = parseJSONResponse(await transport({ url, method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), credentials: "omit", redirect: "error" }), "AnkiConnect");
    if (!obj(data) || !Object.hasOwn(data, "result") || !Object.hasOwn(data, "error")) throw Error("AnkiConnect : enveloppe de r\xE9ponse incorrecte.");
    if (data.error !== null) throw Error("AnkiConnect : " + text(key ? String(data.error).split(key).join("[cl\xE9 masqu\xE9e]") : data.error, 1e3));
    return data.result;
  }
  async function ankiNotes(entries, config, fieldNames) {
    const clean = ankiConfig(config);
    if (!clean.deck || !clean.model) throw Error("Choisissez le paquet et le type de note Anki.");
    if (!Array.isArray(entries) || !entries.length || entries.length > 1e3) throw Error("Choisissez entre 1 et 1 000 fiches.");
    if (!Array.isArray(fieldNames) || !fieldNames.length) throw Error("Chargez les champs du type de note Anki.");
    return Promise.all(entries.map(async (entry) => {
      const context = { ...sourceContext(entry.text, entry.context || {}, entry), entry: clone(entry), front: entry.text, back: entry.definition, tags: entry.tags || [], fields: entry.fields || {} }, fields = {};
      for (const name of fieldNames) {
        if (typeof clean.fields[name] !== "string") throw Error("Mapping absent pour le champ Anki \xAB " + name + " \xBB.");
        fields[name] = C.escapeHTML(await C.renderTemplate(clean.fields[name], context)).replace(/\n/g, "<br>");
      }
      if (!Object.values(fields).some((value) => value.trim())) throw Error("Une note Anki ne peut pas \xEAtre vide.");
      return { deckName: clean.deck, modelName: clean.model, fields, tags: [.../* @__PURE__ */ new Set([...clean.tags, ...entry.tags || []])].map((value) => text(value, 100).replace(/\s+/g, "_")), options: { allowDuplicate: false } };
    }));
  }
  async function sendAnki(transport, config, entries, fieldNames, key = "") {
    const notes = await ankiNotes(entries, config, fieldNames);
    const canAdd = await ankiCall(transport, config, "canAddNotes", { notes }, key);
    if (!Array.isArray(canAdd) || canAdd.length !== notes.length) throw Error("AnkiConnect : contr\xF4le des doublons incorrect.");
    if (canAdd.some((value) => value !== true)) throw Error("Anki a refus\xE9 certaines notes (doublons ou champs requis). Rien n\u2019a \xE9t\xE9 envoy\xE9.");
    const result = await ankiCall(transport, config, "addNotes", { notes }, key);
    if (!Array.isArray(result) || result.length !== notes.length) throw Error("AnkiConnect : r\xE9sultat d\u2019ajout incorrect ; v\xE9rifiez Anki avant de r\xE9essayer.");
    return { added: result.filter((value) => Number.isInteger(value)).length, failed: result.map((value, index) => value === null ? index : -1).filter((value) => value >= 0), ids: result };
  }
  async function mount(integration) {
    var _a;
    const document = root.document, panel = document == null ? void 0 : document.getElementById("definition-panel");
    if (!panel || panel.dataset.studyMounted) return;
    panel.dataset.studyMounted = "true";
    const browser = root.browser || root.chrome;
    const $ = (name) => document.getElementById("defs-" + name);
    const state = () => studyState(integration.getState());
    const status = (value, error = false) => {
      var _a2;
      $("status").textContent = value;
      $("status").classList.toggle("error", error);
      (_a2 = integration.status) == null ? void 0 : _a2.call(integration, value, error);
    };
    const handle = (fn) => async (event) => {
      var _a2;
      try {
        await ((_a2 = integration.ready) == null ? void 0 : _a2.call(integration));
        await fn(event);
      } catch (error) {
        status(error.message, true);
      }
    };
    const button = (value, fn) => {
      const el = document.createElement("button");
      el.type = "button";
      el.textContent = value;
      el.onclick = handle(fn);
      return el;
    };
    const node = (tag, value, className = "") => {
      const el = document.createElement(tag);
      el.textContent = value;
      el.className = className;
      return el;
    };
    const persist = async (next) => {
      var _a2;
      integration.setState(next);
      await integration.save();
      (_a2 = integration.refresh) == null ? void 0 : _a2.call(integration);
    };
    const storage = browser.storage.local;
    const readSecrets = async () => (await storage.get("definitionSecrets")).definitionSecrets || {};
    const transport = (request) => integration.send({ type: "definition:request", request });
    const current = () => {
      var _a2;
      return ((_a2 = integration.currentResult) == null ? void 0 : _a2.call(integration)) || {};
    };
    const context = () => {
      var _a2, _b;
      const supplied = ((_a2 = integration.context) == null ? void 0 : _a2.call(integration)) || {};
      const term = supplied.str || supplied.text || ((_b = document.getElementById("def-query")) == null ? void 0 : _b.value) || current().text || "";
      return sourceContext(term, supplied, { ...current(), ai: lastAnswer });
    };
    const section = document.createElement("div");
    section.className = "defs-tools";
    section.innerHTML = `
      <div class="defs-title"><span>ATELIER D\u2019\xC9TUDE</span><p>Vos conversations, vos fiches et vos recettes.</p></div>
      <nav class="defs-nav" aria-label="Atelier D\xE9finition"><button type="button" data-defs-view="ai" aria-pressed="true">Assistant IA</button><button type="button" data-defs-view="collections" aria-pressed="false">Collections enrichies</button><button type="button" data-defs-view="recipes" aria-pressed="false">Recettes Liquid</button><button type="button" data-defs-view="anki" aria-pressed="false">Anki</button></nav>
      <p id="defs-status" class="def-status" role="status" aria-live="polite"></p>
      <section data-defs-content="ai"><div class="defs-grid"><div class="def-card"><h3>Une pens\xE9e \xE0 approfondir.</h3><label>Fournisseur<select id="defs-provider"></select></label><label>Votre t\xE2che<select id="defs-prompt"></select></label><p class="def-caption">Chaque mot et chaque t\xE2che poss\xE8de sa conversation. Seul le prompt affich\xE9 et son historique sont envoy\xE9s au fournisseur choisi, \xE0 votre demande. Les r\xE9ponses IA peuvent comporter des erreurs.</p><textarea id="defs-ai-preview" rows="5" readonly aria-label="Aper\xE7u du prompt rendu"></textarea><div class="def-row"><button id="defs-ai-preview-button" type="button">Voir le prompt</button><button id="defs-ai-run" type="button" class="primary">Interroger l\u2019IA</button><button id="defs-ai-clear" type="button">Nouvelle conversation</button></div><div id="defs-messages" class="defs-messages" aria-live="polite"></div><label>Poursuivre cette conversation<textarea id="defs-followup" rows="3" placeholder="Votre question suivante\u2026"></textarea></label><div class="def-row"><button id="defs-ai-follow" type="button">Envoyer la suite</button><button id="defs-ai-copy" type="button">Copier la r\xE9ponse</button><button id="defs-ai-keep" type="button">Garder dans l\u2019atelier</button></div></div>
      <div><details class="def-card"><summary>Configurer mes fournisseurs</summary><form id="defs-provider-form"><input id="defs-provider-id" type="hidden"><label>Protocole<select id="defs-provider-type">${Object.entries(presets).map(([key, value]) => '<option value="' + key + '">' + value.name + "</option>").join("")}</select></label><label>Nom<input id="defs-provider-name" maxlength="200"></label><label>URL API compl\xE8te<input id="defs-provider-endpoint" type="url" required placeholder="https://api.openai.com/v1/chat/completions"></label><label>Identifiant du mod\xE8le<input id="defs-provider-model" required placeholder="Mod\xE8le disponible dans votre compte"></label><label>R\xF4le d\u2019instructions (API compatible)<select id="defs-provider-role"><option value="system">system</option><option value="developer">developer</option></select></label><label>Limite de sortie Anthropic / Gemini<input id="defs-provider-tokens" type="number" min="1" max="32768" value="2048"></label><label>Cl\xE9 API personnelle<input id="defs-provider-key" type="password" autocomplete="new-password" placeholder="Vide : conserver la cl\xE9 locale"></label><p class="def-caption">La cl\xE9 reste dans le stockage local s\xE9par\xE9 du navigateur, non dans vos sauvegardes. Ce stockage n\u2019est pas un coffre chiffr\xE9. Supprimez-la sur un Mac partag\xE9. Ne collez jamais une cl\xE9 dans un prompt. Un export Definer import\xE9 peut d\xE9j\xE0 contenir des secrets.</p><div class="def-row"><button type="submit">Enregistrer</button><button id="defs-provider-new" type="button">Nouveau</button><button id="defs-provider-key-remove" type="button">Effacer la cl\xE9</button><button id="defs-provider-delete" type="button">Retirer</button></div></form></details>
      <details class="def-card"><summary>Mes prompts Liquid</summary><form id="defs-prompt-form"><input id="defs-prompt-id" type="hidden"><label>Nom<input id="defs-prompt-name" required></label><label>Instructions<textarea id="defs-prompt-system" rows="4"></textarea></label><label>Question avec contexte<textarea id="defs-prompt-template" rows="7" required></textarea></label><p class="def-caption">Variables : str, lang_name, sentence, paragraph, page_title, url, result, source.text, source.name, ai. Filtres Liquid habituels disponibles.</p><div class="def-row"><button type="submit">Enregistrer le prompt</button><button id="defs-prompt-new" type="button">Nouveau</button><button id="defs-prompt-delete" type="button">Supprimer</button></div></form></details></div></div></section>
      <section data-defs-content="collections" hidden><div class="def-card"><h3>Des mots aux connaissances.</h3><form id="defs-collection-new" class="def-row"><input id="defs-collection-name" placeholder="Nom de la collection" required><select id="defs-collection-new-type" aria-label="Type de collection">${kinds.map((kind) => '<option value="' + kind + '">' + labels[kind] + "</option>").join("")}</select><button type="submit">Cr\xE9er</button></form><div class="def-row"><select id="defs-collection" aria-label="Collection de l\u2019atelier"></select><select id="defs-collection-type" aria-label="Type de la collection">${kinds.map((kind) => '<option value="' + kind + '">' + labels[kind] + "</option>").join("")}</select><button id="defs-collection-type-save" type="button">Appliquer le type</button><button id="defs-capture" type="button">Reprendre le r\xE9sultat</button><button id="defs-entry-new" type="button">Nouvelle fiche</button></div><form id="defs-entry-form"><input id="defs-entry-id" type="hidden"><div class="def-options"><label>Titre / recto<input id="defs-entry-text" dir="auto" required></label><label>Type<select id="defs-entry-type">${kinds.map((kind) => '<option value="' + kind + '">' + labels[kind] + "</option>").join("")}</select></label></div><label>D\xE9finition / verso<textarea id="defs-entry-definition" rows="4" dir="auto"></textarea></label><label>Notes / texte / prompt<textarea id="defs-entry-note" rows="4" dir="auto"></textarea></label><label>\xC9tiquettes<input id="defs-entry-tags" placeholder="h\xE9breu, \xE9tude"></label><details><summary>Champs structur\xE9s JSON</summary><textarea id="defs-entry-fields" rows="4">{}</textarea></details><button type="submit" class="primary">Garder la fiche</button></form><div id="defs-entries"></div></div></section>
      <section data-defs-content="recipes" hidden><div class="def-card"><h3>Votre r\xE9sultat devient une fiche.</h3><label>Recette<select id="defs-recipe"></select></label><form id="defs-recipe-form"><input id="defs-recipe-id" type="hidden"><label>Nom<input id="defs-recipe-name" required></label><label>Destination<select id="defs-recipe-collection"></select></label><label>Mappings Liquid (objet JSON)<textarea id="defs-recipe-mappings" rows="8" required></textarea></label><p class="def-caption">Exemple : {"front":"{{ str }}", "back":"{{ result }}", "note":"{{ sentence }}"}. Les mappings Definer import\xE9s sont repris lorsqu\u2019ils sont explicites. Aucun JavaScript import\xE9 n\u2019est ex\xE9cut\xE9.</p><div class="def-row"><button type="submit">Enregistrer</button><button id="defs-recipe-new" type="button">Nouvelle recette</button><button id="defs-recipe-preview" type="button">Aper\xE7u</button><button id="defs-recipe-apply" type="button" class="primary">Ex\xE9cuter et garder</button><button id="defs-recipe-delete" type="button">Supprimer</button></div></form><pre id="defs-recipe-output" class="defs-code"></pre></div></section>
      <section data-defs-content="anki" hidden><div class="def-card"><h3>Apprendre avec Anki.</h3><p>Anki doit \xEAtre ouvert sur ce Mac avec le module AnkiConnect. La connexion reste locale ; chaque envoi est d\xE9clench\xE9 par vous. Autorisez l\u2019origine de cette extension dans AnkiConnect si demand\xE9.</p><label>Serveur AnkiConnect<input id="defs-anki-endpoint" type="url" value="http://127.0.0.1:8765"></label><label>Cl\xE9 AnkiConnect (facultative)<input id="defs-anki-key" type="password" autocomplete="new-password" placeholder="Conserv\xE9e s\xE9par\xE9ment en local"></label><div class="def-row"><button id="defs-anki-connect" type="button">Connecter et lire mes paquets</button><button id="defs-anki-key-remove" type="button">Effacer la cl\xE9 Anki</button></div><div class="def-options"><label>Paquet<select id="defs-anki-deck"></select></label><label>Type de note<select id="defs-anki-model"></select></label></div><div id="defs-anki-fields"></div><label>Collection \xE0 envoyer<select id="defs-anki-collection"></select></label><label>\xC9tiquettes Anki<input id="defs-anki-tags" value="BaibolintsikaVerse"></label><div class="def-row"><button id="defs-anki-preview" type="button">Aper\xE7u des notes</button><button id="defs-anki-send" type="button" class="primary">Envoyer \xE0 Anki</button><button id="defs-anki-tsv" type="button">Exporter TSV</button></div><pre id="defs-anki-output" class="defs-code"></pre></div></section>`;
    if (integration.addView) integration.addView("study", "Atelier \xB7 IA & Anki", section);
    else panel.append(section);
    let lastAnswer = "", lastThread, selectedCollection = "", ankiFields = [], busy = false, editingEntry = {}, reviewIndex = 0, reviewBack = false;
    const collectionTools = node("div", "", "def-toolbar");
    const collectionSearch = document.createElement("input");
    collectionSearch.type = "search";
    collectionSearch.placeholder = "Filtrer les fiches\u2026";
    collectionSearch.setAttribute("aria-label", "Filtrer les fiches de l\u2019atelier");
    collectionSearch.oninput = () => renderEntries();
    const reviewBox = node("div", "", "def-review");
    reviewBox.hidden = true;
    const downloadText = (filename, value, type = "text/plain;charset=utf-8") => {
      const url = URL.createObjectURL(new Blob([value], { type })), anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      root.setTimeout(() => URL.revokeObjectURL(url), 1e3);
    };
    collectionTools.append(collectionSearch, button("Cartes m\xE9moire", () => {
      reviewIndex = 0;
      reviewBack = false;
      renderReview();
    }), button("Source dictionnaire", async () => {
      await persist(collectionDictionary(state(), $("collection").value));
      status("Collection disponible comme source de dictionnaire local. R\xE9p\xE9tez cette action pour actualiser ses fiches.");
    }), button("Exporter JSON", () => {
      var _a2;
      const entries = ((_a2 = state().collections.find((item) => item.id === $("collection").value)) == null ? void 0 : _a2.entries) || [];
      downloadText("definition-collection.json", C.exportEntries(entries, "json"), "application/json");
    }));
    $("entry-form").before(collectionTools, reviewBox);
    const fill = (el, entries, selected) => {
      el.replaceChildren(...entries.map((entry) => {
        const option = document.createElement("option");
        option.value = entry.id;
        option.textContent = entry.name;
        return option;
      }));
      if (entries.some((item) => item.id === selected)) el.value = selected;
    };
    const show = (name) => {
      section.querySelectorAll("[data-defs-content]").forEach((el) => {
        el.hidden = el.dataset.defsContent !== name;
      });
      section.querySelectorAll("[data-defs-view]").forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.defsView === name)));
    };
    section.querySelectorAll("[data-defs-view]").forEach((el) => {
      el.onclick = handle(async () => {
        await refresh();
        show(el.dataset.defsView);
      });
    });
    async function refresh() {
      const currentState = state(), study = currentState.study;
      fill($("provider"), study.providers, $("provider").value);
      fill($("prompt"), study.prompts, $("prompt").value);
      const collections = currentState.collections.map((item) => ({ id: item.id, name: labels[item.type || "mixed"] + " \xB7 " + item.name }));
      for (const name of ["collection", "recipe-collection", "anki-collection"]) fill($(name), collections, $(name).value || selectedCollection);
      selectedCollection = $("collection").value;
      fill($("recipe"), [...study.recipes, ...importedRecipes(currentState)], $("recipe").value);
      renderEntries();
      $("anki-endpoint").value = study.anki.endpoint;
      $("anki-tags").value = study.anki.tags.join(", ");
    }
    function providerForm(provider) {
      const value = provider || { type: "openai", ...presets.openai };
      $("provider-id").value = value.id || "";
      $("provider-type").value = value.type;
      $("provider-name").value = value.name;
      $("provider-endpoint").value = value.endpoint;
      $("provider-model").value = value.model || "";
      $("provider-role").value = value.systemRole || "system";
      $("provider-tokens").value = value.maxTokens || 2048;
      $("provider-key").value = "";
    }
    function promptForm(prompt) {
      const value = prompt || { name: "", system: "", template: "{{ str }}" };
      $("prompt-id").value = value.id || "";
      $("prompt-name").value = value.name;
      $("prompt-system").value = value.system;
      $("prompt-template").value = value.template;
    }
    $("provider-type").onchange = () => {
      const preset = presets[$("provider-type").value];
      $("provider-name").value = preset.name;
      $("provider-endpoint").value = preset.endpoint;
      $("provider-key").value = "";
    };
    $("provider").onchange = handle(async () => {
      providerForm(state().study.providers.find((item) => item.id === $("provider").value));
      await renderMessages();
    });
    $("prompt").onchange = handle(async () => {
      promptForm(state().study.prompts.find((item) => item.id === $("prompt").value));
      await renderMessages();
    });
    $("provider-new").onclick = () => providerForm();
    $("prompt-new").onclick = () => promptForm();
    $("provider-form").onsubmit = handle(async (event) => {
      event.preventDefault();
      const next = state(), provider = normalizeProvider({ id: $("provider-id").value || void 0, type: $("provider-type").value, name: $("provider-name").value, endpoint: $("provider-endpoint").value, model: $("provider-model").value, systemRole: $("provider-role").value, maxTokens: $("provider-tokens").value });
      next.study.providers = [...next.study.providers.filter((item) => item.id !== provider.id), provider];
      if ($("provider-key").value) await saveProviderSecret(storage, provider, $("provider-key").value);
      await persist(next);
      await refresh();
      $("provider").value = provider.id;
      providerForm(provider);
      status("Fournisseur enregistr\xE9. Cl\xE9 s\xE9par\xE9e des sauvegardes.");
    });
    $("provider-key-remove").onclick = handle(async () => {
      const provider = state().study.providers.find((item) => item.id === $("provider").value);
      if (provider) await saveProviderSecret(storage, provider, "");
      $("provider-key").value = "";
      status("Cl\xE9 locale effac\xE9e.");
    });
    $("provider-delete").onclick = handle(async () => {
      const next = state(), provider = next.study.providers.find((item) => item.id === $("provider").value);
      if (!provider || !root.confirm("Retirer ce fournisseur et ses conversations locales ?")) return;
      await saveProviderSecret(storage, provider, "");
      next.study.providers = next.study.providers.filter((item) => item.id !== provider.id);
      next.study.conversations = next.study.conversations.filter((item) => item.providerId !== provider.id);
      await persist(next);
      await refresh();
      providerForm(next.study.providers[0]);
    });
    $("prompt-form").onsubmit = handle(async (event) => {
      event.preventDefault();
      const next = state(), prompt = normalizePrompt({ id: $("prompt-id").value || void 0, name: $("prompt-name").value, system: $("prompt-system").value, template: $("prompt-template").value });
      next.study.prompts = [...next.study.prompts.filter((item) => item.id !== prompt.id), prompt];
      await persist(next);
      await refresh();
      $("prompt").value = prompt.id;
      promptForm(prompt);
      status("Prompt enregistr\xE9.");
    });
    $("prompt-delete").onclick = handle(async () => {
      const next = state(), target = $("prompt").value;
      if (!root.confirm("Supprimer ce prompt et ses conversations locales ?")) return;
      next.study.prompts = next.study.prompts.filter((item) => item.id !== target);
      next.study.conversations = next.study.conversations.filter((item) => item.promptId !== target);
      await persist(next);
      await refresh();
      promptForm(next.study.prompts[0]);
      await renderMessages();
    });
    async function prepared(followup = "") {
      const vars = context();
      if (!vars.str.trim()) throw Error("Saisissez d\u2019abord un mot dans D\xE9finition.");
      return prepareAI(state().study, $("provider").value, $("prompt").value, vars.str, vars, { ...current(), ai: lastAnswer }, followup);
    }
    async function renderMessages(thread) {
      var _a2;
      if (!thread) {
        try {
          const value = await prepared();
          thread = value.thread;
        } catch {
        }
      }
      lastThread = thread;
      lastAnswer = ((_a2 = thread == null ? void 0 : thread.messages.filter((item) => item.role === "assistant").at(-1)) == null ? void 0 : _a2.content) || "";
      $("messages").replaceChildren(...((thread == null ? void 0 : thread.messages) || []).map((message) => {
        const bubble = node("article", "", "defs-message " + message.role);
        bubble.append(node("strong", message.role === "assistant" ? "Assistant" : "Vous"), node("p", message.content));
        return bubble;
      }));
    }
    $("ai-preview-button").onclick = handle(async () => {
      const value = await prepared();
      $("ai-preview").value = [value.system, value.user].filter(Boolean).join("\n\n");
      await renderMessages(value.thread);
    });
    async function ask(followup = "") {
      if (busy) return;
      const preparedValue = await prepared(followup);
      if (integration.onlineAllowed && !await integration.onlineAllowed()) return;
      busy = true;
      for (const name of ["ai-run", "ai-follow"]) $(name).disabled = true;
      try {
        status("R\xE9ponse de " + preparedValue.provider.name + " en cours\u2026");
        const outcome = await runAI({ prepared: preparedValue, secrets: await readSecrets(), transport });
        const next = state();
        next.study.conversations = [...next.study.conversations.filter((item) => item.key !== outcome.thread.key), outcome.thread].slice(-200);
        await persist(next);
        let active;
        try {
          active = await prepared();
        } catch {
        }
        if ((active == null ? void 0 : active.key) === outcome.thread.key) {
          $("followup").value = "";
          await renderMessages(outcome.thread);
        }
        status("R\xE9ponse re\xE7ue pour \xAB " + outcome.thread.lookup + " \xBB. Conversation enregistr\xE9e sur ce navigateur.");
      } finally {
        busy = false;
        for (const name of ["ai-run", "ai-follow"]) $(name).disabled = false;
      }
    }
    $("ai-run").onclick = handle(() => ask());
    $("ai-follow").onclick = handle(() => {
      if (!$("followup").value.trim()) throw Error("Saisissez votre question suivante.");
      return ask($("followup").value);
    });
    $("ai-clear").onclick = handle(async () => {
      const value = await prepared(), next = state();
      next.study.conversations = next.study.conversations.filter((item) => item.key !== value.key);
      await persist(next);
      await renderMessages({ messages: [] });
      status("Conversation r\xE9initialis\xE9e pour ce mot et cette t\xE2che.");
    });
    $("ai-copy").onclick = handle(async () => {
      if (!lastAnswer) throw Error("Aucune r\xE9ponse \xE0 copier.");
      await root.navigator.clipboard.writeText(lastAnswer);
      status("R\xE9ponse copi\xE9e.");
    });
    $("ai-keep").onclick = handle(async () => {
      if (!lastAnswer) throw Error("Aucune r\xE9ponse \xE0 garder.");
      show("collections");
      await refresh();
      editEntry({ text: context().str, definition: lastAnswer, sourceName: "Assistant IA", sourceId: $("provider").value, context: context(), type: "notes" });
    });
    function editEntry(entry = {}) {
      var _a2;
      editingEntry = clone(entry);
      $("entry-id").value = entry.id || "";
      $("entry-text").value = entry.text || "";
      $("entry-definition").value = entry.definition || "";
      $("entry-note").value = entry.note || "";
      $("entry-tags").value = (entry.tags || []).join(", ");
      $("entry-type").value = entry.type || ((_a2 = state().collections.find((item) => item.id === $("collection").value)) == null ? void 0 : _a2.type) || "mixed";
      $("entry-fields").value = JSON.stringify(entry.fields || {}, null, 2);
    }
    function renderEntries() {
      const collection = state().collections.find((item) => item.id === $("collection").value);
      $("entries").replaceChildren();
      $("collection-type").value = (collection == null ? void 0 : collection.type) || "mixed";
      reviewBox.hidden = true;
      const filter = C.normalizeSearch(collectionSearch.value);
      for (const entry of ((collection == null ? void 0 : collection.entries) || []).filter((item) => !filter || C.normalizeSearch([item.text, item.definition, item.note, ...item.tags || []].join(" ")).includes(filter))) {
        const article = node("article", "", "def-entry");
        article.dir = "auto";
        article.append(node("small", labels[entry.type || collection.type || "mixed"]), node("h4", entry.text), node("p", entry.definition), node("p", entry.note));
        const tools = node("div", "", "def-row");
        tools.append(button("Modifier", () => editEntry(entry)), button("Retirer", async () => {
          if (!root.confirm("Retirer cette fiche ?")) return;
          await persist(C.removeCollectionEntry(state(), collection.id, entry.id));
          await refresh();
        }));
        if ((entry.type || collection.type) === "prompts") tools.append(button("Utiliser comme prompt IA", async () => {
          var _a2;
          const next = state(), prompt = normalizePrompt({ name: entry.text, template: entry.note || entry.definition || "{{ str }}", system: ((_a2 = entry.fields) == null ? void 0 : _a2.system) || "" });
          next.study.prompts.push(prompt);
          await persist(next);
          await refresh();
          $("prompt").value = prompt.id;
          promptForm(prompt);
          show("ai");
        }));
        article.append(tools);
        $("entries").append(article);
      }
    }
    function renderReview() {
      var _a2;
      const entries = ((_a2 = state().collections.find((item) => item.id === $("collection").value)) == null ? void 0 : _a2.entries) || [];
      if (!entries.length) throw Error("Cette collection est vide.");
      const entry = entries[reviewIndex % entries.length];
      reviewBox.hidden = false;
      reviewBox.replaceChildren(node("small", reviewIndex % entries.length + 1 + " / " + entries.length), node("h3", reviewBack ? entry.definition || entry.note || "Verso vide." : entry.text));
      reviewBox.append(button(reviewBack ? "Carte suivante \u2192" : "Voir le verso", () => {
        if (reviewBack) reviewIndex++;
        reviewBack = !reviewBack;
        renderReview();
      }));
    }
    $("collection").onchange = () => {
      selectedCollection = $("collection").value;
      renderEntries();
      editEntry();
    };
    $("collection-new").onsubmit = handle(async (event) => {
      event.preventDefault();
      let next = C.createCollection(state(), $("collection-name").value.trim());
      const collection = next.collections.at(-1);
      collection.type = $("collection-new-type").value;
      const createdId = collection.id;
      await persist(next);
      $("collection-name").value = "";
      await refresh();
      selectedCollection = createdId;
      $("collection").value = createdId;
      renderEntries();
      editEntry();
    });
    $("collection-type-save").onclick = handle(async () => {
      const next = state(), collection = next.collections.find((item) => item.id === $("collection").value);
      if (!collection) throw Error("Cr\xE9ez une collection.");
      collection.type = $("collection-type").value;
      await persist(next);
      await refresh();
      status("Type de collection enregistr\xE9. Les fiches existantes sont conserv\xE9es.");
    });
    $("entry-new").onclick = () => editEntry();
    $("capture").onclick = () => editEntry({ ...current(), text: context().str, context: context() });
    $("entry-form").onsubmit = handle(async (event) => {
      var _a2;
      event.preventDefault();
      const fields = JSON.parse($("entry-fields").value || "{}");
      if (!obj(fields)) throw Error("Les champs doivent \xEAtre un objet JSON.");
      const existing = (_a2 = state().collections.find((item) => item.id === $("collection").value)) == null ? void 0 : _a2.entries.find((item) => item.id === $("entry-id").value);
      const raw = { ...current(), ...editingEntry, ...existing, id: $("entry-id").value || void 0, text: $("entry-text").value, definition: $("entry-definition").value, note: $("entry-note").value, type: $("entry-type").value, fields, tags: $("entry-tags").value.split(",").map((item) => item.trim()).filter(Boolean), context: (existing == null ? void 0 : existing.context) || editingEntry.context || context() };
      await persist(saveCollectionEntry(state(), $("collection").value, raw));
      editEntry();
      await refresh();
      status("Fiche enregistr\xE9e.");
    });
    const allRecipes = () => [...state().study.recipes, ...importedRecipes(state())];
    function recipeForm(recipe) {
      const value = recipe || { name: "", collectionId: $("collection").value, mappings: { front: "{{ str }}", back: "{{ result | default: ai }}", note: "{{ sentence }}" } };
      $("recipe-id").value = value.id || "";
      $("recipe-name").value = value.name;
      $("recipe-collection").value = value.collectionId || $("collection").value;
      $("recipe-mappings").value = JSON.stringify(value.mappings, null, 2);
    }
    const formRecipe = () => normalizeRecipe({ id: $("recipe-id").value || void 0, name: $("recipe-name").value, collectionId: $("recipe-collection").value, mappings: JSON.parse($("recipe-mappings").value) });
    $("recipe").onchange = () => recipeForm(allRecipes().find((item) => item.id === $("recipe").value));
    $("recipe-new").onclick = () => recipeForm();
    $("recipe-form").onsubmit = handle(async (event) => {
      event.preventDefault();
      const next = state(), recipe = formRecipe();
      next.study.recipes = [...next.study.recipes.filter((item) => item.id !== recipe.id), recipe];
      await persist(next);
      await refresh();
      $("recipe").value = recipe.id;
      recipeForm(recipe);
      status("Recette enregistr\xE9e.");
    });
    $("recipe-preview").onclick = handle(async () => {
      $("recipe-output").textContent = JSON.stringify(await mapRecipe(formRecipe(), context()), null, 2);
    });
    $("recipe-apply").onclick = handle(async () => {
      const recipe = formRecipe();
      await persist(await applyRecipe(state(), recipe, context(), $("recipe-collection").value));
      await refresh();
      status("Recette ex\xE9cut\xE9e : fiche ajout\xE9e \xE0 la collection.");
    });
    $("recipe-delete").onclick = handle(async () => {
      const next = state(), target = $("recipe").value;
      if (!next.study.recipes.some((item) => item.id === target)) throw Error("La recette import\xE9e reste attach\xE9e \xE0 sa source ; cr\xE9ez une copie pour la modifier.");
      if (!root.confirm("Supprimer cette recette ?")) return;
      next.study.recipes = next.study.recipes.filter((item) => item.id !== target);
      await persist(next);
      await refresh();
      recipeForm(allRecipes()[0]);
    });
    async function ankiKey() {
      const secrets = await readSecrets(), saved = secrets.anki;
      if (!(saved == null ? void 0 : saved.apiKey)) return "";
      if (saved.origin !== new URL(endpoint($("anki-endpoint").value, true)).origin) throw Error("Adresse Anki modifi\xE9e : enregistrez \xE0 nouveau la cl\xE9.");
      return saved.apiKey;
    }
    async function saveAnkiKey() {
      if (!$("anki-key").value) return;
      const secrets = await readSecrets();
      secrets.anki = { apiKey: text($("anki-key").value, 16384), origin: new URL(endpoint($("anki-endpoint").value, true)).origin };
      await storage.set({ definitionSecrets: secrets });
      $("anki-key").value = "";
    }
    function readAnkiConfig() {
      const fields = {};
      $("anki-fields").querySelectorAll("textarea").forEach((el) => {
        fields[el.dataset.field] = el.value;
      });
      return ankiConfig({ endpoint: $("anki-endpoint").value, deck: $("anki-deck").value, model: $("anki-model").value, fields, tags: $("anki-tags").value.split(",").map((item) => item.trim()).filter(Boolean) });
    }
    async function loadAnkiFields() {
      const config = readAnkiConfig();
      if (!config.model) return;
      const fields = await ankiCall(transport, config, "modelFieldNames", { modelName: config.model }, await ankiKey());
      if (!Array.isArray(fields) || !fields.length || fields.some((value) => typeof value !== "string")) throw Error("AnkiConnect : champs de mod\xE8le invalides.");
      ankiFields = fields;
      $("anki-fields").replaceChildren();
      const saved = state().study.anki;
      fields.forEach((field, index) => {
        const label = node("label", field), input = document.createElement("textarea");
        input.rows = 2;
        input.dataset.field = field;
        input.value = saved.model === config.model && typeof saved.fields[field] === "string" ? saved.fields[field] : index === 0 ? "{{ front }}" : index === 1 ? "{{ back }}" : "{{ entry.note }}";
        label.append(input);
        $("anki-fields").append(label);
      });
    }
    $("anki-connect").onclick = handle(async () => {
      endpoint($("anki-endpoint").value, true);
      await saveAnkiKey();
      const config = readAnkiConfig(), key = await ankiKey();
      const version = await ankiCall(transport, config, "version", {}, key);
      if (Number(version) < 6) throw Error("AnkiConnect version 6 ou sup\xE9rieure attendue.");
      const [decks, models] = await Promise.all([ankiCall(transport, config, "deckNames", {}, key), ankiCall(transport, config, "modelNames", {}, key)]);
      if (![decks, models].every((list) => Array.isArray(list) && list.every((value) => typeof value === "string"))) throw Error("AnkiConnect : listes invalides.");
      const saved = state().study.anki;
      fill($("anki-deck"), decks.map((name) => ({ id: name, name })), saved.deck);
      fill($("anki-model"), models.map((name) => ({ id: name, name })), saved.model);
      await loadAnkiFields();
      status("Anki connect\xE9. Choisissez les mappings avant tout envoi.");
    });
    $("anki-model").onchange = handle(loadAnkiFields);
    $("anki-key-remove").onclick = handle(async () => {
      const secrets = await readSecrets();
      delete secrets.anki;
      await storage.set({ definitionSecrets: secrets });
      $("anki-key").value = "";
      status("Cl\xE9 Anki locale effac\xE9e.");
    });
    const chosenEntries = () => {
      var _a2;
      return ((_a2 = state().collections.find((item) => item.id === $("anki-collection").value)) == null ? void 0 : _a2.entries) || [];
    };
    $("anki-preview").onclick = handle(async () => {
      const notes = await ankiNotes(chosenEntries(), readAnkiConfig(), ankiFields);
      $("anki-output").textContent = JSON.stringify(notes, null, 2);
      status(notes.length + " notes pr\xEAtes. Aucun envoi effectu\xE9.");
    });
    $("anki-send").onclick = handle(async () => {
      const entries = chosenEntries(), config = readAnkiConfig();
      if (!entries.length) throw Error("Cette collection est vide.");
      if (!root.confirm("Envoyer " + entries.length + " notes au paquet Anki \xAB " + config.deck + " \xBB ?")) return;
      await saveAnkiKey();
      const outcome = await sendAnki(transport, config, entries, ankiFields, await ankiKey());
      const next = state();
      next.study.anki = config;
      await persist(next);
      status(outcome.added + " notes ajout\xE9es \xE0 Anki." + (outcome.failed.length ? " " + outcome.failed.length + " refus\xE9es ; v\xE9rifiez Anki avant de r\xE9essayer." : ""), outcome.failed.length > 0);
      $("anki-output").textContent = JSON.stringify(outcome, null, 2);
    });
    $("anki-tsv").onclick = handle(async () => {
      const entries = chosenEntries();
      if (!entries.length) throw Error("Cette collection est vide.");
      downloadText("definition-anki.tsv", C.exportEntries(entries, "anki"), "text/tab-separated-values;charset=utf-8");
      status("TSV export\xE9 ; importez-le dans Anki si AnkiConnect est indisponible.");
    });
    await ((_a = integration.ready) == null ? void 0 : _a.call(integration));
    await refresh();
    providerForm(state().study.providers[0]);
    promptForm(state().study.prompts[0]);
    recipeForm(allRecipes()[0]);
    editEntry();
    await renderMessages();
    document.addEventListener("bv-definition-result", handle(async () => {
      await renderMessages();
    }));
  }
  return Object.freeze({ kinds, labels, presets, endpoint, isLoopback, normalizeProvider, normalizePrompt, normalizeStudy, studyState, sourceContext, threadKey, prepareAI, aiRequest, aiAnswer, runAI, saveProviderSecret, normalizeRecipe, importedRecipes, mapRecipe, collectionEntry, saveCollectionEntry, collectionDictionary, applyRecipe, ankiConfig, ankiCall, ankiNotes, sendAnki, mount });
});
