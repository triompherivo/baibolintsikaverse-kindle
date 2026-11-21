(function(root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.VerseKJPBS = api;
})(typeof globalThis !== "undefined" ? globalThis : self, function() {
  "use strict";
  const now = () => typeof performance !== "undefined" ? performance.now() : Date.now();
  const lowerBound = (array, target) => {
    let low = 0, high = array.length;
    while (low < high) {
      const middle = low + high >>> 1;
      if (array[middle] < target) low = middle + 1;
      else high = middle;
    }
    return low;
  };
  const upperBound = (array, target) => {
    let low = 0, high = array.length;
    while (low < high) {
      const middle = low + high >>> 1;
      if (array[middle] <= target) low = middle + 1;
      else high = middle;
    }
    return low;
  };
  function normalize(source, caseSensitive = false, accentSensitive = false, hyphenSensitive = false) {
    let value = String(source).replace(/[’‘‛׳ʼ＇]/gu, "'");
    const hyphens = /[-\u00ad\u058a\u05be‐‑‒–—―−﹘﹣－]/gu;
    if (hyphenSensitive) value = value.replace(hyphens, "-");
    else {
      let remaining = value, output = "";
      while (remaining) {
        const open = remaining.indexOf("[");
        if (open < 0) {
          output += remaining.replace(hyphens, "");
          break;
        }
        output += remaining.slice(0, open).replace(hyphens, "");
        remaining = remaining.slice(open);
        const close = remaining.indexOf("]");
        if (close < 0) {
          output += remaining;
          break;
        }
        output += remaining.slice(0, close + 1);
        remaining = remaining.slice(close + 1);
      }
      value = output;
    }
    value = value.replace(/Æ/g, "Ae").replace(/æ/g, "ae").replace(/Ĳ/g, "IJ").replace(/ĳ/g, "ij").replace(/Œ/g, "Oe").replace(/œ/g, "oe").replace(/װ/g, "\u05D5\u05D5").replace(/ױ/g, "\u05D5\u05D9").replace(/ײ/g, "\u05D9\u05D9").normalize("NFKD");
    if (!accentSensitive) value = value.replace(new RegExp("\\p{M}", "gu"), "");
    return caseSensitive ? value : value.toLowerCase();
  }
  function wildcardExpression(wildcard) {
    const chars = Array.from(wildcard);
    let expression = "^";
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      if (c === "*") expression += ".*";
      else if (c === "?") expression += ".";
      else if (c === "[") {
        const close = chars.indexOf("]", i + 1);
        if (close < 0 || close === i + 1) throw new Error(`Motif invalide : ${wildcard}`);
        let content = chars.slice(i + 1, close).join("");
        if (content[0] === "!") content = "^" + content.slice(1);
        expression += "[" + content.replace(/\\/g, "\\\\") + "]";
        i = close;
      } else expression += c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    try {
      return new RegExp(expression + "$", "u");
    } catch (_) {
      throw new Error(`Motif invalide : ${wildcard}`);
    }
  }
  function createEngine(metadata, tokenBuffer) {
    if (!metadata || metadata.format !== "baibolintsika-kjpbs-normalmap-v1") throw new Error("Base CCDB incompatible.");
    let tokens;
    if (tokenBuffer instanceof Uint16Array) tokens = tokenBuffer;
    else if (ArrayBuffer.isView(tokenBuffer)) tokens = new Uint16Array(tokenBuffer.buffer, tokenBuffer.byteOffset, tokenBuffer.byteLength / 2);
    else tokens = new Uint16Array(tokenBuffer);
    const count = metadata.indexedWordCount, docs = metadata.documents, lexemes = metadata.lexemes;
    if (tokens.length !== count * 4) throw new Error("NormalMap tronqu\xE9e.");
    const bookByNumber = new Map(metadata.books.map((book) => [book.databaseNumber, book]));
    const counts = new Uint32Array(lexemes.length);
    for (let i = 0; i < count; i++) {
      const id = tokens[i * 4];
      if (id >= lexemes.length || tokens[i * 4 + 1] >= docs.length) throw new Error("NormalMap incorrecte.");
      counts[id]++;
    }
    const offsets = new Uint32Array(lexemes.length + 1);
    for (let i = 0; i < counts.length; i++) offsets[i + 1] = offsets[i] + counts[i];
    const postings = new Uint32Array(count), next = offsets.slice();
    for (let i = 0; i < count; i++) postings[next[tokens[i * 4]]++] = i;
    const normalizedCache = /* @__PURE__ */ new Map(), matcherCache = /* @__PURE__ */ new Map();
    let last = null;
    const tokenDocument = (position) => tokens[position * 4 + 1];
    const flagsKey = (flags) => `${+!!flags.caseSensitive}${+!!flags.accentSensitive}${+!!flags.hyphenSensitive}`;
    function normalizedLexicon(flags) {
      const key = flagsKey(flags);
      if (normalizedCache.has(key)) return normalizedCache.get(key);
      const values = [], exact = /* @__PURE__ */ new Map();
      for (let i = 0; i < lexemes.length; i++) {
        const word = normalize(lexemes[i], flags.caseSensitive, flags.accentSensitive, flags.hyphenSensitive);
        values.push(word);
        if (!exact.has(word)) exact.set(word, []);
        exact.get(word).push(i);
      }
      const entry = { values, exact };
      if (normalizedCache.size >= 4) normalizedCache.delete(normalizedCache.keys().next().value);
      normalizedCache.set(key, entry);
      return entry;
    }
    function makeMatcher(pattern, flags) {
      const word = normalize(pattern, flags.caseSensitive, flags.accentSensitive, flags.hyphenSensitive);
      if (word === "*") return { every: true, ids: [], frequency: count, contains: () => true };
      const cacheKey = flagsKey(flags) + ":" + word;
      if (matcherCache.has(cacheKey)) return matcherCache.get(cacheKey);
      const lexicon = normalizedLexicon(flags);
      let ids;
      if (/[*?\[]/u.test(word)) {
        const expression = wildcardExpression(word);
        ids = [];
        for (let i = 0; i < lexicon.values.length; i++) if (expression.test(lexicon.values[i])) ids.push(i);
      } else ids = lexicon.exact.get(word) || [];
      const set = new Set(ids), matcher = {
        every: false,
        ids,
        frequency: ids.reduce((sum, id) => sum + counts[id], 0),
        contains: (id) => set.has(id)
      };
      if (matcherCache.size >= 512) matcherCache.delete(matcherCache.keys().next().value);
      matcherCache.set(cacheKey, matcher);
      return matcher;
    }
    function compile(criterion, hyphenSensitive) {
      const flags = { ...criterion, hyphenSensitive };
      const alternatives = String(criterion.phrase).split("|").filter(Boolean).map((alternative) => alternative.trim().split(/\s+/u).filter(Boolean).map((word) => makeMatcher(word, flags))).filter((words) => words.length);
      return alternatives;
    }
    function fits(start, length, constraint) {
      if (!constraint) return true;
      const firstID = tokenDocument(start), lastID = tokenDocument(start + length - 1);
      if (constraint === 1) return firstID === lastID;
      const first = docs[firstID], last2 = docs[lastID];
      return first[0] === last2[0] && (constraint !== 2 || first[1] === last2[1]);
    }
    function findMatches(alternatives, constraint) {
      const keys = [], maxLength = Math.max(1, ...alternatives.map((words) => words.length)), radix = maxLength + 1;
      for (const words of alternatives) {
        if (words.some((word) => !word.frequency) || words.length > count) continue;
        let anchor = 0;
        for (let i = 1; i < words.length; i++) if (words[i].frequency < words[anchor].frequency) anchor = i;
        const matcher = words[anchor];
        const visit = (position) => {
          const start = position - anchor;
          if (start < 0 || start + words.length > count) return;
          for (let i = 0; i < words.length; i++) if (!words[i].contains(tokens[(start + i) * 4])) return;
          if (fits(start, words.length, constraint)) keys.push(start * radix + words.length);
        };
        if (matcher.every) for (let i = anchor; i <= count - words.length + anchor; i++) visit(i);
        else for (const id of matcher.ids) for (let i = offsets[id]; i < offsets[id + 1]; i++) visit(postings[i]);
      }
      const sorted = Float64Array.from(keys);
      sorted.sort();
      const starts = [], lengths = [];
      for (let i = 0; i < sorted.length; i++) {
        const start = Math.floor(sorted[i] / radix), length = sorted[i] % radix, previous = starts.length - 1;
        if (previous >= 0 && start <= starts[previous] + lengths[previous] - 1) {
          lengths[previous] = Math.min(65535, Math.max(starts[previous] + lengths[previous] - 1, start + length - 1) - starts[previous] + 1);
        } else {
          starts.push(start);
          lengths.push(length);
        }
      }
      return { starts: Uint32Array.from(starts), lengths: Uint32Array.from(lengths) };
    }
    function reference(documentID) {
      const d = docs[documentID], book = bookByNumber.get(d[0]);
      return {
        bookNumber: d[0],
        bookOrdinal: book.ordinal,
        shortName: book.shortName,
        longName: book.longName,
        chapter: d[1],
        verse: d[2],
        kind: d[3],
        testamentNumber: book.testamentNumber,
        displayText: d[3] === 2 ? `${book.shortName} \u2014 colophon` : d[3] === 1 ? `${book.shortName} ${d[1]} \u2014 superscription` : `${book.shortName} ${d[1]}:${d[2]}`
      };
    }
    function scopeKey(start, mode) {
      if (mode === "wholeBible" || mode === "unscoped") return 1;
      const documentID = tokenDocument(start), d = docs[documentID];
      if (mode === "verse") return documentID;
      if (mode === "chapter") return d[0] * 256 + d[1];
      if (mode === "book") return d[0];
      if (mode === "category") {
        const category = bookByNumber.get(d[0]).categoryName;
        return metadata.books.find((book) => book.categoryName === category).databaseNumber;
      }
      return bookByNumber.get(d[0]).testamentNumber;
    }
    function intervalIndex(item) {
      const starts = new Uint32Array(item.withinCount), maximumEnds = new Uint32Array(item.withinCount);
      let at = 0, maximum = 0;
      for (let i = 0; i < item.starts.length; i++) if (item.withinRank[i]) {
        starts[at] = item.starts[i];
        maximum = Math.max(maximum, item.starts[i] + item.lengths[i] - 1);
        maximumEnds[at++] = maximum;
      }
      return { contains(start, end) {
        const index = upperBound(starts, start) - 1;
        return index >= 0 && maximumEnds[index] >= end;
      } };
    }
    function groupsFor(documentCounts) {
      const groups = [], ids = [], byBook = /* @__PURE__ */ new Map();
      let verseCount = 0, chapterCount = 0;
      for (let id = 0; id < docs.length; id++) {
        const occurrences = documentCounts[id];
        if (!occurrences) continue;
        ids.push(id);
        const d = docs[id], book = bookByNumber.get(d[0]);
        if (!byBook.has(d[0])) {
          const group2 = {
            bookNumber: d[0],
            bookOrdinal: book.ordinal,
            shortName: book.shortName,
            longName: book.longName,
            resultCount: 0,
            occurrenceCount: 0,
            chapters: []
          };
          byBook.set(d[0], group2);
          groups.push(group2);
        }
        const group = byBook.get(d[0]);
        let chapter = group.chapters[group.chapters.length - 1];
        if (!chapter || chapter.chapter !== d[1]) {
          chapter = { chapter: d[1], resultCount: 0, occurrenceCount: 0 };
          group.chapters.push(chapter);
          if (d[1] > 0) chapterCount++;
        }
        group.resultCount++;
        group.occurrenceCount += occurrences;
        chapter.resultCount++;
        chapter.occurrenceCount += occurrences;
        if (d[3] === 0) verseCount++;
      }
      return { groups, ids: Uint32Array.from(ids), verseCount, chapterCount };
    }
    function resultRow(documentID, excluded) {
      const document2 = docs[documentID], start = document2[5], end = start + document2[6], highlights = [];
      for (const item of last.items) {
        const ranks = excluded ? item.removedRank : item.resultRank;
        if (!ranks || !item.starts.length) continue;
        for (let i = lowerBound(item.starts, start); i < item.starts.length && item.starts[i] < end; i++) {
          if (!ranks[i]) continue;
          const first = item.starts[i], final = Math.min(first + item.lengths[i], end) - 1;
          const location = tokens[first * 4 + 2], upper = tokens[final * 4 + 2] + tokens[final * 4 + 3];
          highlights.push({
            range: { location, length: upper - location },
            criterionIndex: item.criterionIndex,
            mention: {
              wholeBible: { index: i + 1, total: item.starts.length },
              selection: { index: item.withinRank[i], total: item.withinCount },
              results: { index: ranks[i], total: excluded ? item.removedCount : item.resultCount }
            }
          });
        }
      }
      highlights.sort((a, b) => a.range.location - b.range.location || a.range.length - b.range.length || a.criterionIndex - b.criterionIndex);
      return {
        id: documentID,
        reference: reference(documentID),
        text: document2[4],
        highlights,
        occurrenceCount: (excluded ? last.excludedDocumentCounts : last.documentCounts)[documentID],
        formatting: document2[7]
      };
    }
    function page({ offset = 0, limit = 50, excluded = false, bookNumber = null, chapter = null } = {}) {
      offset = Math.max(0, Math.floor(Number(offset) || 0));
      limit = Math.max(1, Math.min(250, Math.floor(Number(limit) || 50)));
      if (!last) return { results: [], total: 0, offset, limit };
      const ids = excluded ? last.excludedIndex.ids : last.index.ids;
      let total = 0;
      const results = [];
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i], d = docs[id];
        if (bookNumber !== null && d[0] !== Number(bookNumber)) continue;
        if (chapter !== null && d[1] !== Number(chapter)) continue;
        if (total >= offset && results.length < limit) results.push(resultRow(id, excluded));
        total++;
      }
      return { results, total, offset, limit };
    }
    function search(snapshot, { limit = 50 } = {}) {
      var _a;
      const started = now(), criteria = Array.isArray(snapshot.criteria) ? snapshot.criteria : [];
      if (!criteria.some((item) => !item.disabled && !item.excluded && String(item.phrase || "").trim())) throw new Error("Ajoutez au moins une phrase inclusive.");
      let mode = (_a = snapshot.scopeMode) != null ? _a : "unscoped";
      if (typeof mode === "number") mode = ["unscoped", "wholeBible", "testament", "book", "chapter", "verse", "category"][mode + 1];
      if (!["unscoped", "wholeBible", "testament", "book", "chapter", "verse", "category"].includes(mode)) throw new Error("Search scope invalide.");
      const selected = new Set(snapshot.selectedBookNumbers || []), allowed = new Uint8Array(docs.length);
      for (let id = 0; id < docs.length; id++) {
        const d = docs[id];
        allowed[id] = +((!selected.size || selected.has(d[0])) && (selected.size || snapshot.selectsEntireBible !== false) && (d[3] !== 1 || snapshot.includeSuperscriptions !== false) && (d[3] !== 2 || snapshot.includeColophons !== false));
      }
      const items = criteria.map((criterion, criterionIndex) => ({ criterion, criterionIndex })).filter((item) => String(item.criterion.phrase || "").trim()).map(({ criterion, criterionIndex }) => {
        const matches = findMatches(compile(criterion, !!snapshot.hyphenSensitive), Number(criterion.constraint) || 0);
        const withinRank = new Uint32Array(matches.starts.length);
        let withinCount = 0;
        for (let i = 0; i < matches.starts.length; i++) {
          if (allowed[tokenDocument(matches.starts[i])]) withinRank[i] = ++withinCount;
        }
        const duplicate = !criterion.disabled && criteria.slice(0, criterionIndex).some((previous) => String(previous.phrase || "") === String(criterion.phrase || "") && !!previous.caseSensitive === !!criterion.caseSensitive && !!previous.accentSensitive === !!criterion.accentSensitive && !!previous.excluded === !!criterion.excluded && (Number(previous.constraint) || 0) === (Number(criterion.constraint) || 0));
        return {
          ...matches,
          criterion,
          criterionIndex,
          withinRank,
          withinCount,
          resultRank: criterion.excluded ? null : new Uint32Array(matches.starts.length),
          removedRank: criterion.excluded ? null : new Uint32Array(matches.starts.length),
          resultCount: 0,
          removedCount: 0,
          removalContribution: 0,
          duplicate
        };
      });
      const active = items.filter((item) => !item.criterion.disabled && !item.duplicate);
      const inclusive = active.filter((item) => !item.criterion.excluded), exclusions = active.filter((item) => item.criterion.excluded);
      const intervals = exclusions.map(intervalIndex);
      let commonKeys = null, excludedOccurrences = 0;
      for (const item of inclusive) {
        const scopeKeys = /* @__PURE__ */ new Set();
        for (let i = 0; i < item.starts.length; i++) {
          if (!item.withinRank[i]) continue;
          let removed = false;
          for (let e = 0; e < exclusions.length; e++) if (intervals[e].contains(item.starts[i], item.starts[i] + item.lengths[i] - 1)) {
            exclusions[e].removalContribution++;
            excludedOccurrences++;
            removed = true;
          }
          if (removed) item.removedRank[i] = ++item.removedCount;
          else {
            item.resultRank[i] = 1;
            if (mode !== "unscoped") scopeKeys.add(scopeKey(item.starts[i], mode));
          }
        }
        if (mode !== "unscoped") {
          if (commonKeys === null) commonKeys = scopeKeys;
          else for (const key of commonKeys) if (!scopeKeys.has(key)) commonKeys.delete(key);
        }
      }
      const documentCounts = new Uint32Array(docs.length), excludedDocumentCounts = new Uint32Array(docs.length);
      let occurrences = 0, firstPosition = count;
      for (const item of inclusive) {
        for (let i = 0; i < item.starts.length; i++) {
          const documentID = tokenDocument(item.starts[i]);
          if (item.removedRank[i]) excludedDocumentCounts[documentID]++;
          if (!item.resultRank[i]) continue;
          if (mode !== "unscoped" && !commonKeys.has(scopeKey(item.starts[i], mode))) {
            item.resultRank[i] = 0;
            continue;
          }
          item.resultRank[i] = ++item.resultCount;
          documentCounts[documentID]++;
          occurrences++;
          firstPosition = Math.min(firstPosition, item.starts[i]);
        }
      }
      const index = groupsFor(documentCounts), excludedIndex = groupsFor(excludedDocumentCounts);
      const summary = {
        occurrences,
        excludedOccurrences,
        verses: index.verseCount,
        chapters: index.chapterCount,
        books: index.groups.length,
        firstReference: occurrences ? reference(tokenDocument(firstPosition)) : null,
        termStatistics: items.map((item) => ({
          id: item.criterion.id || String(item.criterionIndex),
          criterionIndex: item.criterionIndex,
          phrase: item.criterion.phrase,
          caseSensitive: !!item.criterion.caseSensitive,
          excluded: !!item.criterion.excluded,
          disabled: !!item.criterion.disabled,
          duplicate: item.duplicate,
          totalMatches: item.starts.length,
          matchesWithinSelection: item.withinCount,
          contributingMatches: item.criterion.excluded ? item.removalContribution : item.resultCount
        }))
      };
      last = { items, index, excludedIndex, documentCounts, excludedDocumentCounts };
      return {
        summary,
        results: page({ limit }).results,
        excludedResults: page({ limit, excluded: true }).results,
        totalResults: index.ids.length,
        totalExcludedResults: excludedIndex.ids.length,
        groups: index.groups,
        excludedGroups: excludedIndex.groups,
        elapsedMilliseconds: now() - started
      };
    }
    function suggestions(prefix, limit = 30) {
      const target = normalize(prefix, false, false, true);
      if (!target) return [];
      return lexemes.filter((word) => normalize(word, false, false, true).startsWith(target)).sort((a, b) => a.localeCompare(b, void 0, { sensitivity: "base" })).slice(0, Math.min(100, Math.max(1, limit)));
    }
    function document(documentID) {
      documentID = Number(documentID);
      if (!Number.isInteger(documentID) || documentID < 0 || documentID >= docs.length) return null;
      const d = docs[documentID], wordRanges = [];
      for (let i = d[5]; i < d[5] + d[6]; i++) wordRanges.push({ location: tokens[i * 4 + 2], length: tokens[i * 4 + 3] });
      return {
        id: documentID,
        reference: reference(documentID),
        text: d[4],
        formatting: d[7],
        pilcrow: d[8],
        wordRanges,
        globalWordStart: d[5] + 1
      };
    }
    function passage({ bookNumber, chapter }) {
      const results = [];
      for (let id = 0; id < docs.length; id++) if (docs[id][0] === Number(bookNumber) && docs[id][1] === Number(chapter)) results.push(document(id));
      return results;
    }
    function matchPage({ offset = 0, limit = 1e3, excluded = false } = {}) {
      offset = Math.max(0, Math.floor(Number(offset) || 0));
      limit = Math.max(1, Math.min(1e4, Math.floor(Number(limit) || 1e3)));
      if (!last) return { matches: [], total: 0, offset, limit };
      const rows = [];
      for (const item of last.items) {
        const ranks = excluded ? item.removedRank : item.resultRank;
        if (!ranks) continue;
        for (let i = 0; i < item.starts.length; i++) if (ranks[i]) rows.push([item.starts[i] + 1, item.lengths[i], item.criterionIndex]);
      }
      rows.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
      return { matches: rows.slice(offset, offset + limit), total: rows.length, offset, limit };
    }
    return { search, page, matchPage, suggestions, document, passage, books: metadata.books, info: metadata.info, indexedWordCount: count };
  }
  return { createEngine, normalize, wildcardExpression };
});
