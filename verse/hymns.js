(() => {
  "use strict";
  var _a, _b;
  const $ = (id) => document.getElementById(id), PAGE_SIZE = 24, SUGGESTIONS = 8;
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== void 0) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  let loading = null, corpus = null, selected = null, matches = [], suggestions = [], active = -1, page = 0, fontSize = matchMedia("(max-width:600px)").matches ? 18 : 20, inputSerial = 0;
  let category = "all", query = "";
  const popup = location.pathname.endsWith("popup.html");
  const error = (message2) => {
    $("hymn-status").textContent = message2;
    $("hymn-status").classList.add("error");
  };
  function message(text) {
    $("hymn-status").textContent = text;
    $("hymn-status").classList.remove("error");
  }
  const safely = (fn) => (...args) => Promise.resolve().then(() => fn(...args)).catch((e) => error(e.message));
  async function load() {
    if (!loading) {
      loading = fetch("data/hiraffpm.json").then((response) => {
        if (!response.ok) throw Error("Le recueil de chants est indisponible.");
        return response.json();
      }).then((data) => {
        corpus = BVHymns.createIndex(data);
        fillCollections();
        return corpus;
      }).catch((e) => {
        loading = null;
        throw e;
      });
    }
    return loading;
  }
  function fillCollections() {
    for (const button of $("hymn-collections").querySelectorAll("button")) {
      const key = button.dataset.collection, count = key === "all" ? corpus.length : corpus.filter((hymn) => hymn.category === key).length;
      const name = key === "all" ? "Tous" : key === "ff" ? "FF fanampiny" : BVHymns.collections[key];
      button.replaceChildren(element("span", name), element("span", count, "collection-count"));
      button.setAttribute("aria-label", `${name} : ${count} chants`);
    }
    $("hymn-total").textContent = `${corpus.length} chants \xB7 Malagasy \xB7 Hors ligne`;
  }
  function hideSuggestions() {
    $("hymn-suggestion-box").hidden = true;
    $("hymn-query").setAttribute("aria-expanded", "false");
    $("hymn-query").removeAttribute("aria-activedescendant");
    active = -1;
  }
  function activate(index) {
    active = index;
    for (const [i, option2] of [...$("hymn-suggestions").children].entries()) option2.setAttribute("aria-selected", i === active ? "true" : "false");
    const option = $("hymn-suggestions").children[active];
    if (option) {
      $("hymn-query").setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    }
  }
  async function autocomplete() {
    const ticket = ++inputSerial, value = $("hymn-query").value.trim();
    if (!value) {
      hideSuggestions();
      return;
    }
    await load();
    if (ticket !== inputSerial || document.activeElement !== $("hymn-query")) return;
    const found = BVHymns.search(corpus, value, category);
    suggestions = found.slice(0, SUGGESTIONS);
    active = -1;
    const list = $("hymn-suggestions");
    list.replaceChildren();
    $("hymn-query").removeAttribute("aria-activedescendant");
    for (const [i, hymn] of suggestions.entries()) {
      const option = element("li", void 0, "hymn-suggestion");
      option.id = "hymn-option-" + i;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", "false");
      const text = element("div", void 0, "hymn-suggestion-text");
      text.append(element("strong", hymn.title), element("small", BVHymns.snippet(hymn, value, 88)));
      option.append(element("span", BVHymns.label(hymn), "hymn-result-number"), text);
      option.onmousedown = (e) => e.preventDefault();
      option.onclick = safely(() => choose(hymn));
      list.append(option);
    }
    $("hymn-suggest-empty").hidden = found.length > 0;
    $("hymn-all-results").hidden = !found.length;
    $("hymn-all-results").textContent = `Voir les ${found.length} r\xE9sultat${found.length > 1 ? "s" : ""} \u2192`;
    $("hymn-suggestion-box").hidden = false;
    $("hymn-query").setAttribute("aria-expanded", "true");
  }
  function showResults() {
    hideSuggestions();
    selected = null;
    $("hymn-detail").hidden = true;
    $("hymn-results").hidden = false;
    matches = BVHymns.search(corpus, query, category);
    const start = page * PAGE_SIZE;
    const visible = matches.slice(start, start + PAGE_SIZE);
    $("hymn-result-count").textContent = `${matches.length} chant${matches.length > 1 ? "s" : ""}${query ? " pour \xAB " + query + " \xBB" : ""}`;
    const list = $("hymn-hits");
    list.replaceChildren();
    for (const hymn of visible) {
      const button = element("button", void 0, "hymn-hit");
      button.type = "button";
      const text = element("span", void 0, "hymn-hit-text");
      text.append(element("strong", hymn.title), element("small", BVHymns.snippet(hymn, query)));
      button.append(element("span", BVHymns.label(hymn), "hymn-result-number"), text);
      button.onclick = safely(() => choose(hymn));
      list.append(button);
    }
    $("hymn-no-results").hidden = !!matches.length;
    $("hymn-pagination").hidden = matches.length <= PAGE_SIZE;
    $("hymn-prev-results").disabled = page === 0;
    $("hymn-next-results").disabled = start + PAGE_SIZE >= matches.length;
    $("hymn-page-count").textContent = matches.length ? `${start + 1}\u2013${Math.min(start + PAGE_SIZE, matches.length)} / ${matches.length}` : "";
    message("");
  }
  function choose(hymn, { focus = true } = {}) {
    const value = $("hymn-query").value.trim();
    if (query !== value) {
      query = value;
      page = 0;
    }
    selected = hymn;
    hideSuggestions();
    $("hymn-results").hidden = true;
    $("hymn-detail").hidden = false;
    $("hymn-title").textContent = hymn.title;
    $("hymn-number").textContent = hymn.number.replace(/^[^-]+-/, "");
    $("hymn-category").textContent = BVHymns.collections[hymn.category];
    const article = $("hymn-lyrics");
    article.replaceChildren();
    for (const stanza of hymn.stanzas) {
      const section = element("section", void 0, "hymn-stanza" + (stanza.refrain ? " hymn-refrain" : ""));
      section.setAttribute("aria-label", stanza.refrain ? "Refrain" : stanza.number ? "Strophe " + stanza.number : "Paroles");
      const marker = element("span", stanza.refrain ? "Refrain" : stanza.number || "", "stanza-marker");
      marker.setAttribute("aria-hidden", "true");
      const lines = element("div", void 0, "stanza-lines");
      for (const line of stanza.lines) {
        const p = element("p", line.text);
        if (line.indent) p.className = "hymn-indent";
        lines.append(p);
      }
      section.append(marker, lines);
      article.append(section);
    }
    const collection = corpus.filter((item) => item.category === hymn.category), index = collection.findIndex((item) => item.id === hymn.id);
    for (const [id, step] of [["hymn-previous", -1], ["hymn-next", 1]]) {
      const next = collection[index + step], button = $(id);
      button.disabled = !next;
      button.textContent = next ? (step < 0 ? "\u2190 " : "") + BVHymns.label(next) + (step > 0 ? " \u2192" : "") : step < 0 ? "\u2190 Pr\xE9c\xE9dent" : "Suivant \u2192";
      button.onclick = next ? safely(() => choose(next)) : null;
    }
    message("");
    void BVSettings.set({ lastHymn: hymn.number });
    if (focus) {
      $("hymn-title").focus({ preventScroll: true });
      if (!popup) $("hymn-detail").scrollIntoView({ block: "start" });
    }
  }
  async function switchModule(name) {
    BVLibrary.select(name);
    if (name === "hymns") await prepareHymns();
  }
  async function prepareHymns() {
    hideSuggestions();
    message("Chargement des chants\u2026");
    await load();
    if (!selected) {
      query = $("hymn-query").value.trim();
      showResults();
    } else message("");
  }
  async function submit() {
    await load();
    query = $("hymn-query").value.trim();
    page = 0;
    const exact = BVHymns.exact(corpus, query, category);
    if (exact) choose(exact);
    else showResults();
  }
  document.addEventListener("bv-module", (e) => {
    hideSuggestions();
    if (e.detail === "hymns") safely(prepareHymns)();
  });
  for (const button of $("hymn-collections").querySelectorAll("button")) button.onclick = safely(async () => {
    category = button.dataset.collection;
    page = 0;
    query = $("hymn-query").value.trim();
    for (const item of $("hymn-collections").querySelectorAll("button")) item.setAttribute("aria-pressed", String(item === button));
    await load();
    showResults();
  });
  $("hymn-query").oninput = () => {
    inputSerial++;
    hideSuggestions();
    safely(autocomplete)();
  };
  $("hymn-query").onfocus = safely(autocomplete);
  $("hymn-query").onkeydown = (e) => {
    if (e.key === "Escape") {
      inputSerial++;
      hideSuggestions();
      return;
    }
    if (e.key === "Tab") {
      inputSerial++;
      hideSuggestions();
      return;
    }
    if (["ArrowDown", "ArrowUp"].includes(e.key) && suggestions.length && !$("hymn-suggestion-box").hidden) {
      e.preventDefault();
      activate(active < 0 ? e.key === "ArrowDown" ? 0 : suggestions.length - 1 : (active + (e.key === "ArrowDown" ? 1 : -1) + suggestions.length) % suggestions.length);
    }
    if (e.key === "Enter" && active >= 0 && !$("hymn-suggestion-box").hidden) {
      e.preventDefault();
      choose(suggestions[active]);
    }
  };
  $("hymn-entry").onsubmit = (e) => {
    e.preventDefault();
    safely(submit)();
  };
  $("hymn-all-results").onclick = safely(async () => {
    await load();
    query = $("hymn-query").value.trim();
    page = 0;
    showResults();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".hymn-search-wrap")) {
      inputSerial++;
      hideSuggestions();
    }
  });
  $("hymn-back").onclick = () => showResults();
  $("hymn-prev-results").onclick = () => {
    page = Math.max(0, page - 1);
    showResults();
  };
  $("hymn-next-results").onclick = () => {
    page++;
    showResults();
  };
  $("hymn-open").onclick = safely(async () => {
    if (!selected) return;
    const response = await browser.runtime.sendMessage({ type: "hymn:open", number: selected.number });
    if (!(response == null ? void 0 : response.ok)) throw Error((response == null ? void 0 : response.error) || "Ouverture du chant indisponible.");
  });
  $("hymn-copy").onclick = safely(async () => {
    if (!selected) return;
    const text = BVHymns.label(selected) + " \u2014 " + selected.title + "\n\n" + selected.text.replace(/\t+/g, "  ");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = element("textarea", text);
      document.body.append(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      if (!copied) throw Error("Copie indisponible. S\xE9lectionnez les paroles du chant.");
    }
    message("Chant copi\xE9.");
  });
  function resize(step) {
    fontSize = Math.max(16, Math.min(30, fontSize + step));
    $("hymn-lyrics").style.setProperty("--hymn-font-size", fontSize + "px");
    $("hymn-smaller").disabled = fontSize === 16;
    $("hymn-larger").disabled = fontSize === 30;
  }
  $("hymn-smaller").onclick = () => resize(-2);
  $("hymn-larger").onclick = () => resize(2);
  (_b = (_a = browser.runtime).getPlatformInfo) == null ? void 0 : _b.call(_a).then((platform) => {
    if (platform.os === "ios") $("hymn-open").textContent = "Onglet \u2197";
  }).catch(() => {
  });
  const requested = new URLSearchParams(location.search).get("hymn");
  if (requested) safely(async () => {
    await switchModule("hymns");
    const hymn = BVHymns.exact(corpus, requested);
    if (!hymn) throw Error("Ce num\xE9ro de chant est introuvable.");
    choose(hymn, { focus: false });
  })();
})();
