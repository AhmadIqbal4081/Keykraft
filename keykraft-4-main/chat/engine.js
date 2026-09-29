/* ============================================================
   Keykraft chat — matching engine (no network, no dependencies)
   Reads window.KK_KB (chat/knowledge.js) and exposes window.KKBot
   ============================================================ */
(function (root) {
  'use strict';

  function norm(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/next\s*\.?\s*js/g, 'nextjs')
      .replace(/node\s*\.?\s*js/g, 'nodejs')
      .replace(/e-mail/g, 'email')
      .replace(/front-end/g, 'front end')
      .replace(/&/g, ' and ')
      .replace(/['’`]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  /* very light stemmer so "prices/pricing/priced" and "services/service" line up */
  function stem(w) {
    if (w.length > 3) {
      if (/ies$/.test(w)) w = w.slice(0, -3) + 'y';
      else if (/s$/.test(w) && !/(ss|us|is)$/.test(w)) w = w.slice(0, -1);
    }
    if (w.length > 5 && /ing$/.test(w)) w = w.slice(0, -3);
    else if (w.length > 4 && /ed$/.test(w)) w = w.slice(0, -2);
    if (w.length > 3 && /e$/.test(w)) w = w.slice(0, -1);
    return w;
  }

  function lev(a, b) {
    var m = a.length, n = b.length, i, j, prev = [], cur;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  /* typo tolerance: same first letter, similar length, small edit distance */
  function fuzzy(kw, tokens) {
    if (kw.length < 5) return false;
    var max = kw.length >= 8 ? 2 : 1;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.length < 4 || t[0] !== kw[0]) continue;
      if (kw.length >= 6 && t.length >= kw.length && t.indexOf(kw) === 0) return true;   // "internationally"
      if (Math.abs(t.length - kw.length) > max) continue;
      if (lev(kw, t) <= max) return true;
    }
    return false;
  }

  var STOP = {};
  ('what do you are is how much does a an the i me my to for of in on can we your our it this that with about get have will who where when be us').split(' ')
    .forEach(function (w) { STOP[stem(w)] = 1; });

  var KB = (root.KK_KB || {});
  var entries = (KB.entries || []).map(function (e) {
    var seen = {};
    e._kw = [];
    (e.kw || []).forEach(function (k) {
      var raw = norm(k).split(' ').filter(Boolean);
      var st = raw.map(stem), key = st.join(' ');
      if (!raw.length) return;
      if (seen[key]) { if (raw.length === 1) seen[key].alts.push(raw[0]); return; }
      var obj = { raw: raw, stem: st, alts: [], hasStop: raw.length > 1 && st.some(function (x) { return STOP[x]; }) };
      seen[key] = obj;
      e._kw.push(obj);
    });
    /* phrases first, so their words are "used up" before single keywords are counted */
    e._kw.sort(function (a, b) { return b.stem.length - a.stem.length; });
    return e;
  });
  var byId = {};
  entries.forEach(function (e) { byId[e.id] = e; });

  /* phrases with filler words ("what do you do") must appear in order, at most one word apart */
  function nearOrder(k, qRaw, qStems) {
    var cand = k.stem.map(function (st, j) {
      var idx = [];
      for (var i = 0; i < qStems.length; i++) {
        if (qStems[i] === st || fuzzy(k.raw[j], [qRaw[i]])) idx.push(i);
      }
      return idx;
    });
    function go(j, prev) {
      if (j === cand.length) return true;
      for (var x = 0; x < cand[j].length; x++) {
        var i = cand[j][x];
        if ((prev < 0 || (i > prev && i - prev <= 2)) && go(j + 1, i)) return true;
      }
      return false;
    }
    return go(0, -1);
  }

  function scoreEntry(e, qRaw, qStemSet, qStems) {
    var total = 0, used = {};
    for (var i = 0; i < e._kw.length; i++) {
      var k = e._kw[i], n = k.stem.length, exact = 0, loose = 0, j;
      if (n === 1 && used[k.stem[0]]) continue;
      for (j = 0; j < n; j++) {
        if (qStemSet[k.stem[j]]) exact++;
        else if (fuzzy(k.raw[j], qRaw) || k.alts.some(function (a) { return fuzzy(a, qRaw); })) loose++;
      }
      if (exact + loose < n) continue;              // every word of the phrase must be present
      if (k.hasStop && !nearOrder(k, qRaw, qStems)) continue;
      if (n > 1) for (j = 0; j < n; j++) used[k.stem[j]] = 1;
      if (loose === 0) total += n === 1 ? 2 : Math.min(2.5 * n, 5);
      else if (n === 1) total += k.raw[0].length >= 9 ? 2.2 : 1.3;   // a long word matching despite a typo is strong evidence
      else total += Math.min(1.5 * n, 3);
    }
    return total * (e.weight || 1);
  }

  var THRESHOLD = 1.9;

  function find(text) {
    var q = norm(text);
    if (!q) return null;
    var aliases = KB.aliases || {};
    if (aliases[q] && byId[aliases[q]]) return { entry: byId[aliases[q]], score: 99 };

    var qRaw = q.split(' ');
    var qStems = qRaw.map(stem), qStemSet = {};
    qStems.forEach(function (t) { qStemSet[t] = 1; });

    var best = null, bestScore = 0, bestIntent = null, bestIntentScore = 0;
    entries.forEach(function (e) {
      var s = scoreEntry(e, qRaw, qStemSet, qStems);
      if (s > bestScore) { best = e; bestScore = s; }
      if (e.intent && s > bestIntentScore) { bestIntent = e; bestIntentScore = s; }
    });
    /* "price of web development" is a pricing question, not a web-development one */
    if (bestIntent && bestIntentScore >= THRESHOLD) return { entry: bestIntent, score: bestIntentScore };
    return bestScore >= THRESHOLD ? { entry: best, score: bestScore } : null;
  }

  function pack(e) {
    return {
      id: e.id,
      text: e.a,
      links: e.links || [],
      followups: (e.fu || []).map(function (f) { return { label: f[0], id: f[1] }; })
    };
  }

  function reply(text) {
    var hit = find(text);
    if (hit) return pack(hit.entry);

    var fb = KB.fallback || {};
    var wa = (KB.business && KB.business.whatsapp) || '';
    var mail = (KB.business && KB.business.email) || '';
    var links = [];
    if (wa) links.push({ l: 'Ask the team on WhatsApp', u: wa + '?text=' + encodeURIComponent('Hi Keykraft, I have a question: ' + String(text).slice(0, 300)) });
    if (mail) links.push({ l: 'Email us', u: 'mailto:' + mail });
    return {
      id: 'fallback',
      text: fb.a || 'Sorry, I couldn\'t find an answer to that.',
      links: links,
      followups: (fb.fu || []).map(function (f) { return { label: f[0], id: f[1] }; })
    };
  }

  function answerById(id) {
    return byId[id] ? pack(byId[id]) : reply(id);
  }

  var api = { reply: reply, answerById: answerById, find: find, norm: norm };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.KKBot = api;
})(typeof window !== 'undefined' ? window : globalThis);
