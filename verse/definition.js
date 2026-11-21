(() => {
  "use strict";
  var _a, _b, _c;
  const browser = globalThis.browser || globalThis.chrome;
  const C = globalThis.BVDefinitionCore, panel = document.getElementById("definition-panel");
  if (!panel || !C) return;
  panel.innerHTML = `
    <header class="def-hero"><p class="eyebrow">D\xC9FINITION \xB7 VOS MOTS, VOS SOURCES</p><h2>Un mot ouvre un monde.</h2><p>Dictionnaires, traductions et h\xE9breu : retrouvez vos sources au m\xEAme endroit et donnez-leur votre propre style.</p></header>
    <form id="def-query-form" class="def-query"><input id="def-query" type="search" dir="auto" maxlength="2000" placeholder="Un mot, une expression\u2026 \u05E9\u05B8\u05C1\u05DC\u05D5\u05B9\u05DD" aria-label="Mot ou expression \xE0 d\xE9finir" required><select id="def-language" aria-label="Langue des r\xE9sultats"><option value="fr">Fran\xE7ais</option><option value="en">English</option><option value="he">\u05E2\u05D1\u05E8\u05D9\u05EA</option><option value="mg">Malagasy</option><option value="de">Deutsch</option><option value="es">Espa\xF1ol</option><option value="ar">\u0627\u0644\u0639\u0631\u0628\u064A\u0629</option><option value="el">\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC</option></select><button class="primary" type="submit">D\xE9finir \u2197</button><button id="def-speak" type="button" aria-label="\xC9couter le texte">\xC9couter \u266A</button></form>
    <nav class="def-subnav" aria-label="D\xE9finition"><button type="button" data-def-view="lookup" aria-pressed="true">Rechercher</button><button type="button" data-def-view="sources" aria-pressed="false">Mes sources</button><button type="button" data-def-view="history" aria-pressed="false">Historique</button><button type="button" data-def-view="collections" aria-pressed="false">Collections</button><button type="button" data-def-view="settings" aria-pressed="false">R\xE9glages</button></nav>
    <p id="def-status" class="def-status" role="status" aria-live="polite"></p>
    <div id="def-lookup" data-def-content="lookup"><div id="def-sourcebar" class="def-sourcebar" aria-label="Sources de d\xE9finition"></div><article class="def-result"><header class="def-result-head"><h3 id="def-result-title">Choisissez votre source.</h3><div class="def-row"><button id="def-open-source" type="button" disabled>Onglet avec CSS \u2197</button><button id="def-save-result" type="button" disabled>\uFF0B Garder</button></div></header><p id="def-selected-url" hidden></p><div id="def-result-body"><div class="def-empty">Saisissez un mot et cliquez sur <strong>D\xE9finir</strong>.<br>Les sites en ligne s\u2019ouvrent \xE0 votre demande.<br>Vos dictionnaires locaux restent disponibles sans connexion.</div></div></article><p class="def-caption">Les sites peuvent demander une connexion ou refuser les cadres. \xAB Onglet avec CSS \xBB ouvre la source en conservant votre style.</p></div>
    <div data-def-content="sources" hidden><div class="def-toolbar"><button id="def-new-source" type="button" class="primary">\uFF0B Nouvelle source</button><button id="def-import-sources" type="button">Importer Definer / JSON</button><button id="def-export-sources" type="button">Exporter mes sources</button><button id="def-import-dictionary" type="button">Dictionnaire local</button><input id="def-source-file" type="file" accept=".json,application/json" hidden><input id="def-dictionary-file" type="file" accept=".json,.csv,.tsv" hidden></div><p id="def-import-review" class="def-review" hidden></p><div class="def-grid"><div id="def-source-list" class="def-source-list" aria-label="Mes sources"></div><form id="def-source-form" class="def-card"><h3>Une source, votre style.</h3><input id="def-source-id" type="hidden"><label>Nom<input id="def-source-name" maxlength="120" required></label><label>Type<select id="def-source-type"><option value="custom">Site web</option><option value="custom-audio">Audio par URL</option><option value="local">Dictionnaire local</option></select></label><label id="def-url-label">Adresse avec variable<textarea id="def-source-url" rows="2" spellcheck="false" placeholder="https://www.pealim.com/search/?q={str}"></textarea></label><label id="def-dictionary-label" hidden>Dictionnaire<select id="def-source-dictionary"></select></label><label>CSS personnalis\xE9<textarea id="def-source-css" rows="13" spellcheck="false" placeholder="body { background: var(--v-ground-base); color: var(--v-text-base); }"></textarea></label><p class="def-caption">URL : <code>{str}</code>, <code>{lang}</code> ou Liquid <code>{{ str | url_encode }}</code>. CSS appliqu\xE9 \xE0 la source ; variables de th\xE8me Definer disponibles.</p><label><input id="def-source-enabled" type="checkbox" checked> Source activ\xE9e</label><div class="def-source-tools"><button type="submit" class="primary">Enregistrer</button><button id="def-preview-source" type="button">Enregistrer et essayer</button><button id="def-source-export" type="button">Exporter Definer</button><button id="def-source-up" type="button" aria-label="Monter la source">\u2191</button><button id="def-source-down" type="button" aria-label="Descendre la source">\u2193</button><button id="def-source-delete" type="button">Supprimer</button></div><details><summary>R\xE9glages import\xE9s et compatibilit\xE9</summary><p class="def-caption">Sources web, CSS, audio par URL et mod\xE8les Liquid sont ex\xE9cut\xE9s. Les routines s\u2019activent s\xE9par\xE9ment par source ; les scripts tournent dans un environnement isol\xE9. Les recettes et les sources IA sont configurables dans l\u2019atelier. Les services propri\xE9taires Lum sont remplac\xE9s par des sources ind\xE9pendantes. Les filtres Liquid inconnus produisent une erreur explicite.</p><pre id="def-source-extra" class="def-caption"></pre></details></form></div></div>
    <div data-def-content="history" hidden><div class="def-card"><h3>Les mots de vos lectures.</h3><div class="def-row"><input id="def-history-filter" type="search" placeholder="Retrouver un mot\u2026" aria-label="Filtrer l\u2019historique"><button id="def-history-clear" type="button">Vider l\u2019historique</button></div><div id="def-history-list"></div></div></div>
    <div data-def-content="collections" hidden><div class="def-card"><h3>\xC0 garder, \xE0 apprendre.</h3><form id="def-collection-new" class="def-row"><input id="def-collection-name" placeholder="Nom d\u2019une collection" aria-label="Nouvelle collection" required><button type="submit">Cr\xE9er</button></form><div class="def-toolbar"><select id="def-collection-select" aria-label="Collection"></select><select id="def-collection-format" aria-label="Format d\u2019export"><option value="json">JSON</option><option value="csv">CSV</option><option value="markdown">Markdown</option><option value="anki">Anki \xB7 TSV</option></select><button id="def-collection-export" type="button">Exporter</button><button id="def-collection-review" type="button">Cartes m\xE9moire</button><button id="def-collection-delete" type="button">Supprimer la collection</button></div><p id="def-flashcard" class="def-review" hidden></p><div id="def-collection-entries"></div></div></div>
    <div data-def-content="settings" hidden><div class="def-card def-settings-box"><h3>\xC0 votre mesure.</h3><label><input id="def-selection-enabled" type="checkbox"> Bouton D\xE9finition lors d\u2019une s\xE9lection sur les pages</label><label><input id="def-doubleclick" type="checkbox"> D\xE9finir aussi par double-clic</label><p class="def-caption">Raccourci : Alt+D sur une s\xE9lection. Le menu contextuel \xAB D\xE9finition \xBB est toujours disponible. Autorisez BaibolintsikaVerse sur vos sites dans les r\xE9glages du navigateur.</p><div class="def-options"><label>Th\xE8me des sources<select id="def-theme"><option value="system">Automatique</option><option value="light">Clair</option><option value="dark">Sombre</option></select></label><label>Taille du texte<input id="def-font-size" type="number" min="12" max="36" value="17"></label><label>Police<input id="def-font" placeholder="SBL Hebrew (par d\xE9faut)"></label><label>Couleur principale<input id="def-primary" type="color" value="#5265c7"></label></div><label><input id="def-ignore-niqqud" type="checkbox" checked> Dictionnaires locaux : chercher avec ou sans niqqud</label><label><input id="def-history-enabled" type="checkbox" checked> Conserver l\u2019historique local (500 recherches)</label><div class="def-toolbar"><button id="def-settings-save" type="button" class="primary">Enregistrer les r\xE9glages</button><button id="def-backup" type="button">Sauvegarder tout</button><button id="def-restore" type="button">Restaurer une sauvegarde</button></div><p class="def-caption">Biblioth\xE8que PDF/EPUB, routines, scripts isol\xE9s, IA, Anki et OCR local sont accessibles dans les onglets de D\xE9finition. Les formats de dictionnaires suppl\xE9mentaires disposent de leur import d\xE9di\xE9. Les services de compte et abonnements Definer ne sont pas utilis\xE9s.</p></div></div>
    <dialog id="def-entry-dialog" class="def-card"><form id="def-entry-form"><h3>Garder ce mot.</h3><input id="def-entry-id" type="hidden"><label>Collection<select id="def-entry-collection"></select></label><label>Mot ou expression<input id="def-entry-text" dir="auto" required></label><label>D\xE9finition / verso<textarea id="def-entry-definition" rows="5" dir="auto"></textarea></label><label>Mes notes<textarea id="def-entry-note" rows="3" dir="auto"></textarea></label><label>\xC9tiquettes, s\xE9par\xE9es par une virgule<input id="def-entry-tags"></label><div class="def-row"><button type="submit" class="primary">Garder</button><button id="def-entry-cancel" type="button">Annuler</button></div></form></dialog>`;
  const $ = (id) => document.getElementById("def-" + id);
  const scriptOption = document.createElement("option");
  scriptOption.value = "script";
  scriptOption.textContent = "Script JavaScript isol\xE9";
  $("source-type").append(scriptOption);
  const codeLabel = document.createElement("label");
  codeLabel.id = "def-code-label";
  codeLabel.textContent = "JavaScript";
  const codeInput = document.createElement("textarea");
  codeInput.id = "def-source-code";
  codeInput.rows = 14;
  codeInput.spellcheck = false;
  codeInput.placeholder = "definer.output.setHtml('<h2></h2>'); document.querySelector('h2').textContent = definer.lookup.query;";
  codeLabel.append(codeInput);
  $("url-label").after(codeLabel);
  const routinesDetails = document.createElement("details");
  routinesDetails.innerHTML = '<summary>Routines de cette source</summary><p class="def-caption">Actions locales dans la page source : extraction, attente, saisie, clic, d\xE9filement, retrait, blocage d\u2019\xE9l\xE9ments et boucles. Les \xE9tapes JavaScript utilisent un document isol\xE9.</p><label><input id="def-routines-enabled" type="checkbox"> Ex\xE9cuter les routines de cette source</label><label>Routines JSON<textarea id="def-source-routines" rows="10" spellcheck="false"></textarea></label>';
  $("source-css").parentElement.after(routinesDetails);
  const scheduledOption = document.createElement("option");
  scheduledOption.value = "scheduled";
  scheduledOption.textContent = "Clair / sombre selon l\u2019heure";
  $("theme").append(scheduledOption);
  const readingSettings = document.createElement("div");
  readingSettings.innerHTML = '<div class="def-options"><label>Ouvrir la s\xE9lection<select id="def-open-mode"><option value="tab">Dans un onglet</option><option value="window">Dans une fen\xEAtre flottante</option></select></label><label>Largeur de la fen\xEAtre<input id="def-window-width" type="number" min="360" max="1600" value="620"></label><label>Hauteur de la fen\xEAtre<input id="def-window-height" type="number" min="400" max="1200" value="760"></label><label>Langues des r\xE9sultats, dans l\u2019ordre<input id="def-languages" value="fr, en, he, mg" placeholder="fr, en, he, mg"></label><label>Mode sombre \xE0 partir de (heure)<input id="def-dark-start" type="number" min="0" max="23" value="20"></label><label>Retour au mode clair (heure)<input id="def-dark-end" type="number" min="0" max="23" value="7"></label></div><label>Sites exclus du bouton automatique, un domaine par ligne<textarea id="def-blocked-sites" rows="3" placeholder="exemple.org\n*.exemple.net"></textarea></label>';
  $("settings-save").parentElement.before(readingSettings);
  const networkLabel = document.createElement("label");
  networkLabel.id = "def-network-label";
  networkLabel.textContent = "Origines r\xE9seau autoris\xE9es pour ce script, s\xE9par\xE9es par une virgule";
  const networkInput = document.createElement("input");
  networkInput.id = "def-script-origins";
  networkInput.placeholder = "https://fr.wikipedia.org, https://api.example.org";
  networkLabel.append(networkInput);
  codeLabel.after(networkLabel);
  const routineButton = document.createElement("button");
  routineButton.type = "button";
  routineButton.textContent = "Ex\xE9cuter les routines";
  routineButton.hidden = true;
  $("open-source").before(routineButton);
  let state, ready, activeSourceId = "pealim", lookupContext = {}, resolved, frame, lastEntry, editBase, activeLookupSource, restore = false, serial = 0, currentCollection, flashIndex = 0, flashBack = false, scriptHost;
  const liveDOMRequests = /* @__PURE__ */ new Map();
  const status = (message = "", error = false) => {
    $("status").textContent = message;
    $("status").classList.toggle("error", error);
  };
  const run = (fn) => async (event) => {
    try {
      await fn(event);
    } catch (error) {
      status(error.message, true);
    }
  };
  const button = (label, action) => {
    const node = document.createElement("button");
    node.type = "button";
    node.textContent = label;
    node.onclick = run(action);
    return node;
  };
  const windowButton = button("Fen\xEAtre \u2197", () => browser.tabs.create({ url: browser.runtime.getURL("reader.html") + "?" + new URLSearchParams($("query").value.trim() ? { definition: $("query").value, definitionSource: activeSourceId } : { definitionPanel: "1" }) }));
  $("query-form").append(windowButton);
  const catalogue = document.createElement("select");
  catalogue.setAttribute("aria-label", "Catalogue de sources");
  const presets = [["wikidata", "Wikidata"], ["open-images", "Images \xB7 Wikimedia Commons"], ["wiktionary-pronunciation", "Prononciation \xB7 Wiktionary"], ["web-speech", "Synth\xE8se vocale"], ["ai", "Intelligence artificielle"], ["wikipedia", "Wikipedia"], ["wiktionary", "Wiktionary"], ["google-translate", "Google Traduction"], ["youglish", "YouGlish"]];
  for (const [value, label] of presets) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    catalogue.append(option);
  }
  const addPreset = button("Ajouter du catalogue", async () => {
    await initialize();
    const source = C.normalizeSource({ type: catalogue.value, name: catalogue.selectedOptions[0].textContent, options: {} });
    state = C.upsertSource(state, source);
    await save();
    renderSourceEditor(source.id);
    status("Source ajout\xE9e.");
  });
  $("new-source").after(catalogue, addPreset);
  const dataTypes = ["searchTerms", "websiteContent", "browsingActivity"];
  const firefox = !!((_c = (_b = (_a = browser.runtime).getManifest) == null ? void 0 : _b.call(_a).browser_specific_settings) == null ? void 0 : _c.gecko);
  const onlineButton = button("Activer les sources en ligne", async () => {
  });
  onlineButton.hidden = true;
  $("status").after(onlineButton);
  async function onlineAllowed() {
    if (!firefox) return true;
    try {
      const permissions = await browser.permissions.getAll();
      if (Array.isArray(permissions.data_collection)) return dataTypes.every((type) => permissions.data_collection.includes(type));
    } catch {
    }
    return state.settings.firefoxOnlineConsent === true;
  }
  onlineButton.onclick = () => {
    var _a2;
    let requested;
    try {
      requested = (_a2 = browser.permissions) == null ? void 0 : _a2.request({ data_collection: dataTypes });
    } catch {
    }
    void (async () => {
      try {
        let supported = false, accepted = false;
        try {
          if (requested) {
            accepted = await requested;
            supported = true;
          }
        } catch {
        }
        if (!supported) accepted = confirm("Les sources en ligne re\xE7oivent le mot ou l\u2019expression recherch\xE9e. Vos mod\xE8les personnalis\xE9s peuvent aussi envoyer le contexte et l\u2019adresse de la page. Les dictionnaires locaux restent hors ligne. Activer les sources en ligne ?");
        if (!accepted) {
          status("Les dictionnaires locaux restent disponibles. Sources en ligne d\xE9sactiv\xE9es.");
          return;
        }
        state.settings.firefoxOnlineConsent = true;
        await save();
        onlineButton.hidden = true;
        await lookup();
      } catch (error) {
        status(error.message, true);
      }
    })();
  };
  function textNode(tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text || "";
    if (className) node.className = className;
    return node;
  }
  async function send(message) {
    const result = await browser.runtime.sendMessage(message);
    if (!(result == null ? void 0 : result.ok)) throw Error((result == null ? void 0 : result.error) || "Le navigateur n\u2019a pas r\xE9pondu.");
    return result.value;
  }
  async function save() {
    if (!await BVSettings.set({ definitionState: state })) status("Sauvegarde indisponible : exportez vos donn\xE9es avant de fermer cette fen\xEAtre.", true);
  }
  function showView(name) {
    panel.querySelectorAll("[data-def-content]").forEach((node) => {
      node.hidden = node.dataset.defContent !== name;
    });
    panel.querySelectorAll("[data-def-view]").forEach((node) => node.setAttribute("aria-pressed", String(node.dataset.defView === name)));
    if (name === "history") renderHistory();
    if (name === "collections") renderCollections();
  }
  panel.querySelectorAll("[data-def-view]").forEach((node) => {
    node.onclick = run(async () => {
      await initialize();
      showView(node.dataset.defView);
    });
  });
  function dark() {
    var _a2, _b2;
    if (state.settings.theme === "scheduled") {
      const hour = (/* @__PURE__ */ new Date()).getHours(), start = Number((_a2 = state.settings.darkStart) != null ? _a2 : 20), end = Number((_b2 = state.settings.darkEnd) != null ? _b2 : 7);
      return start > end ? hour >= start || hour < end : hour >= start && hour < end;
    }
    return state.settings.theme === "dark" || state.settings.theme === "system" && matchMedia("(prefers-color-scheme:dark)").matches;
  }
  function themeVariables() {
    const isDark = dark(), palette = { primary: state.settings.primary || "#5265c7", secondary: isDark ? "#3c4657" : "#e9edf8", accent: "#9382de", error: "#d95872", warning: "#bf9136", info: "#619bd3", success: "#4b9b83", ground: isDark ? "#2b3038" : "#ffffff", text: isDark ? "#f0f1f5" : "#27334b", ptext: isDark ? "#b8c3ff" : "#485fa3", contrast: "#ffffff", anchor: isDark ? "#a5caff" : "#345aaf" };
    const vars = {};
    const rgb = (hex) => [1, 3, 5].map((at) => parseInt(hex.slice(at, at + 2), 16));
    for (const [name, color] of Object.entries(palette)) {
      const channels = rgb(color);
      vars["--v-" + name + "-base"] = color;
      vars["--" + name + "-rgb"] = channels.join(", ");
      vars["--v-" + name + "-rgb"] = channels.join(", ");
      for (const [variant, count, target] of [["lighten", 5, 255], ["darken", 4, 0]]) for (let n = 1; n <= count; n++) {
        const adjusted = channels.map((value) => Math.round(value + (target - value) * n * 0.12));
        vars["--v-" + name + "-" + variant + n] = "rgb(" + adjusted.join(", ") + ")";
        vars["--" + name + "-" + variant + n + "-rgb"] = adjusted.join(", ");
      }
    }
    Object.assign(vars, { "--v-border-base": isDark ? "#586176" : "#d5dcea", "--v-border-darken1": isDark ? "#626e88" : "#bdc7dc", "--v-border-darken2": "#8c98b4", "--v-highlight-base": palette.secondary, "--font-family": state.settings.fontFamily || '"SBL Hebrew", -apple-system, BlinkMacSystemFont, sans-serif', "--font-size": Math.max(12, Math.min(36, Number(state.settings.fontSize) || 17)) + "px", "--font-weight": "400", "--border-radius": "10px", "--toolbar-height": "48px" });
    for (const corner of ["top-left", "top-right", "bottom-left", "bottom-right"]) vars["--border-" + corner + "-radius"] = "10px";
    for (const corner of ["left-top", "right-top", "right-bottom", "left-bottom"]) vars["--border-radius-" + corner] = "10px";
    return vars;
  }
  function sourceRoutines(source) {
    var _a2, _b2;
    return (source == null ? void 0 : source.routines) || ((_b2 = (_a2 = source == null ? void 0 : source._definer) == null ? void 0 : _a2.wrapper) == null ? void 0 : _b2.routines) || [];
  }
  function sourceConfig() {
    var _a2;
    const source = activeLookupSource || state.sources.find((item) => item.id === resolved.sourceId);
    return { id: resolved.sourceId, sourceUrl: resolved.url, css: resolved.css, themeVariables: themeVariables(), routinesEnabled: ((_a2 = source == null ? void 0 : source.options) == null ? void 0 : _a2.routinesEnabled) === true, routines: sourceRoutines(source), variables: resolved.variables, fontCSS: hebrewFontCSS };
  }
  function configureFrame() {
    if ((frame == null ? void 0 : frame.contentWindow) && (resolved == null ? void 0 : resolved.url)) frame.contentWindow.postMessage({ type: "bv-definition:configure", config: sourceConfig() }, new URL(resolved.url).origin);
  }
  function createScript(container, config) {
    var _a2;
    const entryForScript = lastEntry;
    const source = config.source || state.sources.find((item) => item.id === activeSourceId);
    const allowedOrigins = ((_a2 = source == null ? void 0 : source.options) == null ? void 0 : _a2.allowedOrigins) || [];
    const fetchBroker = BVDefinitionAutomation.createFetchBroker({ allowedOrigins, fetch: async (url, init) => {
      const response = await send({ type: "definition:request", request: { url, method: init.method, headers: init.headers, body: init.body, redirect: "error" } });
      const value = new Response(response.body, { status: response.status, headers: response.headers });
      Object.defineProperty(value, "url", { value: response.url });
      return value;
    } });
    const host = BVDefinitionAutomation.createScriptHost(container, {
      frameURL: browser.runtime.getURL("definition-script.html"),
      config: { ...config, theme: { variables: themeVariables() } },
      fetchBroker,
      onResult: (value) => {
        if (lastEntry === entryForScript) {
          lastEntry.sourceData = value;
          void persistLastResult();
        }
      },
      onRequest: async (method, args) => {
        if (["dom:query", "dom:mutate"].includes(method) && config.liveDOM && (frame == null ? void 0 : frame.contentWindow) && (resolved == null ? void 0 : resolved.url)) return new Promise((resolve, reject) => {
          const requestId = crypto.randomUUID(), timeout = setTimeout(() => {
            liveDOMRequests.delete(requestId);
            reject(Error("La page source n\u2019a pas r\xE9pondu."));
          }, 1e4);
          liveDOMRequests.set(requestId, { resolve, reject, timeout });
          frame.contentWindow.postMessage({ type: "bv-definition:dom-request", requestId, method, args }, new URL(resolved.url).origin);
        });
        if (method === "action:copyText") {
          await navigator.clipboard.writeText(String(args.text));
          return true;
        }
        if (method === "action:openUrl") {
          await browser.tabs.create({ url: C.safeURL(args.url), active: args.active !== false });
          return true;
        }
        if (["action:getSelection", "action:replaceText", "action:cut"].includes(method)) {
          const token = new URLSearchParams(location.search).get("selectionToken");
          if (!token) {
            if (method === "action:getSelection") return { text: (lastEntry == null ? void 0 : lastEntry.text) || "", editable: false };
            throw Error("Cette recherche n\u2019est pas li\xE9e \xE0 une s\xE9lection modifiable.");
          }
          if (method === "action:cut") {
            const selection = await send({ type: "definition:selection", token, action: "get" });
            if (!selection.editable) throw Error("Cette s\xE9lection est en lecture seule.");
            await navigator.clipboard.writeText(selection.text);
            return send({ type: "definition:selection", token, action: "cut" });
          }
          return send({ type: "definition:selection", token, action: method === "action:getSelection" ? "get" : "replace", ...method === "action:replaceText" ? { text: String(args.text) } : {} });
        }
        if (method === "lookup:language") {
          if (!Array.from($("language").options).some((option) => option.value === args.language)) throw Error("Langue indisponible.");
          $("language").value = args.language;
          await lookup();
          return true;
        }
        throw Error("Cette action exige une s\xE9lection modifiable encore ouverte dans la page d\u2019origine.");
      }
    });
    return host;
  }
  async function runRoutineScript(event) {
    const target = event.source, origin = event.origin, data = event.data;
    const container = document.createElement("div");
    container.hidden = true;
    panel.append(container);
    let host;
    try {
      host = createScript(container, { code: data.code, html: data.html, variables: data.variables, result: data.data || {}, liveDOM: true, source: activeLookupSource || state.sources.find((item) => item.id === resolved.sourceId) });
      const done = await host.completion;
      target.postMessage({ type: "bv-definition:routine-script-response", executionId: data.executionId, ok: true, value: done.value }, origin);
    } catch (error) {
      target.postMessage({ type: "bv-definition:routine-script-response", executionId: data.executionId, ok: false, error: error.message }, origin);
    } finally {
      host == null ? void 0 : host.dispose();
      container.remove();
    }
  }
  window.addEventListener("message", (event) => {
    var _a2, _b2, _c2, _d, _e, _f, _g, _h;
    if (!frame || event.source !== frame.contentWindow || !(resolved == null ? void 0 : resolved.url) || event.origin !== new URL(resolved.url).origin) return;
    if (((_a2 = event.data) == null ? void 0 : _a2.type) === "bv-definition:source-ready") configureFrame();
    if (((_b2 = event.data) == null ? void 0 : _b2.type) === "bv-definition:dom-response") {
      const pending = liveDOMRequests.get(event.data.requestId);
      if (pending) {
        clearTimeout(pending.timeout);
        liveDOMRequests.delete(event.data.requestId);
        event.data.ok ? pending.resolve(event.data.value) : pending.reject(Error(event.data.error || "Action refus\xE9e par la source."));
      }
    }
    if (((_c2 = event.data) == null ? void 0 : _c2.type) === "bv-definition:source-applied") status("Source affich\xE9e \xB7 CSS personnalis\xE9 appliqu\xE9.");
    if (((_d = event.data) == null ? void 0 : _d.type) === "bv-definition:source-error") status("Le style n\u2019a pas pu \xEAtre appliqu\xE9. Autorisez l\u2019extension sur ce site ou utilisez \xAB Onglet avec CSS \xBB.", true);
    if (((_e = event.data) == null ? void 0 : _e.type) === "bv-definition:source-extracted") {
      if (lastEntry) {
        lastEntry.sourceData = event.data.data;
        lastEntry.definition = Object.values(event.data.data || {}).map((value) => typeof value === "string" ? value : JSON.stringify(value)).join("\n");
        void persistLastResult();
      }
      status("Donn\xE9es de la source extraites.");
    }
    if (((_f = event.data) == null ? void 0 : _f.type) === "bv-definition:routine-error") status(event.data.error || "La routine a \xE9chou\xE9.", true);
    if (((_g = event.data) == null ? void 0 : _g.type) === "bv-definition:routines-complete") status("Routines termin\xE9es.");
    if (((_h = event.data) == null ? void 0 : _h.type) === "bv-definition:routine-script-request") void runRoutineScript(event);
  });
  routineButton.onclick = () => {
    if ((frame == null ? void 0 : frame.contentWindow) && (resolved == null ? void 0 : resolved.url)) frame.contentWindow.postMessage({ type: "bv-definition:run-routines" }, new URL(resolved.url).origin);
  };
  matchMedia("(prefers-color-scheme:dark)").addEventListener("change", () => {
    if (state) configureFrame();
  });
  async function initialize() {
    if (ready) return ready;
    ready = (async () => {
      var _a2, _b2;
      const stored = await BVSettings.get({ definitionState: null, definitionEnabled: false, definitionDoubleClick: false, definitionOpenMode: "tab", definitionWindowWidth: 620, definitionWindowHeight: 760, definitionBlockedSites: [] });
      state = stored.definitionState ? C.normalizeState(stored.definitionState) : C.createState();
      if (!stored.definitionState) {
        const response = await fetch("definition-assets/pealim.css");
        if (!response.ok) throw Error("Le style Pealim est introuvable.");
        const pealim = state.sources.find((source) => source.id === "pealim");
        pealim.options.css = await response.text();
        pealim.options.url = "https://www.pealim.com/search/?q={str}";
        state.sources = [pealim, ...state.sources.filter((source) => source.id !== "pealim")];
        state = C.createCollection(state, "Mes mots");
        await save();
      }
      if (!hebrewFontCSS) {
        const font = await fetch(browser.runtime.getURL("definition-assets/SBL_Hbrw.ttf"));
        if (!font.ok) throw Error("Police SBL Hebrew introuvable.");
        const bytes = new Uint8Array(await font.arrayBuffer());
        let binary = "";
        for (let i = 0; i < bytes.length; i += 32768) binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
        hebrewFontCSS = '@font-face{font-family:"SBL Hebrew";src:url("data:font/ttf;base64,' + btoa(binary) + '") format("truetype");font-weight:100 900;font-display:swap;unicode-range:U+0590-05FF,U+FB1D-FB4F}';
      }
      $("language").value = state.settings.language || "fr";
      $("selection-enabled").checked = stored.definitionEnabled;
      $("doubleclick").checked = stored.definitionDoubleClick;
      $("theme").value = state.settings.theme;
      $("font-size").value = state.settings.fontSize;
      $("font").value = state.settings.fontFamily;
      $("primary").value = state.settings.primary || "#5265c7";
      $("ignore-niqqud").checked = state.settings.stripHebrewMarks !== false;
      $("history-enabled").checked = state.settings.historyEnabled !== false;
      $("open-mode").value = stored.definitionOpenMode;
      $("window-width").value = stored.definitionWindowWidth;
      $("window-height").value = stored.definitionWindowHeight;
      $("blocked-sites").value = (stored.definitionBlockedSites || []).join("\n");
      $("languages").value = (state.settings.languages || ["fr", "en", "he", "mg"]).join(", ");
      $("dark-start").value = (_a2 = state.settings.darkStart) != null ? _a2 : 20;
      $("dark-end").value = (_b2 = state.settings.darkEnd) != null ? _b2 : 7;
      renderLanguages();
      renderSources();
      renderSourceEditor(activeSourceId);
      renderCollections();
      document.dispatchEvent(new CustomEvent("bv-definition-ready"));
    })().catch((error) => {
      ready = null;
      throw error;
    });
    return ready;
  }
  function renderLanguages() {
    const selected = $("language").value || state.settings.language || "fr", codes = state.settings.languages || ["fr", "en", "he", "mg"];
    for (const code of codes) if (!Array.from($("language").options).some((option) => option.value === code)) {
      const option = document.createElement("option");
      option.value = code;
      try {
        option.textContent = new Intl.DisplayNames(["fr"], { type: "language" }).of(code);
      } catch {
        option.textContent = code;
      }
      $("language").append(option);
    }
    for (const code of [...codes].reverse()) {
      const option = Array.from($("language").options).find((option2) => option2.value === code);
      if (option) $("language").prepend(option);
    }
    $("language").value = selected;
  }
  function renderSources() {
    $("sourcebar").replaceChildren();
    $("source-list").replaceChildren();
    for (const source of state.sources) {
      if (source.enabled) {
        const node2 = button(source.name, () => lookup(source.id));
        node2.setAttribute("aria-pressed", String(source.id === activeSourceId));
        $("sourcebar").append(node2);
      }
      const node = button((source.enabled ? "" : "\u25CB ") + source.name, () => renderSourceEditor(source.id));
      node.setAttribute("aria-pressed", String(source.id === $("source-id").value));
      $("source-list").append(node);
    }
  }
  function renderSourceEditor(id) {
    const source = state.sources.find((source2) => source2.id === id) || C.normalizeSource({ name: "", options: {} });
    $("source-id").value = source.id;
    $("source-name").value = id ? source.name : "";
    $("source-url").value = source.options.url || "";
    $("source-css").value = source.options.css || "";
    $("source-enabled").checked = source.enabled;
    const known = ["custom", "custom-audio", "local", "script"].includes(source.type);
    $("source-type").value = source.type === "offline-dictionary" ? "local" : known ? source.type : "custom";
    $("source-type").disabled = !known;
    $("source-code").value = source.options.code || "";
    $("routines-enabled").checked = source.options.routinesEnabled === true;
    $("source-routines").value = JSON.stringify(sourceRoutines(source), null, 2);
    $("script-origins").value = (source.options.allowedOrigins || []).join(", ");
    $("source-dictionary").replaceChildren(...state.dictionaries.map((dictionary) => {
      const option = document.createElement("option");
      option.value = dictionary.id;
      option.textContent = dictionary.name;
      return option;
    }));
    $("source-dictionary").value = source.options.dictionaryId || "";
    $("source-extra").textContent = C.compatibilityWarnings([source]).join("\n") || "Source compatible avec les fonctions web/CSS de D\xE9finition.";
    $("source-delete").disabled = !id;
    $("source-export").disabled = !id;
    updateSourceType();
    renderSources();
  }
  function updateSourceType() {
    const local = $("source-type").value === "local", script = $("source-type").value === "script";
    $("url-label").hidden = local || script;
    $("dictionary-label").hidden = !local;
    $("code-label").hidden = !script;
    $("network-label").hidden = !script;
    routinesDetails.hidden = local || script;
  }
  $("source-type").onchange = updateSourceType;
  async function saveSource() {
    const existing = state.sources.find((source2) => source2.id === $("source-id").value);
    const routines = JSON.parse($("source-routines").value || "[]");
    if (!Array.isArray(routines) || routines.length > 1e3) throw Error("La liste des routines JSON est invalide.");
    const allowedOrigins = $("script-origins").value.split(",").map((item) => item.trim()).filter(Boolean).map((value) => new URL(C.safeURL(value)).origin);
    const source = C.normalizeSource({ ...existing || {}, id: $("source-id").value, name: $("source-name").value.trim(), type: existing && $("source-type").disabled ? existing.type : $("source-type").value, enabled: $("source-enabled").checked, routines, options: { ...existing == null ? void 0 : existing.options, url: $("source-url").value.trim(), css: $("source-css").value, dictionaryId: $("source-dictionary").value, code: $("source-code").value, routinesEnabled: $("routines-enabled").checked, allowedOrigins } });
    if (!$("source-name").value.trim()) throw Error("Donnez un nom \xE0 cette source.");
    if (["custom", "custom-audio"].includes(source.type)) await C.resolveSource({ ...source, enabled: true }, $("query").value || "\u05E9\u05B8\u05C1\u05DC\u05D5\u05B9\u05DD", { lang: $("language").value });
    if (["local", "offline-dictionary"].includes(source.type) && !state.dictionaries.some((dictionary) => dictionary.id === source.options.dictionaryId)) throw Error("Importez et choisissez un dictionnaire local.");
    state = C.upsertSource(state, source);
    activeSourceId = source.id;
    await save();
    if ((resolved == null ? void 0 : resolved.sourceId) === source.id) {
      activeLookupSource = source;
      resolved.css = source.options.css;
      configureFrame();
    }
    renderSourceEditor(source.id);
    status("Source enregistr\xE9e.");
    return source;
  }
  $("source-form").onsubmit = run(async (event) => {
    event.preventDefault();
    await saveSource();
  });
  $("new-source").onclick = run(async () => {
    await initialize();
    renderSourceEditor();
    $("source-name").focus();
  });
  $("preview-source").onclick = run(async () => {
    const source = await saveSource();
    if (!$("query").value.trim()) $("query").value = "test";
    showView("lookup");
    await lookup(source.id);
  });
  $("source-delete").onclick = run(async () => {
    var _a2;
    const id = $("source-id").value;
    const source = state.sources.find((item) => item.id === id);
    if (!source || !confirm("Supprimer la source \xAB " + source.name + " \xBB ?")) return;
    state = C.removeSource(state, id);
    await save();
    renderSourceEditor((_a2 = state.sources[0]) == null ? void 0 : _a2.id);
    status("Source supprim\xE9e.");
  });
  for (const [control, direction] of [["source-up", -1], ["source-down", 1]]) $(control).onclick = run(async () => {
    const order = state.sources.map((source) => source.id), index = order.indexOf($("source-id").value), next = index + direction;
    if (index < 0 || next < 0 || next >= order.length) return;
    [order[index], order[next]] = [order[next], order[index]];
    state = C.reorderSources(state, order);
    await save();
    renderSources();
  });
  let hebrewFontCSS = "";
  const pealimStyles = /* @__PURE__ */ new Map();
  async function showPealimPage(url, current, source, hash = "") {
    var _a2;
    const target = new URL(C.safeURL(url));
    if (target.hostname !== "www.pealim.com" && target.hostname !== "pealim.com") throw Error("Adresse Pealim attendue.");
    status("Chargement de Pealim\u2026");
    const response = await send({ type: "definition:request", request: { url: target.href, maxBytes: 4 * 1024 * 1024 } });
    if (current !== serial) return;
    if (!response.ok) throw Error("Pealim est indisponible (" + response.status + "). Ouvrez \xAB Onglet avec CSS \xBB.");
    const base = new URL(C.safeURL(response.url));
    if (base.hostname !== "www.pealim.com" && base.hostname !== "pealim.com") throw Error("Redirection Pealim inattendue. Utilisez \xAB Onglet avec CSS \xBB.");
    if (((_a2 = response.headers) == null ? void 0 : _a2["content-type"]) && !response.headers["content-type"].includes("text/html")) throw Error("La r\xE9ponse Pealim n\u2019est pas une page HTML.");
    const doc = new DOMParser().parseFromString(response.body, "text/html");
    const css = [];
    for (const link of Array.from(doc.querySelectorAll('link[rel="stylesheet"][href]')).slice(0, 8)) {
      const address = new URL(link.getAttribute("href"), base);
      if (address.origin !== base.origin) continue;
      try {
        if (!pealimStyles.has(address.href)) {
          const style2 = await send({ type: "definition:request", request: { url: address.href, maxBytes: 1024 * 1024 } });
          if (style2.ok) {
            if (pealimStyles.size >= 8) pealimStyles.delete(pealimStyles.keys().next().value);
            pealimStyles.set(address.href, style2.body);
          }
        }
        css.push(pealimStyles.get(address.href) || "");
      } catch {
      }
    }
    if (current !== serial) return;
    doc.querySelectorAll("script,iframe,object,embed,form,input,button,textarea,select,base,meta,link,.modal").forEach((node) => node.remove());
    for (const element of doc.querySelectorAll("*")) {
      for (const attribute of [...element.attributes]) if (/^on/i.test(attribute.name) || ["srcdoc", "srcset", "ping", "action", "formaction", "autofocus"].includes(attribute.name)) element.removeAttribute(attribute.name);
      for (const name of ["src", "href", "xlink:href"]) if (element.hasAttribute(name)) {
        try {
          const address = new URL(element.getAttribute(name), base);
          if (!["https:", "http:"].includes(address.protocol) || address.username || address.password) element.removeAttribute(name);
          else element.setAttribute(name, address.href);
        } catch {
          element.removeAttribute(name);
        }
      }
      if (element.hasAttribute("src")) element.removeAttribute("src");
      if (element.matches("a[href]")) {
        element.dataset.drExternal = "true";
        element.rel = "noopener noreferrer";
      }
    }
    for (const original of doc.querySelectorAll("[data-audio]")) {
      try {
        const audio2 = new URL(C.safeURL(original.dataset.audio), base);
        if (audio2.hostname !== "audio.pealim.com") continue;
        const link = doc.createElement("a");
        link.href = audio2.href;
        link.dataset.drExternal = "true";
        link.textContent = original.textContent || "\u{1F50A}";
        link.title = "\xC9couter la prononciation";
        original.replaceWith(link);
      } catch {
      }
    }
    const theme = Object.entries(themeVariables()).map(([key, value]) => key + ":" + value).join(";");
    const style = doc.createElement("style");
    style.textContent = hebrewFontCSS + "\n" + css.join("\n") + "\n:root{" + theme + "}body{margin:12px!important;font-family:var(--font-family);font-size:var(--font-size)}.menukad,[lang^=he]{font-family:var(--font-family)!important}.container{width:100%!important;max-width:100%!important;padding:0!important}img{max-width:100%}\n" + (source.options.css || "");
    doc.head.append(style);
    frame = null;
    resolved.url = base.href;
    $("selected-url").textContent = base.href;
    $("result-body").replaceChildren();
    routineButton.hidden = true;
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.hidden = true;
    const content = BVDefinitionReader.createContentFrame($("result-body"), "<!doctype html>" + doc.documentElement.outerHTML, {
      title: source.name + " \u2014 lecture int\xE9gr\xE9e",
      hash: hash || target.hash,
      onReady: () => {
        if (current === serial) status("Pealim affich\xE9 \xB7 CSS personnalis\xE9 appliqu\xE9.");
      },
      onSelection: (selected) => {
        if (current === serial) {
          $("query").value = selected;
        }
      },
      onLink: async ({ href }) => {
        if (current !== serial) return;
        const address = new URL(C.safeURL(href));
        if (address.hostname === "audio.pealim.com" && /\.(mp3|ogg|wav)(?:$|\?)/i.test(address.href)) {
          const result = await send({ type: "definition:request", request: { url: address.href, responseType: "base64", maxBytes: 8 * 1024 * 1024 } });
          if (current !== serial) return;
          if (!result.ok) throw Error("Prononciation indisponible.");
          audio.src = "data:audio/mpeg;base64," + result.body;
          audio.hidden = false;
          audio.scrollIntoView({ block: "nearest" });
          try {
            await audio.play();
          } catch {
            status("Cliquez sur Lecture pour \xE9couter la prononciation.");
          }
          return;
        }
        if (["www.pealim.com", "pealim.com"].includes(address.hostname)) {
          const next = ++serial;
          await showPealimPage(address.href, next, source, address.hash);
        } else await browser.tabs.create({ url: address.href, active: true });
      }
    });
    $("result-body").append(audio);
    if (lastEntry) {
      lastEntry.definition = Array.from(doc.querySelectorAll(".verb-search-meaning,.vf-search-meaning")).map((node) => node.textContent.trim()).filter((value, index, values) => values.indexOf(value) === index).join("\n");
      await persistLastResult();
    }
    return content;
  }
  async function lookup(id = activeSourceId, sourceSnapshot) {
    var _a2, _b2, _c2, _d, _e;
    await initialize();
    const text = $("query").value.trim();
    if (!text) {
      $("query").focus();
      return;
    }
    const current = ++serial, source = sourceSnapshot || state.sources.find((source2) => source2.id === id && source2.enabled) || state.sources.find((source2) => source2.enabled);
    if (!source) throw Error("Ajoutez ou activez une source dans Mes sources.");
    if (source.type !== "local" && !await onlineAllowed()) {
      activeSourceId = source.id;
      onlineButton.hidden = false;
      status("Les sources web envoient la recherche au site choisi. Activez-les ici ; les dictionnaires locaux restent hors ligne.");
      return;
    }
    activeSourceId = source.id;
    activeLookupSource = source;
    status("Ouverture de " + source.name + "\u2026");
    const value = source.type === "script" ? { sourceId: source.id, type: "script", code: source.options.code || "", css: source.options.css || "", variables: C.buildLookupContext(text, { ...lookupContext, lang: $("language").value, langs: state.settings.languages || ["fr", "en", "he", "mg"] }) } : await C.resolveSource(source, text, { ...lookupContext, lang: $("language").value, langs: state.settings.languages || ["fr", "en", "he", "mg"] });
    if (current !== serial) return;
    scriptHost == null ? void 0 : scriptHost.dispose();
    scriptHost = null;
    resolved = value;
    frame = null;
    $("result-body").replaceChildren();
    $("result-title").textContent = source.name;
    $("open-source").disabled = !resolved.url;
    $("save-result").disabled = false;
    $("selected-url").hidden = !resolved.url;
    $("selected-url").textContent = resolved.url || "";
    renderSources();
    lastEntry = { text, sourceId: source.id, sourceName: source.name, url: resolved.url || "", context: lookupContext, definition: "", sourceSnapshot: JSON.parse(JSON.stringify(source)) };
    routineButton.hidden = !resolved.url || !source.options.routinesEnabled || !sourceRoutines(source).length;
    if (resolved.type === "ai") {
      showView("study");
      status("Choisissez votre fournisseur et votre t\xE2che dans l\u2019atelier IA.");
    } else if (resolved.type === "speech") {
      const voices = document.createElement("select");
      voices.setAttribute("aria-label", "Voix");
      const fill = () => {
        voices.replaceChildren(...speechSynthesis.getVoices().map((voice, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = voice.name + " \xB7 " + voice.lang;
          return option;
        }));
      };
      fill();
      speechSynthesis.onvoiceschanged = fill;
      const rate = document.createElement("input");
      rate.type = "range";
      rate.min = ".5";
      rate.max = "2";
      rate.step = ".1";
      rate.value = "1";
      rate.setAttribute("aria-label", "Vitesse");
      const body = document.createElement("div");
      body.className = "def-results-local";
      body.append(textNode("h4", text), voices, rate, button("\xC9couter", () => {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speechSynthesis.getVoices()[Number(voices.value)];
        utterance.rate = Number(rate.value);
        speechSynthesis.speak(utterance);
      }), button("Arr\xEAter", () => speechSynthesis.cancel()));
      $("result-body").append(body);
      status("Choisissez une voix disponible sur cet appareil.");
    } else if (resolved.type === "pronunciation") {
      const response = await send({ type: "definition:request", request: { url: resolved.apiURL } });
      if (!response.ok) throw Error("La prononciation est indisponible (" + response.status + ").");
      const parsed = JSON.parse(response.body);
      const doc = new DOMParser().parseFromString(((_b2 = (_a2 = parsed.parse) == null ? void 0 : _a2.text) == null ? void 0 : _b2["*"]) || "", "text/html");
      const urls = [...new Set(Array.from(doc.querySelectorAll("audio source")).map((node) => node.getAttribute("src")).filter(Boolean).map((url) => C.safeURL(url.startsWith("//") ? "https:" + url : url)))];
      if (current !== serial) return;
      const body = document.createElement("div");
      body.className = "def-results-local";
      for (const url of urls) {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = url;
        body.append(audio);
      }
      const link = document.createElement("a");
      link.href = resolved.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Prononciations et attributions sur Wiktionary \u2197";
      body.append(link);
      $("result-body").append(body);
      status(urls.length ? urls.length + " enregistrement(s) disponible(s)." : "Aucun enregistrement pour ce mot dans cette \xE9dition.");
    } else if (resolved.type === "script") {
      scriptHost = createScript($("result-body"), { code: value.code, variables: value.variables, source, result: {} });
      scriptHost.completion.then((done) => {
        if (current !== serial) return;
        lastEntry.sourceData = done.result;
        void persistLastResult();
        status("Script ex\xE9cut\xE9 dans son document isol\xE9.");
      }).catch((error) => {
        if (current === serial) status(error.message, true);
      });
    } else if (resolved.type === "local") {
      const dictionary = state.dictionaries.find((item) => item.id === resolved.dictionaryId);
      const matches = C.searchDictionary(dictionary, text, { stripHebrewMarks: state.settings.stripHebrewMarks, mode: "contains", limit: 100 });
      const body = document.createElement("div");
      body.className = "def-results-local";
      for (const entry of matches) {
        const item = document.createElement("section");
        item.append(textNode("h4", entry.term));
        if (entry.html) item.append(dictionaryFrame(entry, dictionary));
        else item.append(textNode("p", entry.definition));
        item.dir = "auto";
        body.append(item);
      }
      if (!matches.length) body.append(textNode("p", "Aucune entr\xE9e dans ce dictionnaire."));
      $("result-body").append(body);
      lastEntry.definition = matches.map((entry) => entry.definition).join("\n\n");
      status(matches.length + " entr\xE9e(s) locale(s).");
    } else if (resolved.type === "custom-audio") {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = resolved.url;
      audio.className = "def-audio";
      $("result-body").append(audio);
      status("Source audio pr\xEAte.");
    } else if (new URL(resolved.url).hostname === "translate.google.com") {
      const card = textNode("div", "", "def-results-local");
      card.append(textNode("h4", "Google Traduction dans sa fen\xEAtre"), textNode("p", "Google refuse son affichage dans un cadre int\xE9gr\xE9. La traduction s\u2019ouvre directement sur son site, avec votre texte et la langue choisis."), button("Ouvrir Google Traduction", () => send({ type: "definition:source-tab", display: "window", config: sourceConfig() })));
      $("result-body").append(card);
      await send({ type: "definition:source-tab", display: "window", config: sourceConfig() });
      status("Google Traduction ouvert dans sa fen\xEAtre.");
    } else if (["www.pealim.com", "pealim.com"].includes(new URL(resolved.url).hostname)) {
      await showPealimPage(resolved.url, current, source);
    } else {
      let policy = { enabled: false };
      try {
        const tab = await ((_d = (_c2 = browser.tabs) == null ? void 0 : _c2.getCurrent) == null ? void 0 : _d.call(_c2));
        if ((tab == null ? void 0 : tab.id) !== void 0) policy = await send({ type: "definition:frame-policy", tabId: tab.id, url: resolved.url });
      } catch {
      }
      if (current !== serial) return;
      frame = document.createElement("iframe");
      frame.title = source.name + " \u2014 r\xE9sultat";
      frame.referrerPolicy = "no-referrer";
      frame.sandbox = "allow-scripts allow-same-origin allow-forms allow-popups";
      frame.allow = "autoplay";
      frame.src = resolved.url;
      frame.onload = configureFrame;
      $("result-body").append(frame);
      status(policy.enabled ? "Source en cours de chargement. Le style sera appliqu\xE9 si le site est autoris\xE9." : "Si la source reste vide, ouvrez \xAB Onglet avec CSS \xBB. Safari demande l\u2019autorisation pour appliquer votre style.");
    }
    state = C.recordLookup(state, lastEntry);
    await save();
    if ((_e = value.warnings) == null ? void 0 : _e.length) status(value.warnings.join(" "));
  }
  async function persistLastResult() {
    try {
      if (!lastEntry || state.settings.historyEnabled === false) return;
      state.history = state.history.map((entry) => entry.text === lastEntry.text && entry.sourceId === lastEntry.sourceId ? { ...entry, definition: lastEntry.definition, sourceData: lastEntry.sourceData, sourceSnapshot: lastEntry.sourceSnapshot } : entry);
      await save();
    } catch (error) {
      status(error.message, true);
    }
  }
  $("query-form").onsubmit = run(async (event) => {
    event.preventDefault();
    showView("lookup");
    await lookup();
  });
  $("language").onchange = run(async () => {
    await initialize();
    state.settings.language = $("language").value;
    await save();
    if (resolved) await lookup();
  });
  $("open-source").onclick = run(async () => {
    if (resolved == null ? void 0 : resolved.url) await send({ type: "definition:source-tab", config: sourceConfig() });
  });
  $("speak").onclick = run(async () => {
    const text = $("query").value.trim();
    if (!text) return;
    speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = /[\u0590-\u05ff]/.test(text) ? "he-IL" : $("language").value;
    speechSynthesis.speak(speech);
  });
  function download(name, contents, mime = "application/json") {
    const blob = new Blob([contents], { type: mime }), url = URL.createObjectURL(blob), anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  function dictionaryFrame(entry, dictionary) {
    var _a2, _b2;
    const doc = new DOMParser().parseFromString(entry.html, "text/html");
    for (const node of doc.querySelectorAll("script,iframe,frame,object,embed,form,input,button,base,meta,link")) node.remove();
    const resources = dictionary.resources || {}, byName = new Map(Object.entries(resources).map(([name, value]) => [name.replace(/\\/g, "/").replace(/^\/+/, "").toLowerCase(), value]));
    const resourceURL = (path) => {
      const found = byName.get(String(path).replace(/\\/g, "/").replace(/^\/+/, "").toLowerCase());
      return found ? "data:" + (found.mime || "application/octet-stream") + ";base64," + found.data : "";
    };
    for (const node of doc.querySelectorAll("*")) for (const attr of Array.from(node.attributes)) {
      if (/^on/i.test(attr.name) || ["srcdoc", "formaction", "srcset"].includes(attr.name)) node.removeAttribute(attr.name);
      if (["src", "poster"].includes(attr.name)) {
        const url = resourceURL(attr.value);
        if (url) node.setAttribute(attr.name, url);
        else node.removeAttribute(attr.name);
      }
      if (attr.name === "href" && /^javascript:|^data:|^file:/i.test(attr.value)) node.removeAttribute(attr.name);
    }
    const meta = doc.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = "default-src 'none';style-src 'unsafe-inline';img-src data:;media-src data:;font-src data:;script-src 'none';base-uri 'none';form-action 'none'";
    doc.head.prepend(meta);
    const style = doc.createElement("style");
    style.textContent = hebrewFontCSS + ":root{" + Object.entries(themeVariables()).map(([key, value]) => key + ":" + value).join(";") + "}body{font:var(--font-size)/1.7 var(--font-family);color:var(--v-text-base);background:var(--v-ground-base);margin:12px;overflow-wrap:anywhere}a{color:var(--v-anchor-base)}img{max-width:100%}" + (dictionary.css || "") + (((_a2 = state.sources.find((source) => source.id === activeSourceId)) == null ? void 0 : _a2.options.css) || "");
    doc.head.append(style);
    const holder = document.createElement("div");
    if ((_b2 = globalThis.BVDefinitionReader) == null ? void 0 : _b2.createContentFrame) BVDefinitionReader.createContentFrame(holder, "<!doctype html>" + doc.documentElement.outerHTML, { title: entry.term + " \xB7 dictionnaire local", onLink: ({ href }) => {
      if (href.startsWith("#")) return;
      if (/^https?:/i.test(href)) void browser.tabs.create({ url: C.safeURL(href) });
      else {
        const text = decodeURIComponent(href.replace(/^(?:bword|entry|dict):\/?\/?/i, ""));
        $("query").value = text;
        void lookup();
      }
    }, onSelection: (text) => {
      $("query").value = text.slice(0, 2e3);
    } });
    else holder.append(textNode("p", entry.definition));
    return holder;
  }
  $("export-sources").onclick = run(async () => {
    await initialize();
    download("definition-sources.json", C.exportSettings(state, { format: "definer", allSources: true }));
  });
  $("source-export").onclick = run(async () => download("definition-source.json", C.exportSettings(state, { format: "definer", sourceIds: [$("source-id").value] })));
  $("import-sources").onclick = () => {
    restore = false;
    $("source-file").click();
  };
  $("restore").onclick = () => {
    restore = true;
    $("source-file").click();
  };
  $("source-file").onchange = run(async () => {
    var _a2, _b2;
    const file = $("source-file").files[0];
    if (!file) return;
    if (file.size > C.limits.maxImportBytes) throw Error("Fichier trop volumineux (20 Mio maximum).");
    await initialize();
    const documentText = await file.text(), document2 = JSON.parse(documentText);
    if (restore && document2.schema !== "baibolintsika-definition") throw Error("Choisissez une sauvegarde D\xE9finition. Pour un export Definer, utilisez Mes sources \u2192 Importer.");
    if (restore && !confirm("Remplacer les sources, l\u2019historique et les collections par cette sauvegarde ?")) return;
    state = C.importSettings(documentText, { baseState: state });
    await save();
    renderSources();
    renderSourceEditor((_a2 = state.sources.at(-1)) == null ? void 0 : _a2.id);
    renderCollections();
    const warnings = ((_b2 = state.compatibility.lastImport) == null ? void 0 : _b2.warnings) || [];
    $("import-review").hidden = !warnings.length;
    $("import-review").textContent = warnings.join(" ");
    status(restore ? "Sauvegarde restaur\xE9e." : "Sources import\xE9es.");
    $("source-file").value = "";
    showView("sources");
  });
  $("import-dictionary").onclick = () => $("dictionary-file").click();
  $("dictionary-file").onchange = run(async () => {
    const file = $("dictionary-file").files[0];
    if (!file) return;
    if (file.size > C.limits.maxImportBytes) throw Error("Dictionnaire trop volumineux (20 Mio maximum).");
    await initialize();
    const format = file.name.split(".").at(-1).toLowerCase(), dictionary = C.parseDictionary(await file.text(), format, { name: file.name });
    state = C.addDictionary(state, dictionary);
    const source = C.normalizeSource({ type: "local", name: file.name, options: { dictionaryId: dictionary.id } });
    state = C.upsertSource(state, source);
    await save();
    renderSourceEditor(source.id);
    status(dictionary.entries.length + " entr\xE9es import\xE9es, consultables hors ligne.");
    $("dictionary-file").value = "";
  });
  function showSavedResult(entry) {
    showView("lookup");
    ++serial;
    scriptHost == null ? void 0 : scriptHost.dispose();
    frame = null;
    resolved = null;
    activeLookupSource = null;
    lastEntry = entry;
    $("query").value = entry.text;
    $("result-title").textContent = entry.sourceName + " \xB7 r\xE9sultat enregistr\xE9";
    $("result-body").replaceChildren(textNode("p", entry.definition || JSON.stringify(entry.sourceData || {}, null, 2), "def-results-local"));
    $("selected-url").hidden = true;
    $("open-source").disabled = true;
    $("save-result").disabled = false;
    routineButton.hidden = true;
    if (entry.sourceSnapshot) $("result-body").append(button("Ex\xE9cuter la source enregistr\xE9e", async () => {
      lookupContext = entry.context || {};
      await lookup(entry.sourceId, entry.sourceSnapshot);
    }));
  }
  function renderHistory() {
    if (!state) return;
    const needle = C.normalizeSearch($("history-filter").value);
    $("history-list").replaceChildren();
    const entries = state.history.filter((entry) => C.normalizeSearch(entry.text).includes(needle));
    if (!entries.length) $("history-list").append(textNode("p", "Les recherches appara\xEEtront ici.", "def-caption"));
    for (const entry of entries) {
      const node = document.createElement("section");
      node.className = "def-entry";
      node.append(textNode("h4", entry.text), textNode("small", entry.sourceName + " \xB7 " + new Date(entry.createdAt).toLocaleString()));
      const tools = document.createElement("div");
      tools.className = "def-row";
      tools.append(button("Rechercher", async () => {
        $("query").value = entry.text;
        lookupContext = entry.context || {};
        showView("lookup");
        await lookup(entry.sourceId);
      }), button("R\xE9sultat enregistr\xE9", () => showSavedResult(entry)), button("Garder", () => editEntry(entry)), button("Retirer", async () => {
        state = C.removeHistoryEntry(state, entry.id);
        await save();
        renderHistory();
      }));
      node.append(tools);
      $("history-list").append(node);
    }
  }
  $("history-filter").oninput = renderHistory;
  $("history-clear").onclick = run(async () => {
    if (!confirm("Vider uniquement l\u2019historique D\xE9finition ?")) return;
    state = C.clearHistory(state);
    await save();
    renderHistory();
  });
  function fillCollections(select) {
    select.replaceChildren(...state.collections.map((collection) => {
      const option = document.createElement("option");
      option.value = collection.id;
      option.textContent = collection.name + " (" + collection.entries.length + ")";
      return option;
    }));
  }
  function renderCollections() {
    if (!state) return;
    fillCollections($("collection-select"));
    if (state.collections.some((collection2) => collection2.id === currentCollection)) $("collection-select").value = currentCollection;
    currentCollection = $("collection-select").value;
    const collection = state.collections.find((item) => item.id === currentCollection);
    $("collection-entries").replaceChildren();
    $("flashcard").hidden = true;
    for (const name of ["collection-export", "collection-review", "collection-delete"]) $(name).disabled = !collection;
    if (!collection || !collection.entries.length) {
      $("collection-entries").append(textNode("p", "Gardez un r\xE9sultat pour commencer votre collection.", "def-caption"));
      return;
    }
    for (const entry of collection.entries) {
      const node = document.createElement("section");
      node.className = "def-entry";
      node.dir = "auto";
      node.append(textNode("h4", entry.text), textNode("p", entry.definition), textNode("p", entry.note), textNode("small", entry.tags.join(" \xB7 ")));
      const tools = document.createElement("div");
      tools.className = "def-row";
      tools.append(button("R\xE9sultat enregistr\xE9", () => showSavedResult(entry)), button("Modifier", () => editEntry(entry, collection.id)), button("Copier", () => navigator.clipboard.writeText([entry.text, entry.definition, entry.note].filter(Boolean).join("\n\n"))), button("Retirer", async () => {
        if (!confirm("Retirer ce mot de la collection ?")) return;
        state = C.removeCollectionEntry(state, collection.id, entry.id);
        await save();
        renderCollections();
      }));
      node.append(tools);
      $("collection-entries").append(node);
    }
  }
  $("collection-new").onsubmit = run(async (event) => {
    event.preventDefault();
    state = C.createCollection(state, $("collection-name").value.trim());
    currentCollection = state.collections.at(-1).id;
    $("collection-name").value = "";
    await save();
    renderCollections();
  });
  $("collection-select").onchange = () => {
    currentCollection = $("collection-select").value;
    renderCollections();
  };
  $("collection-export").onclick = run(async () => {
    const collection = state.collections.find((item) => item.id === currentCollection);
    if (!collection) return;
    const format = $("collection-format").value, ext = { markdown: "md", anki: "tsv", json: "json", csv: "csv" }[format];
    download("definition-collection." + ext, C.exportEntries(collection.entries, format), format === "json" ? "application/json" : "text/plain;charset=utf-8");
  });
  $("collection-delete").onclick = run(async () => {
    const collection = state.collections.find((item) => item.id === currentCollection);
    if (!collection || !confirm("Supprimer d\xE9finitivement \xAB " + collection.name + " \xBB et ses fiches ?")) return;
    state = C.removeCollection(state, currentCollection);
    await save();
    renderCollections();
  });
  function flashcard() {
    var _a2;
    const entries = ((_a2 = state.collections.find((item) => item.id === currentCollection)) == null ? void 0 : _a2.entries) || [];
    if (!entries.length) return;
    const entry = entries[flashIndex % entries.length];
    $("flashcard").hidden = false;
    $("flashcard").replaceChildren(textNode("h3", flashBack ? entry.definition || entry.note || "Aucun verso." : entry.text), textNode("p", flashIndex % entries.length + 1 + " / " + entries.length));
    $("flashcard").append(button(flashBack ? "Carte suivante \u2192" : "Voir le verso", () => {
      if (flashBack) flashIndex++;
      flashBack = !flashBack;
      flashcard();
    }));
  }
  $("collection-review").onclick = () => {
    flashIndex = 0;
    flashBack = false;
    flashcard();
  };
  async function editEntry(entry, collectionId) {
    if (!state.collections.length) {
      state = C.createCollection(state, "Mes mots");
      await save();
    }
    editBase = { ...entry };
    fillCollections($("entry-collection"));
    $("entry-collection").value = collectionId || currentCollection || state.collections[0].id;
    $("entry-id").value = collectionId ? entry.id : "";
    $("entry-text").value = entry.text || "";
    $("entry-definition").value = entry.definition || "";
    $("entry-note").value = entry.note || "";
    $("entry-tags").value = (entry.tags || []).join(", ");
    $("entry-dialog").showModal();
  }
  $("save-result").onclick = run(() => editEntry(lastEntry));
  $("entry-cancel").onclick = () => $("entry-dialog").close();
  $("entry-form").onsubmit = run(async (event) => {
    event.preventDefault();
    const entry = { ...editBase, id: $("entry-id").value || void 0, text: $("entry-text").value, definition: $("entry-definition").value, note: $("entry-note").value, tags: $("entry-tags").value.split(",").map((tag) => tag.trim()).filter(Boolean) };
    currentCollection = $("entry-collection").value;
    state = C.upsertCollectionEntry(state, currentCollection, entry);
    await save();
    $("entry-dialog").close();
    renderCollections();
    status("Mot gard\xE9 dans votre collection.");
  });
  $("settings-save").onclick = run(async () => {
    const languages = [...new Set($("languages").value.split(",").map((value) => value.trim()).filter(Boolean))];
    if (!languages.length || languages.some((code) => !/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(code))) throw Error("Saisissez des codes de langue comme fr, en, he, mg.");
    const blockedSites = $("blocked-sites").value.split(/\s+/).map((value) => value.trim().toLowerCase()).filter(Boolean);
    if (blockedSites.some((value) => !/^\*?\.?[a-z0-9.-]+(?::\d+)?$/.test(value))) throw Error("Sites exclus : utilisez un domaine comme exemple.org ou *.exemple.org.");
    state.settings = { ...state.settings, theme: $("theme").value, fontFamily: $("font").value, fontSize: Math.max(12, Math.min(36, Number($("font-size").value) || 17)), primary: $("primary").value, stripHebrewMarks: $("ignore-niqqud").checked, historyEnabled: $("history-enabled").checked, languages, darkStart: Math.max(0, Math.min(23, Number($("dark-start").value) || 0)), darkEnd: Math.max(0, Math.min(23, Number($("dark-end").value) || 0)) };
    await save();
    await BVSettings.set({ definitionEnabled: $("selection-enabled").checked, definitionDoubleClick: $("doubleclick").checked, definitionOpenMode: $("open-mode").value, definitionWindowWidth: Number($("window-width").value) || 620, definitionWindowHeight: Number($("window-height").value) || 760, definitionBlockedSites: blockedSites });
    renderLanguages();
    configureFrame();
    scriptHost == null ? void 0 : scriptHost.updateTheme(themeVariables());
    status("R\xE9glages enregistr\xE9s.");
  });
  setInterval(() => {
    if ((state == null ? void 0 : state.settings.theme) === "scheduled") {
      configureFrame();
      scriptHost == null ? void 0 : scriptHost.updateTheme(themeVariables());
    }
  }, 6e4);
  $("backup").onclick = run(async () => {
    await initialize();
    download("baibolintsika-definition-sauvegarde.json", C.exportSettings(state));
  });
  document.addEventListener("bv-module", run(async (event) => {
    if (event.detail === "definition") await initialize();
  }));
  const params = new URLSearchParams(location.search);
  globalThis.BVDefinitionIntegration = {
    ready: initialize,
    hebrewFontCSS: () => hebrewFontCSS,
    getState: () => state,
    setState: (next) => {
      state = C.normalizeState(next);
    },
    save,
    context: () => C.buildLookupContext($("query").value.trim(), { ...lookupContext, lang: $("language").value, langs: state.settings.languages || ["fr", "en", "he", "mg"] }),
    currentResult: () => lastEntry,
    send,
    status,
    onlineAllowed,
    lookup: async (text, context = {}) => {
      await initialize();
      $("query").value = text;
      lookupContext = context;
      showView("lookup");
      BVLibrary.select("definition");
      await lookup();
    },
    refresh: () => {
      renderSources();
      renderCollections();
    },
    addView: (id, title, content) => {
      const tab = button(title, async () => {
        await initialize();
        showView(id);
      });
      tab.dataset.defView = id;
      tab.setAttribute("aria-pressed", "false");
      panel.querySelector(".def-subnav").append(tab);
      content.dataset.defContent = id;
      content.hidden = true;
      panel.append(content);
      return tab;
    }
  };
  if (params.has("definition") || params.has("definitionPanel")) void (async () => {
    try {
      await initialize();
      BVLibrary.select("definition");
      if (params.has("definitionSource")) activeSourceId = params.get("definitionSource");
      $("query").value = params.get("definition") || "";
      try {
        lookupContext = JSON.parse(params.get("definitionContext") || "{}");
      } catch {
        lookupContext = {};
      }
      if (params.has("selectionToken")) {
        try {
          lookupContext = { ...lookupContext, ...await send({ type: "definition:context", token: params.get("selectionToken") }) };
        } catch {
        }
      }
      if ($("query").value) await lookup();
    } catch (error) {
      status(error.message, true);
    }
  })();
})();
