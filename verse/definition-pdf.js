(() => {
  "use strict";
  const api = globalThis.browser || globalThis.chrome;
  const root = api.runtime.getURL(""), S = globalThis.BVBookStore;
  const id = new URLSearchParams(location.search).get("book");
  let app, book, selection, savedHash, observedHash, changedAt = 0, saveQueue = Promise.resolve(), progressTimer, doubleClick = false;
  const $ = (id2) => document.getElementById("bv-pdf-" + id2);
  const element = (tag, text) => {
    const n = document.createElement(tag);
    if (text !== void 0) n.textContent = text;
    return n;
  };
  const status = (text, error = false) => {
    if ($("status")) {
      $("status").textContent = text;
      $("status").classList.toggle("error", error);
    }
  };
  const run = (fn) => async (event) => {
    try {
      await fn(event);
    } catch (error) {
      status(error.message, true);
    }
  };
  const button = (text, fn) => {
    const b = element("button", text);
    b.type = "button";
    b.onclick = run(fn);
    return b;
  };
  function header() {
    const bar = element("header");
    bar.id = "bv-pdf-header";
    const back = element("a", "\u2190 Biblioth\xE8que");
    back.href = root + "reader.html?definitionReader=library";
    const name = element("strong", "Lecteur PDF");
    name.id = "bv-pdf-name";
    name.dir = "auto";
    const define = button("D\xE9finition \u2197", defineSelection);
    define.id = "bv-pdf-define";
    define.disabled = true;
    const notes = button("Notes & rep\xE8res", () => {
      document.body.classList.toggle("bv-notes-open");
      notes.setAttribute("aria-expanded", String(document.body.classList.contains("bv-notes-open")));
      app.eventBus.dispatch("resize", { source: app });
    });
    notes.id = "bv-pdf-notes-toggle";
    notes.setAttribute("aria-controls", "bv-pdf-notes");
    notes.setAttribute("aria-expanded", "false");
    const save = button("PDF annot\xE9 \u2193", exportCurrent);
    save.id = "bv-pdf-export";
    const more = element("details");
    more.id = "bv-pdf-more";
    const summary = element("summary", "\u22EF");
    summary.setAttribute("aria-label", "Autres actions du livre");
    more.append(summary, button("Exporter l\u2019original", () => BVDownload.save(book.name, book.bytes, "application/pdf")), button("Exporter les notes", exportNotes), button("Plein \xE9cran", async () => {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    }));
    const state = element("span", "Ouverture\u2026");
    state.id = "bv-pdf-status";
    state.setAttribute("role", "status");
    bar.append(back, name, define, notes, save, more, state);
    document.body.prepend(bar);
    const aside = element("aside");
    aside.id = "bv-pdf-notes";
    aside.innerHTML = '<h2>Notes & rep\xE8res</h2><p id="bv-pdf-selected" dir="auto">S\xE9lectionnez du texte dans le PDF, ou ajoutez un rep\xE8re sur cette page.</p><label>Note personnelle<textarea id="bv-pdf-note" rows="4" dir="auto" placeholder="Votre r\xE9flexion\u2026"></textarea></label><button id="bv-pdf-add-note" type="button">Garder la note / le rep\xE8re</button><h3>Dans ce livre</h3><div id="bv-pdf-annotations"></div>';
    document.body.append(aside);
    $("add-note").onclick = run(addNote);
  }
  function captureSelection() {
    var _a, _b;
    const selected = getSelection();
    if (!(selected == null ? void 0 : selected.rangeCount) || selected.isCollapsed) return;
    const range = selected.getRangeAt(0), node = range.commonAncestorContainer;
    const pageNode = (_a = node.nodeType === 1 ? node : node.parentElement) == null ? void 0 : _a.closest(".page");
    if (!pageNode || !((_b = pageNode.querySelector(".textLayer")) == null ? void 0 : _b.contains(node))) return;
    const text = selected.toString().trim().slice(0, 1e4);
    if (!text) return;
    const number = Number(pageNode.dataset.pageNumber), view = app.pdfViewer.getPageView(number - 1), parent = pageNode.getBoundingClientRect(), rects = [];
    for (const r of range.getClientRects()) {
      if (!r.width || !r.height) continue;
      const a = view.viewport.convertToPdfPoint(r.left - parent.left - pageNode.clientLeft, r.top - parent.top - pageNode.clientTop), b = view.viewport.convertToPdfPoint(r.right - parent.left - pageNode.clientLeft, r.bottom - parent.top - pageNode.clientTop);
      rects.push([Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[0], b[0]), Math.max(a[1], b[1])]);
    }
    selection = { text, page: number, rects };
    $("define").disabled = false;
    $("selected").textContent = text;
  }
  async function defineSelection() {
    captureSelection();
    if (!selection) return;
    const result = await api.runtime.sendMessage({ type: "definition:open", text: selection.text, context: { page_title: book.name, paragraph: selection.text, url: book.sourceURL || "" } });
    if ((result == null ? void 0 : result.ok) === false) throw Error(result.error || "D\xE9finition indisponible.");
  }
  function drawNotes() {
    var _a;
    for (const pageNode of document.querySelectorAll("#viewer .page")) {
      (_a = pageNode.querySelector(".bv-page-highlights")) == null ? void 0 : _a.remove();
      const view = app.pdfViewer.getPageView(Number(pageNode.dataset.pageNumber) - 1);
      if (!(view == null ? void 0 : view.viewport)) continue;
      const overlay = element("div");
      overlay.className = "bv-page-highlights";
      for (const note of book.annotations || []) if (note.page === Number(pageNode.dataset.pageNumber)) for (const r of note.rects || []) {
        const v = view.viewport.convertToViewportRectangle(r), mark = element("div");
        mark.style.cssText = `left:${Math.min(v[0], v[2])}px;top:${Math.min(v[1], v[3])}px;width:${Math.abs(v[2] - v[0])}px;height:${Math.abs(v[3] - v[1])}px`;
        overlay.append(mark);
      }
      pageNode.append(overlay);
    }
  }
  function renderNotes() {
    var _a;
    $("annotations").replaceChildren();
    for (const note of book.annotations || []) {
      const card = element("article");
      card.dir = "auto";
      card.append(button("Page " + note.page, () => {
        app.page = note.page;
      }), element("p", note.text), element("p", note.note), button("Retirer", async () => {
        book = await S.update(id, (item) => {
          item.annotations = (item.annotations || []).filter((a) => a.id !== note.id);
        });
        renderNotes();
        drawNotes();
      }));
      $("annotations").append(card);
    }
    if (!((_a = book.annotations) == null ? void 0 : _a.length)) $("annotations").append(element("p", "Aucune note. Les outils du lecteur permettent aussi de surligner, \xE9crire et dessiner directement dans le PDF."));
  }
  async function addNote() {
    var _a;
    const note = $("note").value.trim();
    const entry = { id: crypto.randomUUID(), page: (selection == null ? void 0 : selection.page) || app.page, text: (selection == null ? void 0 : selection.text) || "", rects: (selection == null ? void 0 : selection.rects) || [], note, highlight: !!selection, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
    book = await S.update(id, (item) => {
      (item.annotations || (item.annotations = [])).push(entry);
    });
    $("note").value = "";
    selection = null;
    $("define").disabled = true;
    $("selected").textContent = "Rep\xE8re gard\xE9. S\xE9lectionnez un autre passage.";
    (_a = getSelection()) == null ? void 0 : _a.removeAllRanges();
    renderNotes();
    drawNotes();
    status("Note enregistr\xE9e sur cet appareil.");
  }
  function editHash() {
    var _a;
    return (_a = app.pdfDocument) == null ? void 0 : _a.annotationStorage.serializable.hash;
  }
  function flushEdits() {
    saveQueue = saveQueue.catch(() => {
    }).then(async () => {
      if (!app.pdfDocument || !book) return;
      const hash = editHash();
      if (hash === savedHash) return;
      status("Enregistrement des annotations\u2026");
      const bytes = await app.pdfDocument.saveDocument();
      book = await S.update(id, (item) => {
        item.readerPDFBytes = bytes.slice().buffer;
      });
      savedHash = hash;
      app.pdfDocument.annotationStorage.resetModified();
      status("Annotations enregistr\xE9es.");
    });
    return saveQueue;
  }
  async function exportCurrent() {
    var _a;
    if (!book || !app.pdfDocument) return;
    status("Pr\xE9paration du PDF annot\xE9\u2026");
    (_a = app.pdfViewer.annotationEditorUIManager) == null ? void 0 : _a.unselectAll();
    await flushEdits();
    book = await S.get(id);
    const bytes = await S.annotatedPDF(book.readerPDFBytes || book.bytes, book.annotations);
    await BVDownload.save(book.name.replace(/\.pdf$/i, "") + "-annote.pdf", bytes, "application/pdf");
    status("Copie annot\xE9e pr\xEAte.");
  }
  async function exportNotes() {
    await BVDownload.save(book.name + "-notes.json", JSON.stringify({ schema: "baibolintsika-reader-notes", version: 1, book: { id: book.id, name: book.name, type: book.type, sourceURL: book.sourceURL }, progress: book.progress, annotations: book.annotations }, null, 2), "application/json");
  }
  async function initialize() {
    header();
    if (!/^[a-f0-9]{64}$/.test(id || "")) throw Error("Ouvrez un PDF depuis votre biblioth\xE8que.");
    book = await S.get(id);
    if (!book || book.type !== "pdf") throw Error("Ce PDF ne se trouve plus dans la biblioth\xE8que.");
    $("name").textContent = book.name;
    $("name").title = book.name;
    await app.initializedPromise;
    document.getElementById("pageNumber").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.dispatchEvent(new Event("change", { bubbles: true }));
        event.currentTarget.blur();
      }
    });
    app.download = app.save = app.downloadOrSave = exportCurrent;
    app.downloadManager.downloadData = (data, name, type) => BVDownload.save(name, data, type);
    app.downloadManager.download = (data, url, name) => BVDownload.save(name, data || book.bytes, "application/pdf");
    app.downloadManager.openOrDownloadData = (data, name) => {
      void BVDownload.save(name, data, "application/pdf");
      return false;
    };
    const importPDF = async (file) => {
      await flushEdits();
      const item = await S.importFile(file);
      if (item.type !== "pdf") throw Error("Choisissez un PDF.");
      location.assign(root + "vendor/pdfjs/web/viewer.html?" + new URLSearchParams({ book: item.id }));
    };
    document.addEventListener("change", (event) => {
      var _a;
      if (event.target.id === "fileInput" && ((_a = event.target.files) == null ? void 0 : _a[0])) {
        event.preventDefault();
        event.stopImmediatePropagation();
        void importPDF(event.target.files[0]).catch((error) => status(error.message, true));
      }
    }, true);
    document.addEventListener("drop", (event) => {
      var _a, _b;
      const file = (_b = (_a = event.dataTransfer) == null ? void 0 : _a.files) == null ? void 0 : _b[0];
      if (file && (/\.pdf$/i.test(file.name) || file.type === "application/pdf")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        void importPDF(file).catch((error) => status(error.message, true));
      }
    }, true);
    const progress = structuredClone(book.progress || {});
    let positionRestored = false;
    app.initialBookmark = new URLSearchParams({ page: Math.max(1, Number(progress.page) || 1), zoom: progress.pdfScale || "page-fit" }).toString();
    app.initialRotation = progress.rotation || 0;
    app.eventBus.on("pagerendered", drawNotes);
    app.eventBus.on("updateviewarea", (event) => {
      if (!positionRestored) return;
      clearTimeout(progressTimer);
      const view = event.location;
      progressTimer = setTimeout(() => {
        void S.update(id, (item) => {
          const scale2 = app.pdfViewer.currentScaleValue;
          item.progress = { ...item.progress, page: view.pageNumber, pdfScale: /^(page-fit|page-width|auto|page-actual)$/.test(scale2) ? scale2 : String(Math.round(app.pdfViewer.currentScale * 1e4) / 100), rotation: app.pdfViewer.pagesRotation, scroll: view.top, left: view.left };
        }).catch((error) => status(error.message, true));
      }, 300);
    });
    await app.open({ data: new Uint8Array((book.readerPDFBytes || book.bytes).slice(0)), isEvalSupported: false });
    await app.pdfViewer.pagesPromise;
    await new Promise(requestAnimationFrame);
    const scale = progress.pdfScale || "page-fit";
    app.pdfViewer.pagesRotation = progress.rotation || 0;
    app.pdfViewer.currentScaleValue = /^(page-fit|page-width|auto|page-actual)$/.test(scale) ? scale : Number(scale) / 100;
    app.page = Math.min(app.pagesCount, Math.max(1, Number(progress.page) || 1));
    if (progress.pdfScale && Number.isFinite(progress.scroll) && progress.scroll > 0) app.pdfViewer.scrollPageIntoView({ pageNumber: app.page, destArray: [null, { name: "XYZ" }, progress.left || 0, progress.scroll, null], allowNegativeOffset: true });
    positionRestored = true;
    app.pdfViewer.update();
    document.title = book.name + " \xB7 BaibolintsikaVerse";
    app.setTitle = (documentTitle) => {
      document.title = documentTitle || book.name + " \xB7 BaibolintsikaVerse";
    };
    savedHash = observedHash = editHash();
    renderNotes();
    status("Reprise automatique \xB7 fichiers et notes sur cet appareil.");
    document.addEventListener("selectionchange", captureSelection);
    document.addEventListener("dblclick", (event) => {
      var _a, _b;
      if (doubleClick && ((_b = (_a = event.target).closest) == null ? void 0 : _b.call(_a, "#viewer .textLayer"))) setTimeout(() => {
        void defineSelection().catch((error) => status(error.message, true));
      }, 100);
    });
    try {
      const settings = await api.storage.local.get({ definitionEnabled: true, definitionDoubleClick: false });
      doubleClick = settings.definitionEnabled && settings.definitionDoubleClick;
    } catch {
    }
    setInterval(() => {
      const hash = editHash();
      if (hash !== observedHash) {
        observedHash = hash;
        changedAt = Date.now();
      } else if (hash !== savedHash && Date.now() - changedAt > 800) void flushEdits().catch((error) => status(error.message, true));
    }, 500);
    globalThis.BVPDFReader = { getBook: () => book, exportCurrent, flushEdits, addNote };
  }
  document.addEventListener("webviewerloaded", (event) => {
    var _a;
    if (((_a = event.detail) == null ? void 0 : _a.source) !== window) return;
    app = window.PDFViewerApplication;
    window.PDFViewerApplicationOptions.setAll({ defaultUrl: "", disablePreferences: true, enableScripting: false, isEvalSupported: false, enableAltTextModelDownload: false, enableNewAltTextWhenAddingImage: false, externalLinkTarget: 2, locale: "fr", defaultZoomValue: "page-fit", viewOnLoad: 1, disableHistory: true });
    void initialize().catch((error) => status(error.message, true));
  }, { once: true });
  document.addEventListener("DOMContentLoaded", () => {
    void (async () => {
      await Promise.all([...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => link.sheet ? Promise.resolve() : new Promise((resolve, reject) => {
        link.addEventListener("load", resolve, { once: true });
        link.addEventListener("error", () => reject(Error("Style du lecteur introuvable.")), { once: true });
      })));
      await new Promise(requestAnimationFrame);
      await import(root + "vendor/pdfjs/web/viewer.mjs");
    })().catch((error) => {
      if (!$("status")) header();
      status(error.message, true);
    });
  }, { once: true });
})();
