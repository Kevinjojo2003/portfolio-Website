/* On-device writer. It only re-frames what the person wrote: it never adds
   events, feelings, people or outcomes. Their sentences are kept in their own words. */
(function () {
  'use strict';
  var hash = window.RR_ART.hash;
  var NON = /^(n\/?a|none|nothing|no|nope|not really|idk|i don'?t know|pass|skip|-+|\.+)\.?$/i;

  function val(a, id) {
    var t = String((a && a[id]) || '').replace(/\s+/g, ' ').trim();
    return (!t || NON.test(t)) ? '' : t;
  }
  function sentences(t, n) {
    var m = t.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [t];
    var out = m.slice(0, n).map(function (s) { return s.trim(); }).join(' ');
    out = out.charAt(0).toUpperCase() + out.slice(1);
    return /[.!?…"')\]]$/.test(out) ? out : out + '.';
  }
  function T(s, v) { return window.RR_T ? window.RR_T(s, v) : s; }
  function lang() { return window.RR_I18N ? window.RR_I18N.lang() : 'en'; }
  function pick(arr, id, variant) { return arr[lang() !== 'en' ? 0 : (hash(id) + (variant || 0)) % arr.length]; }
  function wc(t) { return (t.match(/\S+/g) || []).length; }

  function parseWords(t) {
    var parts = t.replace(/(^|\s)(और|மற்றும்|మరియు|ಮತ್ತು|च)(?=\s|$)/g, ',').split(/,|،|;|\n|\band\b|\by\b|\bet\b|&|\//i).map(function (s) {
      return s.trim().replace(/^[\-\d.\s]+/, '').replace(/[.!?]+$/, '').trim();
    }).filter(Boolean);
    if (parts.length >= 2 && parts.length <= 5 && parts.every(function (p) { return p.split(/\s+/).length <= 3; })) return parts;
    return null;
  }
  function soften(w) { return /^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w; }
  function list(a) {
    if (a.length === 1) return a[0];
    if (a.length === 2) return T('{a} and {b}', { a: a[0], b: a[1] });
    return T('{list}, and {last}', { list: a.slice(0, -1).join(', '), last: a[a.length - 1] });
  }
  function titleCase(w) { return w.replace(/\b([a-z])/g, function (m) { return m.toUpperCase(); }); }

  var LABELS = { milestones: 'milestones', relationships: 'relationships', work: 'work', health: 'health', creativity: 'creativity', family: 'family', travel: 'travel', growth: 'personal growth' };

  var INTROS = {
    moment: ['One moment keeps coming back to me.', 'There is a moment I keep returning to.'],
    changed: ['Here is what changed.', 'Some things changed.'],
    surprised: ['Something surprised me.', 'I did not see this coming.'],
    proud: ['I am proud of something that might seem small to someone else.', 'Here is something I am proud of.'],
    helped: ['Here is what helped me through the year.', 'I did not do the year alone, or without help of some kind.'],
    fellInto: ['Some things fell into place.', 'Something worked out.'],
    madeTime: ['I made time for something I am glad about.', 'There is something I am glad I made time for.'],
    hard: ['Some of it was hard, or did not go as planned.', 'Not everything went the way I thought it would.'],
    learned: ['I learned something about myself.', 'Here is something I noticed about myself.'],
    leave: ['There is something I am ready to leave behind.', 'I think I am ready to set something down.'],
    credit: ['I want to give myself credit for something.', 'Here is something I want to give myself credit for.'],
    people: ['Someone made a difference in my year.', 'There are people I want to remember.'],
    ordinary: ['An ordinary moment turned out to matter.', 'A small, ordinary moment stayed with me.'],
    capture: ['If one thing captures this year, it might be this.', 'This is the place, song, or moment that holds the year for me.']
  };
  var GROUPS = [
    ['words', 'moment', 'changed', 'surprised'],
    ['proud', 'helped', 'fellInto', 'madeTime'],
    ['hard', 'learned', 'leave', 'credit'],
    ['people', 'ordinary', 'capture', 'milestones', 'relationships', 'work', 'health', 'creativity', 'family', 'travel', 'growth']
  ];
  var SHORT = { words: 1, moment: 1, changed: 1, proud: 1, hard: 1, learned: 1, people: 1 };

  function titleFor(a, year) {
    var w = parseWords(val(a, 'words'));
    if (w) return year + ': ' + w.map(titleCase).join(', ');
    return 'My ' + year;
  }

  function story(a, ctx, length, variant) {
    var year = ctx.year, short = length === 'short', maxS = short ? 1 : 4, answered = 0, text = '', paras;
    function build() {
      paras = [];
      answered = 0;
      GROUPS.forEach(function (g, gi) {
        var lines = [];
        g.forEach(function (id) {
          if (short && !SHORT[id]) return;
          var t = val(a, id);
          if (!t) return;
          answered++;
          if (id === 'words') {
            var ws = parseWords(t);
            lines.push(ws
              ? T('If I had to describe {year} in a few words, they would be {words}.', { year: year, words: list(ws.map(soften)) })
              : T('How I would describe {year}:', { year: year }) + ' ' + sentences(t, maxS));
          } else if (LABELS[id]) {
            lines.push(T('A note on {label}.', { label: T(LABELS[id]) }) + ' ' + sentences(t, maxS));
          } else {
            lines.push(T(pick(INTROS[id], id, variant)) + ' ' + sentences(t, maxS));
          }
        });
        if (lines.length) paras.push((gi === 0 ? T('This is my {year}, in my own words.', { year: year }) + ' ' : '') + lines.join(' '));
      });
      if (!short && answered >= 4) paras.push(T('That is {year} as I see it right now. I can come back and change any of it.', { year: year }));
      text = paras.join('\n\n');
    }
    build();
    while (!short && wc(text) > 600 && maxS > 1) { maxS--; build(); }
    return { title: titleFor(a, year), text: text, sparse: answered < 3 };
  }

  function future(a, ctx, variant) {
    var next = ctx.next, paras = [], n = 0;
    var intro = T('This is an imagined version of {next}, put together from what I said I hope for. It is not a forecast, and it does not ask me to get everything right.', { next: next });
    var F = {
      room: ['Here is what I would like to make room for.', 'In ' + next + ', I picture making space for something.'],
      try: ['Here is what I would like to try, change, build, or experience.', 'I am curious about something.'],
      feel: ['I would like to feel this way.', 'Here is how I hope to feel.'],
      promise: ['One small promise I want to make to myself.', 'A small promise, just for me.'],
      support: ['What might help me move toward it.', 'Some support, a habit, or a boundary could help.']
    };
    function one(id) {
      var t = val(a, id);
      if (!t) return '';
      n++;
      return T(pick(F[id], id, variant)) + ' ' + sentences(t, 4);
    }
    var p2 = [one('room'), one('try')].filter(Boolean).join(' ');
    var p3 = [one('feel'), one('promise')].filter(Boolean).join(' ');
    var p4 = [one('support')].filter(Boolean).join(' ');
    var word = val(a, 'word');
    if (word) { n++; p4 = (p4 ? p4 + ' ' : '') + T('The word I want to carry into {next} is “{word}”.', { next: next, word: word.replace(/[.!?]+$/, '') }); }
    if (!n) return { text: '', sparse: true };
    paras.push(intro);
    [p2, p3, p4].forEach(function (p) { if (p) paras.push(p); });
    if (n >= 2) paras.push(T('None of this is promised, and some of it may change shape along the way. It is a direction I can come back to, at my own pace.'));
    return { text: paras.join('\n\n'), sparse: n < 3 };
  }

  function imagePrompt(a, mood) {
    var bits = ['room', 'try', 'feel', 'word'].map(function (k) { return val(a, k); }).filter(Boolean).join('; ');
    return 'An abstract, ' + mood + ' mood piece inspired by these hopes: ' + bits +
      '. Calm, evocative, symbolic. No text, no logos, no watermarks, no recognizable people.';
  }

  window.RR_GEN = { story: story, future: future, val: val, parseWords: parseWords, imagePrompt: imagePrompt, wc: wc };
})();
