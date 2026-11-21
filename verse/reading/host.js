"use strict";
const BVReadingHost = (() => {
  const api = globalThis.browser || globalThis.chrome;
  const data = (path) => api.runtime.getURL("data/" + path);
  async function json(file) {
    if (file === "reading/hebrew.json") {
      const parts = await Promise.all(["hebrew-ot-a", "hebrew-ot-b", "hebrew-nt"].map((name) => json("reading/" + name + ".json")));
      return Object.assign({}, ...parts);
    }
    const response = await fetch(data(file));
    if (!response.ok) throw Error("Ressource de lecture indisponible.");
    return response.json();
  }
  let pdf;
  return {
    json,
    url: data,
    get: async (key, fallback) => (await api.storage.local.get({ [key]: fallback }))[key],
    set: (key, value) => api.storage.local.set({ [key]: value }),
    openWindow: async (module) => {
      const response = await api.runtime.sendMessage({ type: "reading:open", module });
      if (!(response == null ? void 0 : response.ok)) throw Error((response == null ? void 0 : response.error) || "Fen\xEAtre de lecture indisponible.");
    },
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const field = document.createElement("textarea");
        field.value = text;
        (document.querySelector("dialog[open]") || document.body).append(field);
        field.select();
        try {
          if (!document.execCommand("copy")) throw Error("Copie indisponible.");
        } finally {
          field.remove();
        }
      }
    },
    pdf: () => pdf != null ? pdf : pdf = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = api.runtime.getURL("vendor/readers/pdf-lib.min.js");
      script.onload = () => resolve(globalThis.PDFLib);
      script.onerror = () => {
        pdf = void 0;
        reject(Error("Export PDF indisponible."));
      };
      document.head.append(script);
    }),
    save: (name, bytes, mime) => BVDownload.save(name, bytes, mime)
  };
})();
