(function(root) {
  "use strict";
  const days = 90;
  const ms = 864e5;
  const localDate = (date = /* @__PURE__ */ new Date()) => [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((value, i) => String(value).padStart(i === 0 ? 4 : 2, "0")).join("-");
  const shift = (key, amount) => new Date(Date.parse(key + "T00:00:00Z") + amount * ms).toISOString().slice(0, 10);
  const difference = (a, b) => (Date.parse(a + "T00:00:00Z") - Date.parse(b + "T00:00:00Z")) / ms;
  const wrap = (index, count) => (index % count + count) % count;
  function build(corpus, edition) {
    var _a, _b;
    const chapters = [];
    for (const [id, book] of Object.entries(corpus)) {
      for (let i = 0; i < book.length; i++) {
        const verses = (_b = (_a = book[i]) == null ? void 0 : _a.flatMap((text, j) => typeof text === "string" ? [{ verse: j + 1, text }] : [])) != null ? _b : [];
        if (verses.length) chapters.push({ book: Number(id), chapter: i + 1, verses });
      }
    }
    let remaining = chapters.reduce((sum, chapter) => sum + chapter.verses.length, 0);
    let cursor = 0;
    const result = [];
    for (let day = 1; day <= days; day++) {
      const remainingDays = days + 1 - day;
      const hebrew = edition === "hebrew";
      const average = remaining / remainingDays;
      const target = hebrew ? average : Math.max(1, Math.round(average));
      const softMin = Math.max(1, Math.trunc(target * 0.82));
      const softMax = Math.max(softMin, Math.trunc(target * 1.18));
      const sections = [];
      let count = 0;
      while (cursor < chapters.length) {
        const chapter = chapters[cursor], proposed = count + chapter.verses.length;
        const canLeaveEnough = chapters.length - cursor >= remainingDays;
        const fartherFromTarget = Math.abs(proposed - target) > Math.abs(count - target);
        const balanced = hebrew ? count >= target * 0.82 && fartherFromTarget : count >= softMin && fartherFromTarget && proposed > softMax;
        if (day !== days && sections.length && (!canLeaveEnough || balanced)) break;
        sections.push(chapter);
        count = proposed;
        cursor++;
      }
      if (!sections.length) throw Error("Impossible de former les 90 lectures.");
      remaining -= count;
      result.push({ day, sections, count });
    }
    if (cursor !== chapters.length) throw Error("Le plan ne couvre pas toute la Bible.");
    return result;
  }
  function empty(edition = "mdg", start = null, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
      edition,
      start,
      current: 1,
      completed: [],
      streak: 0,
      best: 0,
      last: null,
      finished: null,
      paused: false,
      hour: (_a = options.hour) != null ? _a : 7,
      font: (_b = options.font) != null ? _b : 20,
      ambientTrack: (_c = options.ambientTrack) != null ? _c : "",
      ambientVolume: (_d = options.ambientVolume) != null ? _d : 0.2,
      hebrewFont: (_e = options.hebrewFont) != null ? _e : 32,
      hebrewRate: (_f = options.hebrewRate) != null ? _f : 0.7,
      hebrewVoiceOnly: (_g = options.hebrewVoiceOnly) != null ? _g : false
    };
  }
  function stats(state, plan, date) {
    const completed = new Set(state.completed);
    const count = completed.size;
    const missed = plan.filter(({ day }) => day < state.current && !completed.has(day));
    return {
      count,
      missed,
      percent: count * 100 / days,
      verses: state.completed.reduce((sum, day) => sum + plan[day - 1].count, 0),
      late: state.start ? Math.max(0, Math.min(days, difference(date, state.start) + 1) - state.current + 1) : 0
    };
  }
  function correct(state, streak, includesToday, date) {
    if (!Number.isInteger(streak) || streak < 0 || streak > 999999) throw Error("Saisissez une s\xE9rie de 0 \xE0 999 999 jours.");
    return {
      ...state,
      streak,
      best: Math.max(streak, state.best),
      last: streak === 0 ? null : includesToday ? date : shift(date, -1)
    };
  }
  function mark(state, values) {
    return { ...state, completed: [.../* @__PURE__ */ new Set([...state.completed, ...values])].sort((a, b) => a - b) };
  }
  function complete(state, day, date) {
    if (!state.start || state.paused || state.current !== day || day > days || state.completed.includes(day)) return state;
    const streak = state.last === date ? state.streak : state.last === shift(date, -1) ? state.streak + 1 : 1;
    return {
      ...mark(state, [day]),
      current: day + 1,
      streak,
      last: date,
      best: Math.max(state.best, streak),
      finished: day === days ? date : null
    };
  }
  function restore(state, day, date) {
    if (!Number.isInteger(day) || day < 1 || day > days) throw Error("Saisissez un jour de 1 \xE0 90.");
    const start = shift(date, 1 - day);
    const updated = correct(mark(state, Array.from({ length: day }, (_, i) => i + 1)), Math.max(state.streak, day), true, date);
    return {
      ...updated,
      start: state.start && state.start < start ? state.start : start,
      current: Math.max(state.current, day + 1),
      finished: state.finished || (day === days ? date : null)
    };
  }
  function legacyAnchor(date, count) {
    let hash = 14695981039346656037n;
    for (const char of date.split("-").map(Number).join("-")) {
      hash = BigInt.asUintN(64, (hash ^ BigInt(char.charCodeAt(0))) * 1099511628211n);
    }
    return Number(hash % BigInt(count));
  }
  async function dailyIndex(key, count) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key));
    return Number(new DataView(digest).getBigUint64(0, true) % BigInt(count));
  }
  root.BVPlan = { days, localDate, shift, difference, wrap, build, empty, stats, correct, mark, complete, restore, legacyAnchor, dailyIndex };
  if (typeof module === "object") module.exports = root.BVPlan;
})(globalThis);
