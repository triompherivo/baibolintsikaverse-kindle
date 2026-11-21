"use strict";
(() => {
  const P = BVPlan, H = BVReadingHost;
  const $ = (id) => document.getElementById("reading-" + id);
  const today = () => P.localDate();
  const load = (file) => H.json("reading/" + file + ".json");
  const editions = { mdg: "1MG1865", kjf: "KJF", kjv: "KJV" };
  const text = (id, value) => {
    $(id).textContent = value;
  };
  const safe = (module, fn) => (...args) => Promise.resolve().then(() => fn(...args)).catch((error) => text(module + "-status", error.message));
  const data = /* @__PURE__ */ new Map();
  function cached(file) {
    if (!data.has(file)) data.set(file, load(file).catch((error) => {
      data.delete(file);
      throw error;
    }));
    return data.get(file);
  }
  for (const module of ["daily", "teny"]) {
    $(module + "-window").onclick = safe(module, () => H.openWindow("reading-" + module));
  }
  let currentDaily, dailyTicket = 0;
  async function renderDaily() {
    var _a, _b;
    const id = ++dailyTicket, date = $("daily-date").value || today(), edition = $("daily-edition").value;
    const [names, order, bible] = await Promise.all([cached("books"), cached("mana-order"), cached(edition)]);
    const [book, chapter, verse] = order[await P.dailyIndex(date, order.length)];
    if (id !== dailyTicket) return;
    const wording = (_b = (_a = bible[book]) == null ? void 0 : _a[chapter - 1]) == null ? void 0 : _b[verse - 1];
    currentDaily = { book, chapter, verse, edition, wording };
    text("daily-reference", names[book][edition] + " " + chapter + ":" + verse);
    text("daily-text", wording || "Ce verset est absent de cette \xE9dition.");
    $("daily-copy").disabled = !wording;
    $("daily-open").disabled = !wording;
  }
  async function open(ref, version) {
    const response = await browser.runtime.sendMessage({ type: "open", ref, version, chapterReader: true });
    if (!(response == null ? void 0 : response.ok)) throw Error((response == null ? void 0 : response.error) || "Passage indisponible.");
  }
  function reference(book, chapter, verse) {
    return { book, chapter, wholeChapter: false, parts: [{ chapter, from: verse, to: verse }] };
  }
  $("daily-open").onclick = safe("daily", () => open(reference(currentDaily.book, currentDaily.chapter, currentDaily.verse), editions[currentDaily.edition]));
  $("daily-copy").onclick = safe("daily", () => H.copy(currentDaily.wording + "\n\u2014 " + $("daily-reference").textContent + " \xB7 " + currentDaily.edition.toUpperCase()));
  $("daily-edition").onchange = safe("daily", renderDaily);
  const libraryKey = "tenyFiainana.library.v1", anchorKey = "tenyFiainana.anchor.v1", favKey = "tenyFiainana.favorites.v1";
  let entries = [], schedule, favorites = /* @__PURE__ */ new Set(), chosen = null, filtered = false, page = 0, ready, legacy = [];
  let selected, files = /* @__PURE__ */ new Map(), folderName = "", audioURL, activeDay = today();
  function selectDay(date) {
    if (!entries.length) return void 0;
    const byId = new Map(entries.map((entry) => [entry.id, entry]));
    const resolve = (ids) => (Array.isArray(ids) ? ids : []).map((id) => byId.get(id)).filter(Boolean);
    const rotation = resolve(schedule.rotationEntryIds);
    const rotated = new Set(rotation.map((entry) => entry.id));
    const ordered = [...rotation, ...entries.filter((entry) => !rotated.has(entry.id))];
    const priority = resolve(schedule.priorityEntryIds);
    const delta = schedule.priorityStartDateIso ? P.difference(date, schedule.priorityStartDateIso) : -1;
    if (delta >= 0 && delta < priority.length) return priority[delta];
    const anchor = Math.max(0, ordered.findIndex((row) => row.id === schedule.anchorEntryId));
    return ordered[P.wrap(anchor + P.difference(date, schedule.anchorDateIso) - (delta >= 0 ? priority.length : 0), ordered.length)];
  }
  function installLibrary(document2) {
    var _a;
    if ((document2 == null ? void 0 : document2.schema) !== "mg.triumphware.teny-fiainana" || document2.schemaVersion !== 1 || !Array.isArray(document2.entries) || document2.entries.length > 5e3 || !/^\d{4}-\d{2}-\d{2}$/.test((_a = document2.schedule) == null ? void 0 : _a.anchorDateIso) || !Number.isFinite(P.difference(document2.schedule.anchorDateIso, today()))) throw Error("Biblioth\xE8que Swift invalide.");
    const ids = /* @__PURE__ */ new Set(), numbers = /* @__PURE__ */ new Set();
    const rows = document2.entries.filter((row) => row.enabled).map((row) => {
      var _a2, _b;
      if (!Number.isSafeInteger(row.index) || row.index < 1 || numbers.has(row.index) || typeof row.id !== "string" || ids.has(row.id) || typeof row.bookShort !== "string" || !Number.isInteger(row.chapter) || row.chapter < 1 || !Number.isInteger(row.verseStart) || !Number.isInteger(row.verseEnd) || row.verseStart < 1 || row.verseEnd < row.verseStart) throw Error("Entr\xE9e Swift invalide.");
      ids.add(row.id);
      numbers.add(row.index);
      const ref = (row.bookName || row.bookShort) + " " + row.chapter + ":" + row.verseStart + (row.verseEnd > row.verseStart ? "-" + row.verseEnd : "");
      const original = legacy.find((item) => item.index === row.index && item.reference === ref);
      return { id: row.id, index: row.index, reference: ref, verseText: (_a2 = original == null ? void 0 : original.verseText) != null ? _a2 : "", title: (_b = row.title) != null ? _b : "" };
    }).sort((a, b) => a.index - b.index);
    entries = rows;
    schedule = document2.schedule;
  }
  async function initTeny() {
    if (!ready) ready = (async () => {
      const [catalog, stored, oldAnchor, savedFavorites, previousFolder] = await Promise.all([
        cached("TenyFiainanaCatalog"),
        H.get(libraryKey, null),
        H.get(anchorKey, null),
        H.get(favKey, []),
        H.get("tenyFiainana.folderName", "")
      ]);
      legacy = catalog.entries.map((row) => ({ ...row, index: Number(row.index), id: "legacy-" + row.index.padStart(4, "0") })).sort((a, b) => a.index - b.index);
      favorites = new Set(savedFavorites);
      if (!files.size) folderName = previousFolder;
      if (stored) installLibrary(stored);
      else {
        entries = legacy;
        const anchor = oldAnchor || today();
        schedule = { anchorDateIso: anchor, anchorEntryId: entries[P.legacyAnchor(anchor, entries.length)].id };
        if (!oldAnchor) await H.set(anchorKey, anchor);
      }
      await renderTeny();
      renderList();
    })().catch((error) => {
      ready = void 0;
      throw error;
    });
    await ready;
  }
  let tenyTicket = 0;
  async function renderTeny() {
    const ticket = ++tenyTicket;
    selected = chosen ? entries.find((row) => row.index === chosen) : selectDay($("teny-date").value || today());
    if (!selected) {
      text("teny-reference", "Aucun passage actif.");
      text("teny-text", "");
      $("teny-audio").pause();
      $("teny-audio").removeAttribute("src");
      $("teny-audio").hidden = true;
      for (const action of ["open", "copy", "favorite"]) $("teny-" + action).disabled = true;
      return;
    }
    const item = selected;
    text("teny-reference", item.reference + " \xB7 N\xB0 " + item.index + (item.title ? " \xB7 " + item.title : ""));
    let wording = item.verseText.replace(/<[^>]+>/g, "");
    const ref = BV.parse(item.reference);
    if (!wording && ref) {
      const bible = await cached("mdg");
      wording = ref.parts.flatMap((part) => {
        var _a, _b;
        return ((_b = (_a = bible[ref.book]) == null ? void 0 : _a[part.chapter - 1]) != null ? _b : []).slice(part.from - 1, part.to);
      }).filter(Boolean).join(" ");
    }
    if (ticket !== tenyTicket) return;
    text("teny-text", wording);
    text("teny-status", "");
    $("teny-open").disabled = !ref;
    $("teny-copy").disabled = !wording;
    const audio = $("teny-audio");
    const file = files.get(item.index);
    if (audioURL) URL.revokeObjectURL(audioURL);
    audio.pause();
    if (file) {
      audioURL = URL.createObjectURL(new Blob([file], { type: "audio/mpeg" }));
      audio.src = audioURL;
    } else {
      audioURL = void 0;
      audio.removeAttribute("src");
    }
    audio.hidden = !file;
    text("teny-location", files.size ? folderName + " \xB7 " + files.size + " MP3" + (file ? "" : " \xB7 audio introuvable pour ce passage") : folderName ? "Dernier dossier : " + folderName + " \xB7 res\xE9lectionnez-le pour \xE9couter." : "S\xE9lectionnez le dossier contenant les fichiers tenyFiainana_N.mp3. Le dossier doit \xEAtre res\xE9lectionn\xE9 dans une nouvelle fen\xEAtre.");
    $("teny-favorite").disabled = false;
    const saved = favorites.has(item.index);
    $("teny-favorite").setAttribute("aria-pressed", String(saved));
    text("teny-favorite", saved ? "Retirer des favoris" : "Ajouter aux favoris");
  }
  function renderList() {
    const query = BV.fold($("teny-search").value.trim());
    const list = entries.filter((row) => (!filtered || favorites.has(row.index)) && BV.fold([row.index, row.reference, row.title].join(" ")).includes(query));
    page = Math.max(0, Math.min(page, Math.ceil(list.length / 24) - 1));
    text("teny-count", list.length + " passages");
    $("teny-results").replaceChildren(...list.slice(page * 24, (page + 1) * 24).map((row) => {
      const button = document.createElement("button");
      button.textContent = (favorites.has(row.index) ? "\u2605 " : "") + row.index + " \xB7 " + row.reference;
      button.onclick = safe("teny", () => {
        chosen = row.index;
        return renderTeny();
      });
      return button;
    }));
    $("teny-prev-page").disabled = page === 0;
    $("teny-next-page").disabled = (page + 1) * 24 >= list.length;
  }
  $("teny-audio").onerror = () => {
    const audio = $("teny-audio");
    if (!audio.hidden && audio.src) text("teny-status", "Lecture audio indisponible dans cette fen\xEAtre. Essayez le lecteur dans une fen\xEAtre d\xE9di\xE9e.");
  };
  $("teny-choose").onclick = () => $("teny-folder").click();
  $("teny-import").onclick = () => $("teny-file").click();
  $("teny-folder").onchange = safe("teny", async () => {
    const candidates = Array.from($("teny-folder").files);
    $("teny-folder").value = "";
    if (!candidates.length) return;
    const found = /* @__PURE__ */ new Map();
    for (const file of candidates) {
      const match = /^tenyFiainana_(\d+)\.mp3$/i.exec(file.name);
      if (match) found.set(Number(match[1]), file);
    }
    if (!found.size) throw Error("Aucun fichier tenyFiainana_N.mp3 dans ce dossier.");
    files = found;
    folderName = candidates[0].webkitRelativePath.split("/")[0];
    await H.set("tenyFiainana.folderName", folderName);
    await renderTeny();
  });
  $("teny-file").onchange = safe("teny", async () => {
    const file = $("teny-file").files[0];
    $("teny-file").value = "";
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) throw Error("Biblioth\xE8que trop volumineuse.");
    const document2 = JSON.parse(await file.text());
    installLibrary(document2);
    await H.set(libraryKey, document2);
    chosen = null;
    page = 0;
    renderList();
    await renderTeny();
  });
  $("teny-open").onclick = safe("teny", () => open(BV.parse(selected.reference), "1MG1865"));
  $("teny-copy").onclick = safe("teny", () => H.copy($("teny-text").textContent + "\n\u2014 " + selected.reference));
  $("teny-favorite").onclick = safe("teny", async () => {
    const id = selected.index;
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    await H.set(favKey, [...favorites]);
    await renderTeny();
    renderList();
  });
  $("teny-favorites").onclick = () => {
    filtered = !filtered;
    $("teny-favorites").setAttribute("aria-pressed", String(filtered));
    page = 0;
    renderList();
  };
  $("teny-search").oninput = () => {
    page = 0;
    renderList();
  };
  $("teny-prev-page").onclick = () => {
    page--;
    renderList();
  };
  $("teny-next-page").onclick = () => {
    page++;
    renderList();
  };
  function controls(module, render) {
    const field = $(module + "-date");
    field.value = today();
    const update = safe(module, () => {
      if (module === "teny") chosen = null;
      return render();
    });
    field.onchange = update;
    for (const [id, delta] of [["previous", -1], ["next", 1]]) {
      $(module + "-" + id).onclick = () => {
        field.value = P.shift(field.value || today(), delta);
        update();
      };
    }
    $(module + "-today").onclick = () => {
      field.value = today();
      update();
    };
    return update;
  }
  const refreshDaily = controls("daily", renderDaily), refreshTeny = controls("teny", renderTeny);
  document.addEventListener("bv-module", (event) => {
    if (event.detail === "reading-daily") safe("daily", renderDaily)();
    if (event.detail === "reading-teny") safe("teny", initTeny)();
  });
  const requested = new URLSearchParams(location.search).get("readingModule");
  if (["reading-daily", "reading-teny"].includes(requested)) BVLibrary.select(requested);
  setInterval(() => {
    const now = today();
    if (activeDay === now) return;
    for (const [module, refresh] of [["daily", refreshDaily], ["teny", refreshTeny]]) {
      const field = $(module + "-date");
      if (field.value === activeDay) {
        field.value = now;
        if (!$(module + "-panel").hidden) refresh();
      }
    }
    activeDay = now;
  }, 3e4);
  window.addEventListener("pagehide", () => {
    if (audioURL) URL.revokeObjectURL(audioURL);
  });
})();
