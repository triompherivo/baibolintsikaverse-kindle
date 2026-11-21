(() => {
  "use strict";
  const objectURLs = /* @__PURE__ */ new Set();
  const fileName = (name) => String(name || "document").replace(/[\x00-\x1f/\\:]/g, "-").slice(0, 240);
  function safari() {
    return location.protocol === "safari-web-extension:";
  }
  async function save(name, data, mime = "application/octet-stream") {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mime });
    let url;
    if (safari()) {
      url = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });
    } else {
      url = URL.createObjectURL(blob);
      objectURLs.add(url);
    }
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName(name);
    anchor.textContent = "Enregistrer \xAB " + anchor.download + " \xBB";
    if (safari()) {
      let dialog = document.getElementById("bv-download-dialog");
      dialog == null ? void 0 : dialog.remove();
      dialog = document.createElement("dialog");
      dialog.id = "bv-download-dialog";
      const title = document.createElement("h2");
      title.textContent = "Votre fichier est pr\xEAt";
      const text = document.createElement("p");
      text.textContent = "Enregistrez cette copie. Le livre original et vos notes sont conserv\xE9s dans la biblioth\xE8que.";
      const close = document.createElement("button");
      close.type = "button";
      close.textContent = "Fermer";
      close.onclick = () => dialog.close();
      dialog.append(title, text, anchor, close);
      document.body.append(dialog);
      dialog.showModal();
      anchor.focus();
      anchor.addEventListener("click", () => {
        setTimeout(() => {
          dialog.close();
          dialog.remove();
        }, 3e4);
      }, { once: true });
      return { ready: true, name: anchor.download };
    }
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      objectURLs.delete(url);
    }, 6e4);
    return { ready: true, name: anchor.download };
  }
  window.addEventListener("pagehide", () => {
    for (const url of objectURLs) URL.revokeObjectURL(url);
  });
  globalThis.BVDownload = { save };
})();
