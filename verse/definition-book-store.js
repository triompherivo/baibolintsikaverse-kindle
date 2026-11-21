(() => {
  "use strict";
  let databasePromise, pdfLibPromise;
  const root = () => (globalThis.browser || globalThis.chrome).runtime.getURL("");
  function database() {
    return databasePromise || (databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("baibolintsika-definition-readers", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("books", { keyPath: "id" });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }));
  }
  async function transaction(mode, action) {
    const db = await database();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("books", mode), request = action(tx.objectStore("books"));
      let value;
      request.onsuccess = () => {
        value = request.result;
      };
      tx.oncomplete = () => resolve(value);
      tx.onerror = tx.onabort = () => reject(tx.error || request.error || Error("Biblioth\xE8que indisponible."));
    });
  }
  async function update(id, change) {
    const db = await database();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("books", "readwrite"), store = tx.objectStore("books"), request = store.get(id);
      let item;
      request.onsuccess = () => {
        item = request.result;
        if (item) {
          change(item);
          item.modifiedAt = (/* @__PURE__ */ new Date()).toISOString();
          store.put(item);
        }
      };
      tx.oncomplete = () => resolve(item);
      tx.onerror = tx.onabort = () => reject(tx.error || Error("Sauvegarde du livre impossible."));
    });
  }
  async function importFile(file, sourceURL = "") {
    if (file.size > 64 * 1024 * 1024) throw Error("Livre trop volumineux (64 Mio maximum).");
    const bytes = await file.arrayBuffer(), signature = new TextDecoder().decode(bytes.slice(0, 8));
    const type = signature.startsWith("%PDF-") ? "pdf" : /\.epub$/i.test(file.name) || signature.startsWith("PK") ? "epub" : null;
    if (!type) throw Error("Choisissez un fichier PDF ou EPUB.");
    const id = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((n) => n.toString(16).padStart(2, "0")).join("");
    const existing = await transaction("readonly", (s) => s.get(id));
    if (existing) return existing;
    const item = { id, name: file.name, type, bytes, sourceURL, createdAt: (/* @__PURE__ */ new Date()).toISOString(), modifiedAt: (/* @__PURE__ */ new Date()).toISOString(), progress: { page: 1, scroll: 0 }, annotations: [] };
    try {
      await transaction("readwrite", (s) => s.add(item));
      return item;
    } catch (error) {
      if (error.name === "ConstraintError") return transaction("readonly", (s) => s.get(id));
      throw error;
    }
  }
  function pdfLib() {
    if (globalThis.PDFLib) return Promise.resolve(globalThis.PDFLib);
    return pdfLibPromise || (pdfLibPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = root() + "vendor/readers/pdf-lib.min.js";
      script.onload = () => resolve(globalThis.PDFLib);
      script.onerror = () => reject(Error("Export PDF indisponible."));
      document.head.append(script);
    }));
  }
  async function annotatedPDF(bytes, annotations) {
    var _a;
    if (!(annotations == null ? void 0 : annotations.length)) return new Uint8Array(bytes);
    const P = await pdfLib(), doc = await P.PDFDocument.load(bytes instanceof ArrayBuffer ? bytes.slice(0) : bytes.slice());
    for (const a of annotations) {
      const page = doc.getPages()[a.page - 1];
      if (!page) continue;
      let annots = page.node.lookup(P.PDFName.of("Annots"));
      const name = "BaibolintsikaVerse-" + a.id;
      if (annots && [...Array(annots.size()).keys()].some((i) => {
        var _a2, _b, _c;
        const entry2 = doc.context.lookup(annots.get(i));
        return ((_c = (_b = (_a2 = entry2 == null ? void 0 : entry2.lookup) == null ? void 0 : _a2.call(entry2, P.PDFName.of("NM"))) == null ? void 0 : _b.decodeText) == null ? void 0 : _c.call(_b)) === name;
      })) continue;
      for (const r2 of a.rects || []) {
        if (r2.length !== 4 || !r2.every(Number.isFinite)) continue;
        page.drawRectangle({ x: r2[0], y: r2[1], width: r2[2] - r2[0], height: r2[3] - r2[1], color: P.rgb(1, 0.87, 0.2), opacity: 0.28 });
      }
      const r = ((_a = a.rects) == null ? void 0 : _a[0]) || [24, page.getHeight() - 48, 44, page.getHeight() - 28];
      const entry = doc.context.obj({
        Type: P.PDFName.of("Annot"),
        Subtype: P.PDFName.of("Text"),
        Rect: [r[0], r[3], r[0] + 20, r[3] + 20],
        Contents: P.PDFHexString.fromText([a.text, a.note].filter(Boolean).join("\n\n")),
        NM: P.PDFHexString.fromText(name),
        T: P.PDFHexString.fromText("BaibolintsikaVerse"),
        Name: P.PDFName.of("Note"),
        C: [1, 0.87, 0.2],
        F: 4
      });
      if (!annots) {
        annots = doc.context.obj([]);
        page.node.set(P.PDFName.of("Annots"), annots);
      }
      annots.push(doc.context.register(entry));
    }
    return doc.save();
  }
  globalThis.BVBookStore = { transaction, update, importFile, get: (id) => transaction("readonly", (s) => s.get(id)), annotatedPDF };
})();
