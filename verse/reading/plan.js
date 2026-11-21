"use strict";
(() => {
  const P = BVPlan, H = BVReadingHost;
  const $ = (id) => document.getElementById("plan90-" + id);
  const key = "reading90.v1";
  const editions = { mdg: "MDG", kjf: "KJF \xB7 Nadine L. Stratford", kjv: "KJV", hebrew: "HEBREW (AT et NT)" };
  const languages = { mdg: "mg", kjf: "fr", kjv: "en", hebrew: "he" };
  const isHebrew = () => state.edition === "hebrew";
  const status = (text) => {
    $("status").textContent = text;
  };
  const node = (tag, text) => Object.assign(document.createElement(tag), text == null ? {} : { textContent: text });
  const button = (label, action2) => Object.assign(node("button", label), { type: "button", onclick: action2 });
  const action = (fn) => (...args) => Promise.resolve().then(() => fn(...args)).catch((error) => status(error.message));
  let state, plan, names, day = 1, ready, queue = Promise.resolve(), audioTicket = 0, paused = false;
  let ambient, ambientObjectURL, narrationFolder = /* @__PURE__ */ new Map(), player, spoken;
  const corpus = /* @__PURE__ */ new Map();
  const today = () => P.localDate();
  const title = (section, edition = state.edition) => names[section.book][edition] + " " + section.chapter;
  function range(reading) {
    const first = reading.sections[0], last = reading.sections.at(-1);
    return title(first) + ":" + first.verses[0].verse + " \u2192 " + title(last) + ":" + last.verses.at(-1).verse;
  }
  async function loadPlan(edition) {
    if (!corpus.has(edition)) {
      corpus.set(edition, H.json("reading/" + edition + ".json").then((data) => P.build(data, edition)).catch((error) => {
        corpus.delete(edition);
        throw error;
      }));
    }
    return corpus.get(edition);
  }
  function commit(change, nextDay) {
    const job = queue.then(async () => {
      const current = await H.get(key, state);
      const next = change(current);
      await H.set(key, next);
      state = next;
      day = nextDay != null ? nextDay : Math.min(state.current, P.days);
      render();
    });
    queue = job.catch(() => {
    });
    return job;
  }
  async function init() {
    if (!ready) ready = (async () => {
      [names, state] = await Promise.all([H.json("reading/books.json"), H.get(key, P.empty())]);
      $("edition").value = state.edition;
      if (state.start) plan = await loadPlan(state.edition);
      day = Math.min(state.current, P.days);
      render();
    })().catch((error) => {
      ready = void 0;
      throw error;
    });
    await ready;
  }
  function renderReading(reading) {
    var _a;
    $("range").textContent = "Jour " + day + " \xB7 " + range(reading);
    $("verses").style.fontSize = (isHebrew() ? (_a = state.hebrewFont) != null ? _a : 32 : state.font) + "px";
    $("verses").replaceChildren(...reading.sections.map((section) => {
      const details = node("details");
      details.open = true;
      details.append(node("summary", title(section)));
      for (const verse of section.verses) {
        const p = node("p");
        if (isHebrew()) {
          p.dir = "rtl";
          p.lang = "he";
          p.className = "original-hebrew";
        }
        p.append(node("sup", String(verse.verse)), document.createTextNode(verse.text));
        details.append(p);
      }
      return details;
    }));
  }
  function render() {
    $("edition").value = state.edition;
    $("edition").disabled = !!state.start;
    $("start").disabled = false;
    $("start").hidden = !!state.start;
    $("active").hidden = !state.start;
    if (!state.start || !plan) return;
    const stats = P.stats(state, plan, today());
    const finished = state.current > P.days;
    $("summary").textContent = stats.count + " / 90 jours lus \xB7 " + stats.percent.toFixed(1) + " % \xB7 S\xE9rie " + state.streak + " j \xB7 Record " + state.best + " j" + (state.paused ? " \xB7 En pause" : "");
    $("progress").value = stats.count;
    $("late").hidden = !(stats.late || stats.missed.length) || state.paused || finished;
    $("late").textContent = stats.late + " jour(s) de retard \xB7 " + stats.missed.length + " jour(s) \xE0 rattraper";
    $("finished").hidden = !finished;
    $("complete").hidden = state.paused || finished || state.completed.includes(day);
    $("complete").textContent = day === state.current && day === 90 ? "Terminer le plan" : "Marquer le jour " + day + " comme lu";
    $("prev").disabled = day <= 1;
    $("next").disabled = day >= 90;
    $("pause").textContent = state.paused ? "Reprendre le plan" : "Mettre en pause";
    renderReading(plan[day - 1]);
  }
  async function saveReminder() {
    var _a;
    await ((_a = H.reminder) == null ? void 0 : _a.call(H, state.reminder === true && !state.paused && !!state.start && !state.finished ? state.hour : null));
  }
  function showDay(number) {
    stopAudio();
    day = number;
    render();
  }
  async function finishDay(number) {
    if (state.paused) return;
    stopAudio();
    if (number < state.current) await commit((old) => P.mark(old, [number]), day);
    else if (number === state.current) {
      await commit((old) => P.complete(old, number, today()));
      if (state.finished && state.reminder) await saveReminder();
    } else status("Validez les jours dans l\u2019ordre ou utilisez Restaurer les jours 1 \xE0 N.");
  }
  const dialog = $("dialog");
  function showDialog(title2, ...children) {
    $("dialog-title").textContent = title2;
    $("dialog-content").replaceChildren(...children);
    $("dialog-error").textContent = "";
    if (!dialog.open) dialog.showModal();
  }
  function dialogAction(label, fn) {
    return button(label, async (event) => {
      const control = event.currentTarget;
      control.disabled = true;
      try {
        await fn();
      } catch (error) {
        $("dialog-error").textContent = error.message;
      } finally {
        control.disabled = false;
      }
    });
  }
  function numberInput(min, max, value) {
    return Object.assign(node("input"), { type: "number", min, max, value, required: true });
  }
  function promptNumber(kind) {
    const restoring = kind === "restore";
    const input = numberInput(restoring ? 1 : 0, restoring ? 90 : 999999, restoring ? Math.max(1, ...state.completed) : state.streak);
    const label = node("label", restoring ? "Dernier jour lu " : "Nombre de jours ");
    label.append(input);
    const when = node("select");
    when.add(new Option("Aujourd\u2019hui \xB7 lecture compt\xE9e", "today"));
    when.add(new Option("Hier \xB7 lecture du jour \xE0 compter", "yesterday"));
    when.value = state.last === today() ? "today" : "yesterday";
    const controls = node("div");
    controls.className = "plan-head";
    controls.append(label);
    if (!restoring) controls.append(when);
    controls.append(dialogAction("Enregistrer", async () => {
      if (!input.reportValidity()) return;
      stopAudio();
      const value = input.valueAsNumber;
      await commit((old) => restoring ? P.restore(old, value, today()) : P.correct(old, value, when.value === "today", today()));
      if (state.finished && state.reminder) await saveReminder();
      dialog.close();
    }));
    showDialog(restoring ? "Restaurer les jours d\xE9j\xE0 lus" : "Modifier mon streak", controls);
  }
  function renderCalendar() {
    const grid = node("div");
    grid.className = "plan-grid";
    for (const item of plan) {
      const itemButton = button(String(item.day), () => {
        dialog.close();
        showDay(item.day);
      });
      const marked = state.completed.includes(item.day);
      const itemState = marked ? "Lu" : item.day < state.current ? "Manqu\xE9" : item.day === state.current ? "En cours" : "\xC0 lire";
      itemButton.dataset.state = marked ? "done" : item.day < state.current ? "missed" : "upcoming";
      itemButton.title = itemState + " \xB7 " + range(item);
      itemButton.setAttribute("aria-label", "Jour " + item.day + " \xB7 " + itemButton.title);
      if (item.day === state.current) itemButton.setAttribute("aria-current", "date");
      grid.append(itemButton);
    }
    showDialog("Calendrier \xB7 90 jours", grid);
  }
  function catchUp() {
    const missed = P.stats(state, plan, today()).missed;
    const rows = node("div");
    if (!missed.length) rows.append(node("p", "Aucun jour manqu\xE9."));
    for (const item of missed) {
      const row = node("div");
      row.className = "plan-head";
      row.append(
        button("Jour " + item.day + " \xB7 " + range(item), () => {
          dialog.close();
          showDay(item.day);
        }),
        dialogAction("Marquer comme lu", async () => {
          await commit((old) => P.mark(old, [item.day]), day);
          catchUp();
        })
      );
      rows.append(row);
    }
    if (missed.length) rows.append(dialogAction("Tout marquer comme lu", async () => {
      await commit((old) => P.mark(old, missed.map((item) => item.day)), day);
      dialog.close();
    }));
    showDialog("Mode rattrapage", rows);
  }
  function settings() {
    var _a, _b, _c;
    const hour = numberInput(5, 22, state.hour);
    const reminder = Object.assign(node("input"), { type: "checkbox", checked: state.reminder === true });
    const speed = Object.assign(numberInput(0.5, 1.25, (_a = state.hebrewRate) != null ? _a : 0.7), { step: 0.05 });
    const localVoice = Object.assign(node("input"), { type: "checkbox", checked: state.hebrewVoiceOnly === true });
    const controls = node("div");
    controls.className = "plan-head";
    const label = node("label", "Rappel quotidien ");
    label.prepend(reminder);
    if (H.reminder) controls.append(label, hour, node("span", "h 00"));
    controls.append(dialogAction("Enregistrer", async () => {
      if (H.reminder && !hour.reportValidity() || isHebrew() && !speed.reportValidity()) return;
      const wasEnabled = state.reminder === true;
      const audioOptions = isHebrew() ? { hebrewRate: speed.valueAsNumber, hebrewVoiceOnly: localVoice.checked } : {};
      await commit((old) => ({ ...old, hour: hour.valueAsNumber, reminder: reminder.checked, ...audioOptions }), day);
      if (player && isHebrew()) player.playbackRate = state.hebrewRate;
      if (wasEnabled || reminder.checked) await saveReminder();
      dialog.close();
    }));
    const folder = Object.assign(node("input"), { type: "file", webkitdirectory: true, hidden: true });
    folder.onchange = () => {
      narrationFolder = new Map(Array.from(folder.files).map((file) => [file.name.toLowerCase(), file]));
      $("dialog-error").textContent = narrationFolder.size + " fichiers dans le dossier audio de cette session.";
    };
    const background = Object.assign(node("input"), { type: "file", accept: "audio/*", hidden: true });
    const volume = Object.assign(node("input"), { type: "range", min: 0, max: 1, step: 0.05, value: (_b = state.ambientVolume) != null ? _b : 0.2 });
    const track = node("select");
    for (const [id, label2] of [["", "Sans musique"], ["solace", "Solace"], ["static", "Static"], ["she_moved_mountains", "She Moved Mountains"]]) {
      track.add(new Option(label2, id));
    }
    track.setAttribute("aria-label", "Musique d\u2019accompagnement");
    track.value = (_c = state.ambientTrack) != null ? _c : "";
    function selectAmbient(source, custom = false) {
      ambient == null ? void 0 : ambient.pause();
      if (ambientObjectURL) URL.revokeObjectURL(ambientObjectURL);
      ambientObjectURL = custom ? source : void 0;
      ambient = source ? new Audio(source) : void 0;
      if (ambient) {
        ambient.loop = true;
        ambient.volume = Number(volume.value);
      }
    }
    track.onchange = action(async () => {
      const id = track.value;
      selectAmbient(id ? H.url("reading/ambient/ambient_" + id + ".m4a") : "");
      await commit((old) => ({ ...old, ambientTrack: id }), day);
    });
    background.onchange = action(async () => {
      if (!background.files[0]) return;
      track.value = "";
      selectAmbient(URL.createObjectURL(background.files[0]), true);
      await commit((old) => ({ ...old, ambientTrack: "" }), day);
      $("dialog-error").textContent = "Musique locale s\xE9lectionn\xE9e pour cette fen\xEAtre.";
    });
    volume.setAttribute("aria-label", "Volume de la musique");
    volume.oninput = () => {
      if (ambient) ambient.volume = Number(volume.value);
    };
    volume.onchange = action(() => commit((old) => ({ ...old, ambientVolume: Number(volume.value) }), day));
    const audio = node("div");
    audio.className = "plan-head";
    audio.append(
      folder,
      button("Dossier de narration\u2026", () => folder.click()),
      track,
      background,
      button("Autre musique\u2026", () => background.click()),
      volume
    );
    const credit = node("p", "Music by Scott Buckley \u2014 released under CC BY 4.0.");
    const guidance = node("p", "Le dossier de narration accepte les fichiers livre_chapitre.mp3 (nom anglais ou num\xE9ro canonique \xD7 10).");
    if (!isHebrew()) {
      showDialog("R\xE9glages du plan", controls, audio, credit, guidance);
      return;
    }
    const slow = node("div");
    slow.className = "plan-head";
    const speedLabel = node("label", "Vitesse h\xE9breu");
    speedLabel.append(speed, node("span", "\xD7"));
    const voiceLabel = node("label", "Voix h\xE9bra\xEFque locale uniquement");
    voiceLabel.prepend(localVoice);
    slow.append(speedLabel, voiceLabel);
    const sources = node("p", "AT : texte HEB de Baibolintsika. NT : Salkinson\u2013Ginsburg (SGNT2018). Le dossier audio peut contenir des chapitres ou les fichiers par verset.");
    const wlc = node("a", "MP3 WLC lents \xB7 Eliran Wong, CC BY 4.0");
    wlc.href = "https://github.com/eliranwong/MP3_WLC_slow";
    wlc.target = "_blank";
    wlc.rel = "noopener noreferrer";
    showDialog(
      "R\xE9glages du plan",
      controls,
      slow,
      audio,
      credit,
      guidance,
      sources,
      node("p", "WLC_livre_chapitre_verset.mp3 (AT) ou livre.chapitre.verset.mp3 (fichiers personnels)."),
      wlc
    );
  }
  function stopAudio() {
    var _a;
    audioTicket++;
    paused = false;
    if (spoken) {
      spoken = void 0;
      (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
    }
    ambient == null ? void 0 : ambient.pause();
    if (player) {
      player.pause();
      URL.revokeObjectURL(player.src);
      player = void 0;
    }
  }
  function chapterAudio(section) {
    const english = names[section.book].kjv;
    const padded = String(section.book).padStart(2, "0") + "_" + english.replaceAll(" ", "") + String(section.chapter).padStart(3, "0");
    for (const stem of [section.book * 10 + "_" + section.chapter, english.replaceAll(" ", "") + "_" + section.chapter, padded]) {
      for (const extension of ["mp3", "m4a", "wav", "aac"]) {
        const found = narrationFolder.get((stem + "." + extension).toLowerCase());
        if (found) return found;
      }
    }
  }
  function listen() {
    var _a, _b;
    if (paused) {
      paused = false;
      if (player) return player.play();
      speechSynthesis.resume();
      return;
    }
    stopAudio();
    const reading = plan[day - 1], ticket = audioTicket, current = state.current;
    const lang = languages[state.edition];
    const voice = (_a = window.speechSynthesis) == null ? void 0 : _a.getVoices().find((item) => item.localService && item.lang.toLowerCase().split(/[-_]/)[0] === lang);
    const hebrew = isHebrew();
    const files = reading.sections.map(chapterAudio);
    const tracks = hebrew ? reading.sections.flatMap((section, index) => {
      if (!state.hebrewVoiceOnly && files[index]) return [files[index]];
      return section.verses.map(({ verse, text }) => {
        const wlc = "wlc_" + section.book + "_" + section.chapter + "_" + verse + ".mp3";
        const personal = section.book + "." + section.chapter + "." + verse + ".mp3";
        const file = state.hebrewVoiceOnly ? void 0 : narrationFolder.get(personal) || (section.book <= 39 ? narrationFolder.get(wlc) : void 0);
        return file != null ? file : text;
      });
    }) : files.every(Boolean) ? files : reading.sections.flatMap((section) => section.verses.map((verse) => verse.text));
    if (!voice && tracks.some((track) => typeof track === "string")) throw Error(hebrew ? "Installez une voix h\xE9bra\xEFque locale ou s\xE9lectionnez les MP3 de cette lecture." : "Aucune voix locale pour cette \xE9dition. Choisissez un dossier de narration dans les r\xE9glages.");
    if (!ambient && state.ambientTrack) {
      ambient = new Audio(H.url("reading/ambient/ambient_" + state.ambientTrack + ".m4a"));
      ambient.loop = true;
      ambient.volume = (_b = state.ambientVolume) != null ? _b : 0.2;
    }
    ambient == null ? void 0 : ambient.play().catch(() => {
    });
    function next(index) {
      var _a2, _b2;
      if (ticket !== audioTicket) return;
      if (index >= tracks.length) {
        stopAudio();
        status("\xC9coute termin\xE9e.");
        if (reading.day === current && state.current === current && !state.paused) action(() => finishDay(current))();
        return;
      }
      status("\xC9coute \xB7 " + (index + 1) + " / " + tracks.length);
      const track = tracks[index];
      if (typeof track !== "string") {
        if (player) URL.revokeObjectURL(player.src);
        const audio = !track.type && /\.mp3$/i.test(track.name) ? new Blob([track], { type: "audio/mpeg" }) : track;
        player = new Audio(URL.createObjectURL(audio));
        if (hebrew) player.playbackRate = (_a2 = state.hebrewRate) != null ? _a2 : 0.7;
        player.onended = () => next(index + 1);
        player.onerror = () => {
          stopAudio();
          status("Fichier audio illisible.");
        };
        player.play().catch((error) => {
          stopAudio();
          status(error.message);
        });
      } else {
        if (player) {
          URL.revokeObjectURL(player.src);
          player = void 0;
        }
        const utterance = new SpeechSynthesisUtterance(track);
        utterance.lang = voice.lang;
        utterance.voice = voice;
        if (hebrew) utterance.rate = (_b2 = state.hebrewRate) != null ? _b2 : 0.7;
        utterance.onend = () => {
          if (spoken === utterance) spoken = void 0;
          next(index + 1);
        };
        utterance.onerror = () => {
          if (ticket === audioTicket) {
            stopAudio();
            status("Lecture vocale interrompue.");
          }
        };
        spoken = utterance;
        speechSynthesis.speak(utterance);
      }
    }
    next(0);
  }
  async function makePdf(certificate) {
    const { PDFDocument, StandardFonts, rgb } = await H.pdf();
    const document2 = await PDFDocument.create();
    const regular = await document2.embedFont(StandardFonts.Helvetica);
    const bold = await document2.embedFont(StandardFonts.HelveticaBold);
    const blue = rgb(0.1, 0.32, 0.43);
    const text = (page, value, x, y, size = 11, font = regular) => {
      const safe = Array.from(value.normalize("NFC"), (char) => {
        try {
          font.encodeText(char);
          return char;
        } catch {
          return char.normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "").replace(/[^\x20-\x7e]/g, "");
        }
      }).join("");
      page.drawText(safe, { x, y, size, font, color: blue });
    };
    if (certificate) {
      const page = document2.addPage([595, 842]);
      page.drawRectangle({ x: 32, y: 34, width: 531, height: 774, borderColor: blue, borderWidth: 2 });
      text(page, "BAIBOLINTSIKAVERSE", 62, 739, 13, bold);
      text(page, "Certificat de lecture", 62, 645, 31, bold);
      text(page, certificate.slice(0, 65), 62, 571, 22, bold);
      text(page, "a termin\xE9 le plan de lecture de la Bible en 90 jours.", 62, 519, 15);
      text(page, "\xC9dition " + editions[state.edition] + " \xB7 " + state.finished, 62, 482, 13);
      text(page, "Meilleure s\xE9rie : " + state.best + " jours", 62, 448, 13);
    } else {
      for (let offset = 0; offset < 90; offset += 30) {
        const page = document2.addPage([595, 842]);
        text(page, "Bible en 90 jours \xB7 " + editions[state.edition], 40, 790, 20, bold);
        for (const [i, item] of plan.slice(offset, offset + 30).entries()) {
          const y = 753 - i * 23;
          page.drawRectangle({ x: 40, y: y - 2, width: 9, height: 9, borderColor: blue, borderWidth: 0.8 });
          text(page, String(item.day).padStart(2, "0") + "  " + range(item), 58, y, 10);
        }
      }
    }
    await H.save(certificate ? "BaibolintsikaVerse-certificat-90-jours.pdf" : "BaibolintsikaVerse-plan-90-jours.pdf", await document2.save(), "application/pdf");
  }
  $("window").hidden = !H.openWindow;
  if (H.openWindow) $("window").onclick = action(() => H.openWindow("plan90"));
  $("dialog-close").onclick = () => dialog.close();
  $("edition").onchange = action(async () => commit((old) => ({ ...old, edition: $("edition").value })));
  $("start").onclick = action(async () => {
    $("start").disabled = true;
    try {
      const edition = $("edition").value;
      plan = await loadPlan(edition);
      await commit((old) => P.empty(edition, today(), old));
    } finally {
      $("start").disabled = false;
    }
  });
  $("today").onclick = () => showDay(Math.min(state.current, 90));
  $("prev").onclick = () => showDay(day - 1);
  $("next").onclick = () => showDay(day + 1);
  $("complete").onclick = action(() => finishDay(day));
  $("calendar").onclick = renderCalendar;
  $("stats").onclick = () => {
    const s = P.stats(state, plan, today());
    const list = node("dl");
    for (const [label, value] of [
      ["Progression", s.percent.toFixed(1) + " %"],
      ["Jours lus", s.count + " / 90"],
      ["Jours manqu\xE9s", s.missed.length],
      ["S\xE9rie actuelle", state.streak],
      ["Meilleure s\xE9rie", state.best],
      ["Versets lus", s.verses.toLocaleString("fr-FR")],
      ["Temps estim\xE9", Math.floor(s.count / 4) + " h " + s.count % 4 * 15 + " min"]
    ]) list.append(node("dt", label), node("dd", String(value)));
    showDialog("Statistiques de lecture", list);
  };
  $("settings").onclick = settings;
  $("restore").onclick = () => promptNumber("restore");
  $("streak").onclick = () => promptNumber("streak");
  $("catchup").onclick = catchUp;
  $("pause").onclick = action(async () => {
    if (!state.paused) stopAudio();
    await commit((old) => ({ ...old, paused: !old.paused }), day);
    if (state.reminder) await saveReminder();
  });
  $("reset").onclick = () => showDialog(
    "Recommencer le plan",
    node("p", "La progression du plan actif sera effac\xE9e."),
    dialogAction("Recommencer", async () => {
      stopAudio();
      const reminder = state.reminder;
      await commit((old) => P.empty(old.edition, null, old));
      if (reminder) await saveReminder();
      dialog.close();
    })
  );
  for (const [id, delta] of [["less", -2], ["more", 2]]) {
    $(id).onclick = action(() => commit((old) => {
      var _a;
      return isHebrew() ? { ...old, hebrewFont: Math.max(22, Math.min(60, ((_a = old.hebrewFont) != null ? _a : 32) + delta)) } : { ...old, font: Math.max(14, Math.min(36, old.font + delta)) };
    }, day));
  }
  $("share").onclick = action(async () => {
    const s = P.stats(state, plan, today());
    await H.copy("J\u2019ai lu " + s.count + " / 90 jours de la Bible (" + editions[state.edition] + ") avec BaibolintsikaVerse. S\xE9rie : " + state.streak + " jours.");
    status("Progression copi\xE9e.");
  });
  $("paper").onclick = action(() => makePdf());
  $("certificate").onclick = () => {
    const name = Object.assign(node("input"), { placeholder: "Pr\xE9nom et nom", required: true, maxLength: 65 });
    showDialog("Certificat de lecture", name, dialogAction("Cr\xE9er le PDF", async () => {
      if (!name.value.trim()) throw Error("Indiquez le nom \xE0 afficher.");
      dialog.close();
      await makePdf(name.value.trim());
    }));
  };
  $("listen").onclick = action(listen);
  $("pause-audio").onclick = () => {
    if (player || spoken) {
      paused = true;
      if (player) player.pause();
      else speechSynthesis.pause();
    }
  };
  $("stop").onclick = stopAudio;
  document.addEventListener("bv-module", (event) => {
    if (event.detail === "plan90") action(init)();
  });
  const selectedModule = new URLSearchParams(location.search).get("readingModule");
  if (selectedModule === "plan90") BVLibrary.select(selectedModule);
  window.addEventListener("pagehide", () => {
    stopAudio();
    if (ambientObjectURL) URL.revokeObjectURL(ambientObjectURL);
  });
})();
