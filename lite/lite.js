(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var versions = {'1MG1865': 'mg', KJF: 'fr', KJV: 'en'};
  var books, bible, book = 1, chapter = 1, page = 0, hits = [], ticket = 0;
  var version = '1MG1865', pageSize = 40;
  function get(url, done) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      if (request.status === 200) {
        try { done(null, JSON.parse(request.responseText)); }
        catch (error) { done(error); }
      } else done(new Error('Ressource biblique indisponible.'));
    };
    request.send(null);
  }
  function option(name, value) {
    var item = document.createElement('option');
    item.value = value;
    item.textContent = name;
    return item;
  }
  function element(tag, text) {
    var item = document.createElement(tag);
    item.textContent = text;
    return item;
  }
  function name(number) { return books[number - 1][versions[version]]; }
  function fill() {
    $('book').innerHTML = '';
    for (var i = 1; i <= books.length; i++) $('book').appendChild(option(name(i), i));
    $('book').value = book;
  }
  function chapterCount() { return books[book - 1].counts[version].length; }
  function render(target) {
    chapter = Math.min(chapterCount(), chapter);
    $('results').style.display = 'none';
    $('verses').style.display = '';
    $('book').value = book;
    $('chapter').innerHTML = '';
    for (var i = 1; i <= chapterCount(); i++) $('chapter').appendChild(option(i, i));
    $('chapter').value = chapter;
    $('title').textContent = name(book) + ' ' + chapter;
    $('status').textContent = '';
    $('previous').disabled = book === 1 && chapter === 1;
    $('next').disabled = book === books.length && chapter === chapterCount();
    var verses = bible[book][chapter] || [], selected;
    $('verses').innerHTML = '';
    for (var n = 0; n < verses.length; n++) {
      var p = element('p', '');
      p.appendChild(element('sup', verses[n][0]));
      p.appendChild(document.createTextNode(verses[n][1]));
      $('verses').appendChild(p);
      if (verses[n][0] === target) selected = p;
    }
    if (selected) { selected.style.backgroundColor = '#e4e4e4'; selected.scrollIntoView(); }
    try { localStorage.setItem('verse-lite', JSON.stringify([version, book, chapter])); } catch (error) {}
  }
  function load() {
    var active = ++ticket;
    bible = null;
    $('status').textContent = 'Chargement de la Bible…';
    get('../verse/data/' + version + '.json', function (error, result) {
      if (active !== ticket) return;
      if (error) { $('status').textContent = error.message; return; }
      bible = result;
      fill();
      render();
    });
  }
  function step(amount) {
    if (!bible) return;
    chapter += amount;
    if (chapter < 1) { book--; chapter = chapterCount(); }
    else if (chapter > chapterCount()) { book++; chapter = 1; }
    render();
  }
  function showHit(result) { book = result[0]; chapter = result[1]; render(result[2]); }
  function showPage() {
    $('verses').style.display = 'none';
    $('results').style.display = '';
    $('title').textContent = hits.length + (hits.length === 1 ? ' verset' : ' versets');
    $('status').textContent = '';
    var start = page * pageSize;
    $('hits').innerHTML = '';
    for (var i = start; i < Math.min(hits.length, start + pageSize); i++) {
      var hit = hits[i], button = element('button', name(hit[0]) + ' ' + hit[1] + ':' + hit[2] + ' · ' + hit[3]);
      button.onclick = showHit.bind(null, hit);
      $('hits').appendChild(button);
    }
    $('previous-page').disabled = page === 0;
    $('next-page').disabled = start + pageSize >= hits.length;
  }
  $('search').onsubmit = function (event) {
    event.preventDefault();
    var term = $('query').value.trim().toLowerCase();
    if (!bible || !term) return;
    hits = [];
    page = 0;
    for (var bookNumber = 1; bookNumber <= books.length; bookNumber++) {
      var chapters = bible[bookNumber];
      for (var c = 1; c <= books[bookNumber - 1].counts[version].length; c++) {
        var verses = chapters[c] || [];
        for (var v = 0; v < verses.length; v++) {
          if (verses[v][1].toLowerCase().indexOf(term) >= 0) hits.push([bookNumber, c, verses[v][0], verses[v][1]]);
        }
      }
    }
    showPage();
  };
  $('version').onchange = function () { version = this.value; load(); };
  $('book').onchange = function () { if (bible) { book = Number(this.value); chapter = 1; render(); } };
  $('chapter').onchange = function () { if (bible) { chapter = Number(this.value); render(); } };
  $('previous').onclick = function () { step(-1); };
  $('next').onclick = function () { step(1); };
  $('previous-page').onclick = function () { page--; showPage(); };
  $('next-page').onclick = function () { page++; showPage(); };
  try {
    var saved = JSON.parse(localStorage.getItem('verse-lite') || 'null');
    if (saved && versions[saved[0]] && saved[1] >= 1 && saved[1] <= 66 && saved[2] >= 1) {
      version = saved[0]; book = saved[1]; chapter = saved[2];
    }
  } catch (error) {}
  $('version').value = version;
  if (/(?:^|[?&])scriptures=1(?:&|$)/.test(location.search)) {
    $('foot').appendChild((function () {
      var anchor = element('a', 'Scriptures');
      anchor.href = '../bible.html';
      return anchor;
    })());
  }
  get('books.json', function (error, result) {
    if (error) { $('status').textContent = error.message; return; }
    books = result;
    load();
  });
})();
