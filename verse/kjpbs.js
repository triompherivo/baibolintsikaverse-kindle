(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  if (!$("kjpbs-panel")) return;
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== void 0) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const number = (value) => Number(value).toLocaleString("fr-FR");
  const identifier = () => crypto.randomUUID();
  const emptyPhrase = () => ({ id: identifier(), phrase: "", caseSensitive: false, accentSensitive: false, excluded: false, disabled: false, constraint: 0 });
  const defaults = () => ({ criteria: [emptyPhrase()], scopeMode: "unscoped", selectedBookNumbers: [], selectsEntireBible: true, includeSuperscriptions: true, includeColophons: true, hyphenSensitive: false, resultsLayout: "bookChapterTree" });
  let model = defaults(), corpus, worker, workerGeneration = 0, sequence = 0, loading, initialized = false;
  let result, renderGeneration = 0, resultVersion = 0, busy = false, size = 17, selectedRow, opener;
  let saveTimer, dirty = false, pageOffset = 0;
  const pending = /* @__PURE__ */ new Map();
  const status = (text = "", error = false) => {
    $("kjpbs-status").textContent = text;
    $("kjpbs-status").classList.toggle("error", error);
  };
  const safely = (action) => (...args) => Promise.resolve().then(() => action(...args)).catch((error) => status(error.message, true));
  function seven(value) {
    const node = el("span", number(value));
    if (value > 0 && value % 7 === 0) {
      node.classList.add("kj-seven");
      node.title = `${number(value)} = ${number(value / 7)} \xD7 7`;
    }
    return node;
  }
  function spawn() {
    worker = new Worker("kjpbs-worker.js");
    const generation = ++workerGeneration;
    worker.onmessage = ({ data }) => {
      if (generation !== workerGeneration) return;
      const request = pending.get(data.id);
      if (!request) return;
      pending.delete(data.id);
      clearTimeout(request.timeout);
      if (data.ok) request.resolve(data.value);
      else request.reject(Error(data.error));
    };
    worker.onerror = () => {
      if (generation !== workerGeneration) return;
      stopWorker("Le moteur CCDB a \xE9t\xE9 interrompu. Relancez la recherche.");
      setBusy(false);
    };
  }
  function stopWorker(message) {
    workerGeneration++;
    worker == null ? void 0 : worker.terminate();
    worker = null;
    loading = null;
    for (const request of pending.values()) {
      clearTimeout(request.timeout);
      request.reject(Error(message));
    }
    pending.clear();
  }
  function rpc(type, payload = {}) {
    if (!worker) spawn();
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const timeout = setTimeout(() => {
        if (pending.has(id)) {
          stopWorker("Le d\xE9lai de recherche est d\xE9pass\xE9. Le moteur a \xE9t\xE9 arr\xEAt\xE9 ; r\xE9essayez une expression plus pr\xE9cise.");
          setBusy(false);
        }
      }, 3e4);
      pending.set(id, { resolve, reject, timeout });
      worker.postMessage({ id, type, ...payload });
    });
  }
  async function ensureLoaded() {
    if (!loading) loading = rpc("load").then((value) => {
      corpus = value;
      $("kjpbs-corpus").textContent = `${value.info.displayName} \xB7 CCDB \xB7 ${number(value.indexedWordCount)} mots \xB7 ${value.books.length} livres`;
      $("kjpbs-export").disabled = false;
      return value;
    }).catch((error) => {
      loading = null;
      throw error;
    });
    return loading;
  }
  function setBusy(value) {
    busy = value;
    $("kjpbs-search").disabled = value;
    $("kjpbs-search").textContent = value ? "Recherche\u2026" : "Chercher";
    $("kjpbs-cancel").hidden = !value;
    $("kjpbs-panel").setAttribute("aria-busy", String(value));
  }
  function snapshot() {
    const selected = [...$("kjpbs-books").querySelectorAll("input:checked")].map((input) => Number(input.value));
    model.scopeMode = $("kjpbs-scope").value;
    model.selectsEntireBible = selected.length === (corpus == null ? void 0 : corpus.books.length);
    model.selectedBookNumbers = model.selectsEntireBible ? [] : selected;
    model.includeSuperscriptions = $("kjpbs-superscriptions").checked;
    model.includeColophons = $("kjpbs-colophons").checked;
    model.hyphenSensitive = $("kjpbs-hyphen").checked;
    model.resultsLayout = $("kjpbs-layout").value;
    return JSON.parse(JSON.stringify(model));
  }
  function preferences() {
    return { preview: $("kjpbs-preview").checked, highlights: $("kjpbs-highlights").checked, mentions: $("kjpbs-mentions").checked, numbering: $("kjpbs-numbering").value, size };
  }
  function save() {
    clearTimeout(saveTimer);
    if (!corpus) return Promise.resolve();
    return BVSettings.set({ kjpbsSnapshot: snapshot(), kjpbsDisplay: preferences() });
  }
  function changed() {
    dirty = true;
    if (result) status("Crit\xE8res modifi\xE9s. Lancez la recherche pour actualiser les r\xE9sultats.");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => void save(), 350);
    bookCount();
  }
  function bookCount() {
    const count = $("kjpbs-books").querySelectorAll("input:checked").length;
    $("kjpbs-book-count").textContent = count === (corpus == null ? void 0 : corpus.books.length) ? "Tous les livres" : `${count} livre${count > 1 ? "s" : ""} s\xE9lectionn\xE9${count > 1 ? "s" : ""}`;
  }
  function checkbox(text, value, update, className) {
    const label = el("label", void 0, className), input = el("input");
    input.type = "checkbox";
    input.checked = !!value;
    input.onchange = () => update(input.checked);
    label.append(input, document.createTextNode(" " + text));
    return label;
  }
  function renderCriteria() {
    const container = $("kjpbs-criteria");
    container.replaceChildren();
    model.criteria.forEach((criterion, index) => {
      const row = el("div", void 0, "kj-criterion");
      row.dataset.id = criterion.id;
      row.dataset.disabled = String(!!criterion.disabled);
      row.dataset.excluded = String(!!criterion.excluded);
      const line = el("div", void 0, "kj-phrase-line"), input = el("input", void 0, "kj-phrase");
      input.type = "text";
      input.value = criterion.phrase;
      input.maxLength = 32768;
      input.autocomplete = "off";
      input.placeholder = index === 0 ? "Ex. Jesus \xB7 in the beginning" : "Ajouter une expression\u2026";
      input.setAttribute("aria-label", `Phrase ${index + 1}`);
      input.oninput = () => {
        criterion.phrase = input.value;
        changed();
      };
      const remove = el("button", "\u2715", "kj-remove");
      remove.type = "button";
      remove.disabled = model.criteria.length === 1;
      remove.setAttribute("aria-label", `Supprimer la phrase ${index + 1}`);
      remove.onclick = () => {
        model.criteria.splice(index, 1);
        renderCriteria();
        changed();
      };
      line.append(el("span", String(index + 1).padStart(2, "0"), "kj-criterion-number"), input, remove);
      const options = el("div", void 0, "kj-criterion-options");
      for (const [key, title] of [["caseSensitive", "Case"], ["accentSensitive", "Accent"], ["excluded", "Exclure"], ["disabled", "D\xE9sactiver"]]) {
        options.append(checkbox(title, criterion[key], (value) => {
          criterion[key] = value;
          row.dataset.disabled = String(!!criterion.disabled);
          row.dataset.excluded = String(!!criterion.excluded);
          changed();
        }));
      }
      const boundary = el("label", "Contrainte "), select = el("select");
      select.setAttribute("aria-label", `Contrainte de la phrase ${index + 1}`);
      [["0", "Sans limite"], ["1", "M\xEAme verset"], ["2", "M\xEAme chapitre"], ["3", "M\xEAme livre"]].forEach(([value, title]) => select.add(new Option(title, value)));
      select.value = String(criterion.constraint || 0);
      select.onchange = () => {
        criterion.constraint = Number(select.value);
        changed();
      };
      boundary.append(select);
      options.append(boundary);
      const statistics = el("p", void 0, "kj-criterion-stats");
      statistics.dataset.criterion = criterion.id;
      row.append(line, options, statistics);
      container.append(row);
    });
    $("kjpbs-add").disabled = model.criteria.length >= 256;
    renderTermStatistics();
  }
  function fillBooks() {
    $("kjpbs-books").replaceChildren(...corpus.books.map((book) => {
      const label = el("label"), input = el("input");
      input.type = "checkbox";
      input.value = String(book.databaseNumber);
      input.checked = model.selectsEntireBible || model.selectedBookNumbers.includes(book.databaseNumber);
      input.onchange = changed;
      label.append(input, document.createTextNode(book.longName));
      return label;
    }));
    const presets = $("kjpbs-book-preset");
    presets.replaceChildren(new Option("Choisir un groupe\u2026", ""), new Option("Ancien Testament", "testament:1"), new Option("Nouveau Testament", "testament:2"));
    for (const category of [...new Set(corpus.books.map((book) => book.categoryName))]) presets.add(new Option(category, "category:" + category));
    bookCount();
  }
  function restore(value) {
    model = value && Array.isArray(value.criteria) && value.criteria.length && value.criteria.length <= 256 ? JSON.parse(JSON.stringify(value)) : defaults();
    model.criteria = model.criteria.map((item) => ({ ...emptyPhrase(), ...item, id: item.id || identifier() }));
    if (!["unscoped", "wholeBible", "testament", "category", "book", "chapter", "verse"].includes(model.scopeMode)) model.scopeMode = "unscoped";
    if (!["list", "bookTree", "bookChapterTree"].includes(model.resultsLayout)) model.resultsLayout = "bookChapterTree";
    model.selectedBookNumbers = Array.isArray(model.selectedBookNumbers) ? model.selectedBookNumbers : [];
    $("kjpbs-scope").value = model.scopeMode;
    $("kjpbs-layout").value = model.resultsLayout;
    $("kjpbs-superscriptions").checked = model.includeSuperscriptions !== false;
    $("kjpbs-colophons").checked = model.includeColophons !== false;
    $("kjpbs-hyphen").checked = !!model.hyphenSensitive;
    renderCriteria();
    fillBooks();
  }
  function renderTermStatistics() {
    for (const node of $("kjpbs-criteria").querySelectorAll(".kj-criterion-stats")) {
      const stats = result == null ? void 0 : result.summary.termStatistics.find((item) => item.id === node.dataset.criterion);
      node.replaceChildren();
      if (!stats) continue;
      for (const [label, key] of [["Bible", "totalMatches"], ["S\xE9lection", "matchesWithinSelection"], [stats.excluded ? "Retir\xE9es" : "R\xE9sultats", "contributingMatches"]]) {
        const span = el("span", label + " ");
        span.append(seven(stats[key]));
        node.append(span);
      }
    }
  }
  function formatText(row) {
    var _a;
    const text = row.text || "", fragment = document.createDocumentFragment(), highlights = row.highlights || [];
    const showMarks = $("kjpbs-highlights").checked, showMentions = $("kjpbs-mentions").checked;
    const boundaries = /* @__PURE__ */ new Set([0, text.length]);
    const formatting = row.formatting || [];
    const valid = (range) => range && Number.isFinite(range.location) && range.location >= 0 && range.length > 0 && range.location < text.length;
    for (const entry of [...highlights, ...formatting]) if (valid(entry.range)) {
      boundaries.add(entry.range.location);
      boundaries.add(Math.min(text.length, entry.range.location + entry.range.length));
    }
    const points = [...boundaries].sort((a, b) => a - b);
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i], end = points[i + 1];
      let node = document.createTextNode(text.slice(start, end));
      for (const style of formatting.filter((item) => item.range.location <= start && item.range.location + item.range.length >= end)) {
        if (!["translatorAdded", "wordsOfJesus", "divineName"].includes(style.style)) continue;
        const span = el("span", void 0, "kj-" + style.style);
        span.append(node);
        node = span;
      }
      const matches = highlights.filter((item) => item.range.location <= start && item.range.location + item.range.length >= end);
      if (matches.length && showMarks) {
        const mark = el("mark", void 0, "kj-mark-" + matches[0].criterionIndex % 6);
        mark.title = "Phrase " + (matches[0].criterionIndex + 1);
        mark.append(node);
        node = mark;
      }
      fragment.append(node);
      if (showMentions) for (const match of highlights.filter((item) => item.range.location + item.range.length === end)) {
        const rank = (_a = match.mention) == null ? void 0 : _a[$("kjpbs-numbering").value];
        if (!(rank == null ? void 0 : rank.index)) continue;
        const sup = el("sup", void 0, "kj-mention");
        sup.append(seven(rank.index));
        const labels = { wholeBible: "Bible", selection: "s\xE9lection", results: "r\xE9sultats" };
        sup.title = `Phrase ${match.criterionIndex + 1} \xB7 ` + Object.entries(labels).map(([key, label]) => {
          var _a2, _b;
          return `${label} ${((_a2 = match.mention[key]) == null ? void 0 : _a2.index) || 0}/${((_b = match.mention[key]) == null ? void 0 : _b.total) || 0}`;
        }).join(" \xB7 ");
        fragment.append(sup);
      }
    }
    return fragment;
  }
  async function openPassage(row, source) {
    selectedRow = row;
    opener = source;
    $("kjpbs-passage-title").textContent = row.reference.displayText;
    $("kjpbs-passage-text").replaceChildren(formatText(row));
    $("kjpbs-chapter").replaceChildren();
    $("kjpbs-context").hidden = row.reference.kind === 2;
    $("kjpbs-copy").textContent = "Copier le passage";
    $("kjpbs-ranks").replaceChildren(...row.highlights.map((match) => {
      const item = el("li", `Phrase ${match.criterionIndex + 1} \xB7 `);
      for (const [key, label] of [["wholeBible", "Bible"], ["selection", "s\xE9lection"], ["results", "r\xE9sultats"]]) {
        const rank = match.mention[key];
        if (!(rank == null ? void 0 : rank.index)) continue;
        item.append(label + " ", seven(rank.index), " / ", seven(rank.total), " \xB7 ");
      }
      return item;
    }));
    if (!$("kjpbs-passage").open) $("kjpbs-passage").showModal();
    $("kjpbs-passage").querySelector(".kj-dialog-scroll").scrollTop = 0;
  }
  function rowElement(row, excluded) {
    const button = el("button", void 0, "kj-row");
    button.type = "button";
    button.dataset.excluded = String(excluded);
    const head = el("span", void 0, "kj-row-head"), count = el("span", void 0, "kj-row-count");
    count.append(seven(row.occurrenceCount), " occ.");
    head.append(el("strong", row.reference.displayText), count);
    button.append(head);
    if ($("kjpbs-preview").checked) {
      const text = el("p", void 0, "kj-text");
      text.append(formatText(row));
      button.append(text);
    }
    button.onclick = safely(() => openPassage(row, button));
    return button;
  }
  function pagination(page, change) {
    const nav = el("nav", void 0, "kj-pagination");
    nav.setAttribute("aria-label", "Pages des r\xE9sultats CCDB");
    const previous = el("button", "\u2190 Pr\xE9c\xE9dents"), next = el("button", "Suivants \u2192");
    previous.type = next.type = "button";
    previous.disabled = page.offset === 0;
    next.disabled = page.offset + page.results.length >= page.total;
    previous.onclick = safely(() => change(Math.max(0, page.offset - 50)));
    next.onclick = safely(() => change(page.offset + 50));
    nav.append(previous, el("span", `${number(page.offset + 1)}\u2013${number(Math.min(page.offset + page.results.length, page.total))} / ${number(page.total)}`), next);
    return nav;
  }
  async function fillRows(container, options, ticket) {
    const version = resultVersion, page = await rpc("page", { options: { ...options, limit: 50 } });
    if (ticket !== renderGeneration || version !== resultVersion || !container.isConnected) return;
    container.replaceChildren(...page.results.map((row) => rowElement(row, !!options.excluded)));
    if (!page.total) container.append(el("p", "Aucune occurrence dans cette branche.", "kj-caption"));
    if (page.total > 50) container.append(pagination(page, (offset) => fillRows(container, { ...options, offset }, ticket)));
  }
  function treeBranch(group, excluded, chapter, ticket) {
    const details = el("details", void 0, "kj-tree"), summary = el("summary");
    const entry = chapter === void 0 ? group : chapter;
    const title = chapter === void 0 ? group.longName : chapter.chapter ? `${group.shortName} ${chapter.chapter}` : "Colophon";
    const count = el("span", void 0, "kj-tree-count");
    count.append(seven(entry.resultCount), " passages \xB7 ", seven(entry.occurrenceCount), " occ.");
    summary.append(el("span", title, "kj-tree-title"), count);
    details.append(summary);
    const content = el("div");
    details.append(content);
    let fetched = false;
    details.ontoggle = safely(async () => {
      var _a;
      if (!details.open || fetched) return;
      fetched = true;
      if (chapter === void 0 && model.resultsLayout === "bookChapterTree") {
        content.replaceChildren(...group.chapters.map((item) => treeBranch(group, excluded, item, ticket)));
      } else {
        content.textContent = "Chargement\u2026";
        try {
          await fillRows(content, { excluded, bookNumber: group.bookNumber, chapter: (_a = chapter == null ? void 0 : chapter.chapter) != null ? _a : null, offset: 0 }, ticket);
        } catch (error) {
          fetched = false;
          throw error;
        }
      }
    });
    return details;
  }
  async function renderResults() {
    if (!result) return;
    const ticket = ++renderGeneration, excluded = $("kjpbs-result-mode").value === "excluded";
    const groups = excluded ? result.excludedGroups : result.groups;
    const total = excluded ? result.totalExcludedResults : result.totalResults;
    const occurrences = excluded ? groups.reduce((sum, item) => sum + item.occurrenceCount, 0) : result.summary.occurrences;
    $("kjpbs-result-count").replaceChildren(seven(total), ` passages ${excluded ? "exclus" : "retenus"} \xB7 `, seven(occurrences), " occurrences.");
    $("kjpbs-results").replaceChildren();
    if (!total) {
      $("kjpbs-results").append(el("p", excluded ? "Aucune occurrence exclue." : "Aucune occurrence retenue. V\xE9rifiez les phrases, leur port\xE9e et la s\xE9lection des livres.", "kj-results-empty"));
      return;
    }
    model.resultsLayout = $("kjpbs-layout").value;
    if (model.resultsLayout === "list") await fillRows($("kjpbs-results"), { excluded, offset: pageOffset }, ticket);
    else $("kjpbs-results").replaceChildren(...groups.map((group) => treeBranch(group, excluded, void 0, ticket)));
  }
  function renderStats() {
    const stats = $("kjpbs-stats");
    stats.replaceChildren();
    for (const [key, title] of [["occurrences", "Occurrences"], ["verses", "Versets"], ["chapters", "Chapitres"], ["books", "Livres"]]) {
      const card = el("div", void 0, "kj-stat"), value = el("strong");
      value.append(seven(result.summary[key]));
      card.dataset.stat = key;
      card.append(value, el("small", title));
      stats.append(card);
    }
    renderTermStatistics();
  }
  async function search() {
    if (busy) return;
    setBusy(true);
    status("Recherche dans la KJV CCDB\u2026");
    const start = performance.now();
    try {
      await ensureLoaded();
      const requested = snapshot();
      dirty = false;
      const value = await rpc("search", { snapshot: requested });
      result = value;
      resultVersion++;
      pageOffset = 0;
      $("kjpbs-output").hidden = false;
      renderStats();
      await renderResults();
      const elapsed = performance.now() - start;
      $("kjpbs-panel").dataset.lastMilliseconds = String(Math.round(elapsed));
      $("kjpbs-panel").dataset.lastOccurrences = String(value.summary.occurrences);
      status(dirty ? "Crit\xE8res modifi\xE9s pendant la recherche. Relancez-la pour les appliquer." : `${number(value.summary.occurrences)} occurrences \xB7 calcul ${Math.round(value.elapsedMilliseconds)} ms \xB7 affichage ${Math.round(elapsed)} ms.`);
      await save();
      document.dispatchEvent(new CustomEvent("bv-kjpbs-results", { detail: { occurrences: value.summary.occurrences, milliseconds: elapsed } }));
    } finally {
      setBusy(false);
    }
  }
  async function initialize() {
    if (initialized) return;
    initialized = true;
    setBusy(true);
    status("Chargement de la KJV CCDB\u2026");
    try {
      const [data, saved] = await Promise.all([ensureLoaded(), BVSettings.get({ kjpbsSnapshot: null, kjpbsDisplay: null })]);
      restore(saved.kjpbsSnapshot);
      const display = saved.kjpbsDisplay;
      if (display) {
        for (const key of ["preview", "highlights", "mentions"]) $("kjpbs-" + key).checked = display[key] !== false;
        if (["results", "selection", "wholeBible"].includes(display.numbering)) $("kjpbs-numbering").value = display.numbering;
        if (Number.isFinite(display.size)) size = Math.max(13, Math.min(30, display.size));
      }
      $("kjpbs-panel").style.setProperty("--kj-text-size", size + "px");
      status(`KJV CCDB pr\xEAte \xB7 ${number(data.indexedWordCount)} mots \xB7 charg\xE9e en ${Math.round(data.loadMilliseconds)} ms.`);
      if (model.criteria.some((item) => item.phrase.trim() && !item.excluded && !item.disabled)) {
        setBusy(false);
        await search();
      }
    } catch (error) {
      initialized = false;
      throw error;
    } finally {
      setBusy(false);
    }
  }
  $("kjpbs-form").onsubmit = (event) => {
    event.preventDefault();
    safely(search)();
  };
  $("kjpbs-add").onclick = () => {
    if (model.criteria.length >= 256) return;
    model.criteria.push(emptyPhrase());
    renderCriteria();
    changed();
    $("kjpbs-criteria").querySelector(".kj-criterion:last-child .kj-phrase").focus();
  };
  for (const id of ["kjpbs-scope", "kjpbs-superscriptions", "kjpbs-colophons", "kjpbs-hyphen"]) $(id).onchange = changed;
  for (const [id, checked] of [["kjpbs-all", true], ["kjpbs-none", false]]) $(id).onclick = () => {
    for (const input of $("kjpbs-books").querySelectorAll("input")) input.checked = checked;
    changed();
  };
  $("kjpbs-book-preset").onchange = () => {
    const value = $("kjpbs-book-preset").value;
    if (!value) return;
    const [type, ...rest] = value.split(":"), target = rest.join(":");
    for (const input of $("kjpbs-books").querySelectorAll("input")) {
      const book = corpus.books.find((item) => item.databaseNumber === Number(input.value));
      input.checked = type === "testament" ? book.testamentNumber === Number(target) : book.categoryName === target;
    }
    $("kjpbs-book-preset").value = "";
    changed();
  };
  for (const id of ["kjpbs-result-mode", "kjpbs-layout", "kjpbs-preview", "kjpbs-highlights", "kjpbs-mentions", "kjpbs-numbering"]) $(id).onchange = safely(async () => {
    pageOffset = 0;
    await renderResults();
    await save();
  });
  for (const [id, increment] of [["kjpbs-smaller", -1], ["kjpbs-larger", 1]]) $(id).onclick = safely(async () => {
    size = Math.max(13, Math.min(30, size + increment));
    $("kjpbs-panel").style.setProperty("--kj-text-size", size + "px");
    await save();
  });
  $("kjpbs-cancel").onclick = () => {
    stopWorker("Recherche annul\xE9e.");
    result = null;
    resultVersion++;
    renderGeneration++;
    $("kjpbs-output").hidden = true;
    setBusy(false);
    status("Recherche annul\xE9e. La base sera recharg\xE9e \xE0 la prochaine recherche.");
  };
  $("kjpbs-reset").onclick = safely(async () => {
    setBusy(true);
    try {
      stopWorker("Nouvelle recherche.");
      result = null;
      resultVersion++;
      renderGeneration++;
      $("kjpbs-output").hidden = true;
      await ensureLoaded();
      restore(defaults());
      await save();
      status("Nouvelle recherche.");
      $("kjpbs-criteria").querySelector("input").focus();
    } finally {
      setBusy(false);
    }
  });
  $("kjpbs-import").onclick = () => $("kjpbs-file").click();
  $("kjpbs-file").onchange = safely(async () => {
    const file = $("kjpbs-file").files[0];
    $("kjpbs-file").value = "";
    if (!file) return;
    if (file.size > VerseKJPBSKJS.limits.maxBytes) throw Error("Le fichier .kjs d\xE9passe la taille maximale de 2 Mio.");
    await ensureLoaded();
    const parsed = VerseKJPBSKJS.decode(await file.arrayBuffer(), corpus.books);
    if (parsed.databaseUUID && parsed.databaseUUID.toUpperCase() !== corpus.info.uuid.toUpperCase()) throw Error("Ce fichier utilise une autre base biblique. La recherche CCDB n\xE9cessite la KJV 1769 ; aucun crit\xE8re n\u2019a \xE9t\xE9 remplac\xE9.");
    restore(parsed.snapshot);
    await search();
  });
  $("kjpbs-export").onclick = safely(async () => {
    await ensureLoaded();
    const text = VerseKJPBSKJS.encode(snapshot(), corpus.info.uuid, corpus.books);
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = el("a");
    link.href = url;
    link.download = "BaibolintsikaVerse-KJV.kjs";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3e4);
    status("Recherche export\xE9e au format .kjs.");
  });
  $("kjpbs-open").onclick = safely(async () => {
    await save();
    const response = await browser.runtime.sendMessage({ type: "kjpbs:open" });
    if (!(response == null ? void 0 : response.ok)) throw Error((response == null ? void 0 : response.error) || "La fen\xEAtre CCDB ne peut pas \xEAtre ouverte.");
  });
  $("kjpbs-close").onclick = () => $("kjpbs-passage").close();
  $("kjpbs-passage").onclose = () => {
    opener == null ? void 0 : opener.focus({ preventScroll: true });
  };
  $("kjpbs-copy").onclick = safely(async () => {
    if (!selectedRow) return;
    await navigator.clipboard.writeText(selectedRow.reference.displayText + " " + selectedRow.text);
    $("kjpbs-copy").textContent = "Copi\xE9";
  });
  $("kjpbs-context").onclick = safely(async () => {
    if (!selectedRow) return;
    const row = selectedRow;
    const passages = await rpc("passage", { options: { bookNumber: row.reference.bookNumber, chapter: row.reference.chapter } });
    if (selectedRow !== row || !$("kjpbs-passage").open) return;
    $("kjpbs-chapter").replaceChildren(...passages.map((passage) => {
      const wrapper = el("div", void 0, "kj-context-row"), text = el("p", void 0, "kj-text");
      text.append(formatText(passage.id === row.id ? row : passage));
      wrapper.append(el("span", passage.reference.displayText, "kj-ref"), text);
      return wrapper;
    }));
  });
  document.addEventListener("bv-module", (event) => {
    if (event.detail === "kjpbs") safely(initialize)();
  });
  addEventListener("pagehide", () => {
    void save();
    stopWorker("Fen\xEAtre CCDB ferm\xE9e.");
  });
  if (new URLSearchParams(location.search).has("kjpbs")) BVLibrary.select("kjpbs");
})();
