(() => {
  "use strict";
  function mount() {
    const I = globalThis.BVDefinitionIntegration, C = globalThis.BVDefinitionCore;
    if (!I || !C || document.getElementById("def-dictionary-panel")) return;
    const section = document.createElement("div");
    section.id = "def-dictionary-panel";
    section.className = "def-card";
    section.innerHTML = `<h3>Vos dictionnaires, hors ligne.</h3><p>Importez un paquet Yomitan, StarDict, Lingvo DSL, MDict 2.0, Babylon BGL, Aard 2 ou ZIM. Les fichiers restent sur cet appareil.</p><label>Fichiers du paquet<input id="def-dict-files" type="file" multiple accept=".zip,.7z,.ifo,.idx,.gz,.dz,.dict,.syn,.dsl,.mdx,.mdd,.bgl,.slob,.zim,.json,.css"></label><label>Ou dossier complet<input id="def-dict-folder" type="file" webkitdirectory multiple></label><div class="def-toolbar"><button id="def-dict-import" class="primary" type="button">Importer le paquet</button><button id="def-dict-cancel" type="button" disabled>Annuler</button></div><p id="def-dict-status" role="status"></p><p class="def-caption">Conservez les noms des fichiers compagnons. ZIP et 7z non chiffr\xE9s, jusqu\u2019\xE0 256 Mio d\xE9compress\xE9s ; 100 000 entr\xE9es et 20 Mio apr\xE8s conversion JSON. Un paquet par import. Les corpus et leur autorisation d\u2019utilisation restent \xE0 votre charge.</p><div id="def-dict-list"></div>`;
    I.addView("dictionaries", "Dictionnaires", section);
    const $ = (name) => section.querySelector("#def-dict-" + name);
    let worker, rejectImport;
    function render() {
      $("list").replaceChildren();
      const state = I.getState();
      if (!state) return;
      for (const dictionary of state.dictionaries) {
        const line = document.createElement("section");
        line.className = "def-entry";
        const title = document.createElement("h4");
        title.textContent = dictionary.name;
        const info = document.createElement("p");
        info.textContent = dictionary.format + " \xB7 " + dictionary.entries.length + " entr\xE9es";
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Retirer ce dictionnaire";
        remove.onclick = async () => {
          if (!confirm("Retirer le dictionnaire \xAB " + dictionary.name + " \xBB ? Ses fichiers d\u2019origine ne seront pas modifi\xE9s.")) return;
          const next = I.getState();
          next.dictionaries = next.dictionaries.filter((item) => item.id !== dictionary.id);
          next.sources = next.sources.filter((source) => source.options.dictionaryId !== dictionary.id);
          I.setState(next);
          await I.save();
          I.refresh();
          render();
        };
        line.append(title, info, remove);
        $("list").append(line);
      }
    }
    $("import").onclick = async () => {
      let timeout;
      try {
        await I.ready();
        const selected = Array.from($("folder").files.length ? $("folder").files : $("files").files);
        if (!selected.length) throw Error("Choisissez les fichiers d\u2019un dictionnaire.");
        if (selected.reduce((sum, file) => sum + file.size, 0) > 256 * 1024 * 1024) throw Error("Le paquet d\xE9passe 256 Mio.");
        $("import").disabled = true;
        $("cancel").disabled = false;
        $("status").textContent = "Lecture et indexation locales\u2026";
        const files = await Promise.all(selected.map(async (file) => ({ name: file.webkitRelativePath || file.name, bytes: await file.arrayBuffer() })));
        const result = await new Promise((resolve, reject) => {
          rejectImport = reject;
          worker = new Worker("definition-dictionary-worker.js", { type: "module" });
          timeout = setTimeout(() => {
            worker == null ? void 0 : worker.terminate();
            reject(Error("L\u2019import a d\xE9pass\xE9 cinq minutes. Essayez un paquet plus petit."));
          }, 3e5);
          worker.onmessage = (event) => event.data.ok ? resolve(event.data.value) : reject(Error(event.data.error));
          worker.onerror = (event) => reject(Error(event.message || "\xC9chec du moteur de dictionnaires."));
          worker.postMessage({ files, main: files.length === 1 ? files[0].name : null }, files.map((file) => file.bytes));
        });
        const parser = new DOMParser();
        for (const entry of result.entries) if (entry.html) entry.definition = parser.parseFromString(entry.html, "text/html").body.textContent || "";
        const dictionary = C.parseDictionary(JSON.stringify({ entries: result.entries }), "json", { name: result.name || selected[0].name });
        dictionary.format = result.format;
        dictionary.resources = result.resources || {};
        dictionary.css = "";
        for (const file of selected) if (file.name.toLowerCase().endsWith(".css")) dictionary.css += "\n" + await file.text();
        let state = C.addDictionary(I.getState(), dictionary);
        state = C.upsertSource(state, C.normalizeSource({ type: "local", name: dictionary.name, options: { dictionaryId: dictionary.id, css: dictionary.css } }));
        I.setState(state);
        await I.save();
        I.refresh();
        render();
        $("status").textContent = dictionary.entries.length + " entr\xE9es import\xE9es, disponibles hors ligne.";
      } catch (error) {
        $("status").textContent = error.message;
      } finally {
        clearTimeout(timeout);
        worker == null ? void 0 : worker.terminate();
        worker = null;
        rejectImport = null;
        $("import").disabled = false;
        $("cancel").disabled = true;
      }
    };
    $("cancel").onclick = () => {
      worker == null ? void 0 : worker.terminate();
      rejectImport == null ? void 0 : rejectImport(Error("Import annul\xE9."));
    };
    document.addEventListener("bv-definition-ready", render);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
