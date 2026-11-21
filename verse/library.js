(() => {
  "use strict";
  const names = [...document.querySelectorAll("#library-tabs [role=tab]")].map((tab) => tab.id.slice(0, -4));
  function select(name, { focus = false } = {}) {
    if (!names.includes(name)) name = "bible";
    for (const module of names) {
      const tab = document.getElementById(module + "-tab"), panel = document.getElementById(module + "-panel");
      tab.setAttribute("aria-selected", String(module === name));
      tab.tabIndex = module === name ? 0 : -1;
      panel.hidden = module !== name;
    }
    if (focus) document.getElementById(name + "-tab").focus();
    document.dispatchEvent(new CustomEvent("bv-module", { detail: name }));
  }
  for (const name of names) document.getElementById(name + "-tab").onclick = () => select(name);
  document.getElementById("library-tabs").onkeydown = (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const current = names.indexOf(e.target.id.replace("-tab", ""));
    const next = e.key === "Home" ? 0 : e.key === "End" ? names.length - 1 : (current + (e.key === "ArrowLeft" ? -1 : 1) + names.length) % names.length;
    select(names[next], { focus: true });
  };
  globalThis.BVLibrary = { select };
})();
