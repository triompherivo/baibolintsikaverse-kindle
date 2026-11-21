(() => {
  "use strict";
  const own = new URL(location.href), origin = own.origin === "null" ? `${own.protocol}//${own.host.toLowerCase()}` : own.origin.toLowerCase();
  let config = null, timer;
  const post = (action, payload = {}) => {
    if (config) parent.postMessage({ type: "bv-reader", token: config.token, action, ...payload }, "*");
  };
  window.addEventListener("message", (event) => {
    var _a, _b, _c, _d;
    if (event.source !== parent || event.origin !== origin || ((_a = event.data) == null ? void 0 : _a.type) !== "bv-reader:configure" || config) return;
    const value = event.data.config;
    if (!value || typeof value.token !== "string" || typeof value.html !== "string" || !Array.isArray(value.annotations)) return;
    config = value;
    const parsed = new DOMParser().parseFromString(value.html, "text/html");
    parsed.querySelectorAll("script,iframe,object,embed,form,input,button,textarea,select,base").forEach((n) => n.remove());
    for (const el of parsed.querySelectorAll("*")) for (const a of [...el.attributes]) if (/^on/i.test(a.name) || a.name === "srcdoc") el.removeAttribute(a.name);
    document.documentElement.lang = parsed.documentElement.lang;
    document.documentElement.dir = parsed.documentElement.dir;
    document.head.replaceChildren(...parsed.head.childNodes);
    document.body.replaceChildren(...parsed.body.childNodes);
    for (const a of value.annotations.filter((a2) => a2.text)) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), segments = [];
      let text, full = "";
      while (text = walker.nextNode()) {
        segments.push({ text, start: full.length });
        full += text.data;
      }
      const start = Number.isInteger((_b = a.anchor) == null ? void 0 : _b.start) && Number.isInteger((_c = a.anchor) == null ? void 0 : _c.end) && full.slice(a.anchor.start, a.anchor.end) === a.text ? a.anchor.start : full.indexOf(a.text);
      if (start < 0) continue;
      const end = start + a.text.length;
      for (const part of segments) {
        const from = Math.max(0, start - part.start), to = Math.min(part.text.length, end - part.start);
        if (from >= to || part.text.parentElement.closest("style,script,mark")) continue;
        const range = document.createRange();
        range.setStart(part.text, from);
        range.setEnd(part.text, to);
        const mark = document.createElement("mark");
        mark.dataset.drNote = a.id;
        mark.title = a.note || a.text;
        range.surroundContents(mark);
      }
    }
    if (value.hash) (_d = document.getElementById(decodeURIComponent(value.hash.slice(1)))) == null ? void 0 : _d.scrollIntoView();
    else scrollTo(0, Number(value.scroll) || 0);
    post("ready");
  });
  document.addEventListener("click", (event) => {
    var _a, _b;
    const link = (_b = (_a = event.target).closest) == null ? void 0 : _b.call(_a, "a");
    if (!config || !link) return;
    event.preventDefault();
    post("navigate", { href: link.getAttribute("href") || "", path: link.dataset.drChapter || "", hash: link.dataset.drHash || "", external: link.dataset.drExternal || "" });
  });
  function captureSelection() {
    const selected = getSelection();
    if (!(selected == null ? void 0 : selected.rangeCount) || selected.isCollapsed) return;
    const range = selected.getRangeAt(0);
    if (!document.body.contains(range.commonAncestorContainer)) return;
    const raw = range.toString(), text = raw.trim().slice(0, 1e4);
    if (!text) return;
    const before = range.cloneRange();
    before.selectNodeContents(document.body);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length + raw.indexOf(text);
    post("selection", { text, anchor: { start, end: start + text.length } });
  }
  document.addEventListener("selectionchange", captureSelection);
  document.addEventListener("dblclick", () => {
    var _a;
    if ((config == null ? void 0 : config.doubleClickDefine) && ((_a = getSelection()) == null ? void 0 : _a.toString().trim())) {
      captureSelection();
      post("define");
    }
  });
  document.addEventListener("keydown", (event) => {
    var _a;
    if ((config == null ? void 0 : config.chapterNavigation) && event.altKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "d" && ((_a = getSelection()) == null ? void 0 : _a.toString().trim())) {
      event.preventDefault();
      captureSelection();
      post("define");
      return;
    }
    if (!(config == null ? void 0 : config.chapterNavigation) || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    post("chapter", { direction: event.key === "ArrowLeft" ? -1 : 1 });
  });
  document.addEventListener("scroll", () => {
    clearTimeout(timer);
    timer = setTimeout(() => post("scroll", { scroll: document.scrollingElement.scrollTop, maxScroll: Math.max(0, document.scrollingElement.scrollHeight - innerHeight) }), 200);
  }, { passive: true });
})();
