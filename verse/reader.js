(() => {
  "use strict";
  var _a, _b;
  const $ = (id) => document.getElementById(id);
  const popup = location.pathname.endsWith("popup.html");
  const params = new URLSearchParams(location.search);
  const chapterMode = !popup && (params.has("chapterReader") || params.has("selection") || params.has("ref"));
  if (popup) document.body.classList.add("popup");
  if (chapterMode) {
    document.body.classList.add("chapter-window");
    $("chapter-options").hidden = false;
    $("open").hidden = true;
  }
  (_b = (_a = browser.runtime).getPlatformInfo) == null ? void 0 : _b.call(_a).then((platform) => {
    if (platform.os === "ios") {
      document.getElementById("open").textContent = "Onglet \u2197";
      document.getElementById("open").title = "Ouvrir dans un onglet Chrome";
    }
  }).catch(() => {
  });
  let version = "1MG1865", current = BV.parse("Jaona 3:16"), passage = null, searchQuery = "", readingQuery = "", offset = 0, serial = 0;
  let parallel = false, parallelEdition = "KJF", fontSize = 0;
  const editionLabels = { "1MG1865": "MDG \xB7 Malagasy", KJF: "KJF \xB7 Nadine L. Stratford", KJV: "KJV \xB7 English" };
  function updateChapterControls() {
    const choices = BV.versions.filter((item) => item !== version);
    if (!choices.includes(parallelEdition)) parallelEdition = choices[0];
    $("chapter-edition").replaceChildren(...choices.map((item) => new Option(editionLabels[item], item)));
    $("chapter-edition").value = parallelEdition;
    $("chapter-edition").hidden = !parallel;
    $("chapter-parallel").textContent = parallel ? "Parall\xE8le : actif" : "Parall\xE8le : inactif";
    $("chapter-parallel").setAttribute("aria-pressed", String(parallel));
    $("chapter-size").textContent = fontSize ? fontSize + " px" : "Auto";
    if (fontSize) $("verses").style.setProperty("--chapter-font", fontSize + "px");
    else $("verses").style.removeProperty("--chapter-font");
  }
  const element = (tag, text) => {
    const el = document.createElement(tag);
    if (text !== void 0) el.textContent = text;
    return el;
  };
  function appendHighlighted(container, text, ranges = []) {
    let from = 0;
    for (const [start, end] of ranges) {
      container.append(document.createTextNode(text.slice(from, start)), element("mark", text.slice(start, end)));
      from = end;
    }
    container.append(document.createTextNode(text.slice(from)));
  }
  function status(text, error = false) {
    $("status").textContent = text;
    $("status").classList.toggle("error", error);
  }
  BVSettings.subscribe((available) => {
    $("storage-notice").hidden = available;
    $("storage-notice").textContent = available ? "" : "Pr\xE9f\xE9rences non enregistr\xE9es : vos choix restent actifs dans cette fen\xEAtre. Fermez puis rouvrez Chrome pour r\xE9essayer.";
  });
  async function send(message) {
    const r = await Promise.race([browser.runtime.sendMessage(message), new Promise((_, reject) => setTimeout(() => reject(Error("Le service BaibolintsikaVerse ne r\xE9pond pas. Fermez puis rouvrez Chrome.")), 8e3))]);
    if (!(r == null ? void 0 : r.ok)) throw Error((r == null ? void 0 : r.error) || "Extension indisponible.");
    return r.value;
  }
  function safely(fn) {
    return (...args) => Promise.resolve().then(() => fn(...args)).catch((e) => status(e.message, true));
  }
  function fillBooks() {
    for (const id of ["book", "filter"]) {
      $(id).replaceChildren();
      if (id === "filter") $(id).append(new Option("Tous les livres", "0"));
      for (const b of BV.books) $(id).append(new Option(BV.bookName(b, version), b.id));
    }
    $("book").value = current.book;
  }
  function fillChapters() {
    const count = BV.books[current.book - 1].counts[version].length;
    $("chapter").replaceChildren();
    for (let c = 1; c <= count; c++) $("chapter").append(new Option("Ch. " + c, c));
    $("chapter").value = current.chapter;
    $("previous").disabled = current.book === 1 && current.chapter === 1;
    $("next").disabled = current.book === 66 && current.chapter === count;
  }
  function chapterRef(book, chapter) {
    return { book, chapter, parts: [{ chapter, from: 1, to: BV.books[book - 1].counts[version][chapter - 1] }], wholeChapter: true };
  }
  async function render(ref, { scroll = true, highlightQuery = "" } = {}) {
    var _a2;
    const highlights = highlightQuery ? BV.compileQuery(highlightQuery) : null;
    const ticket = ++serial;
    status("Chargement\u2026");
    if (chapterMode) updateChapterControls();
    const compare = chapterMode && parallel;
    const [result, other] = await Promise.all([
      send({ type: "passage", ref, version, context: !popup || ref.wholeChapter }),
      compare ? send({ type: "passage", ref, version: parallelEdition, context: true }) : null
    ]);
    if (ticket !== serial) return;
    current = ref;
    passage = result;
    readingQuery = highlightQuery;
    $("reading").hidden = false;
    $("search-results").hidden = true;
    $("reference").textContent = result.label;
    $("edition").textContent = BV.editions[version];
    $("book").value = current.book;
    fillChapters();
    $("verses").replaceChildren();
    const headings = $("chapter-headings");
    headings.hidden = !compare;
    headings.replaceChildren(...compare ? [element("strong", editionLabels[version]), element("strong", editionLabels[parallelEdition])] : []);
    $("verses").classList.toggle("parallel-verses", compare);
    if (chapterMode) document.title = BV.bookName(BV.books[ref.book - 1], version) + " " + ref.chapter + " \xB7 BaibolintsikaVerse";
    const rows = new Map(result.rows.map((row) => [`${row.chapter}:${row.verse}`, { main: row }]));
    for (const row of (other == null ? void 0 : other.rows) || []) {
      const key = `${row.chapter}:${row.verse}`;
      if (!rows.has(key)) rows.set(key, {});
      rows.get(key).other = row;
    }
    let chapter = 0;
    const ordered = [...rows.values()].sort((a, b) => (a.main || a.other).chapter - (b.main || b.other).chapter || (a.main || a.other).verse - (b.main || b.other).verse);
    for (const { main, other: secondary } of ordered) {
      const row = main || secondary;
      if (row.chapter !== chapter && result.ref.parts.some((p2) => p2.chapter !== current.chapter)) $("verses").append(Object.assign(element("h3", "Chapitre " + row.chapter), { className: "chapter-break" }));
      chapter = row.chapter;
      const p = element("div");
      p.className = "verse" + (row.selected && !ref.wholeChapter ? " selected" : "");
      p.dataset.verse = `${row.chapter}:${row.verse}`;
      for (const entry of compare ? [main, secondary] : [main]) {
        const column = element("div");
        column.className = "chapter-column";
        column.append(element("sup", row.verse));
        if (entry) appendHighlighted(column, entry.text, entry === main ? highlights == null ? void 0 : highlights.ranges(entry.text) : []);
        else column.append(element("span", "Absent de cette \xE9dition"));
        p.append(column);
      }
      $("verses").append(p);
    }
    status(result.missing.length ? `Verset(s) absent(s) de ${version} : ${result.missing.join(", ")}. Num\xE9rotation d\u2019origine conserv\xE9e.` : "");
    void BVSettings.set({ lastPassage: ref, version });
    if ($("crossrefs").checked) await renderCrossrefs(ticket);
    if (scroll && !popup) (_a2 = document.querySelector(".verse.selected")) == null ? void 0 : _a2.scrollIntoView({ block: "center" });
  }
  async function renderCrossrefs(ticket = serial) {
    document.querySelectorAll(".xref-list").forEach((e) => e.remove());
    $("numbering").hidden = !$("crossrefs").checked;
    if (!$("crossrefs").checked || !passage) return;
    const parts = [...new Set(passage.rows.map((r) => r.chapter))].map((chapter) => ({ chapter, from: 1, to: Math.max(...passage.rows.filter((r) => r.chapter === chapter).map((r) => r.verse)) }));
    const refs = await send({ type: "crossrefs", ref: { book: current.book, chapter: current.chapter, parts } });
    if (ticket !== serial || !$("crossrefs").checked) return;
    for (const p of document.querySelectorAll(".verse")) {
      const list = refs[p.dataset.verse] || [];
      if (!list.length) continue;
      const div = element("div");
      div.className = "xref-list";
      for (const ref of list) {
        const b = element("button", BV.label(ref, "KJV"));
        b.onclick = safely(() => send({ type: "open", ref, version: "KJV" }));
        div.append(b);
      }
      p.after(div);
    }
  }
  async function search(reset = false) {
    if (reset) {
      offset = 0;
      $("filter").value = "0";
    }
    const ticket = ++serial, resultQuery = searchQuery;
    status("Recherche hors ligne\u2026");
    const result = await send({ type: "search", query: resultQuery, version, offset, book: +$("filter").value });
    if (ticket !== serial) return;
    $("reading").hidden = true;
    $("search-results").hidden = false;
    $("hits").replaceChildren();
    $("frequencies").replaceChildren();
    $("result-title").textContent = `${result.total.toLocaleString("fr-FR")} verset${result.total !== 1 ? "s" : ""}`;
    const max = Math.max(1, ...Object.values(result.counts));
    for (const [book, count] of Object.entries(result.counts)) {
      const bar = element("button");
      const name = BV.bookName(BV.books[book - 1], version);
      bar.title = `${name} : ${count} versets`;
      bar.setAttribute("aria-label", bar.title);
      bar.style.height = `${Math.max(6, count / max * 100)}%`;
      bar.onclick = safely(() => {
        $("filter").value = book;
        offset = 0;
        return search();
      });
      $("frequencies").append(bar);
    }
    for (const hit of result.results) {
      const ref = { book: hit.book, chapter: hit.chapter, parts: [{ chapter: hit.chapter, from: hit.verse, to: hit.verse }] };
      const b = element("button");
      b.className = "hit";
      const words = element("p");
      appendHighlighted(words, hit.text, hit.highlights);
      b.append(element("strong", BV.label(ref, version)), words);
      b.onclick = safely(() => render(ref, { highlightQuery: resultQuery }));
      $("hits").append(b);
    }
    $("prev-results").disabled = offset === 0;
    $("next-results").disabled = offset + 50 >= result.total;
    $("page-count").textContent = result.total ? `${offset + 1}\u2013${Math.min(offset + 50, result.total)} / ${result.total}` : "Aucun r\xE9sultat";
    status(`\xAB ${resultQuery} \xBB \xB7 ${version} \xB7 Op\xE9rateurs \xE9valu\xE9s dans chaque verset \xB7 mots trouv\xE9s surlign\xE9s.`);
  }
  $("entry").onsubmit = safely(async (e) => {
    e.preventDefault();
    const query = $("query").value.trim();
    const ref = BV.parse(query);
    if (ref) await render(ref);
    else {
      if (/\d\s*[:.]\s*\d/.test(query)) throw Error("R\xE9f\xE9rence invalide. Exemple : Jaona 3:16 ou John 3:16-18.");
      searchQuery = query;
      await search(true);
    }
  });
  const submit = $("entry").onsubmit;
  $("entry").onsubmit = (e) => {
    e.preventDefault();
    submit(e);
  };
  $("version").onchange = safely(async () => {
    const wasSearching = !$("search-results").hidden;
    version = $("version").value;
    void BVSettings.set({ version });
    fillBooks();
    fillChapters();
    if (wasSearching) await search(true);
    else await render(current, { scroll: false, highlightQuery: readingQuery });
  });
  $("enabled").onchange = safely(async () => {
    const toggle = $("enabled"), value = toggle.checked;
    toggle.disabled = true;
    try {
      if (!await BVSettings.set({ enabled: value })) {
        toggle.checked = !value;
        void BVSettings.set({ enabled: !value });
        status("Les r\xE9f\xE9rences sur les pages n\u2019ont pas pu \xEAtre modifi\xE9es. Fermez puis rouvrez Chrome pour r\xE9essayer.", true);
      }
    } finally {
      toggle.disabled = false;
    }
  });
  $("book").onchange = safely(() => render(chapterRef(+$("book").value, 1), { scroll: false }));
  $("chapter").onchange = safely(() => render(chapterRef(current.book, +$("chapter").value), { scroll: false }));
  for (const [id, step] of [["previous", -1], ["next", 1]]) $(id).onclick = safely(() => {
    let b = current.book, c = current.chapter + step;
    const count = BV.books[b - 1].counts[version].length;
    if (c < 1) {
      b--;
      c = BV.books[b - 1].counts[version].length;
    }
    if (c > count && step > 0) {
      b++;
      c = 1;
    }
    return render(chapterRef(b, c), { scroll: false });
  });
  $("open").onclick = safely(() => send({ type: "open", ref: current, version, searchQuery: readingQuery, chapterReader: true }));
  $("chapter-parallel").onclick = safely(async () => {
    parallel = !parallel;
    await BVSettings.set({ chapterParallel: parallel });
    await render(current, { scroll: false, highlightQuery: readingQuery });
  });
  $("chapter-edition").onchange = safely(async () => {
    parallelEdition = $("chapter-edition").value;
    await BVSettings.set({ chapterParallelEdition: parallelEdition });
    await render(current, { scroll: false, highlightQuery: readingQuery });
  });
  for (const [id, step] of [["chapter-smaller", -2], ["chapter-larger", 2], ["chapter-auto", 0]]) {
    $(id).onclick = safely(async () => {
      fontSize = step ? Math.min(44, Math.max(14, (fontSize || 20) + step)) : 0;
      updateChapterControls();
      await BVSettings.set({ chapterFontSize: fontSize });
    });
  }
  $("copy").onclick = safely(async () => {
    if (!passage) return;
    const text = passage.label + " (" + version + ")\n" + passage.rows.filter((r) => r.selected).map((r) => `${r.verse}. ${r.text}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = element("textarea", text);
      document.body.append(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      if (!ok) throw Error("Copie indisponible. S\xE9lectionnez le texte du passage.");
    }
    status("Passage copi\xE9.");
  });
  $("crossrefs").onchange = safely(async () => {
    void BVSettings.set({ crossrefs: $("crossrefs").checked });
    await renderCrossrefs();
  });
  $("back").onclick = safely(() => render(current));
  $("filter").onchange = safely(() => {
    offset = 0;
    return search();
  });
  $("prev-results").onclick = safely(() => {
    offset = Math.max(0, offset - 50);
    return search();
  });
  $("next-results").onclick = safely(() => {
    offset += 50;
    return search();
  });
  safely(async () => {
    const settings = await BVSettings.get({ version: "1MG1865", enabled: true, crossrefs: false, lastPassage: null, chapterParallel: false, chapterParallelEdition: "KJF", chapterFontSize: 0 });
    parallel = settings.chapterParallel;
    parallelEdition = settings.chapterParallelEdition;
    fontSize = settings.chapterFontSize;
    version = params.get("version") || settings.version;
    if (!BV.versions.includes(version)) version = "1MG1865";
    let selected;
    try {
      selected = JSON.parse(params.get("selection"));
    } catch {
    }
    current = BV.valid(selected) ? selected : BV.parse(params.get("ref")) || (BV.valid(settings.lastPassage) ? settings.lastPassage : current);
    $("version").value = version;
    $("enabled").checked = settings.enabled;
    $("crossrefs").checked = settings.crossrefs;
    fillBooks();
    await render(current, { scroll: chapterMode, highlightQuery: params.get("search") || "" });
  })();
})();
