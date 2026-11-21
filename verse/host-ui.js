(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  $("scriptures-link").hidden = !new URLSearchParams(location.search).has("scriptures");
  const notice = document.createElement("p");
  notice.id = "kindle-reminder";
  notice.setAttribute("role", "status");
  notice.hidden = true;
  $("library-tabs").after(notice);
  const tool = $("kindle-text");
  const selection = () => tool.value.trim() || String(window.getSelection()).trim();
  const report = (text) => {
    $("kindle-matches").textContent = text;
  };
  $("kindle-references").onclick = () => {
    const text = selection();
    if (!text) return report("Saisissez un texte ou s\xE9lectionnez un passage.");
    const version = $("version").value;
    const matches = BV.scan(text.slice(0, 3e4));
    report(matches.length ? "" : "Aucune r\xE9f\xE9rence biblique reconnue.");
    for (const { ref } of matches.slice(0, 100)) {
      const link = document.createElement("a");
      const params = new URLSearchParams(location.search);
      const query = new URLSearchParams({ selection: JSON.stringify(ref), version });
      if (params.has("scriptures")) query.set("scriptures", "1");
      link.href = "reader.html?" + query;
      link.textContent = BV.label(ref, version);
      $("kindle-matches").append(link);
    }
  };
  $("kindle-definition").onclick = async () => {
    const text = selection();
    if (!text) return report("Saisissez un texte ou s\xE9lectionnez un passage.");
    const result = await browser.runtime.sendMessage({ type: "definition:open", text: text.slice(0, 2e3) });
    if (!result.ok) report(result.error);
  };
  const tools = tool.closest("details");
  document.addEventListener("selectionchange", () => {
    if (String(window.getSelection()).trim() && !tools.open) {
      $("kindle-definition").dataset.selection = String(window.getSelection()).slice(0, 2e3);
    }
  });
  tools.addEventListener("toggle", () => {
    const remembered = $("kindle-definition").dataset.selection;
    if (tools.open && !tool.value && remembered) tool.value = remembered;
    delete $("kindle-definition").dataset.selection;
  });
  if ($("web-share-passage")) {
    const dialog = $("web-share-dialog");
    const field = $("web-share-url");
    const shareStatus = $("web-share-status");
    const showLink = (options) => {
      const url = new URL("reader.html", location.href);
      for (const [key, value] of Object.entries(options)) url.searchParams.set(key, value);
      field.value = url.href;
      shareStatus.textContent = "";
      dialog.showModal();
    };
    $("web-share-passage").onclick = async () => {
      const { lastPassage: ref } = await BVSettings.get({ lastPassage: null });
      if (BV.valid(ref)) showLink({ selection: JSON.stringify(ref), version: $("version").value });
    };
    $("web-share-pericope").onclick = () => {
      const day = $("pericope-card").dataset.day;
      if (day) showLink({ pericope: day, version: $("version").value });
    };
    $("web-share-copy").onclick = async () => {
      try {
        await navigator.clipboard.writeText(field.value);
        shareStatus.textContent = "Lien copi\xE9.";
      } catch {
        field.select();
        shareStatus.textContent = "S\xE9lectionnez et copiez le lien.";
      }
    };
    if (new URLSearchParams(location.search).has("pericope")) {
      document.addEventListener("DOMContentLoaded", () => BVLibrary.select("pericope"), { once: true });
    }
  }
  const reveal = $("personal-teny-reveal");
  if (reveal) reveal.hidden = true;
})();
