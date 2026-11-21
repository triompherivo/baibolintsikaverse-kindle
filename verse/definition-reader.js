(() => {
  "use strict";
  const I = globalThis.BVDefinitionIntegration;
  if (!I) return;
  const api = globalThis.browser || globalThis.chrome;
  const MAX = 64 * 1024 * 1024, MAX_EXPANDED = 128 * 1024 * 1024;
  const params = new URLSearchParams(location.search), standalone = params.has("definitionReader"), popup = location.pathname.endsWith("popup.html");
  const node = (tag, text, cls) => {
    const n = document.createElement(tag);
    if (text !== void 0) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  };
  const section = node("section", void 0, "def-reader");
  section.innerHTML = `<header class="def-reader-intro"><h3>Votre biblioth\xE8que \xB7 PDF & EPUB</h3><p>Importez vos livres pour les lire, retrouver votre place, d\xE9finir une s\xE9lection et garder vos annotations. Fichiers et notes restent sur cet appareil.</p></header><div class="def-toolbar"><button id="dr-import" type="button" class="primary">\uFF0B Importer PDF / EPUB</button><input id="dr-file" type="file" accept=".pdf,.epub,application/pdf,application/epub+zip" multiple hidden><button id="dr-library-toggle" type="button">Biblioth\xE8que</button></div><form id="dr-url-form" class="def-row"><input id="dr-url" type="url" placeholder="https://\u2026/livre.pdf ou livre.epub" aria-label="Adresse du livre" required><button type="submit">T\xE9l\xE9charger et conserver</button></form><p id="dr-status" role="status" aria-live="polite"></p><div id="dr-library" class="dr-library"></div><div id="dr-reader" hidden><header class="dr-book-head"><button id="dr-back" type="button">\u2190 Biblioth\xE8que</button><h3 id="dr-title" dir="auto"></h3><span id="dr-progress"></span><button id="dr-quick-define" type="button" disabled>D\xE9finition \u2197</button><button id="dr-search-toggle" type="button" aria-label="Chercher dans le livre" aria-expanded="false">\u2315</button><button id="dr-notes-toggle" type="button" aria-expanded="false" aria-controls="dr-notes-panel">Notes</button><button id="dr-fullscreen" type="button" aria-label="Plein \xE9cran">\u26F6</button></header><div class="dr-controls" role="toolbar" aria-label="Navigation du livre"><button id="dr-previous" type="button">\u2190 Pr\xE9c\xE9dent</button><label>Chapitre<input id="dr-page" type="number" min="1" value="1"></label><span id="dr-total"></span><button id="dr-next" type="button">Suivant \u2192</button><label id="dr-toc-label" hidden>Chapitre<select id="dr-toc"></select></label><button id="dr-smaller" type="button" aria-label="R\xE9duire le texte">A\u2212</button><button id="dr-larger" type="button" aria-label="Agrandir le texte">A+</button><select id="dr-theme" aria-label="Couleur des pages"><option value="system">Automatique</option><option value="light">Clair</option><option value="sepia">S\xE9pia</option><option value="dark">Nuit</option></select><details class="dr-more"><summary aria-label="Exports du livre">\u22EF</summary><button id="dr-original" type="button">Exporter l\u2019original</button><button id="dr-export-notes" type="button">Exporter les notes</button></details></div><div id="dr-search-wrap" hidden><form id="dr-search-form" class="def-row"><input id="dr-search" type="search" placeholder="Chercher dans le livre\u2026" aria-label="Chercher dans le livre"><button type="submit">Chercher</button></form><div id="dr-search-results" class="dr-search-results"></div></div><div class="dr-workspace"><div id="dr-surface" class="dr-surface" tabindex="0" aria-label="Lecture du livre"></div><aside class="dr-notes" id="dr-notes-panel"><h4>Votre s\xE9lection</h4><p id="dr-selected" dir="auto">S\xE9lectionnez du texte dans la page.</p><div class="def-row"><button id="dr-define" type="button" disabled>D\xE9finition \u2197</button><button id="dr-highlight" type="button" disabled>Surligner</button></div><label>Note personnelle<textarea id="dr-note" rows="4" dir="auto" placeholder="Votre r\xE9flexion\u2026"></textarea></label><button id="dr-save-note" type="button">Garder la note</button><h4>Rep\xE8res & notes</h4><div id="dr-annotations"></div></aside></div></div>`;
  const readerTab = I.addView("reader", "PDF / EPUB \u2197", section);
  if (popup) readerTab.onclick = () => api.tabs.create({ url: api.runtime.getURL("reader.html") + "?definitionReader=library" });
  if (standalone) {
    document.documentElement.classList.add("book-document");
    section.classList.add("dr-standalone");
  }
  const $ = (name) => section.querySelector("#dr-" + name), status = (s, error = false) => {
    $("status").textContent = s;
    $("status").classList.toggle("error", error);
  };
  const run = (fn) => async (event) => {
    try {
      await fn(event);
    } catch (error) {
      status(error.message, true);
    }
  };
  const button = (text, fn) => {
    const b = node("button", text);
    b.type = "button";
    b.onclick = run(fn);
    return b;
  };
  let libPromise, book, epub, page = 1, fontSize = 20, theme = "system", doubleClickDefine = false, epoch = 0, selection = null, epubFrame, openQueue = Promise.resolve();
  const contentFrames = /* @__PURE__ */ new Map();
  function createContentFrame(container, html, options = {}) {
    for (const [key, entry] of contentFrames) if (!entry.frame.isConnected) contentFrames.delete(key);
    const frame = node("iframe"), token = crypto.randomUUID();
    frame.title = options.title || "Lecture isol\xE9e";
    frame.sandbox = "allow-scripts";
    frame.className = options.className || "dr-epub-frame";
    const config = { token, html: String(html), annotations: options.annotations || [], scroll: Number(options.scroll) || 0, hash: options.hash || "", chapterNavigation: options.chapterNavigation === true, doubleClickDefine: options.doubleClickDefine === true };
    contentFrames.set(token, { frame, options });
    frame.onload = () => frame.contentWindow.postMessage({ type: "bv-reader:configure", config }, "*");
    frame.src = api.runtime.getURL("definition-reader-frame.html");
    container.append(frame);
    return frame;
  }
  window.addEventListener("message", (event) => {
    var _a, _b, _c, _d, _e, _f;
    const m = event.data;
    if ((m == null ? void 0 : m.type) !== "bv-reader" || typeof m.token !== "string") return;
    const entry = contentFrames.get(m.token);
    if (!entry) return;
    if (!entry.frame.isConnected) {
      contentFrames.delete(m.token);
      return;
    }
    if (event.source !== entry.frame.contentWindow) return;
    const o = entry.options;
    try {
      if (m.action === "selection" && typeof m.text === "string") (_a = o.onSelection) == null ? void 0 : _a.call(o, m.text.slice(0, 1e4), { anchor: m.anchor });
      if (m.action === "navigate") Promise.resolve((_b = o.onLink) == null ? void 0 : _b.call(o, { href: String(m.href || ""), path: String(m.path || ""), hash: String(m.hash || ""), external: String(m.external || "") })).catch((error) => status(error.message, true));
      if (m.action === "scroll" && Number.isFinite(m.scroll)) Promise.resolve((_c = o.onScroll) == null ? void 0 : _c.call(o, Math.max(0, m.scroll), { maxScroll: Math.max(0, Number(m.maxScroll) || 0) })).catch((error) => status(error.message, true));
      if (m.action === "ready") (_d = o.onReady) == null ? void 0 : _d.call(o);
      if (m.action === "define") (_e = o.onDefine) == null ? void 0 : _e.call(o);
      if (m.action === "chapter" && [-1, 1].includes(m.direction)) Promise.resolve((_f = o.onChapter) == null ? void 0 : _f.call(o, m.direction)).catch((error) => status(error.message, true));
    } catch (error) {
      status(error.message, true);
    }
  });
  const store = (mode, fn) => BVBookStore.transaction(mode, fn);
  async function persist() {
    if (book) {
      const id = book.id, ownEpoch = epoch, progress = structuredClone(book.progress);
      const saved = await BVBookStore.update(id, (item) => {
        item.progress = { ...item.progress, ...progress };
      });
      if ((book == null ? void 0 : book.id) === id && epoch === ownEpoch && saved) book = saved;
    }
  }
  const download = (name, data, mime2) => BVDownload.save(name, data, mime2);
  function libraries() {
    if (!libPromise) libPromise = (async () => {
      for (const file of ["vendor/readers/jszip.min.js"]) await new Promise((resolve, reject) => {
        const script = node("script");
        script.src = api.runtime.getURL(file);
        script.onload = resolve;
        script.onerror = () => reject(Error("Biblioth\xE8que de lecture introuvable."));
        document.head.append(script);
      });
    })();
    return libPromise;
  }
  const mime = (name) => ({ svg: "image/svg+xml", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", ttf: "font/ttf", otf: "font/otf", css: "text/css" })[name.split(".").pop().toLowerCase()] || "application/octet-stream";
  function archivePath(href, base = "") {
    const url = new URL(href, "https://epub.invalid/" + base);
    if (url.origin !== "https://epub.invalid") return null;
    const value = decodeURIComponent(url.pathname.slice(1));
    return value.includes("\0") ? null : value;
  }
  function boundedFile(zip, name) {
    var _a;
    const entry = zip.file(name);
    if (!entry) throw Error("Ressource EPUB absente : " + name);
    if (((_a = entry._data) == null ? void 0 : _a.uncompressedSize) > 16 * 1024 * 1024) throw Error("Ressource EPUB trop volumineuse.");
    return entry;
  }
  function parseXML(text) {
    const d = new DOMParser().parseFromString(text, "application/xml");
    if (d.querySelector("parsererror")) throw Error("Structure EPUB invalide.");
    return d;
  }
  async function openEPUB(bytes) {
    var _a, _b, _c, _d, _e;
    const zip = await JSZip.loadAsync(bytes), files = Object.values(zip.files);
    let total = 0;
    if (files.length > 1e4) throw Error("EPUB contenant trop de ressources.");
    for (const file of files) {
      total += ((_a = file._data) == null ? void 0 : _a.uncompressedSize) || 0;
      if (total > MAX_EXPANDED) throw Error("EPUB d\xE9compress\xE9 trop volumineux (128 Mio).");
    }
    if (zip.file("META-INF/encryption.xml")) throw Error("Ce livre contient des ressources chiffr\xE9es / DRM non prises en charge.");
    const container = parseXML(await boundedFile(zip, "META-INF/container.xml").async("string")), root = (_b = container.getElementsByTagNameNS("*", "rootfile")[0]) == null ? void 0 : _b.getAttribute("full-path");
    if (!root) throw Error("Le livre EPUB ne contient pas de package lisible.");
    const opf = parseXML(await boundedFile(zip, root).async("string")), manifest = /* @__PURE__ */ new Map();
    for (const item of opf.getElementsByTagNameNS("*", "item")) manifest.set(item.getAttribute("id"), { path: archivePath(item.getAttribute("href"), root), type: item.getAttribute("media-type"), properties: item.getAttribute("properties") || "" });
    const chapters = [];
    for (const ref of opf.getElementsByTagNameNS("*", "itemref")) {
      const item = manifest.get(ref.getAttribute("idref"));
      if (item && /xhtml|html/.test(item.type)) chapters.push(item);
    }
    if (!chapters.length) throw Error("Aucun chapitre EPUB lisible.");
    const title = ((_c = opf.getElementsByTagNameNS("*", "title")[0]) == null ? void 0 : _c.textContent) || book.name;
    const labels = /* @__PURE__ */ new Map();
    try {
      const nav = [...manifest.values()].find((item) => item.properties.split(/\s+/).includes("nav"));
      if (nav) {
        const doc = new DOMParser().parseFromString(await boundedFile(zip, nav.path).async("string"), "text/html");
        for (const a of doc.querySelectorAll("nav a[href]")) {
          const path = archivePath(a.getAttribute("href"), nav.path);
          if (path && !labels.has(path)) labels.set(path, a.textContent.trim());
        }
      }
      const ncx = [...manifest.values()].find((item) => item.type === "application/x-dtbncx+xml");
      if (ncx) {
        const doc = parseXML(await boundedFile(zip, ncx.path).async("string"));
        for (const point of doc.getElementsByTagNameNS("*", "navPoint")) {
          const href = (_d = point.getElementsByTagNameNS("*", "content")[0]) == null ? void 0 : _d.getAttribute("src"), label = (_e = point.getElementsByTagNameNS("*", "text")[0]) == null ? void 0 : _e.textContent.trim(), path = href && archivePath(href, ncx.path);
          if (path && label && !labels.has(path)) labels.set(path, label);
        }
      }
    } catch {
    }
    chapters.forEach((item, index) => item.title = labels.get(item.path) || "Chapitre " + (index + 1));
    const assets = /* @__PURE__ */ new Map();
    async function dataURL(name) {
      if (assets.has(name)) return assets.get(name);
      const promise = boundedFile(zip, name).async("base64").then((data) => "data:" + mime(name) + ";base64," + data);
      assets.set(name, promise);
      return promise;
    }
    async function cssText(text, base) {
      const matches = [...text.matchAll(/url\(\s*(["']?)([^)'"\s]+)\1\s*\)/gi)];
      for (const match of matches) {
        const name = archivePath(match[2], base);
        text = text.replace(match[0], name && zip.file(name) ? `url("${await dataURL(name)}")` : 'url("")');
      }
      return text.replace(/@import\s+[^;]+;/gi, "");
    }
    async function chapter(index) {
      var _a2, _b2;
      const item = chapters[index], raw = await boundedFile(zip, item.path).async("string"), doc = new DOMParser().parseFromString(raw, "text/html");
      item.title = labels.get(item.path) || ((_a2 = doc.querySelector("h1,h2,h3,title")) == null ? void 0 : _a2.textContent.trim()) || "Chapitre " + (index + 1);
      doc.querySelectorAll("script,iframe,object,embed,form,input,button,textarea,select,base,meta").forEach((n) => n.remove());
      for (const el of doc.querySelectorAll("*")) for (const a of [...el.attributes]) if (/^on/i.test(a.name) || a.name === "srcdoc") el.removeAttribute(a.name);
      for (const el of doc.querySelectorAll("[src]")) {
        const name = archivePath(el.getAttribute("src"), item.path);
        if (name && zip.file(name) && !el.matches("audio,video,source")) el.setAttribute("src", await dataURL(name));
        else el.removeAttribute("src");
      }
      for (const el of doc.querySelectorAll("[srcset]")) el.removeAttribute("srcset");
      for (const el of doc.querySelectorAll("link")) {
        const name = archivePath(el.getAttribute("href") || "", item.path);
        if (el.rel === "stylesheet" && name && zip.file(name)) {
          const style2 = doc.createElement("style");
          style2.textContent = await cssText(await boundedFile(zip, name).async("string"), name);
          el.replaceWith(style2);
        } else el.remove();
      }
      for (const el of doc.querySelectorAll("style")) el.textContent = await cssText(el.textContent, item.path);
      for (const el of doc.querySelectorAll("[style]")) el.setAttribute("style", await cssText(el.getAttribute("style"), item.path));
      for (const el of doc.querySelectorAll("a[href]")) {
        const raw2 = el.getAttribute("href");
        try {
          const resolved = new URL(raw2, "https://epub.invalid/" + item.path);
          if (resolved.origin === "https://epub.invalid") {
            el.dataset.drChapter = resolved.pathname.slice(1);
            el.dataset.drHash = resolved.hash;
            el.href = resolved.hash || "#";
          } else if (["http:", "https:"].includes(resolved.protocol)) {
            el.dataset.drExternal = resolved.href;
            el.href = "#";
          } else el.removeAttribute("href");
        } catch {
          el.removeAttribute("href");
        }
      }
      const policy = doc.createElement("meta");
      policy.httpEquiv = "Content-Security-Policy";
      policy.content = "default-src 'none'; img-src data:; style-src 'unsafe-inline'; font-src data:; media-src 'none'; base-uri 'none'; form-action 'none'; script-src 'none'";
      doc.head.prepend(policy);
      const style = doc.createElement("style");
      const colors = theme === "sepia" ? ["#f3ead8", "#3d352c"] : theme === "dark" ? ["#272c34", "#e8e8e6"] : ["#fbfaf7", "#252c35"];
      style.textContent = (((_b2 = I.hebrewFontCSS) == null ? void 0 : _b2.call(I)) || "") + `html{color-scheme:${theme === "dark" ? "dark" : "light"};background:${colors[0]}!important}body{font-family:"SBL Hebrew",Georgia,'Noto Serif Hebrew',serif;font-size:${fontSize}px!important;line-height:1.8!important;max-width:82ch!important;margin:0 auto!important;padding:32px clamp(18px,5vw,60px)!important;box-sizing:border-box;overflow-wrap:anywhere;color:${colors[1]}!important;background:${colors[0]}!important}img,svg{max-width:100%;height:auto}table{max-width:100%}mark[data-dr-note]{background:#ffe681;color:#283044}a{color:${theme === "dark" ? "#aacbff" : "#345aaf"}}${theme === "system" ? "@media(prefers-color-scheme:dark){html,body{color-scheme:dark;background:#272c34!important;color:#e8e8e6!important}a{color:#aacbff}}" : ""}`;
      doc.head.append(style);
      return "<!doctype html>" + doc.documentElement.outerHTML;
    }
    return { zip, chapters, title, chapter };
  }
  async function importBook(file, sourceURL = "", { open = true } = {}) {
    status("Import de " + file.name + "\u2026");
    const item = await BVBookStore.importFile(file, sourceURL);
    await renderLibrary();
    if (open) await openBook(item);
    return item;
  }
  async function renderLibrary() {
    const books = await store("readonly", (s) => s.getAll());
    $("library").replaceChildren();
    if (!books.length) $("library").append(node("p", "Votre biblioth\xE8que est vide. Importez un PDF ou un EPUB.", "def-caption"));
    for (const item of books.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt))) {
      const card = node("article", void 0, "dr-book");
      card.append(node("h4", item.name), node("small", `${item.type.toUpperCase()} \xB7 ${(item.bytes.byteLength / 1048576).toFixed(1)} Mio \xB7 reprise ${item.progress.page}`));
      const tools = node("div", void 0, "def-row");
      tools.append(button("Lire / reprendre", () => openBook(item)), button("Retirer", async () => {
        if (!confirm("Retirer ce livre et ses annotations de cette biblioth\xE8que ?")) return;
        await store("readwrite", (s) => s.delete(item.id));
        if ((book == null ? void 0 : book.id) === item.id) {
          epoch++;
          book = null;
          epub = null;
          $("surface").replaceChildren();
          $("reader").hidden = true;
        }
        await renderLibrary();
      }));
      card.append(tools);
      $("library").append(card);
    }
  }
  function bookURL(item) {
    return api.runtime.getURL(item.type === "pdf" ? "vendor/pdfjs/web/viewer.html" : "reader.html") + "?" + new URLSearchParams(item.type === "pdf" ? { book: item.id } : { definitionReader: item.id });
  }
  function openBook(item) {
    if (item.type === "pdf" || !standalone) {
      const url = bookURL(item);
      if (standalone) {
        location.assign(url);
        return Promise.resolve();
      }
      return api.tabs.create({ url, active: true });
    }
    openQueue = openQueue.catch(() => {
    }).then(() => performOpenBook(item));
    return openQueue;
  }
  async function performOpenBook(item) {
    var _a, _b, _c;
    if (standalone) history.replaceState(null, "", "?" + new URLSearchParams({ definitionReader: item.id }));
    epoch++;
    epub = null;
    book = structuredClone(item);
    selection = null;
    await libraries();
    page = Math.max(1, Number((_a = book.progress) == null ? void 0 : _a.page) || 1);
    fontSize = Number((_b = book.progress) == null ? void 0 : _b.fontSize) || 20;
    theme = ["system", "light", "sepia", "dark"].includes((_c = book.progress) == null ? void 0 : _c.theme) ? book.progress.theme : "system";
    $("theme").value = theme;
    status("Ouverture de " + book.name + "\u2026");
    $("reader").hidden = false;
    section.classList.add("dr-reading");
    $("library").hidden = true;
    $("title").textContent = book.name;
    const trigger = await BVSettings.get({ definitionEnabled: false, definitionDoubleClick: false });
    doubleClickDefine = trigger.definitionEnabled && trigger.definitionDoubleClick;
    epub = await openEPUB(book.bytes);
    $("title").textContent = epub.title;
    $("toc-label").hidden = false;
    await renderPage({ restoreScroll: true });
  }
  const count = () => (epub == null ? void 0 : epub.chapters.length) || 1;
  async function renderPage({ restoreScroll = false, hash = "" } = {}) {
    if (!book) return;
    const ticket = ++epoch;
    page = Math.min(count(), Math.max(1, page));
    selection = null;
    updateSelection();
    book.progress = { ...book.progress, page, fontSize, theme, ...!restoreScroll ? { scroll: 0 } : {} };
    await persist();
    if (ticket !== epoch) return;
    $("surface").replaceChildren();
    $("surface").scrollTop = 0;
    $("page").value = page;
    $("page").max = count();
    $("total").textContent = "/ " + count();
    $("previous").disabled = page === 1;
    $("next").disabled = page === count();
    const html = await epub.chapter(page - 1);
    if (ticket !== epoch) return;
    epubFrame = createContentFrame($("surface"), html, {
      title: epub.title + " \xB7 chapitre " + page,
      annotations: book.annotations.filter((a) => a.page === page),
      scroll: restoreScroll ? book.progress.scroll || 0 : 0,
      hash,
      onSelection: (text, { anchor }) => {
        if (ticket !== epoch) return;
        selection = { text, page, rects: [], anchor };
        updateSelection();
      },
      chapterNavigation: true,
      doubleClickDefine,
      onDefine: () => {
        $("define").click();
      },
      onScroll: async (scroll, { maxScroll }) => {
        if (book && epoch === ticket) {
          book.progress.scroll = scroll;
          book.progress.maxScroll = maxScroll;
          updateProgress(scroll, maxScroll);
          await persist();
        }
      },
      onChapter: async (direction) => {
        if (page + direction >= 1 && page + direction <= count()) {
          page += direction;
          await renderPage();
        }
      },
      onLink: async (m) => {
        if (m.external) {
          const url = new URL(m.external);
          if (["http:", "https:"].includes(url.protocol)) await api.tabs.create({ url: url.href });
          return;
        }
        const index = epub.chapters.findIndex((c) => c.path === m.path);
        if (index >= 0) {
          page = index + 1;
          await renderPage({ hash: m.hash });
        }
      }
    });
    $("toc").replaceChildren(...epub.chapters.map((c, i) => {
      const o = node("option", c.title || "Chapitre " + (i + 1));
      o.value = i + 1;
      return o;
    }));
    $("toc").value = page;
    if (ticket !== epoch) return;
    renderAnnotations();
    updateProgress(restoreScroll ? book.progress.scroll : 0, restoreScroll ? book.progress.maxScroll : 0);
    status("Reprise enregistr\xE9e \xB7 chapitre " + page + " / " + count());
  }
  function updateSelection() {
    $("selected").textContent = (selection == null ? void 0 : selection.text) || "S\xE9lectionnez du texte dans la page.";
    $("define").disabled = $("quick-define").disabled = $("highlight").disabled = !selection;
  }
  async function saveAnnotation(highlight) {
    if (!book) return;
    const note = $("note").value.trim();
    if (!selection && !note) throw Error("S\xE9lectionnez du texte ou \xE9crivez une note.");
    const entry = { id: crypto.randomUUID(), page, text: (selection == null ? void 0 : selection.text) || "", rects: [], anchor: selection == null ? void 0 : selection.anchor, note, highlight: highlight || !!selection, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    book = await BVBookStore.update(book.id, (item) => {
      (item.annotations || (item.annotations = [])).push(entry);
    });
    $("note").value = "";
    await renderPage({ restoreScroll: true });
  }
  function renderAnnotations() {
    $("annotations").replaceChildren();
    for (const a of book.annotations) {
      const item = node("article", void 0, "dr-note");
      item.dir = "auto";
      item.append(node("strong", "Chapitre " + a.page), node("p", a.text), node("p", a.note));
      item.append(button("Reprendre ici", async () => {
        page = a.page;
        await renderPage();
      }), button("Retirer", async () => {
        book = await BVBookStore.update(book.id, (item2) => {
          item2.annotations = item2.annotations.filter((n) => n.id !== a.id);
        });
        await renderPage({ restoreScroll: true });
      }));
      $("annotations").append(item);
    }
  }
  function updateProgress(scroll = 0, max = 0) {
    $("progress").textContent = Math.min(100, Math.round(100 * (page - 1 + (max ? Math.min(1, scroll / max) : 0)) / count())) + " %";
  }
  $("import").onclick = () => $("file").click();
  $("file").onchange = run(async () => {
    const files = [...$("file").files];
    $("file").value = "";
    let last;
    for (const f of files) last = await importBook(f, "", { open: false });
    if (last) await openBook(last);
  });
  $("back").onclick = run(async () => {
    epoch++;
    book = null;
    epub = null;
    $("surface").replaceChildren();
    $("reader").hidden = true;
    section.classList.remove("dr-reading", "dr-show-notes");
    $("library").hidden = false;
    history.replaceState(null, "", "?definitionReader=library");
    await renderLibrary();
  });
  $("notes-toggle").onclick = () => {
    section.classList.toggle("dr-show-notes");
    $("notes-toggle").setAttribute("aria-expanded", String(section.classList.contains("dr-show-notes")));
  };
  $("search-toggle").onclick = () => {
    $("search-wrap").hidden = !$("search-wrap").hidden;
    $("search-toggle").setAttribute("aria-expanded", String(!$("search-wrap").hidden));
    if (!$("search-wrap").hidden) $("search").focus();
  };
  $("fullscreen").onclick = run(async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await section.requestFullscreen();
  });
  $("theme").onchange = run(async () => {
    theme = $("theme").value;
    await renderPage({ restoreScroll: true });
  });
  document.addEventListener("keydown", run(async (event) => {
    if (!standalone || !book || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest("input,select,textarea,button,[contenteditable]")) return;
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const next = page + (event.key === "ArrowLeft" ? -1 : 1);
    if (next >= 1 && next <= count()) {
      page = next;
      await renderPage();
    }
  }));
  $("library-toggle").onclick = run(async () => {
    $("library").hidden = !$("library").hidden;
    await renderLibrary();
  });
  $("url-form").onsubmit = run(async (event) => {
    var _a;
    event.preventDefault();
    const url = new URL($("url").value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw Error("Adresse HTTP/HTTPS sans identifiants attendue.");
    status("T\xE9l\xE9chargement du livre\u2026");
    const result = await I.send({ type: "definition:request", request: { url: url.href, responseType: "base64", maxBytes: MAX } });
    if (!result.ok) throw Error("T\xE9l\xE9chargement refus\xE9 : HTTP " + result.status);
    const binary = atob(result.body), bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const name = decodeURIComponent(new URL(result.url || url).pathname.split("/").pop()) || (/pdf/i.test(((_a = result.headers) == null ? void 0 : _a["content-type"]) || "") ? "livre.pdf" : "livre.epub");
    await importBook(new File([bytes], name), url.href);
  });
  $("previous").onclick = run(async () => {
    page--;
    await renderPage();
  });
  $("next").onclick = run(async () => {
    page++;
    await renderPage();
  });
  $("page").onchange = run(async () => {
    page = Number($("page").value) || 1;
    await renderPage();
  });
  $("toc").onchange = run(async () => {
    page = Number($("toc").value);
    await renderPage();
  });
  $("page").onkeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.dispatchEvent(new Event("change", { bubbles: true }));
      event.currentTarget.blur();
    }
  };
  for (const [id, direction] of [["smaller", -1], ["larger", 1]]) $(id).onclick = run(async () => {
    fontSize = Math.max(12, Math.min(40, fontSize + direction * 2));
    await renderPage({ restoreScroll: true });
  });
  $("define").onclick = run(async () => {
    if (selection) {
      const context = { page_title: book.name, paragraph: selection.text, url: book.sourceURL || "", reader_page: page };
      if (standalone) {
        const result = await api.runtime.sendMessage({ type: "definition:open", text: selection.text, context });
        if ((result == null ? void 0 : result.ok) === false) throw Error(result.error);
      } else await I.lookup(selection.text, context);
    }
  });
  $("quick-define").onclick = () => $("define").click();
  $("highlight").onclick = run(() => saveAnnotation(true));
  $("save-note").onclick = run(() => saveAnnotation(false));
  $("export-notes").onclick = run(async () => {
    if (book) await download(book.name + "-notes.json", JSON.stringify({ schema: "baibolintsika-reader-notes", version: 1, book: { id: book.id, name: book.name, type: book.type, sourceURL: book.sourceURL }, progress: book.progress, annotations: book.annotations }, null, 2), "application/json");
  });
  $("original").onclick = run(async () => {
    if (book) await download(book.name, book.bytes, book.type === "pdf" ? "application/pdf" : "application/epub+zip");
  });
  $("search-form").onsubmit = run(async (event) => {
    event.preventDefault();
    const query = $("search").value.trim().toLocaleLowerCase();
    $("search-results").replaceChildren();
    if (!book || !query) return;
    status("Recherche dans le livre\u2026");
    const active = book.id;
    let hits = 0;
    for (let i = 1; i <= count(); i++) {
      if ((book == null ? void 0 : book.id) !== active) return;
      const text = new DOMParser().parseFromString(await epub.chapter(i - 1), "text/html").body.textContent;
      const at = text.toLocaleLowerCase().indexOf(query);
      if (at >= 0) {
        hits++;
        $("search-results").append(button("Chapitre " + i + " \xB7 " + text.slice(Math.max(0, at - 35), at + query.length + 90), async () => {
          page = i;
          await renderPage();
        }));
      }
      if (hits >= 100) break;
    }
    status(hits + " page(s) / chapitre(s) trouv\xE9(s).");
  });
  globalThis.BVDefinitionReader = { importBook, openBook, renderLibrary, getBook: () => book, createContentFrame };
  void (async () => {
    await renderLibrary();
    if (standalone) {
      await I.ready();
      BVLibrary.select("definition");
      readerTab.click();
      const id = params.get("definitionReader");
      if (/^[a-f0-9]{64}$/.test(id || "")) {
        const item = await store("readonly", (s) => s.get(id));
        if (item) await openBook(item);
        else status("Ce livre ne se trouve plus dans votre biblioth\xE8que.", true);
      }
    }
  })().catch((error) => status(error.message, true));
})();
