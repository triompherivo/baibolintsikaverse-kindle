(() => {
  "use strict";
  const $ = (id) => document.getElementById(id), C = BVCalendar;
  const colors = { white: ["Blanc", "#fffdf4"], red: ["Rouge", "#c7524b"], green: ["Vert", "#4b976b"], purple: ["Violet", "#9565ad"], black: ["Noir", "#242424"], unknown: ["Liturgique", "#4b976b"] };
  const weekdays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const months = ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"];
  let engine, loading, event, followUpcoming = true, selectedDay, monthYear, monthIndex, yearNumber, view = "day", followToday = true, lastToday;
  let popupRef, popupTrigger, popupRequest = 0, lastPericopeDay, collectFont = 18;
  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== void 0) el.textContent = text;
    return el;
  };
  const status = (module, text = "", error = false) => {
    const el = $(module + "-status");
    el.textContent = text;
    el.classList.toggle("error", error);
  };
  const run = (module, fn) => async () => {
    try {
      await load();
      await fn();
      status(module);
    } catch (error) {
      status(module, error.message, true);
    }
  };
  function load() {
    if (!loading) loading = fetch("data/calendars.json").then((response) => {
      if (!response.ok) throw Error("Le calendrier hors ligne est indisponible.");
      return response.json();
    }).then((data) => engine = C.create(data)).catch((error) => {
      loading = null;
      throw error;
    });
    return loading;
  }
  function civilLabel(day, { short = false } = {}) {
    const p = C.civilParts(day);
    return short ? `${p.day}/${p.month}` : `${weekdays[C.weekday(day)]} ${p.day} ${months[p.month - 1]} ${C.yearLabel(p.year)}`;
  }
  function setYearInput(number) {
    $("dss-era").value = number <= 0 ? "BC" : "AD";
    $("dss-year-input").max = number <= 0 ? 3925 : 2100;
    $("dss-year-input").value = number <= 0 ? 1 - number : number;
  }
  function initDSS() {
    if (selectedDay !== void 0) return;
    selectedDay = lastToday = C.jerusalemDay();
    const day = engine.dss(selectedDay);
    monthYear = yearNumber = day.year;
    monthIndex = day.month;
    setYearInput(yearNumber);
  }
  function renderPericope() {
    if (followUpcoming || !event) event = engine.upcoming();
    $("pericope-date").textContent = (event.ordinal === C.localDay() ? "Aujourd\u2019hui \xB7 " : "") + civilLabel(event.ordinal);
    $("pericope-title").textContent = event.title;
    $("pericope-number").textContent = "N\xBA " + event.tableNumber;
    $("pericope-subtitle").textContent = event.subtitle;
    $("pericope-subtitle").hidden = !event.subtitle;
    const [color, hex] = colors[event.color] || colors.green;
    const badge = $("pericope-color");
    badge.replaceChildren(node("span", "liturgical-dot"), document.createTextNode(`Cycle ${["", "I", "II", "III"][event.cycle]} \xB7 ${color}`));
    badge.style.setProperty("--liturgical", hex);
    $("pericope-collect-text").replaceChildren(...(event.collect || "Aucune pri\xE8re renseign\xE9e dans le recueil.").split(/\n\s*\n/).map((text) => node("p", "", text)));
    $("pericope-readings").replaceChildren(...event.readings.map((reading) => {
      const row = node("div", "pericope-reading");
      row.append(node("span", "reading-role", reading.title));
      const ref = engine.reading(reading.reference);
      if (ref && BV.valid(ref)) {
        const button = node("button", "pericope-link", reading.reference);
        button.type = "button";
        button.setAttribute("aria-label", reading.title + " : " + reading.reference);
        button.onclick = () => openPassage(ref, button);
        row.append(button);
      } else row.append(node("span", "calendar-status", reading.reference || "Lecture non renseign\xE9e dans le recueil."));
      return row;
    }));
    $("pericope-previous").disabled = !engine.adjacent(event.ordinal, -1);
    $("pericope-next").disabled = !engine.adjacent(event.ordinal, 1);
    $("pericope-card").dataset.day = event.ordinal;
    $("pericope-card").hidden = false;
    lastPericopeDay = C.localDay();
  }
  function send(message) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(Error("Le passage met trop de temps \xE0 r\xE9pondre. R\xE9essayez.")), 1e4);
      Promise.resolve(browser.runtime.sendMessage(message)).then((value) => {
        clearTimeout(timer);
        if (!(value == null ? void 0 : value.ok)) reject(Error((value == null ? void 0 : value.error) || "Passage indisponible."));
        else resolve(value.value);
      }, (error) => {
        clearTimeout(timer);
        reject(error);
      });
    });
  }
  async function renderPassage() {
    var _a;
    const request = ++popupRequest, version = $("calendar-bible").value;
    $("calendar-passage-title").textContent = BV.label(popupRef, version);
    $("calendar-passage-body").replaceChildren(node("p", "popup-hint", "Chargement du passage\u2026"));
    try {
      const passage = await send({ type: "passage", ref: popupRef, version });
      if (request !== popupRequest) return;
      const rows = passage.rows.map((row) => {
        const p = node("p");
        p.append(node("sup", "", `${row.chapter}:${row.verse}`), document.createTextNode(row.text));
        return p;
      });
      if ((_a = passage.missing) == null ? void 0 : _a.length) rows.push(node("p", "popup-hint", "Certains versets sont absents de cette \xE9dition."));
      $("calendar-passage-body").replaceChildren(...rows);
    } catch (error) {
      if (request === popupRequest) $("calendar-passage-body").replaceChildren(node("p", "popup-hint", error.message));
    }
  }
  function openPassage(ref, trigger) {
    popupRef = ref;
    popupTrigger = trigger;
    $("calendar-bible").value = $("version").value || "1MG1865";
    $("calendar-passage").showModal();
    renderPassage();
  }
  $("calendar-passage-close").onclick = () => $("calendar-passage").close();
  $("calendar-passage").addEventListener("close", () => {
    popupRequest++;
    if (popupTrigger == null ? void 0 : popupTrigger.isConnected) popupTrigger.focus({ preventScroll: true });
  });
  $("calendar-bible").onchange = renderPassage;
  $("calendar-passage-open").onclick = async () => {
    try {
      await send({ type: "open", ref: popupRef, version: $("calendar-bible").value });
    } catch (error) {
      $("calendar-passage-body").append(node("p", "popup-hint", error.message));
    }
  };
  function renderDay() {
    const value = engine.dss(selectedDay), today = selectedDay === C.jerusalemDay();
    $("dss-date").textContent = value.label;
    $("dss-am").textContent = `${value.am} AM \xB7 Ann\xE9e commen\xE7ant en ${C.yearLabel(value.year)}`;
    $("dss-special-events").replaceChildren(...value.events.length ? value.events.map((event2) => node("span", "special-event " + event2.accent, event2.title)) : [node("span", "special-event", "Aucun jour sp\xE9cial ce jour")]);
    $("dss-gregorian").textContent = civilLabel(selectedDay);
    $("dss-time").textContent = today ? weekdays[C.weekday(selectedDay)] + " \xB7 " + new Intl.DateTimeFormat("fr-FR", { timeZone: "Asia/Jerusalem", hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(/* @__PURE__ */ new Date()) : weekdays[C.weekday(selectedDay)] + " \xB7 date s\xE9lectionn\xE9e";
    $("dss-hebrew").textContent = new Intl.DateTimeFormat("en-US-u-ca-hebrew", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(C.utcDate(selectedDay));
    $("dss-today-card").setAttribute("aria-label", today ? "Calendrier DSS du jour" : "Calendrier DSS de la date s\xE9lectionn\xE9e");
  }
  function monthCard(number, index) {
    const model = engine.month(number, index), section = node("section", "dss-month");
    section.append(node("h3", "", model.title), node("p", "", `${model.am} AM \xB7 ${C.yearLabel(number)} \xB7 ${civilLabel(model.days[0].ordinal)} \u2192 ${civilLabel(model.days.at(-1).ordinal)}`));
    const grid = node("div", "dss-grid");
    grid.setAttribute("aria-label", model.title + " " + C.yearLabel(number));
    for (const day of ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]) grid.append(node("span", "dss-weekday", day));
    for (let empty = 0; empty < C.weekday(model.days[0].ordinal); empty++) grid.append(node("span"));
    const today = C.jerusalemDay();
    for (const day of model.days) {
      const feast = day.events.some((e) => e.title !== "Shabbat"), shabbat = C.weekday(day.ordinal) === 6;
      const button = node("button", "dss-cell" + (shabbat ? " shabbat" : "") + (feast ? " feast" : "") + (day.ordinal === today ? " today" : "") + (day.kind === "tekufah" ? " tekufah" : ""));
      button.type = "button";
      button.dataset.day = day.ordinal;
      button.append(node("strong", "", day.kind === "tekufah" ? "TKF" : String(day.day)), node("small", "", civilLabel(day.ordinal, { short: true })));
      if (feast) button.append(node("span", "day-dot", "\u25CF"));
      button.setAttribute("aria-label", `${day.label}, ${civilLabel(day.ordinal)}${day.events.length ? ", " + day.events.map((e) => e.title).join(", ") : ""}`);
      if (day.ordinal === today) button.setAttribute("aria-current", "date");
      button.onclick = () => {
        selectedDay = day.ordinal;
        monthYear = day.year;
        monthIndex = day.month;
        followToday = false;
        setView("day");
        $("dss-date").focus({ preventScroll: true });
        $("dss-day-view").scrollIntoView({ block: "start" });
      };
      grid.append(button);
    }
    section.append(grid);
    const events = node("div", "dss-month-events");
    for (const day of model.days) {
      const feasts = day.events.filter((e) => e.title !== "Shabbat");
      if (feasts.length) {
        const row = node("button", "dss-event-row", `${day.kind === "tekufah" ? "Tekufah" : day.day} \xB7 ${feasts.map((e) => e.title).join(" \xB7 ")}`);
        row.type = "button";
        row.onclick = () => {
          selectedDay = day.ordinal;
          monthYear = day.year;
          monthIndex = day.month;
          followToday = false;
          setView("day");
          $("dss-day-view").scrollIntoView({ block: "start" });
        };
        events.append(row);
      }
    }
    section.append(events);
    return section;
  }
  function renderMonth() {
    $("dss-month-content").replaceChildren(monthCard(monthYear, monthIndex));
    $("dss-month-previous").disabled = monthYear === engine.data.dssRange[0] && monthIndex === 0;
    $("dss-month-next").disabled = monthYear === engine.data.dssRange[1] && monthIndex === (engine.year(monthYear).leap ? 12 : 11);
  }
  function renderYear() {
    const model = engine.year(yearNumber);
    $("dss-year-summary").textContent = `${C.yearLabel(yearNumber)} \xB7 ${model.am} AM \xB7 ${model.next - model.start} jours${model.leap ? " \xB7 Semaine intercalaire de 7 jours" : ""}`;
    $("dss-year-content").replaceChildren(...Array.from({ length: model.leap ? 13 : 12 }, (_, index) => monthCard(yearNumber, index)));
  }
  function setView(next) {
    view = next;
    for (const name of ["day", "month", "year"]) $("dss-" + name + "-view").hidden = name !== view;
    for (const button of document.querySelectorAll("[data-dss-view]")) button.setAttribute("aria-pressed", String(button.dataset.dssView === view));
    if (view === "day") renderDay();
    else if (view === "month") renderMonth();
    else renderYear();
  }
  for (const button of document.querySelectorAll("[data-dss-view]")) button.onclick = run("dss", () => {
    initDSS();
    setView(button.dataset.dssView);
  });
  $("dss-date").tabIndex = -1;
  $("dss-today").onclick = run("dss", () => {
    selectedDay = lastToday = C.jerusalemDay();
    followToday = true;
    const day = engine.dss(selectedDay);
    monthYear = yearNumber = day.year;
    monthIndex = day.month;
    setYearInput(yearNumber);
    setView("day");
  });
  $("dss-current-month").onclick = run("dss", () => {
    const day = engine.dss(C.jerusalemDay());
    monthYear = day.year;
    monthIndex = day.month;
    renderMonth();
  });
  for (const [id, direction] of [["dss-month-previous", -1], ["dss-month-next", 1]]) $(id).onclick = run("dss", () => {
    monthIndex += direction;
    if (monthIndex < 0) {
      monthYear--;
      monthIndex = engine.year(monthYear).leap ? 12 : 11;
    } else if (monthIndex >= (engine.year(monthYear).leap ? 13 : 12)) {
      monthYear++;
      monthIndex = 0;
    }
    renderMonth();
  });
  $("dss-era").onchange = () => {
    $("dss-year-input").max = $("dss-era").value === "BC" ? 3925 : 2100;
  };
  $("dss-year-form").onsubmit = (e) => {
    e.preventDefault();
    run("dss", () => {
      const number = C.civilYear($("dss-year-input").value, $("dss-era").value);
      engine.year(number);
      yearNumber = monthYear = number;
      monthIndex = 0;
      renderYear();
    })();
  };
  $("pericope-upcoming").onclick = run("pericope", () => {
    followUpcoming = true;
    renderPericope();
  });
  for (const [id, direction] of [["pericope-previous", -1], ["pericope-next", 1]]) $(id).onclick = run("pericope", () => {
    const next = engine.adjacent(event.ordinal, direction);
    if (next) {
      event = next;
      followUpcoming = false;
      renderPericope();
    }
  });
  for (const [id, direction] of [["pericope-collect-smaller", -1], ["pericope-collect-larger", 1]]) $(id).onclick = () => {
    collectFont = Math.max(14, Math.min(28, collectFont + direction));
    $("pericope-collect-text").style.setProperty("--collect-size", collectFont + "px");
    $("pericope-collect-size").textContent = collectFont;
    $("pericope-collect-smaller").disabled = collectFont === 14;
    $("pericope-collect-larger").disabled = collectFont === 28;
  };
  document.addEventListener("bv-module", (e) => {
    if (e.detail === "pericope") run("pericope", () => {
      if (!event) {
        const date = new URLSearchParams(location.search).get("pericope");
        if (date && /^-?\d{1,7}$/.test(date)) {
          const day = Number(date), year = C.civilParts(day).year;
          if (year >= 1583 && year <= 9999) {
            event = engine.celebration(day);
            followUpcoming = false;
          }
        }
      }
      renderPericope();
    })();
    if (e.detail === "dss") run("dss", () => {
      initDSS();
      refreshDSS();
      setView(view);
    })();
  });
  function refreshDSS() {
    const today = C.jerusalemDay();
    if (today !== lastToday && followToday) {
      selectedDay = today;
    }
    const changed = lastToday !== today;
    lastToday = today;
    return changed;
  }
  function refresh() {
    if (document.hidden || !engine) return;
    if (!$("pericope-panel").hidden && followUpcoming && lastPericopeDay !== C.localDay()) run("pericope", renderPericope)();
    if (!$("dss-panel").hidden) run("dss", () => {
      initDSS();
      const changed = refreshDSS();
      if (view === "day") renderDay();
      else if (changed) setView(view);
    })();
  }
  setInterval(refresh, 6e4);
  document.addEventListener("visibilitychange", refresh);
})();
