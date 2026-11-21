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
  const reveal = $("personal-teny-reveal");
  if (reveal) reveal.hidden = true;
})();
