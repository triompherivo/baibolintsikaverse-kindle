(() => {
  "use strict";
  const $ = (id) => document.getElementById(id), I = BVInterlinear, repo = new I.Repository();
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== void 0) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  let catalog, morphology, lexicon, rows = [], corpus = "hebrew", book = 1, chapter = 1, verse = 1, size = 30;
  let serial = 0, dialogSerial = 0, translationSerial = 0, ready = null, selectedWord = null, history = [];
  const status = (message = "", error = false) => {
    $("interlinear-status").textContent = message;
    $("interlinear-status").classList.toggle("error", error);
  };
  const safely = (fn) => (...args) => Promise.resolve().then(() => fn(...args)).catch((error) => status(error.message, true));
  const label = () => `${BV.bookName(BV.books[book - 1], "KJF")} ${chapter}:${verse}`;
  const currentRow = () => rows.find((row) => row.verse === verse);
  function selectOptions(id, options, value) {
    $(id).replaceChildren(...options.map(([v, text]) => new Option(text, v)));
    $(id).value = value;
  }
  function fillBooks() {
    selectOptions("interlinear-book", Object.keys(catalog.corpora[corpus].books).map((id) => [id, BV.bookName(BV.books[+id - 1], "KJF")]), book);
  }
  function fillChapters() {
    selectOptions("interlinear-chapter", Object.keys(catalog.corpora[corpus].books[book]).map((c) => [c, "Ch. " + c]), chapter);
  }
  function fillVerses() {
    selectOptions("interlinear-verse", rows.map((row) => [row.verse, "V. " + row.verse]), verse);
  }
  function render() {
    const row = currentRow();
    if (!row) throw Error("Ce verset est absent du texte original.");
    const hebrew = corpus === "hebrew", language = hebrew ? "he" : "grc", font = hebrew ? "original-hebrew" : "original-greek";
    $("interlinear-panel").dataset.corpus = corpus;
    $("interlinear-reference").textContent = label();
    $("interlinear-source").textContent = hebrew ? "OSHB 2.0 \xB7 Ancien Testament" : "GNT5+ \xB7 Nouveau Testament";
    $("interlinear-query").value = label();
    $("interlinear-original").textContent = I.original(row);
    $("interlinear-original").className = "interlinear-original " + font;
    $("interlinear-original").dir = hebrew ? "rtl" : "ltr";
    $("interlinear-original").lang = language;
    $("interlinear-word-count").textContent = row.words.length + " mots";
    const grid = $("interlinear-words");
    grid.replaceChildren();
    grid.dir = hebrew ? "rtl" : "ltr";
    for (const [index, word] of row.words.entries()) {
      const [text, code, strongs] = word, entry = lexicon[strongs[0]], info = morphology[corpus][code] || [code, "Analyse", "other", ""];
      const card = element("div", void 0, "interlinear-word");
      card.dataset.pos = info[2];
      card.dir = "ltr";
      const button = element("button", I.surface(text), "word-form " + font);
      button.type = "button";
      button.lang = language;
      button.dir = hebrew ? "rtl" : "ltr";
      button.setAttribute("aria-label", `${I.surface(text)} \xB7 ${info[0]}${strongs.length ? " \xB7 " + strongs.join(", ") : ""}`);
      button.onclick = () => {
        button.focus({ preventScroll: true });
        safely(() => showWord(word, index))();
      };
      card.append(element("span", String(index + 1).padStart(2, "0"), "word-index"), button, element("span", (entry == null ? void 0 : entry[1]) || "", "word-transliteration"));
      card.append(element("p", (entry == null ? void 0 : entry[3]) || "Sens non renseign\xE9", "word-gloss"));
      const description = element("p", info[0], "word-morphology");
      card.append(description);
      const links = element("div", void 0, "word-strongs");
      for (const strong of strongs) {
        const b = element("button", strong, "strong-link");
        b.type = "button";
        b.setAttribute("aria-label", "Ouvrir la fiche Strong " + strong);
        b.onclick = () => {
          b.focus({ preventScroll: true });
          safely(() => showWord(word, index, strong))();
        };
        links.append(b);
      }
      if (!strongs.length) links.append(element("span", "Sans num\xE9ro Strong", "word-no-strong"));
      card.append(links);
      grid.append(card);
    }
    $("interlinear-view").hidden = false;
    $("interlinear-progress").textContent = `${rows.findIndex((r) => r.verse === verse) + 1} / ${rows.length}`;
    const books = Object.keys(catalog.corpora[corpus].books).map(Number), chapters = Object.keys(catalog.corpora[corpus].books[book]).map(Number);
    $("interlinear-previous").disabled = book === books[0] && chapter === chapters[0] && verse === rows[0].verse;
    $("interlinear-next").disabled = book === books.at(-1) && chapter === chapters.at(-1) && verse === rows.at(-1).verse;
    status();
    void BVSettings.set({ interlinearSelection: { corpus, book, chapter, verse } });
    void renderTranslation();
  }
  async function navigate(nextCorpus = corpus, nextBook = book, nextChapter = chapter, nextVerse = 1) {
    const ticket = ++serial;
    status("Chargement du texte original\u2026");
    const prefix = catalog.corpora[nextCorpus].prefix;
    const [data, index] = await Promise.all([repo.chapter(nextCorpus, nextBook, nextChapter), repo.summary(prefix)]);
    if (ticket !== serial) return;
    if (!data.some((row) => row.verse === nextVerse)) throw Error(`Le verset ${nextVerse} est absent de cette \xE9dition originale.`);
    corpus = nextCorpus;
    book = nextBook;
    chapter = nextChapter;
    verse = nextVerse;
    rows = data;
    lexicon = index;
    $("interlinear-corpus").value = corpus;
    fillBooks();
    fillChapters();
    fillVerses();
    render();
  }
  async function step(direction) {
    const index = rows.findIndex((row) => row.verse === verse), next = rows[index + direction];
    if (next) {
      verse = next.verse;
      $("interlinear-verse").value = verse;
      render();
      return;
    }
    const books = Object.keys(catalog.corpora[corpus].books).map(Number), chapters = Object.keys(catalog.corpora[corpus].books[book]).map(Number);
    let nextBook = book, nextChapter = chapters[chapters.indexOf(chapter) + direction];
    if (!nextChapter) {
      nextBook = books[books.indexOf(book) + direction];
      if (!nextBook) return;
      const list = Object.keys(catalog.corpora[corpus].books[nextBook]).map(Number);
      nextChapter = direction > 0 ? list[0] : list.at(-1);
    }
    const verses = catalog.corpora[corpus].books[nextBook][nextChapter];
    await navigate(corpus, nextBook, nextChapter, direction > 0 ? verses[0] : verses.at(-1));
  }
  async function send(message) {
    const result = await browser.runtime.sendMessage(message);
    if (!(result == null ? void 0 : result.ok)) throw Error((result == null ? void 0 : result.error) || "Lecture biblique indisponible.");
    return result.value;
  }
  async function renderTranslation() {
    const ticket = ++translationSerial, version = $("interlinear-translation").value;
    const target = $("interlinear-translation-text");
    target.textContent = "Chargement\u2026";
    try {
      const result = await send({ type: "passage", version, ref: { book, chapter, parts: [{ chapter, from: verse, to: verse }], wholeChapter: false } });
      if (ticket !== translationSerial) return;
      target.textContent = result.rows.map((row) => row.text).join(" ") || "Ce verset est absent de cette traduction. Les num\xE9rotations peuvent diff\xE9rer.";
    } catch (error) {
      if (ticket === translationSerial) target.textContent = error.message;
    }
  }
  function safeDefinition(markup) {
    const parsed = new DOMParser().parseFromString(markup, "text/html"), fragment = document.createDocumentFragment();
    const allowed = /* @__PURE__ */ new Set(["P", "DIV", "SPAN", "B", "STRONG", "I", "EM", "OL", "UL", "LI", "TABLE", "TBODY", "THEAD", "TR", "TD", "TH", "BR", "SUP", "SUB", "BUTTON"]);
    const walk = (source, target) => {
      for (const child of source.childNodes) {
        if (child.nodeType === 3) {
          target.append(document.createTextNode(child.textContent));
          continue;
        }
        if (child.nodeType !== 1 || ["SCRIPT", "STYLE", "IFRAME", "OBJECT", "IMG"].includes(child.tagName)) continue;
        const node = element(allowed.has(child.tagName) ? child.tagName.toLowerCase() : "span");
        for (const name of child.classList) if (["original-hebrew", "original-greek", "lex-translit", "lex-grammar", "lex-count", "strong-related"].includes(name)) node.classList.add(name);
        const code = I.strong(child.dataset.strong);
        if (node.tagName === "BUTTON") {
          node.type = "button";
          if (code) node.onclick = safely(() => openStrong(code, true));
          else node.disabled = true;
        }
        walk(child, node);
        target.append(node);
      }
    };
    walk(parsed.body, fragment);
    return fragment;
  }
  async function openStrong(value, remember = false) {
    const code = I.strong(value);
    if (!code) throw Error("Num\xE9ro Strong invalide.");
    if (remember && $("strong-code").textContent) history.push($("strong-code").textContent);
    const ticket = ++dialogSerial;
    const dialog = $("interlinear-strong");
    $("strong-code").textContent = code;
    $("strong-back").hidden = !history.length;
    $("strong-definition").textContent = "Chargement de la fiche\u2026";
    for (const id of ["strong-lemma", "strong-transliteration", "strong-meaning", "strong-pronunciation"]) $(id).textContent = "";
    $("strong-context").hidden = true;
    if (!dialog.open) dialog.showModal();
    let summary, definition;
    try {
      [summary, definition] = await Promise.all([repo.summary(code[0]), repo.definition(code)]);
    } catch (error) {
      if (ticket === dialogSerial && dialog.open) $("strong-definition").textContent = "La fiche n\u2019a pas pu \xEAtre charg\xE9e. Fermez-la puis r\xE9essayez.";
      throw error;
    }
    if (ticket !== dialogSerial || !dialog.open) return;
    const entry = summary[code];
    $("strong-lemma").textContent = (entry == null ? void 0 : entry[0]) || code;
    $("strong-lemma").className = code[0] === "H" ? "original-hebrew" : "original-greek";
    $("strong-lemma").lang = code[0] === "H" ? "he" : "grc";
    $("strong-lemma").dir = code[0] === "H" ? "rtl" : "ltr";
    $("strong-transliteration").textContent = (entry == null ? void 0 : entry[1]) || "";
    $("strong-pronunciation").textContent = (entry == null ? void 0 : entry[2]) ? "Prononciation lexicale \xB7 " + entry[2] : "";
    $("strong-meaning").textContent = (entry == null ? void 0 : entry[3]) || "D\xE9finition non renseign\xE9e";
    $("strong-definition").replaceChildren(definition ? safeDefinition(definition) : element("p", "Cette entr\xE9e est absente du dictionnaire embarqu\xE9."));
    const context = (selectedWord == null ? void 0 : selectedWord.word[2].includes(code)) ? selectedWord : null, info = context ? morphology[corpus][context.word[1]] : null;
    $("strong-context").hidden = !context;
    if (context) {
      $("strong-context-form").textContent = I.surface(context.word[0]);
      $("strong-context-form").className = corpus === "hebrew" ? "original-hebrew" : "original-greek";
      $("strong-context-morph").textContent = (info == null ? void 0 : info[0]) || context.word[1];
      $("strong-context-code").textContent = context.word[1];
      $("strong-context-features").textContent = (info == null ? void 0 : info[3]) || "";
    }
    $("strong-dialog-scroll").scrollTop = 0;
  }
  async function showWord(word, index, strong = word[2][0]) {
    selectedWord = { word, index };
    history = [];
    if (strong) return openStrong(strong);
    const info = morphology[corpus][word[1]], dialog = $("interlinear-strong");
    ++dialogSerial;
    $("strong-code").textContent = "Morphologie";
    $("strong-lemma").textContent = I.surface(word[0]);
    $("strong-lemma").className = corpus === "hebrew" ? "original-hebrew" : "original-greek";
    $("strong-transliteration").textContent = "";
    $("strong-pronunciation").textContent = "";
    $("strong-meaning").textContent = (info == null ? void 0 : info[0]) || word[1];
    $("strong-context").hidden = true;
    $("strong-back").hidden = true;
    $("strong-definition").replaceChildren(element("p", "Ce mot ou segment poss\xE8de une analyse morphologique, sans num\xE9ro Strong dans cette source."), element("code", word[1]));
    dialog.showModal();
  }
  async function prepare() {
    if (!ready) ready = (async () => {
      [catalog, morphology] = await Promise.all([repo.catalog(), repo.morphology()]);
      const settings = await BVSettings.get({ interlinearSelection: null, interlinearSize: 30 }), params = new URLSearchParams(location.search);
      const saved = settings.interlinearSelection || {};
      const language = params.get("interlinear") || saved.corpus || "hebrew";
      const nextCorpus = ["hebrew", "greek"].includes(language) ? language : "hebrew";
      const nextBook = Number(params.get("ibook")) || saved.book || (nextCorpus === "hebrew" ? 1 : 40);
      const available = catalog.corpora[nextCorpus].books;
      const b = available[nextBook] ? nextBook : Number(Object.keys(available)[0]);
      const c = Number(params.get("ichapter")) || saved.chapter || 1;
      const ch = available[b][c] ? c : Number(Object.keys(available[b])[0]);
      const v = Number(params.get("iverse")) || saved.verse || 1;
      size = Math.max(24, Math.min(44, Number(settings.interlinearSize) || 30));
      applySize();
      await navigate(nextCorpus, b, ch, available[b][ch].includes(v) ? v : available[b][ch][0]);
    })().catch((error) => {
      ready = null;
      throw error;
    });
    await ready;
  }
  function applySize() {
    document.documentElement.style.setProperty("--original-size", size + "px");
    $("interlinear-smaller").disabled = size <= 24;
    $("interlinear-larger").disabled = size >= 44;
  }
  document.addEventListener("bv-module", (event) => {
    if (event.detail === "interlinear") safely(prepare)();
  });
  $("interlinear-corpus").onchange = safely(() => navigate($("interlinear-corpus").value, $("interlinear-corpus").value === "hebrew" ? 1 : 40, 1, 1));
  $("interlinear-book").onchange = safely(() => navigate(corpus, Number($("interlinear-book").value), 1, 1));
  $("interlinear-chapter").onchange = safely(() => navigate(corpus, book, Number($("interlinear-chapter").value), 1));
  $("interlinear-verse").onchange = () => {
    verse = Number($("interlinear-verse").value);
    render();
  };
  $("interlinear-entry").onsubmit = (event) => {
    event.preventDefault();
    safely(async () => {
      var _a;
      const ref = BV.parse($("interlinear-query").value);
      if (!ref) throw Error("Saisissez une r\xE9f\xE9rence, par exemple Gen\xE8se 1:1 ou Jean 1:1.");
      await prepare();
      const language = ref.book <= 39 ? "hebrew" : "greek", data = (_a = catalog.corpora[language].books[ref.book]) == null ? void 0 : _a[ref.chapter];
      const v = ref.wholeChapter ? data == null ? void 0 : data[0] : ref.parts[0].from;
      if (!(data == null ? void 0 : data.includes(v))) throw Error("Cette r\xE9f\xE9rence est absente de l\u2019\xE9dition originale.");
      await navigate(language, ref.book, ref.chapter, v);
    })();
  };
  $("interlinear-previous").onclick = safely(() => step(-1));
  $("interlinear-next").onclick = safely(() => step(1));
  $("interlinear-translation").onchange = () => void renderTranslation();
  for (const [id, delta] of [["interlinear-smaller", -2], ["interlinear-larger", 2]]) $(id).onclick = () => {
    size = Math.max(24, Math.min(44, size + delta));
    applySize();
    void BVSettings.set({ interlinearSize: size });
  };
  $("interlinear-open").onclick = safely(() => send({ type: "interlinear:open", corpus, book, chapter, verse }));
  $("interlinear-copy").onclick = safely(async () => {
    const row = currentRow();
    if (!row) return;
    const text = label() + " \xB7 " + catalog.corpora[corpus].label + "\n" + I.original(row) + "\n\n" + row.words.map((word) => {
      var _a, _b;
      return `${I.surface(word[0])} \xB7 ${word[2].join(", ")} \xB7 ${((_a = lexicon[word[2][0]]) == null ? void 0 : _a[3]) || ""}
${((_b = morphology[corpus][word[1]]) == null ? void 0 : _b[0]) || word[1]}`;
    }).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const field = element("textarea", text);
      document.body.append(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      if (!ok) throw Error("Copie indisponible. S\xE9lectionnez le texte.");
    }
    status("Verset et analyse copi\xE9s.");
  });
  $("strong-close").onclick = () => $("interlinear-strong").close();
  $("interlinear-strong").addEventListener("close", () => {
    ++dialogSerial;
  });
  $("strong-back").onclick = safely(() => openStrong(history.pop()));
  if (new URLSearchParams(location.search).has("interlinear")) BVLibrary.select("interlinear");
})();
