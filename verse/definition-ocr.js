(() => {
  "use strict";
  function mount() {
    const I = globalThis.BVDefinitionIntegration;
    if (!I || document.getElementById("def-ocr-panel")) return;
    const section = document.createElement("div");
    section.id = "def-ocr-panel";
    section.className = "def-card";
    section.innerHTML = `<h3>Les mots dans une image.</h3><p>Ouvrez une image ou une capture d\u2019\xE9cran. La reconnaissance reste sur cet appareil, y compris en h\xE9breu.</p><label>Image<input id="def-ocr-file" type="file" accept="image/*"></label><div class="def-toolbar"><select id="def-ocr-language" aria-label="Langue de reconnaissance"><option value="heb">H\xE9breu</option><option value="eng">Anglais</option><option value="fra">Fran\xE7ais</option><option value="heb+eng">H\xE9breu et anglais</option></select><button id="def-ocr-run" class="primary" type="button">Reconna\xEEtre</button><button id="def-ocr-cancel" type="button" disabled>Annuler</button></div><p id="def-ocr-status" role="status"></p><label>Texte reconnu<textarea id="def-ocr-text" rows="10" dir="auto"></textarea></label><div class="def-toolbar"><button id="def-ocr-lookup" type="button">D\xE9finir la s\xE9lection / le texte</button><button id="def-ocr-copy" type="button">Copier</button></div>`;
    I.addView("ocr", "Image \xB7 OCR", section);
    let worker, canceled = false;
    const $ = (suffix) => section.querySelector("#def-ocr-" + suffix), status = (text) => {
      $("status").textContent = text;
    };
    const load = () => globalThis.Tesseract ? Promise.resolve() : new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "vendor/tesseract/tesseract.js";
      script.onload = resolve;
      script.onerror = () => reject(Error("Le moteur OCR est introuvable."));
      document.head.append(script);
    });
    $("run").onclick = async () => {
      try {
        const file = $("file").files[0];
        if (!file) throw Error("Choisissez une image.");
        if (file.size > 20 * 1024 * 1024) throw Error("L\u2019image d\xE9passe 20 Mio.");
        canceled = false;
        $("run").disabled = true;
        $("cancel").disabled = false;
        status("Chargement du moteur local\u2026");
        await load();
        worker = await Tesseract.createWorker($("language").value, 1, { logger: (value) => {
          if (!canceled) status(value.status + (value.progress ? " \xB7 " + Math.round(value.progress * 100) + " %" : ""));
        } });
        if (canceled) return;
        const result = await worker.recognize(file);
        if (!canceled) {
          $("text").value = result.data.text;
          status("Reconnaissance termin\xE9e \xB7 confiance " + Math.round(result.data.confidence) + " %. V\xE9rifiez le texte avant utilisation.");
        }
      } catch (error) {
        if (!canceled) status(String((error == null ? void 0 : error.message) || error || "La reconnaissance a \xE9chou\xE9."));
      } finally {
        if (worker) await worker.terminate();
        worker = null;
        $("run").disabled = false;
        $("cancel").disabled = true;
      }
    };
    $("cancel").onclick = async () => {
      canceled = true;
      if (worker) await worker.terminate();
      worker = null;
      status("Reconnaissance annul\xE9e.");
      $("run").disabled = false;
      $("cancel").disabled = true;
    };
    $("lookup").onclick = async () => {
      const textarea = $("text"), text = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd) || textarea.value;
      if (text.trim()) await I.lookup(text.trim().slice(0, 2e3));
    };
    $("copy").onclick = () => navigator.clipboard.writeText($("text").value);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
