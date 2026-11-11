/* Rewind & Renew — application logic. No build step, no dependencies. */
(function () {
  'use strict';

  var CFG = window.RR_CONFIG, Q = window.RR_QUESTIONS, ART = window.RR_ART, GEN = window.RR_GEN;

  /* ---------- Dates (everything is derived from config) ---------- */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var today = new Date();
  var YEAR = CFG.year || (today.getMonth() === 0 && today.getDate() <= 14 ? today.getFullYear() - 1 : today.getFullYear());
  var NEXT = YEAR + 1;
  var OPEN = new Date(YEAR, CFG.opens.month, CFG.opens.day);
  var OPEN_LABEL = MONTHS[CFG.opens.month] + ' ' + CFG.opens.day;
  var NYE_LABEL = MONTHS[CFG.newYearsEve.month] + ' ' + CFG.newYearsEve.day;
  var KEY = CFG.storageKey + ':' + YEAR;
  var ctx = { year: YEAR, next: NEXT };
  function fill(s) { return String(s).replace(/\{year\}/g, YEAR).replace(/\{next\}/g, NEXT); }

  var qs = new URLSearchParams(location.search);
  var failOnce = { story: qs.has('simulateError'), future: qs.has('simulateError'), image: qs.has('simulateError') };
  var earlyLook = qs.has('preview');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.title = 'Rewind & Renew — a year-end reflection for ' + YEAR;

  /* ---------- Tiny DOM helpers ---------- */
  function h(tag, props) {
    var e = document.createElement(tag), k;
    props = props || {};
    for (k in props) {
      var v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else if (k === 'checked' || k === 'disabled' || k === 'value' || k === 'selected') e[k] = v;
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (var i = 2; i < arguments.length; i++) append(e, arguments[i]);
    return e;
  }
  function append(e, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach(function (x) { append(e, x); }); return; }
    e.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  function I(name) { return '<svg class="i" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function icon(name) { var s = document.createElement('span'); s.innerHTML = I(name); return s.firstChild; }
  function btn(label, cls, onclick, iconName, after) {
    var b = h('button', { type: 'button', class: 'btn ' + cls, onclick: onclick });
    if (iconName && !after) b.append(icon(iconName));
    b.append(document.createTextNode(label));
    if (iconName && after) b.append(icon(iconName));
    return b;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function auto(ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight + 2, 640) + 'px'; }
  var toastT;
  function say(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 4200);
  }

  /* ---------- State & saving ---------- */
  function fresh() {
    return {
      v: 1, screen: null, step: 0, aStep: 0, answers: {},
      story: { title: '', text: '', length: 'full', edited: false, variant: 0, sparse: false },
      future: { text: '', edited: false, variant: 0, src: '' },
      art: { mood: 'soft', seed: 0, warmth: 0.2, time: 'dusk', timeCustom: false, aiOff: false, aiImage: null },
      savedAt: null
    };
  }
  var storageOK = true, saveT;
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var s = JSON.parse(raw); if (s && s.v === 1) return Object.assign(fresh(), s); }
    } catch (e) { storageOK = false; }
    return fresh();
  }
  var state = load();
  var ui = { story: 'idle', future: 'idle', image: 'idle', storyEdit: false, futureEdit: false };
  var view = 'landing';

  function hasData() {
    return Object.keys(state.answers).some(function (k) { return String(state.answers[k]).trim(); }) || !!state.story.text || !!state.future.text;
  }
  function saveLabel(mode) {
    if (!storageOK) return 'Can’t save in this browser. Download your keepsake to keep it.';
    if (mode === 'saving') return 'Saving…';
    return state.savedAt ? 'Saved on this device' : 'Autosaves on this device';
  }
  function refreshSaveUI(mode) {
    document.querySelectorAll('.save-status .txt').forEach(function (n) { n.textContent = saveLabel(mode); });
    var d = document.getElementById('btnDelete');
    if (d) d.hidden = !hasData();
  }
  function saveNow() {
    clearTimeout(saveT);
    state.savedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { storageOK = false; }
    refreshSaveUI();
  }
  function save() { refreshSaveUI('saving'); clearTimeout(saveT); saveT = setTimeout(saveNow, 450); }
  function saveBadge() { return h('span', { class: 'save-status', 'aria-live': 'polite' }, icon('check'), h('span', { class: 'txt', text: saveLabel() })); }

  /* ---------- Optional voice typing (browser speech recognition) ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition, activeRec = null;
  function stopVoice() { if (activeRec) { try { activeRec.stop(); } catch (e) { /* already stopped */ } activeRec = null; } }
  function micControl(ta) {
    if (!SR) return null;
    var live = false, rec = null, base = '';
    var lbl = h('span', { text: 'Speak your answer' });
    var status = h('span', { class: 'mic-status', role: 'status', 'aria-live': 'polite' });
    var b = h('button', { type: 'button', class: 'btn btn-ghost mic', 'aria-pressed': 'false', onclick: toggle }, icon('mic'), lbl);
    function setLive(v) { live = v; b.setAttribute('aria-pressed', v ? 'true' : 'false'); b.classList.toggle('is-live', v); lbl.textContent = v ? 'Stop listening' : 'Speak your answer'; }
    function push() { ta.dispatchEvent(new Event('input', { bubbles: true })); }
    function toggle() { if (live) { stopVoice(); return; } start(); }
    function start() {
      stopVoice();
      try { rec = new SR(); } catch (e) { status.textContent = 'Voice typing isn’t available in this browser.'; return; }
      rec.lang = navigator.language || 'en-US'; rec.interimResults = true; rec.continuous = true;
      base = ta.value; if (base && !/\s$/.test(base)) base += ' ';
      rec.onstart = function () { setLive(true); status.textContent = 'Listening… speak naturally, then press Stop.'; };
      rec.onresult = function (e) {
        var interim = '';
        for (var i = e.resultIndex; i < e.results.length; i++) {
          var t = e.results[i][0].transcript;
          if (e.results[i].isFinal) base += t.trim() + ' '; else interim += t;
        }
        ta.value = base + interim; push();
      };
      rec.onerror = function (e) {
        var m = { 'not-allowed': 'Microphone access is turned off for this site. You can type instead, or allow it in your browser settings.', 'service-not-allowed': 'Voice typing is blocked in this browser. You can type instead.', 'no-speech': 'We didn’t hear anything. Try again, or type instead.', 'audio-capture': 'No microphone was found.', 'network': 'Voice typing needs an internet connection.' };
        status.textContent = m[e.error] || 'Voice typing stopped. You can try again or type instead.';
      };
      rec.onend = function () { setLive(false); ta.value = ta.value.replace(/[ \t]+$/, ''); push(); if (/^Listening/.test(status.textContent)) status.textContent = 'Stopped. You can edit the text above.'; if (activeRec === rec) activeRec = null; };
      activeRec = rec;
      try { rec.start(); } catch (e) { status.textContent = 'Voice typing couldn’t start. Please try again.'; activeRec = null; }
    }
    return h('div', { class: 'voice-row' }, b, status,
      h('p', { class: 'voice-note', text: 'Voice typing is optional. It uses your browser’s speech service, which may send what you say to its provider (such as Google or Apple) to turn it into text. Typed answers are never sent.' }));
  }

  /* ---------- Gentle crisis support (checked on this device only) ---------- */
  var SUP = window.RR_SUPPORT, supportCountry = SUP.guess();
  function worstLevel(texts) {
    var lvl = null;
    texts.forEach(function (t) { var d = SUP.detect(t); if (d === 'self') lvl = 'self'; else if (d === 'others' && !lvl) lvl = 'others'; });
    return lvl;
  }
  function answersLevel() { return worstLevel(Object.keys(state.answers).map(function (k) { return state.answers[k]; })); }
  function hopesFlagged() { return !!worstLevel(['room', 'try', 'feel', 'promise', 'support', 'word'].map(function (k) { return state.answers[k] || ''; })); }

  function supportCard(level) {
    var box = h('section', { class: 'support', role: 'region', 'aria-label': 'Support, if you need it' });
    function build() {
      box.replaceChildren();
      var c = SUP.countries[supportCountry];
      var sel = h('select', { id: 'supCountry-' + Math.random().toString(36).slice(2, 7), 'aria-label': 'Choose your country', onchange: function () { supportCountry = sel.value; build(); } },
        h('option', { value: '', text: 'Other / not listed', selected: !c }),
        Object.keys(SUP.countries).sort(function (a, b) { return SUP.countries[a].n.localeCompare(SUP.countries[b].n); }).map(function (k) { return h('option', { value: k, text: SUP.countries[k].n, selected: k === supportCountry }); }));
      box.append(
        h('h2', { class: 'support-title' }, icon('lock'), level === 'self' ? 'You don’t have to carry this alone' : 'If anyone could be in danger'),
        h('p', { text: level === 'self'
          ? 'What you wrote sounds really heavy. If you are thinking about hurting yourself or ending your life, please reach out to someone right now. You deserve support, and people are ready to listen.'
          : 'It sounds like you may be in a very painful or angry place. If you or anyone else could be in danger, please contact your local emergency number now. Talking with a trained person can help.' }),
        h('p', { class: 'support-emerg' }, 'In immediate danger? Call ',
          c ? h('a', { href: 'tel:' + c.e.split(' ')[0], text: c.e }) : h('strong', { text: 'your local emergency number' }), c ? ' now.' : ' now (112 or 911 in many places).'),
        h('div', { class: 'support-country' }, h('label', { for: sel.id, text: 'Helplines for' }), sel,
          navigator.geolocation ? h('button', { type: 'button', class: 'btn btn-ghost', style: 'min-height:44px;margin-top:.4rem;color:var(--ink);border-color:rgba(37,42,85,.45)', onclick: function () {
            var st = box.querySelector('.support-geo');
            st.textContent = 'Checking your location…';
            navigator.geolocation.getCurrentPosition(function (pos) {
              var k = SUP.fromCoords(pos.coords.latitude, pos.coords.longitude, supportCountry);
              if (k) { supportCountry = k; build(); box.querySelector('.support-geo').textContent = 'Using your location: ' + SUP.countries[k].n + '. Nothing was sent anywhere.'; }
              else st.textContent = 'We couldn’t match your location to a country on our list. Please choose yours above, or use findahelpline.com.';
            }, function (err) {
              st.textContent = err && err.code === 1 ? 'Location is turned off for this site. You can choose your country above instead.' : 'We couldn’t get your location. You can choose your country above instead.';
            }, { timeout: 10000, maximumAge: 600000 });
          } }, icon('sparkle'), 'Use my location') : null,
          h('span', { class: 'support-geo', role: 'status', style: 'font-size:.88rem;color:#4a4e75;min-height:1.2em' })),
        c ? h('ul', { class: 'support-list' }, c.l.map(function (x) {
          return h('li', null, h('strong', { text: x[0] + ': ' }), h('a', { href: 'tel:' + x[2], text: x[1] }), ' · ' + x[3]);
        })) : h('p', { text: 'We don’t have a number listed for your country, but there is almost always a free line you can call or text.' }),
        h('p', { class: 'support-more' }, 'More helplines worldwide: ', h('a', { href: 'https://findahelpline.com', target: '_blank', rel: 'noopener noreferrer', text: 'findahelpline.com' }), '. You can also tell someone you trust how you’re feeling.'),
        h('p', { class: 'support-fine', text: 'This message appeared because of the words you typed. That check happens only on your device. Nothing was sent anywhere. We chose the country from your connection or browser settings. Your location is used only if you tap “Use my location”, and is matched on your device and never sent or saved. You can change the country at any time. Numbers can change, so please check one is right for you.' }));
    }
    build();
    return box;
  }
  function fillSupport(slot, level) { slot.replaceChildren(); if (level) slot.append(supportCard(level)); }

  /* ---------- Flows ---------- */
  var REFLECT = [], AHEAD = [];
  Q.reflect.forEach(function (sec, si) {
    sec.questions.forEach(function (q) {
      REFLECT.push(Object.assign({}, q, { section: sec.title, intro: sec.intro, secIdx: si, optional: !!sec.optional, first: q === sec.questions[0] }));
    });
  });
  Q.ahead.questions.forEach(function (q) { AHEAD.push(Object.assign({}, q, { section: Q.ahead.title, intro: Q.ahead.intro })); });
  function hopesText() { return ['room', 'try', 'feel', 'promise', 'support', 'word'].map(function (k) { return GEN.val(state.answers, k); }).filter(Boolean).join(' '); }
  function hasHopes() { return !!hopesText(); }
  function hasAnswers() { return REFLECT.some(function (q) { return GEN.val(state.answers, q.id); }); }

  /* ---------- Navigation ---------- */
  var main = document.getElementById('main');
  function isOpen() { return !CFG.enforceOpenDate || new Date() >= OPEN || earlyLook || hasData(); }

  function go(v, opts) {
    opts = opts || {};
    stopVoice();
    if (LEGAL[v] && !LEGAL[view]) legalFrom = view;
    view = v;
    if (v !== 'landing' && !LEGAL[v]) { state.screen = v; saveNow(); }
    if (!opts.pop) { try { history.pushState({ v: v }, '', location.pathname + location.search); } catch (e) { /* ignore */ } }
    render();
    window.scrollTo(0, 0);
    var el = main.querySelector('[data-focus]') || main.querySelector('h1');
    if (el) { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }
  }
  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.v) go(e.state.v, { pop: true });
    else go('landing', { pop: true });
  });

  var SCREENS = {
    landing: landing, reflect: function () { return questionScreen('reflect'); }, review: review,
    story: storyScreen, ahead: function () { return questionScreen('ahead'); }, mood: moodScreen,
    future: futureScreen, keepsake: keepsakeScreen, capsule: function () { return capsuleScreen(); }, archive: function () { return archiveScreen(); },
    privacy: function () { return legalPage('Privacy Policy', 'privacy'); },
    terms: function () { return legalPage('Terms of Use', 'terms'); }
  };
  var TONES = { landing: 'dark', review: 'light', story: 'light', privacy: 'light', terms: 'light', capsule: 'dark', archive: 'dark' };
  var LEGAL = { privacy: 1, terms: 1, capsule: 1, archive: 1 };
  var legalFrom = 'landing';

  function legalPage(title, kind) {
    var paper = h('article', { class: 'paper tone-light legal' },
      h('p', { class: 'eyebrow' }, icon('lock'), 'Rewind & Renew'),
      h('h1', { 'data-focus': '', text: title }),
      h('p', { class: 'updated', text: 'Last updated ' + (CFG.policyUpdated || '') }));
    if (kind === 'privacy') paper.append(h('p', { class: 'callout' }, h('strong', { text: 'We don’t store or save your data. ' }), CFG.imageEndpoint ? 'What you write stays in your own browser. Only a short image description is sent to ElevenLabs to make your picture, and we don’t keep it.' : 'What you write stays in your own browser, and is never sent to us.'));
    window.RR_LEGAL[kind]().forEach(function (s) {
      paper.append(h('h2', { text: s.h }));
      (s.p || []).forEach(function (t) { paper.append(h('p', { text: t })); });
      if (s.ul) paper.append(h('ul', null, s.ul.map(function (t) { return h('li', { text: t }); })));
    });
    return h('section', { class: 'stage light tone-light enter' }, h('div', { class: 'wrap' },
      window.RR_I18N && window.RR_I18N.lang() !== 'en' ? h('p', { class: 'note', style: 'margin-bottom:1rem', text: 'The Privacy Policy and Terms of Use are shown in English, so their exact meaning stays clear. If anything is unclear, please ask someone you trust to help translate it.' }) : null,
      paper,
      h('div', { class: 'actions' },
        btn('Back', 'btn-primary', function () { go(legalFrom || 'landing'); }, 'arrow-left'),
        btn(kind === 'privacy' ? 'Terms of Use' : 'Privacy Policy', 'btn-ghost', function () { go(kind === 'privacy' ? 'terms' : 'privacy'); }))));
  }

  function render() {
    clearInterval(capTimer);
    document.body.dataset.tone = TONES[view] || 'dark';
    document.body.dataset.screen = view;
    try { main.replaceChildren(SCREENS[view]()); }
    catch (e) { if (window.console) console.error(e); showError(); }
    refreshSaveUI();
  }

  /* Friendly error page. Nothing the person wrote is lost. */
  function errorScreen() {
    return h('section', { class: 'stage dark tone-dark enter' }, h('div', { class: 'wrap', style: 'text-align:center;padding-top:2rem' },
      h('p', { class: 'eyebrow', style: 'justify-content:center' }, icon('alert'), 'Something went wrong'),
      h('h1', { 'data-focus': '', class: 'q-title', text: 'We lost our place for a moment' }),
      h('p', { class: 'lede', style: 'margin-inline:auto', text: 'We’re sorry. Your answers are saved on this device, so nothing you wrote has been lost.' }),
      h('div', { class: 'btn-row', style: 'justify-content:center;margin-top:1.5rem' },
        btn('Reload the page', 'btn-primary', function () { location.reload(); }, 'refresh'),
        btn('Back to the start', 'btn-ghost', function () { view = 'landing'; render(); }, 'arrow-left'))));
  }
  function showError() {
    document.body.dataset.tone = 'dark'; view = 'error';
    try { main.replaceChildren(errorScreen()); var f = main.querySelector('h1'); if (f) { f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); } } catch (e) { /* nothing more we can do */ }
  }
  window.addEventListener('error', function (ev) { if (!ev.target || ev.target === window) { if (!main.firstElementChild) showError(); } });
  window.addEventListener('unhandledrejection', function () { if (!main.firstElementChild) showError(); });

  /* ---------- Dialogs ---------- */
  function openDialog(build) {
    var d = h('dialog', { class: 'dlg' });
    var inner = h('div', { class: 'dlg-in' });
    d.append(inner);
    var close = h('button', { type: 'button', class: 'btn-quiet close', 'aria-label': 'Close', onclick: function () { d.close(); } }, icon('x'));
    inner.append(close);
    build(inner, d);
    document.body.append(d);
    d.addEventListener('close', function () { d.remove(); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    d.showModal();
    return d;
  }
  function confirmBox(o) {
    return new Promise(function (resolve) {
      var d = openDialog(function (inner, dlg) {
        inner.append(
          h('h2', { text: o.title, 'data-focus': '' }),
          h('p', { text: o.body }),
          h('div', { class: 'btn-row stack' },
            btn(o.ok, o.danger ? 'btn-danger' : 'btn-primary', function () { dlg.close('ok'); }, o.danger ? 'trash' : null),
            btn(o.cancel || 'Cancel', 'btn-ghost', function () { dlg.close('cancel'); }))
        );
      });
      d.addEventListener('close', function () { resolve(d.returnValue === 'ok'); });
    });
  }

  function deleteEverything() {
    return confirmBox({
      title: 'Delete your reflection?',
      body: 'This removes your answers, stories and image settings from this device. It can’t be undone. If you downloaded a keepsake, that file stays with you.',
      ok: 'Delete everything', cancel: 'Keep it', danger: true
    }).then(function (yes) {
      if (!yes) return;
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
      state = fresh(); aiImg = null; ui = { story: 'idle', future: 'idle', image: 'idle', storyEdit: false, futureEdit: false };
      say('Your reflection has been deleted from this device.');
      go('landing');
    });
  }

  /* ---------- Founder's note (shown once per year per browser) ---------- */
  var FOUNDER_KEY = 'rr-founder:' + YEAR;
  function showFounder() {
    var F = CFG.founder || {};
    var sign = F.name ? '— ' + F.name + (F.role ? ', ' + F.role : '') : '— The Rewind & Renew team';
    var d = openDialog(function (inner, dlg) {
      inner.classList.add('founder');
      inner.append(
        h('p', { class: 'eyebrow', style: 'color:var(--gold)' }, icon('horizon'), 'A note from ' + (F.name ? 'the founder' : 'us')),
        h('h2', { 'data-focus': '', text: 'Before you begin' }),
        h('p', { text: 'Hello, and thank you for being here.' }),
        h('p', { text: 'Every year, the end of December arrives with a lot of noise: lists, resolutions, a rushed look back and an anxious look ahead. We wanted to make something quieter.' }),
        h('p', { text: 'Rewind & Renew is a place to slow down for a few minutes. To remember what the year really held, the bright parts, the hard parts, and everything in between, and then to imagine, gently, what you might like to make room for next.' }),
        h('p', { text: 'There are no right answers here, and you can skip anything. You don’t need to have had a good year, or a productive one. However yours went, you’re welcome.' }),
        h('p', { text: 'Your words are yours. We don’t store or save your answers. They stay in your own browser, and you decide whether to keep them, share them, or delete them.' }),
        h('p', { text: 'If this year has been heavy and you need more than a reflection, please reach out to someone you trust or a support line. You don’t have to carry it alone.' }),
        h('p', { text: 'Take your time. Wishing you a gentle close to ' + YEAR + ' and a quiet, hopeful start to ' + NEXT + '.' }),
        h('p', { class: 'founder-sign', text: sign }),
        h('div', { class: 'btn-row stack' },
          btn('Begin your reflection', 'btn-primary', function () { dlg.close(); if (view === 'landing' && isOpen()) startReflection(); }, 'arrow-right', true),
          btn('Maybe later', 'btn-text', function () { dlg.close(); })));
    });
    d.addEventListener('close', function () { try { localStorage.setItem(FOUNDER_KEY, '1'); } catch (e) { /* ignore */ } });
  }
  function maybeShowFounder() {
    if (!(CFG.founder && CFG.founder.enabled) || hasData()) return;
    try { if (localStorage.getItem(FOUNDER_KEY)) return; } catch (e) { /* show anyway */ }
    setTimeout(function () { if (view === 'landing' && !document.querySelector('dialog.dlg')) showFounder(); }, 900);
  }

  function showPrivacy() {
    openDialog(function (inner) {
      inner.append(
        h('h2', { text: 'How your answers are used', 'data-focus': '' }),
        h('p', { text: 'In plain language:' }),
        h('ul', null,
          h('li', null, h('strong', { text: 'Private by default. ' }), 'Nothing you write is shared, published or visible to anyone else unless you choose to share it.'),
          h('li', null, h('strong', { text: 'Where it’s stored. ' }), 'Your progress is saved in this browser, on this device, so you can leave and come back. There’s no account and no copy on our servers.'),
          CFG.aiEndpoint
            ? h('li', null, h('strong', { text: 'Writing the stories. ' }), 'When you ask for a story, your answers are sent to the writing service this site is set up to use, only to write that story.')
            : h('li', null, h('strong', { text: 'Writing the stories. ' }), 'Stories are made on your device from your own words. Nothing is sent anywhere to write them.'),
          CFG.imageEndpoint
            ? h('li', null, h('strong', { text: 'Creating your image. ' }), 'When AI images are available, a short description built from your hopes for ' + NEXT + ' (you can see it first) is sent through our server to ElevenLabs to make your picture. We don’t keep it. You can choose a drawn image instead, and then nothing is sent.')
            : h('li', null, h('strong', { text: 'Creating your image. ' }), 'Your image is drawn on your device. Nothing is sent anywhere.'),
          h('li', null, h('strong', { text: 'No training, no public use. ' }), 'Your answers are not used for public content or to train AI. We would only ever ask first, clearly, and you could say no.'),
          h('li', null, h('strong', { text: 'Sharing is your call. ' }), 'Before anything leaves this device, you’ll see exactly what is included and choose each part.'),
          h('li', null, h('strong', { text: 'You can delete it any time. ' }), 'Use the button below, or clear this site’s data in your browser. If you share a device, consider deleting when you’re done.')
        ),
        h('div', { class: 'btn-row stack' },
          btn('Read the full Privacy Policy', 'btn-ghost', function () { document.querySelector('dialog.dlg').close(); go('privacy'); }, 'book'),
          hasData() ? btn('Delete my reflection', 'btn-danger', function () { document.querySelector('dialog.dlg').close(); deleteEverything(); }, 'trash') : null)
      );
    });
  }

  /* ---------- Generation (local writer, or optional service) ---------- */
  async function generate(kind) {
    if (failOnce[kind]) { failOnce[kind] = false; await delay(600); throw new Error('Simulated outage'); }
    if (CFG.aiEndpoint) {
      var res = await fetch(CFG.aiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: kind, year: YEAR, next: NEXT, answers: state.answers, length: state.story.length, variant: kind === 'story' ? state.story.variant : state.future.variant })
      });
      if (!res.ok) throw new Error('Service returned ' + res.status);
      var j = await res.json();
      if (!j || typeof j.text !== 'string' || !j.text.trim()) throw new Error('Empty response');
      return { title: j.title || '', text: j.text.trim(), sparse: false };
    }
    await delay(reduceMotion ? 200 : 1100);
    return kind === 'story'
      ? GEN.story(state.answers, ctx, state.story.length, state.story.variant)
      : GEN.future(state.answers, ctx, state.future.variant);
  }

  /* ---------- Art ---------- */
  function artOpts(w) {
    var a = state.art;
    return { mood: a.mood, seed: a.seed, time: a.time, warmth: a.warmth, motifs: ART.motifs(hopesText(), a.seed), w: w, h: Math.round(w * 1.25) };
  }
  /* Optional AI image (ElevenLabs via server.js). Only used after explicit opt-in. */
  var aiOK = false, aiImg = null;
  function loadAiImg() {
    return new Promise(function (resolve) {
      if (!state.art.aiImage) { aiImg = null; return resolve(); }
      var im = new Image();
      im.onload = function () { aiImg = im; resolve(); };
      im.onerror = function () { aiImg = null; state.art.aiImage = null; resolve(); };
      im.src = state.art.aiImage;
    });
  }
  function aiWanted() { return !!(aiOK && !state.art.aiOff && !hopesFlagged()); }
  function paintArt(canvas, w) {
    w = w || 900;
    var hh = Math.round(w * 1.25);
    if (state.art.aiImage && aiImg && aiImg.naturalWidth) {
      canvas.width = w; canvas.height = hh;
      var cx = canvas.getContext('2d'), s = Math.max(w / aiImg.naturalWidth, hh / aiImg.naturalHeight);
      var dw = aiImg.naturalWidth * s, dh = aiImg.naturalHeight * s;
      cx.drawImage(aiImg, (w - dw) / 2, (hh - dh) / 2, dw, dh);
      return;
    }
    ART.draw(canvas, artOpts(w));
  }
  var STYLE = {
    soft: 'soft and cinematic, warm dusk light, gentle film grain, a quiet horizon, muted rose, gold and deep indigo tones',
    bright: 'bright and playful, simple bold shapes, open color, light and cheerful, flat illustration',
    dream: 'dreamlike and glowing, floating light, a luminous doorway, violet night sky, ethereal',
    minimal: 'minimal and symbolic, one calm symbol, lots of empty space, flat muted color in cream, rose and indigo'
  };
  function imagePromptText() {
    var bits = ['room', 'try', 'feel', 'word'].map(function (k) { return GEN.val(state.answers, k); }).filter(Boolean)
      .map(function (t) { return t.slice(0, 180); });
    return 'An abstract, symbolic mood image inspired by someone’s quiet hopes for the coming year: ' + (bits.join('; ') || 'a calm new beginning') +
      '. Style: ' + STYLE[state.art.mood] + '. Evocative, calm, personal and not literal. No text, no letters, no logos, no watermarks, no people, no faces.';
  }
  async function fetchAiImage() {
    var res = await fetch(CFG.imageEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: imagePromptText(), mood: state.art.mood }) });
    if (!res.ok) {
      var msg = 'The image couldn’t be created. Please try again.';
      try { var j = await res.json(); if (j && j.message) msg = j.message; } catch (e) { /* keep default */ }
      throw new Error(msg);
    }
    var blob = await res.blob();
    var url = URL.createObjectURL(blob);
    try {
      var im = await new Promise(function (ok, bad) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { bad(new Error('The image couldn’t be read.')); }; i.src = url; });
      var c = document.createElement('canvas'), w = 900, hh = 1125;
      c.width = w; c.height = hh;
      var s = Math.max(w / im.naturalWidth, hh / im.naturalHeight), dw = im.naturalWidth * s, dh = im.naturalHeight * s;
      c.getContext('2d').drawImage(im, (w - dw) / 2, (hh - dh) / 2, dw, dh);
      return c.toDataURL('image/jpeg', 0.86);
    } finally { URL.revokeObjectURL(url); }
  }
  /* Notice card shown when AI images are available. They are on by default, with a
     clear explanation of what is sent and an easy way to use a drawn image instead. */
  function aiBox(onChange) {
    if (!aiOK) return null;
    var box = h('div', { class: 'card ai-box', style: 'padding:1.1rem 1.2rem' });
    function build() {
      box.replaceChildren();
      if (hopesFlagged()) {
        box.append(h('p', { class: 'hint', style: 'margin:0', text: 'Your image will be drawn on your device. Nothing from your answers is sent anywhere.' }));
        return;
      }
      if (state.art.aiOff) {
        box.append(
          h('p', { class: 'hint', style: 'margin:0 0 .7rem', text: 'You’ve chosen a drawn image. It’s made on your device and nothing is sent anywhere.' }),
          btn('Create it with ElevenLabs AI instead', 'btn-ghost', function () { state.art.aiOff = false; saveNow(); build(); onChange && onChange(true); }, 'sparkle'));
        return;
      }
      var preview = h('div', { class: 'share-preview', tabindex: '0', 'aria-label': 'Exactly what is sent', text: imagePromptText() });
      box.append(
        h('p', { style: 'margin:0 0 .4rem;font-weight:600' }, icon('sparkle'), ' Your image is created with ElevenLabs AI'),
        h('p', { class: 'hint', style: 'margin:0 0 .6rem', text: 'To make it, a short description built from your hopes is sent through our server to ElevenLabs. We don’t keep it. Please avoid names or private details in your hopes.' }),
        h('details', { class: 'disc', ontoggle: function () { preview.textContent = imagePromptText(); } }, h('summary', { text: 'See exactly what is sent' }), preview),
        h('div', { class: 'btn-row', style: 'margin-top:.7rem' },
          btn('Use a drawn image instead (nothing sent)', 'btn-text', function () { state.art.aiOff = true; state.art.aiImage = null; aiImg = null; saveNow(); build(); onChange && onChange(false); })));
    }
    build();
    return box;
  }
  function moodMeta(id) { return Q.moods.filter(function (m) { return m.id === id; })[0] || Q.moods[0]; }
  function artLabel() { return (state.art.aiImage ? 'AI-created artwork' : 'Abstract artwork') + ' in a ' + moodMeta(state.art.mood).name.toLowerCase() + ' mood, inspired by your hopes for ' + NEXT + '.'; }

  /* =====================================================
     LANDING
     ===================================================== */
  function landing() {
    var open = isOpen(), resume = hasData();
    var root = h('div', { class: 'enter landing' });
    var sampleTitle = YEAR + ': Slow, Mended, Unexpected';
    root.innerHTML =
      '<section class="hero grain" aria-labelledby="heroTitle"><div class="hero-photo" aria-hidden="true"></div><div class="stars" aria-hidden="true"></div><div class="hero-inner">' +
      '<p class="eyebrow">' + I('horizon') + 'A year-end reflection &middot; ' + YEAR + ' &rarr; ' + NEXT + '</p>' +
      '<h1 id="heroTitle" data-focus>Look back on the year you lived. Imagine the one you want next.</h1>' +
      '<p class="lede">Rewind &amp; Renew is a quiet place to pause. Answer a few unhurried questions about ' + YEAR + ', skip anything you like, and see your own words shaped into a story of your year. Then, if you want to, describe what you hope ' + NEXT + ' might hold and receive an imagined story and a picture to go with it.</p>' +
      '<div id="resumeSlot"></div><div class="btn-row" id="ctaRow"></div>' +
      '<p class="opens-note">' + I('calendar') + '<span>The experience opens on ' + OPEN_LABEL + ' and is designed for the days leading up to New Year’s Eve. Take as long as you need.</span></p>' +
      '<p class="opens-note" id="turnNote" hidden>' + I('moon') + '<span></span></p>' +
      '</div></section>' +

      '<div class="sample-wrap"><article class="sample reveal" aria-labelledby="sampleTitle"><div class="sample-art"><img id="sampleImg" src="images/sample-preview.jpg" width="1122" height="1402" alt="Sample image: an open journal on a windowsill at dusk, with a lamp, a dried flower, and misty hills beyond the glass"></div>' +
      '<div class="sample-body"><span class="badge">' + I('sparkle') + 'Sample &middot; not a real reflection</span>' +
      '<h2 id="sampleTitle">' + esc(sampleTitle) + '</h2>' +
      '<p>This is my ' + YEAR + ', in my own words. If I had to describe ' + YEAR + ' in a few words, they would be slow, mended, and unexpected. One moment keeps coming back to me. Sitting on the back steps with a neighbor, saying nothing while the rain came in.</p>' +
      '<p class="future">“I would like to feel less hurried. One small promise I want to make to myself: a walk before I check my phone.”</p>' +
      '<p style="margin:1rem 0 0;font-size:.85rem;color:#cfc8e2">Invented example text and artwork, shown only to preview the format.</p></div></article></div>' +

      '<section class="band light tone-light" id="how" aria-labelledby="howTitle"><div class="head"><p class="eyebrow">' + I('book') + 'How it works</p><h2 id="howTitle" tabindex="-1">Three gentle steps</h2><p class="lede">No scores, no goals to hit. Just a few quiet prompts and your own words, handed back to you.</p></div>' +
      '<ol class="steps">' +
      step('rewind', 'One', 'Remember', 'Reflect on the moments, changes, people and challenges that shaped your year. Every question is optional.') +
      step('pen', 'Two', 'Make meaning', 'Turn your answers into a personal story you can review and edit until it sounds like you.') +
      step('sprout', 'Three', 'Look ahead', 'Share what you hope for ' + NEXT + ' and create a future-facing story with a personalized image.') +
      '</ol></section>' +

      '<section class="band dark tone-dark" aria-labelledby="calmTitle"><div class="head"><p class="eyebrow">' + I('moon') + 'Before you begin</p><h2 id="calmTitle">Whatever kind of year it was</h2></div>' +
      '<div class="assure tone-dark">' +
      '<div class="card"><h3>' + I('lock') + 'Private unless you choose</h3><p>' + (CFG.imageEndpoint
        ? 'Your reflection stays on your device. We don’t store or save it. The only thing that ever leaves is a short image description sent to ElevenLabs to create your picture, and we don’t keep that. Nothing is published, and we never use your words to train AI. '
        : 'Your reflection stays on your device. It’s never shared, published, or used to train AI. ') + 'If you ever decide to share, you’ll see exactly what’s included first. <button type="button" class="link" id="lnkPrivacy">How your answers are used</button></p></div>' +
      '<div class="card"><h3>' + I('sun') + 'No right answers</h3><p>A joyful year, a hard one, an ordinary one, or one you can’t quite name are all welcome here. Skip anything. Leave and come back later. Nothing is graded and nothing is expected.</p></div>' +
      '</div></section>' +

      '<section class="band light tone-light" id="archiveBand" hidden aria-labelledby="archTitle"><div class="head"><p class="eyebrow">' + I('bookmark') + 'On this device</p><h2 id="archTitle">Your earlier keepsakes</h2><p class="lede">Past reflections you kept in this browser. They never left your device.</p></div><div class="assure tone-light" id="archiveList"></div></section>' +
      '<section class="final-cta"><h2>' + YEAR + ' is almost behind you. There’s no rush.</h2><div class="btn-row" id="ctaRow2" style="justify-content:center"></div></section>';

    function step(ic, n, t, d) { return '<li class="step"><span class="ico">' + I(ic) + '</span><span class="n">Step ' + n + '</span><h3>' + t + '</h3><p>' + d + '</p></li>'; }

    function ctas(row) {
      if (open) {
        row.append(btn('Begin your reflection', 'btn-primary btn-lg', startReflection, 'arrow-right', true));
      } else {
        row.append(h('button', { type: 'button', class: 'btn btn-primary btn-lg', 'aria-disabled': 'true', onclick: function () { say('The experience opens on ' + OPEN_LABEL + '. You’re welcome to take an early look.'); } }, icon('calendar'), 'Opens ' + OPEN_LABEL));
        row.append(btn('Take an early look', 'btn-ghost', function () { earlyLook = true; go('reflect'); }));
      }
    }
    var row = root.querySelector('#ctaRow'); ctas(row);
    row.append(h('a', { class: 'btn btn-text', href: '#how', onclick: function (e) { e.preventDefault(); var s = document.getElementById('how'); s.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); var t = document.getElementById('howTitle'); t.focus({ preventScroll: true }); } }, 'How it works'));
    ctas(root.querySelector('#ctaRow2'));

    if (resume) {
      var slot = root.querySelector('#resumeSlot');
      slot.append(h('div', { class: 'resume' },
        h('p', { text: 'You have a reflection in progress, saved on this device.' }),
        h('div', { class: 'btn-row' },
          btn('Pick up where you left off', 'btn-primary', function () { go(state.screen && state.screen !== 'landing' ? state.screen : 'reflect'); }, 'arrow-right', true),
          btn('Start over', 'btn-ghost', deleteEverything))));
    }
    root.querySelector('#lnkPrivacy').addEventListener('click', showPrivacy);
    fillArchive(root);
    var nowD = nowDate(), ny = new Date(NEXT, 0, 1);
    if (nowD >= OPEN && nowD < ny) {
      var left = Math.ceil((ny - nowD) / 864e5), tn = root.querySelector('#turnNote');
      if (tn) { tn.hidden = false; tn.querySelector('span').textContent = 'The year turns in ' + left + (left === 1 ? ' day' : ' days') + '. There’s no rush.'; }
    }
    /* If the photo can't load (for example in a viewer that blocks local files), draw a stand-in. */
    var simg = root.querySelector('#sampleImg');
    function sampleFallback() {
      var c = h('canvas', { role: 'img', 'aria-label': 'Sample image: an abstract dusk landscape with soft light over water' });
      try { ART.draw(c, { mood: 'soft', seed: 4242, time: 'dusk', warmth: 0.3, motifs: ['water', 'light'], w: 720, h: 900 }); simg.replaceWith(c); c.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block'; } catch (e) { /* leave as is */ }
    }
    simg.addEventListener('error', sampleFallback);
    return root;
  }

  function startReflection() {
    if (!isOpen()) return;
    if (state.step >= REFLECT.length) state.step = 0;
    go('reflect');
  }

  /* =====================================================
     QUESTION FLOW
     ===================================================== */
  function questionScreen(flow) {
    var list = flow === 'reflect' ? REFLECT : AHEAD;
    var key = flow === 'reflect' ? 'step' : 'aStep';
    var i = Math.max(0, Math.min(state[key], list.length - 1));
    state[key] = i;
    var q = list[i];
    var total = list.length;
    var last = i === total - 1;
    var label = flow === 'reflect' ? 'Looking back on ' + YEAR : 'Looking toward ' + NEXT;

    function next() {
      if (last) {
        if (flow === 'reflect') go('review');
        else go('mood');
      } else { state[key] = i + 1; go(flow); }
    }
    function back() {
      if (i > 0) { state[key] = i - 1; go(flow); }
      else go(flow === 'reflect' ? 'landing' : 'story');
    }

    var ta = h('textarea', {
      id: 'ans', rows: 6, placeholder: q.placeholder || '', value: state.answers[q.id] || '',
      'aria-labelledby': 'qTitle', 'aria-describedby': 'qHint', maxlength: 4000, autocomplete: 'off',
      oninput: function () {
        state.answers[q.id] = ta.value; auto(ta); save();
        clearTimeout(supT); supT = setTimeout(function () { fillSupport(supSlot, SUP.detect(ta.value)); }, 350);
        meta.textContent = ta.value.length > 3400 ? 'That’s plenty. We’ll use what fits.' : '';
      },
      onkeydown: function (e) { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); next(); } }
    });
    var meta = h('span', { 'aria-live': 'polite' });
    var supT, supSlot = h('div', { 'aria-live': 'polite' });
    fillSupport(supSlot, SUP.detect(state.answers[q.id]));

    var node = h('section', { class: 'stage dark tone-dark enter' },
      h('div', { class: 'wrap' },
        h('div', { class: 'progress' },
          h('div', { class: 'progress-meta' }, h('span', { text: label }), h('span', { text: 'Question ' + (i + 1) + ' of ' + total })),
          h('div', { class: 'bar', role: 'progressbar', 'aria-label': label, 'aria-valuemin': 1, 'aria-valuemax': total, 'aria-valuenow': i + 1, 'aria-valuetext': 'Question ' + (i + 1) + ' of ' + total },
            h('span', { style: 'width:' + ((i + 1) / total * 100) + '%' }))),
        h('p', { class: 'eyebrow' }, icon(flow === 'reflect' ? 'rewind' : 'sprout'), q.section, q.optional ? h('span', { class: 'optional-tag', text: 'Optional section' }) : null),
        q.first || flow === 'ahead' && i === 0 ? h('p', { class: 'q-intro', text: q.intro || '' }) : null,
        h('h1', { class: 'q-title', id: 'qTitle', 'data-focus': '', text: fill(q.prompt) }),
        h('p', { class: 'hint', id: 'qHint' }, h('span', { class: 'hint-ex', text: fill(q.hint || '') }), h('span', { class: 'hint-ex', text: 'You can skip this question.' })),
        ta,
        micControl(ta),
        h('div', { class: 'field-meta' }, meta, saveBadge()),
        supSlot,
        h('div', { class: 'actions' },
          btn(last ? (flow === 'reflect' ? 'Review my answers' : 'Choose an image mood') : 'Continue', 'btn-primary', next, 'arrow-right', true),
          btn('Back', 'btn-ghost', back, 'arrow-left'),
          btn('Skip', 'btn-text', next)),
        h('div', { class: 'later' },
          h('span', { text: 'Your words are saved as you type.' }),
          h('span', null,
            q.optional && q.first ? [h('button', { type: 'button', class: 'link', onclick: function () { go('review'); } }, 'Skip all optional questions'), ' · '] : null,
            h('button', { type: 'button', class: 'link', onclick: function () { saveNow(); say('Saved on this device. Come back whenever you like.'); go('landing'); } }, 'Save and finish later'))))
    );
    setTimeout(function () { auto(ta); }, 0);
    return node;
  }

  /* =====================================================
     REVIEW
     ===================================================== */
  function review() {
    var groups = {};
    REFLECT.forEach(function (q) { (groups[q.secIdx] = groups[q.secIdx] || { title: q.section, items: [] }).items.push(q); });
    var any = hasAnswers();
    var writeBtn = btn('Write the story of my ' + YEAR, 'btn-primary', writeStory, 'pen');
    if (!any) { writeBtn.disabled = true; }

    var node = h('section', { class: 'stage light tone-light enter' },
      h('div', { class: 'wrap' },
        h('p', { class: 'eyebrow' }, icon('book'), 'Review'),
        h('h1', { text: 'Here’s what you shared', 'data-focus': '', style: 'font-size:clamp(2.2rem,6vw,3.4rem);margin-bottom:1rem' }),
        h('p', { class: 'lede', text: 'Change anything, add a line, or leave things blank. Skipped questions simply won’t appear in your story.' }),
        h('div', { class: 'field-meta', style: 'justify-content:flex-start' }, saveBadge()),
        answersLevel() ? supportCard(answersLevel()) : null,
        !any ? h('div', { class: 'note', style: 'margin-top:1rem' }, icon('alert'), h('span', { text: 'You haven’t written anything yet. A story needs at least a few of your words, so add a line to any question below, or go back to the questions.' })) : null,
        Object.keys(groups).map(function (gi) {
          var g = groups[gi];
          return h('div', { class: 'rv-group' },
            h('h2', { text: g.title }),
            g.items.map(function (q, n) {
              var id = 'rv-' + q.id, tag = h('span', { class: 'rv-skipped', text: GEN.val(state.answers, q.id) ? '' : 'Skipped' });
              var t = h('textarea', {
                id: id, value: state.answers[q.id] || '', placeholder: 'Skipped. Add something if you’d like.',
                oninput: function () { state.answers[q.id] = t.value; tag.textContent = t.value.trim() ? '' : 'Skipped'; auto(t); save(); refreshSaveUI('saving'); }
              });
              setTimeout(function () { auto(t); }, 0);
              return h('div', { class: 'rv-item' }, h('label', { for: id }, fill(q.prompt), tag), t);
            }));
        }),
        h('div', { class: 'actions' },
          writeBtn,
          btn('Back to the questions', 'btn-ghost', function () { state.step = REFLECT.length - 1; go('reflect'); }, 'arrow-left'),
          h('span', { class: 'spacer' }),
          btn('Delete my reflection', 'btn-text', deleteEverything)))
    );
    return node;
  }

  async function writeStory() {
    if (state.story.text && state.story.edited) {
      var rewrite = await confirmBox({
        title: 'Write a new story?',
        body: 'You’ve edited your current story. A new one would replace those edits. Or you can keep what you have and carry on.',
        ok: 'Write a new story', cancel: 'Keep my edited story'
      });
      if (!rewrite) { go('story'); return; }
      state.story.text = '';
    } else if (state.story.text) { state.story.text = ''; }
    go('story');
  }

  /* =====================================================
     YEAR STORY
     ===================================================== */
  function paragraphs(text, cls) {
    var wrap = h('div', { class: 'prose ' + (cls || '') });
    String(text).split(/\n{2,}/).forEach(function (p, i) {
      if (!p.trim()) return;
      wrap.append(h('p', { class: 'reveal-p', style: 'animation-delay:' + (reduceMotion ? 0 : i * 140) + 'ms', text: p.trim() }));
    });
    return wrap;
  }

  function storyScreen() {
    var body = h('div', { id: 'storyBody' });
    var node = h('section', { class: 'stage light tone-light enter' }, h('div', { class: 'wrap' }, body));
    if (!state.story.text && ui.story !== 'loading') setTimeout(runStory, 0);
    else if (state.story.text) ui.story = 'ready';
    setTimeout(paintStory, 0);
    return node;
  }
  async function runStory() {
    ui.story = 'loading'; paintStory();
    try {
      var r = await generate('story');
      if (!r.text) throw new Error('Nothing to write from');
      state.story.title = r.title || state.story.title || ('My ' + YEAR);
      state.story.text = r.text; state.story.sparse = !!r.sparse; state.story.edited = false;
      ui.story = 'ready'; ui.storyEdit = false; saveNow();
    } catch (e) { ui.story = 'error'; ui.storyErr = e && e.message; }
    paintStory();
  }
  function paintStory() {
    var body = document.getElementById('storyBody');
    if (!body || view !== 'story') return;
    body.replaceChildren();
    var s = state.story;
    if (ui.story === 'loading' || ui.story === 'idle') {
      body.append(h('div', { class: 'generating', role: 'status' }, h('div', { class: 'orb', 'aria-hidden': 'true' }),
        h('h1', { text: 'Gathering your words…', 'data-focus': '' }),
        h('p', { class: 'lede', style: 'margin-inline:auto', text: 'Your answers are staying put. This only takes a moment.' })));
      return;
    }
    if (ui.story === 'error') {
      body.append(h('div', { class: 'generating' },
        h('h1', { text: 'We couldn’t write your story just now', 'data-focus': '', style: 'font-size:2.2rem' }),
        h('div', { class: 'note err', role: 'alert', style: 'max-width:32rem;margin:1.2rem auto;text-align:left' }, icon('alert'), h('span', { text: 'Your answers and edits are safe and saved on this device. Nothing was lost. You can try again, or come back later.' })),
        h('div', { class: 'btn-row', style: 'justify-content:center' },
          btn('Try again', 'btn-primary', runStory, 'refresh'),
          btn('Back to my answers', 'btn-ghost', function () { go('review'); }, 'arrow-left'))));
      return;
    }
    var edit = ui.storyEdit;
    var lenGroup = h('div', { class: 'length', role: 'radiogroup', 'aria-label': 'Story length' },
      ['full', 'short'].map(function (v) {
        return h('label', null,
          h('input', { type: 'radio', name: 'len', value: v, checked: s.length === v, onchange: function () { changeLength(v); } }),
          h('span', { text: v === 'full' ? 'Fuller' : 'Shorter' }));
      }));
    var paper = h('article', { class: 'paper tone-light' });
    paper.append(h('p', { class: 'eyebrow' }, icon('pen'), 'Your year, in your words'));
    if (edit) {
      var ti = h('input', { type: 'text', class: 'edit-title', 'aria-label': 'Story title', value: s.title, oninput: function () { s.title = ti.value; s.edited = true; save(); } });
      var ta = h('textarea', { class: 'edit-body', 'aria-label': 'Your story', value: s.text, oninput: function () { s.text = ta.value; s.edited = true; auto(ta); save(); } });
      paper.append(ti, ta);
      setTimeout(function () { auto(ta); }, 0);
    } else {
      paper.append(h('h1', { class: 'story-title', 'data-focus': '', text: s.title || ('My ' + YEAR) }), paragraphs(s.text));
    }
    body.append(
      answersLevel() ? supportCard(answersLevel()) : null,
      h('div', { class: 'tools' }, lenGroup,
        h('div', { class: 'btn-row' },
          btn(edit ? 'Done editing' : 'Edit story', 'btn-ghost', function () { ui.storyEdit = !edit; saveNow(); paintStory(); var f = document.querySelector('#storyBody [data-focus], #storyBody .edit-title'); f && f.focus(); }, edit ? 'check' : 'pen'),
          btn('Write it again', 'btn-text', rewriteStory, 'refresh'))),
      paper,
      s.sparse ? h('div', { class: 'note', style: 'margin-top:1.2rem' }, icon('alert'), h('span', { text: 'You shared a little, so this story is brief. That’s okay. Nothing has been added that you didn’t say. You can add more answers any time.' })) : null,
      h('p', { class: 'caption', style: 'margin-top:1rem;color:#4a4e75', text: 'Built only from what you wrote. Edit anything so it sounds like you.' }),
      h('div', { class: 'actions' },
        btn('Continue to ' + NEXT, 'btn-primary', function () { ui.storyEdit = false; if (state.aStep >= AHEAD.length) state.aStep = 0; go('ahead'); }, 'arrow-right', true),
        btn('Back to my answers', 'btn-ghost', function () { go('review'); }, 'arrow-left'),
        h('span', { class: 'spacer' }), saveBadge()));
    refreshSaveUI();
  }
  async function changeLength(v) {
    if (state.story.edited) {
      var ok = await confirmBox({ title: 'Replace your edits?', body: 'Switching length writes a fresh version and replaces the edits you made.', ok: 'Replace', cancel: 'Keep my edits' });
      if (!ok) { paintStory(); return; }
    }
    state.story.length = v; runStory();
  }
  async function rewriteStory() {
    if (state.story.edited) {
      var ok = await confirmBox({ title: 'Write it again?', body: 'This writes a new version from your answers and replaces your edits.', ok: 'Write it again', cancel: 'Keep my edits' });
      if (!ok) return;
    }
    state.story.variant++; runStory();
  }

  /* =====================================================
     MOOD
     ===================================================== */
  function moodScreen() {
    var chosen = state.art.mood;
    var go1 = btn('Create my future story and image', 'btn-primary', function () {
      state.art.mood = chosen;
      if (!state.art.timeCustom) state.art.time = moodMeta(chosen).defaultTime;
      if (!state.art.seed) state.art.seed = (ART.hash(hopesText()) % 1000000) + 1;
      go('future');
    }, 'sparkle');
    if (!hasHopes()) go1.disabled = true;
    var group = h('fieldset', null,
      h('legend', { class: 'sr-only', text: 'Image mood' }),
      h('div', { class: 'moods' }, Q.moods.map(function (m, n) {
        var c = h('img', { src: 'images/mood-' + m.id + '.jpg', alt: '', width: 618, height: 618, loading: 'lazy' });
        return h('div', { class: 'mood' },
          h('input', { type: 'radio', name: 'mood', value: m.id, id: 'mood-' + m.id, checked: chosen === m.id, 'aria-label': m.name + '. ' + m.desc, onchange: function () { chosen = m.id; } }),
          h('div', { class: 'tile' }, c, h('div', { class: 'cap' }, h('strong', { text: m.name }), h('span', { text: m.desc }))));
      })));
    var node = h('section', { class: 'stage dark tone-dark enter' },
      h('div', { class: 'wrap wide', style: 'max-width:58rem' },
        h('p', { class: 'eyebrow' }, icon('sparkle'), 'Looking toward ' + NEXT),
        h('h1', { class: 'q-title', 'data-focus': '', text: 'How should the picture feel?' }),
        h('p', { class: 'lede', text: 'Choose a mood for the image that will sit beside your future story. You can change it afterwards.' }),
        h('div', { class: 'note' }, icon('alert'), h('span', { text: 'This is an imaginative visualization, an artistic interpretation of your hopes. It isn’t a prediction, advice, or a promise about ' + NEXT + '.' })),
        group,
        h('p', { class: 'caption', text: 'These previews show the feel of each mood. Your own image is created from your words.' }),
        aiBox(),
        !hasHopes() ? h('div', { class: 'note err', role: 'alert' }, icon('alert'), h('span', { text: 'You haven’t shared any hopes yet. Add a few words to any of the questions about ' + NEXT + ' and we’ll build from there.' })) : null,
        h('div', { class: 'actions' }, go1,
          btn('Back', 'btn-ghost', function () { state.aStep = AHEAD.length - 1; go('ahead'); }, 'arrow-left'),
          h('span', { class: 'spacer' }), saveBadge())));
    return node;
  }

  /* =====================================================
     FUTURE STORY + IMAGE
     ===================================================== */
  function futureScreen() {
    var src = ART.hash(hopesText()) + '';
    var canvas = h('canvas', { id: 'artCanvas', role: 'img', 'aria-label': artLabel() });
    var overlay = h('div', { class: 'art-overlay', id: 'artOverlay', hidden: true });
    var frame = h('div', { class: 'art-frame', id: 'artFrame' }, canvas, overlay);
    var mood = h('fieldset', { class: 'controls' },
      h('legend', { class: 'sr-only', text: 'Image mood' }),
      h('div', { class: 'chips' }, Q.moods.map(function (m) {
        return h('label', { class: 'chip' },
          h('input', { type: 'radio', name: 'moodc', value: m.id, checked: state.art.mood === m.id, onchange: function () { state.art.mood = m.id; if (!state.art.timeCustom) { state.art.time = m.defaultTime; var sel = document.getElementById('timeSel'); if (sel) sel.value = state.art.time; } saveNow(); if (aiWanted()) runImage(true); else redraw(); } }),
          h('span', { text: m.name }));
      })));
    var warm = h('input', { type: 'range', id: 'warm', min: -1, max: 1, step: 0.1, value: state.art.warmth, 'aria-describedby': 'warmEnds', oninput: function () { state.art.warmth = +warm.value; save(); redraw(); } });
    var timeSel = h('select', { id: 'timeSel', onchange: function () { state.art.time = timeSel.value; state.art.timeCustom = true; saveNow(); redraw(); } },
      [['dawn', 'First light'], ['day', 'Daylight'], ['dusk', 'Dusk'], ['night', 'Night']].map(function (t) { return h('option', { value: t[0], text: t[1], selected: state.art.time === t[0] }); }));
    timeSel.value = state.art.time;

    var storyBox = h('div', { id: 'futureBody' });
    var left = h('div', { class: 'sticky' }, frame,
      h('p', { class: 'caption', id: 'artCap', text: 'An artistic interpretation of your hopes, not a prediction.' }),
      h('div', { class: 'controls' },
        aiBox(function (on) { if (on) runImage(true); else { state.art.aiImage = null; redraw(); } }),
        mood,
        h('details', { class: 'disc', id: 'dirDisc' }, h('summary', { text: 'Adjust the visual direction' }),
          h('div', { class: 'field-row' }, h('label', { for: 'warm', text: 'Color temperature' }), warm, h('div', { class: 'range-ends', id: 'warmEnds' }, h('span', { text: 'Cooler' }), h('span', { text: 'Warmer' }))),
          h('div', { class: 'field-row' }, h('label', { for: 'timeSel', text: 'Time of day' }), timeSel)),
        h('div', { class: 'btn-row' },
          btn('New variation', 'btn-ghost', function () { state.art.seed = (state.art.seed * 7 + 13) % 1000003 + 1; saveNow(); runImage(true); }, 'refresh'),
          btn('Save image', 'btn-text', downloadImage, 'download'))));
    var node = h('section', { class: 'stage dark tone-dark enter' },
      h('div', { class: 'wrap wide' },
        h('p', { class: 'eyebrow' }, icon('sparkle'), 'Imagining ' + NEXT),
        h('h1', { class: 'q-title', 'data-focus': '', text: 'A possible ' + NEXT, style: 'margin-bottom:1.4rem' }),
        h('div', { class: 'future-grid' }, left, storyBox)));

    if (!state.art.seed) state.art.seed = (ART.hash(hopesText()) % 1000000) + 1;
    var needText = !state.future.text || (state.future.src !== src && !state.future.edited);
    state.future.src = state.future.src || src;
    if (needText && ui.future !== 'loading') { setTimeout(function () { state.future.src = src; runFuture(); }, 0); }
    else if (state.future.text) ui.future = 'ready';
    setTimeout(function () { paintFuture(); if (ui.image === 'idle' || ui.image === 'error') runImage(false); else redraw(); }, 0);
    return node;
  }

  async function runFuture() {
    ui.future = 'loading'; paintFuture();
    try {
      var r = await generate('future');
      if (!r.text) throw new Error('Nothing to write from');
      state.future.text = r.text; state.future.edited = false; ui.future = 'ready'; ui.futureEdit = false; saveNow();
    } catch (e) { ui.future = 'error'; }
    paintFuture();
  }
  function paintFuture() {
    var body = document.getElementById('futureBody');
    if (!body || view !== 'future') return;
    body.replaceChildren();
    var f = state.future;
    if (ui.future === 'loading' || ui.future === 'idle') {
      body.append(h('div', { class: 'generating', role: 'status' }, h('div', { class: 'orb', 'aria-hidden': 'true' }), h('h2', { text: 'Imagining ' + NEXT + '…' }), h('p', { class: 'lede', style: 'margin-inline:auto', text: 'Shaping your hopes into a possible year.' })));
      return;
    }
    if (ui.future === 'error') {
      body.append(h('div', { class: 'card' },
        h('h2', { style: 'font-size:1.8rem;margin-bottom:.8rem', text: 'We couldn’t write this just now' }),
        h('div', { class: 'note err', role: 'alert' }, icon('alert'), h('span', { text: 'Your hopes are safe on this device. Try again, or return later.' })),
        h('div', { class: 'btn-row', style: 'margin-top:1.2rem' }, btn('Try again', 'btn-primary', runFuture, 'refresh'), btn('Edit my hopes', 'btn-ghost', function () { state.aStep = 0; go('ahead'); }, 'pen'))));
      return;
    }
    var edit = ui.futureEdit;
    var paper = h('article', { class: 'paper tone-light' }, h('p', { class: 'eyebrow' }, icon('horizon'), 'Imagined, not predicted'));
    if (edit) {
      var ta = h('textarea', { class: 'edit-body', 'aria-label': 'Your future story', value: f.text, oninput: function () { f.text = ta.value; f.edited = true; auto(ta); save(); } });
      paper.append(ta); setTimeout(function () { auto(ta); }, 0);
    } else {
      paper.append(paragraphs(f.text, 'future'));
    }
    var word = GEN.val(state.answers, 'word');
    body.append(
      paper,
      word ? h('p', { class: 'caption', style: 'margin-top:1rem' }, 'Word to carry into ' + NEXT + ': ', h('strong', { text: word.replace(/[.!?]+$/, '') })) : null,
      h('div', { class: 'btn-row', style: 'margin-top:1.2rem' },
        btn(edit ? 'Done editing' : 'Edit story', 'btn-ghost', function () { ui.futureEdit = !edit; saveNow(); paintFuture(); }, edit ? 'check' : 'pen'),
        btn('Write it again', 'btn-text', rewriteFuture, 'refresh'),
        btn('Change my hopes', 'btn-text', function () { state.aStep = 0; go('ahead'); }, 'sprout')),
      f.src && f.src !== ART.hash(hopesText()) + '' ? h('div', { class: 'note', style: 'margin-top:1rem' }, icon('alert'), h('span', { text: 'You’ve changed your hopes since this was written. Choose “Write it again” to refresh it.' })) : null,
      h('div', { class: 'actions' },
        btn('See my keepsake', 'btn-primary', function () { ui.futureEdit = false; go('keepsake'); }, 'arrow-right', true),
        h('span', { class: 'spacer' }), saveBadge()));
    refreshSaveUI();
  }
  async function rewriteFuture() {
    if (state.future.edited) {
      var ok = await confirmBox({ title: 'Write it again?', body: 'This replaces your edits with a fresh version based on your hopes.', ok: 'Write it again', cancel: 'Keep my edits' });
      if (!ok) return;
    }
    state.future.variant++; state.future.src = ART.hash(hopesText()) + ''; runFuture();
  }

  function setArtUI() {
    var frame = document.getElementById('artFrame'), ov = document.getElementById('artOverlay'), c = document.getElementById('artCanvas');
    if (!frame) return;
    ov.replaceChildren();
    frame.classList.toggle('busy', ui.image === 'loading');
    ov.hidden = ui.image === 'ready';
    if (c) c.setAttribute('aria-label', artLabel());
    if (ui.image === 'loading') ov.append(h('div', { class: 'orb', 'aria-hidden': 'true' }), h('p', { role: 'status', text: 'Painting your image…' }));
    if (ui.image === 'error') ov.append(
      h('p', { role: 'alert', text: (ui.imageErr || 'The image didn’t come through.') + ' Your answers and story are safe.' }),
      btn('Try again', 'btn-primary', function () { runImage(true); }, 'refresh'),
      aiOK && !state.art.aiOff ? btn('Use a drawn image instead', 'btn-ghost', function () { state.art.aiOff = true; state.art.aiImage = null; aiImg = null; saveNow(); redraw(); var b = document.querySelector('.ai-box'); if (b) b.replaceWith(aiBox(function (on) { if (on) runImage(true); else { state.art.aiImage = null; redraw(); } })); }, 'image') : null);
    var cap = document.getElementById('artCap');
    if (cap) cap.textContent = state.art.aiImage ? 'Created with ElevenLabs AI from a short description of your hopes. An artistic interpretation, not a prediction.' : 'An artistic interpretation of your hopes, not a prediction.';
    var dd = document.getElementById('dirDisc');
    if (dd) dd.hidden = !!state.art.aiImage;
  }
  async function runImage(force) {
    ui.image = 'loading'; ui.imageErr = ''; setArtUI();
    try {
      if (failOnce.image) { failOnce.image = false; await delay(500); throw new Error('Simulated outage'); }
      var c = document.getElementById('artCanvas');
      if (!c) return;
      if (aiWanted()) {
        if (force || !state.art.aiImage) { state.art.aiImage = await fetchAiImage(); saveNow(); }
        await loadAiImg();
      } else {
        state.art.aiImage = null; aiImg = null;
        await delay(reduceMotion ? 100 : 900);
      }
      paintArt(c, 900); ui.image = 'ready';
    } catch (e) { ui.image = 'error'; ui.imageErr = e && e.message ? e.message : ''; }
    setArtUI();
  }
  function redraw() {
    var c = document.getElementById('artCanvas');
    if (!c) return;
    try { paintArt(c, 900); ui.image = 'ready'; } catch (e) { ui.image = 'error'; }
    setArtUI();
  }

  /* =====================================================
     KEEPSAKE, SAVE, SHARE
     ===================================================== */
  function exportCanvas(w) { var c = document.createElement('canvas'); paintArt(c, w); return c; }
  /* "Come back next year" reminder: built on this device. We never receive an email address or calendar. */
  function showReminder() {
    var y = new Date() < OPEN ? YEAR : NEXT;
    var start = new Date(y, CFG.opens.month, CFG.opens.day), end = new Date(y, CFG.opens.month, CFG.opens.day + 1);
    function p2(n) { return (n < 10 ? '0' : '') + n; }
    function ds(d) { return '' + d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()); }
    var site = /^https?:/.test(location.protocol) ? location.origin + location.pathname : '';
    var title = 'Rewind & Renew opens today';
    var desc = 'A quiet pause between years. Look back on the year you lived and imagine the one you want next.' + (site ? ' ' + site : '');
    function ics(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
    var now = new Date(), stamp = now.getUTCFullYear() + p2(now.getUTCMonth() + 1) + p2(now.getUTCDate()) + 'T' + p2(now.getUTCHours()) + p2(now.getUTCMinutes()) + p2(now.getUTCSeconds()) + 'Z';
    var file = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Rewind and Renew//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:rewind-and-renew-' + y + '@local', 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + ds(start), 'DTEND;VALUE=DATE:' + ds(end),
      'SUMMARY:' + ics(title), 'DESCRIPTION:' + ics(desc)].concat(site ? ['URL:' + site] : [], ['BEGIN:VALARM', 'TRIGGER:PT9H', 'ACTION:DISPLAY', 'DESCRIPTION:' + ics(title), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR']).join('\r\n');
    var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(title) + '&dates=' + ds(start) + '/' + ds(end) + '&details=' + encodeURIComponent(desc);
    var label = new Date(y, CFG.opens.month, CFG.opens.day).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    openDialog(function (inner, dlg) {
      inner.append(
        h('h2', { 'data-focus': '', text: 'Come back next December' }),
        h('p', { text: 'Add a gentle reminder for ' + label + ', when Rewind & Renew opens again. The reminder is made on your device. We never get your email address or your calendar.' }),
        h('div', { class: 'btn-row stack' },
          btn('Add to my calendar (.ics file)', 'btn-primary', function () { download('rewind-and-renew-reminder.ics', new Blob([file], { type: 'text/calendar' })); say('Reminder saved. Open the file to add it to your calendar.'); dlg.close(); }, 'calendar'),
          h('a', { class: 'btn btn-ghost', href: gcal, target: '_blank', rel: 'noopener noreferrer' }, icon('calendar'), 'Add to Google Calendar'),
          btn('Not now', 'btn-text', function () { dlg.close(); })),
        h('p', { class: 'caption', text: 'Google Calendar opens in a new tab. Only the reminder\u2019s title, date and the site address are included. Nothing you wrote is shared.' }));
    });
  }
  function download(name, blob) {
    var a = h('a', { href: URL.createObjectURL(blob), download: name });
    document.body.append(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  function downloadImage() {
    try { exportCanvas(1600).toBlob(function (b) { download('rewind-and-renew-' + NEXT + '.png', b); say('Image saved to your downloads.'); }, 'image/png'); }
    catch (e) { say('The image couldn’t be saved. Please try again.'); }
  }
  function wordOf() { var w = GEN.val(state.answers, 'word'); return w ? w.replace(/[.!?]+$/, '') : ''; }
  function titleOf() { return state.story.title || ('My ' + YEAR); }

  function selectionText(sel) {
    var parts = [];
    if (sel.title) parts.push(titleOf());
    if (sel.story && state.story.text) parts.push('My ' + YEAR + '\n\n' + state.story.text);
    if (sel.word && wordOf()) parts.push('A word for ' + NEXT + ': ' + wordOf());
    if (sel.future && state.future.text) parts.push('Imagining ' + NEXT + ' (imagined, not predicted)\n\n' + state.future.text);
    return parts.join('\n\n—\n\n');
  }
  function keepsakeHTML(sel) {
    var out = [];
    function paras(t) { return String(t).split(/\n{2,}/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''); }
    if (sel.title) out.push('<header><p class="k">Rewind &amp; Renew &middot; ' + YEAR + ' &rarr; ' + NEXT + '</p><h1>' + esc(titleOf()) + '</h1></header>');
    if (sel.story && state.story.text) out.push('<section><h2>My ' + YEAR + '</h2>' + paras(state.story.text) + '</section>');
    if (sel.word && wordOf()) out.push('<section class="w"><p class="k">A word for ' + NEXT + '</p><p class="word">' + esc(wordOf()) + '</p></section>');
    if (sel.image) out.push('<section class="img"><img alt="' + esc(artLabel()) + '" src="' + exportCanvas(1100).toDataURL('image/jpeg', 0.9) + '"><p class="cap">An artistic interpretation of hopes, not a prediction.</p></section>');
    if (sel.future && state.future.text) out.push('<section><h2>Imagining ' + NEXT + '</h2><p class="cap">Imagined, not predicted.</p>' + paras(state.future.text) + '</section>');
    var css = 'body{margin:0;background:linear-gradient(180deg,#11152B,#252A55 40%,#625A91 80%,#C9859A);font:18px/1.75 Georgia,serif;color:#11152B;padding:2rem 1rem}main{max-width:40rem;margin:0 auto;background:#FFF8EE;border-radius:20px;padding:2.2rem 1.6rem;box-shadow:0 30px 70px rgba(0,0,0,.4)}h1,h2{font-weight:600;line-height:1.1}h1{font-size:2.6rem;margin:.3rem 0 1rem}h2{font-size:1.7rem;margin-top:2.4rem}.k{font:600 .75rem system-ui,sans-serif;letter-spacing:.15em;text-transform:uppercase;color:#625A91}.word{font-size:2.8rem;font-style:italic;text-align:center;margin:.2rem 0}.w{text-align:center;padding:1.5rem;margin:2rem 0;border-radius:14px;background:linear-gradient(135deg,#252A55,#C9859A);color:#FFF8EE}.w .k{color:#E8C989}img{width:100%;border-radius:14px;margin-top:2rem}.cap{font:.85rem system-ui,sans-serif;color:#4a4e75}';
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(titleOf()) + '</title><style>' + css + '</style></head><body><main>' + out.join('') + '</main></body></html>';
  }
  function availableSel() {
    return { title: true, story: !!state.story.text, word: !!wordOf(), future: !!state.future.text, image: !!state.future.text || ui.image === 'ready' };
  }
  function downloadKeepsake() {
    try { download('rewind-and-renew-' + YEAR + '.html', new Blob([keepsakeHTML(availableSel())], { type: 'text/html' })); say('Keepsake saved. It opens in any browser, with your image included.'); }
    catch (e) { say('The keepsake couldn’t be saved. Please try again.'); }
  }

  function showShare() {
    var avail = availableSel(), sel = { title: avail.title, story: false, word: false, future: false, image: false };
    openDialog(function (inner, dlg) {
      var preview = h('div', { class: 'share-preview', tabindex: '0', 'aria-label': 'Exactly what will be shared' });
      var thumb = h('div');
      var shareBtn = null, copyBtn, dlBtn;
      function opt(k, label, enabled) {
        return h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: sel[k], disabled: !enabled, onchange: function (e) { sel[k] = e.target.checked; update(); } }), label + (enabled ? '' : ' (not created yet)'));
      }
      function any() { return sel.title || sel.story || sel.word || sel.future || sel.image; }
      function update() {
        var t = selectionText(sel);
        preview.textContent = t || (sel.image ? '(Image only)' : 'Nothing selected yet. Tick what you’d like to include.');
        thumb.replaceChildren();
        if (sel.image) { var th = h('canvas', { class: 'share-thumb', role: 'img', 'aria-label': 'Image that will be included' }); paintArt(th, 240); thumb.append(th); }
        [shareBtn, copyBtn, dlBtn].forEach(function (b) { if (b) b.disabled = !any(); });
      }
      inner.append(
        h('h2', { text: 'Share your keepsake', 'data-focus': '' }),
        h('p', { text: 'Nothing is shared yet. Choose what to include. This is exactly what will go out, and nothing else. No link is created, and nothing is uploaded by this site.' }),
        h('div', { class: 'share-opts' }, opt('title', 'Title', avail.title), opt('story', 'My ' + YEAR + ' story', avail.story), opt('word', 'My word for ' + NEXT, avail.word), opt('future', 'Imagined ' + NEXT + ' story', avail.future), opt('image', 'Image', avail.image)),
        h('p', { class: 'hint', style: 'margin-bottom:.4rem', text: 'Preview of what will be shared:' }), preview, thumb);
      var row = h('div', { class: 'btn-row stack' });
      if (navigator.share) {
        shareBtn = btn('Share…', 'btn-primary', async function () {
          var data = { title: sel.title ? titleOf() : 'My reflection', text: selectionText(sel) };
          try {
            if (sel.image && navigator.canShare) {
              var blob = await new Promise(function (r) { exportCanvas(1200).toBlob(r, 'image/png'); });
              var file = new File([blob], 'rewind-and-renew.png', { type: 'image/png' });
              if (navigator.canShare({ files: [file] })) data.files = [file];
            }
            await navigator.share(data); dlg.close();
          } catch (e) { if (e && e.name !== 'AbortError') say('Sharing didn’t go through. Nothing was sent.'); }
        }, 'share');
        row.append(shareBtn);
      }
      copyBtn = btn('Copy text', shareBtn ? 'btn-ghost' : 'btn-primary', async function () {
        try { await navigator.clipboard.writeText(selectionText(sel)); say('Copied to your clipboard.'); }
        catch (e) { var r = document.createRange(); r.selectNodeContents(preview); var s = getSelection(); s.removeAllRanges(); s.addRange(r); say('Text selected. Press copy to finish.'); }
      }, 'bookmark');
      dlBtn = btn('Download this selection', 'btn-ghost', function () { download('rewind-and-renew-selection.html', new Blob([keepsakeHTML(sel)], { type: 'text/html' })); say('Saved to your downloads.'); }, 'download');
      row.append(copyBtn, dlBtn, btn('Not now', 'btn-text', function () { dlg.close(); }));
      inner.append(row);
      update();
    });
  }

  function keepsakeScreen() {
    var hasStory = !!state.story.text, hasFuture = !!state.future.text, w = wordOf();
    var canvas = h('canvas', { id: 'keepCanvas', role: 'img', 'aria-label': artLabel() });
    setTimeout(function () { try { paintArt(canvas, 900); } catch (e) { canvas.replaceWith(h('p', { class: 'note err', text: 'The image couldn’t be drawn. Go back to the future story to try again.' })); } }, 0);

    var node = h('section', { class: 'stage dark tone-dark enter' },
      h('div', { class: 'wrap wide keep' },
        h('header', { class: 'k-hero grain' },
          h('p', { class: 'eyebrow' }, icon('bookmark'), 'Your keepsake · ' + YEAR + ' → ' + NEXT),
          h('h1', { 'data-focus': '', text: titleOf() }),
          h('p', { text: 'Private to you. Nothing here has been shared.' })),
        hasStory
          ? h('article', { class: 'paper tone-light', style: 'max-width:46rem;margin-inline:auto;width:100%' }, h('p', { class: 'eyebrow' }, icon('pen'), 'My ' + YEAR + ', in my own words'), paragraphs(state.story.text))
          : emptyCard('Your year story hasn’t been written yet.', 'Write it', function () { go(hasAnswers() ? 'story' : 'reflect'); }),
        w ? h('div', { class: 'k-word' }, h('p', { class: 'eyebrow' }, icon('sun'), 'A word for ' + NEXT), h('strong', { text: w })) : null,
        hasFuture
          ? h('div', { class: 'k-split' },
              h('article', { class: 'paper tone-light' }, h('p', { class: 'eyebrow' }, icon('horizon'), 'Imagining ' + NEXT + ' · not a prediction'), paragraphs(state.future.text, 'future')),
              h('div', { class: 'k-art' }, canvas, h('p', { class: 'caption', text: 'An artistic interpretation of your hopes.' })))
          : emptyCard('Your future story hasn’t been created yet.', 'Look ahead', function () { go(hasHopes() ? 'mood' : 'ahead'); }),
        h('div', { class: 'k-actions tone-dark no-print' },
          h('h2', { text: 'Keep it, change it, or share it' }),
          h('div', { class: 'btn-row stack' },
            btn('Save keepsake', 'btn-primary', downloadKeepsake, 'download'),
            btn('Save image', 'btn-ghost', downloadImage, 'image'),
            btn('Print or save as PDF', 'btn-ghost', function () { window.print(); }, 'print')),
          h('div', { class: 'btn-row stack' },
            btn('Edit my year', 'btn-ghost', function () { go('story'); }, 'pen'),
            btn('Edit my hopes', 'btn-ghost', function () { go('future'); }, 'sprout'),
            btn('Change the image', 'btn-ghost', function () { go('future'); }, 'refresh'),
            btn('Remind me next December', 'btn-ghost', showReminder, 'calendar'),
            btn('Send a locked letter to ' + NEXT, 'btn-ghost', showCapsule, 'lock'),
            btn('Share… (optional)', 'btn-ghost', showShare, 'share')),
          h('div', { class: 'btn-row stack' },
            btn('Start over', 'btn-danger', deleteEverything, 'trash'),
            saveBadge()),
          h('p', { class: 'caption', text: 'Sharing is optional. You’ll see exactly what will be shared and choose each part first. Nothing is public by default.' }))));
    return node;
  }
  function emptyCard(msg, label, fn) {
    return h('div', { class: 'card' }, h('p', { text: msg }), btn(label, 'btn-primary', fn, 'arrow-right', true));
  }

  /* =====================================================
     LOCKED LETTERS, EARLIER KEEPSAKES (read-only keepsake)
     The letter travels inside the link itself, so we keep no copy.
     ===================================================== */
  var capTimer = null, capsule = { status: 'none', data: null }, archiveYear = null;
  var MOOD_IDS = { soft: 1, bright: 1, dream: 1, minimal: 1 }, MOTIFS_OK = { water: 1, mountain: 1, growth: 1, path: 1, light: 1, home: 1 };
  function nowDate() { var f = qs.get('fakeNow'), d = f ? new Date(f) : null; return d && !isNaN(d) ? d : new Date(); }
  function b64u(bytes) { var s = '', i, CH = 0x8000; for (i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function unb64u(str) { str = str.replace(/-/g, '+').replace(/_/g, '/'); while (str.length % 4) str += '='; var bin = atob(str), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
  async function pipe(bytes, stream) { var w = stream.writable.getWriter(); w.write(bytes); w.close(); return new Uint8Array(await new Response(stream.readable).arrayBuffer()); }
  async function packCapsule(obj) {
    var bytes = new TextEncoder().encode(JSON.stringify(obj)), p = 'p';
    if (window.CompressionStream) { bytes = await pipe(bytes, new CompressionStream('gzip')); p = 'g'; }
    return p + b64u(bytes);
  }
  async function unpackCapsule(str) {
    var p = str.charAt(0), bytes = unb64u(str.slice(1));
    if (p === 'g') { if (!window.DecompressionStream) throw new Error('unsupported'); bytes = await pipe(bytes, new DecompressionStream('gzip')); }
    return cleanCapsule(JSON.parse(new TextDecoder().decode(bytes)));
  }
  function cleanCapsule(d) {
    if (!d || d.v !== 1 || !Array.isArray(d.u) || d.u.length !== 3) throw new Error('bad');
    var s = function (x, n) { return typeof x === 'string' ? x.slice(0, n) : ''; };
    var out = { v: 1, y: Math.max(1900, Math.min(3000, +d.y || YEAR)), u: [+d.u[0] | 0, +d.u[1] | 0, +d.u[2] | 0], t: s(d.t, 200), s: s(d.s, 12000), w: s(d.w, 120), f: s(d.f, 12000) };
    if (d.a && typeof d.a === 'object') out.a = { mood: MOOD_IDS[d.a.mood] ? d.a.mood : 'soft', seed: (+d.a.seed || 1) >>> 0, time: ART.TIMES.indexOf(d.a.time) > -1 ? d.a.time : 'dusk', warmth: Math.max(-1, Math.min(1, +d.a.warmth || 0)), m: (Array.isArray(d.a.m) ? d.a.m : []).filter(function (k) { return MOTIFS_OK[k]; }).slice(0, 2) };
    return out;
  }
  function unlockDate(d) { return new Date(d.u[0], d.u[1], d.u[2], 0, 0, 0); }
  function longDate(dt) { return dt.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }); }

  /* data objects from the current reflection and from earlier saved years */
  function capsuleDataFromState(sel) {
    var d = { v: 1, y: YEAR, u: [NEXT, 0, 1] };
    if (sel.title) d.t = titleOf();
    if (sel.story && state.story.text) d.s = state.story.text;
    if (sel.word && wordOf()) d.w = wordOf();
    if (sel.future && state.future.text) d.f = state.future.text;
    if (sel.image) d.a = { mood: state.art.mood, seed: state.art.seed, time: state.art.time, warmth: state.art.warmth, m: ART.motifs(hopesText(), state.art.seed) };
    return d;
  }
  function dataFromSaved(s, y) {
    var hopes = ['room', 'try', 'feel', 'promise', 'support', 'word'].map(function (k) { return GEN.val(s.answers || {}, k); }).filter(Boolean).join(' ');
    var w = GEN.val(s.answers || {}, 'word'), a = s.art || {};
    return { v: 1, y: y, u: [y + 1, 0, 1], t: (s.story && s.story.title) || ('My ' + y), s: (s.story && s.story.text) || '', w: w.replace(/[.!?]+$/, ''), f: (s.future && s.future.text) || '',
      a: { mood: MOOD_IDS[a.mood] ? a.mood : 'soft', seed: a.seed || 1, time: a.time || 'dusk', warmth: a.warmth || 0, m: ART.motifs(hopes, a.seed || 1) }, ai: a.aiImage || null };
  }
  function drawData(canvas, d, w) {
    w = w || 900;
    var hh = Math.round(w * 1.25);
    if (d.ai) {
      var im = new Image();
      im.onload = function () { canvas.width = w; canvas.height = hh; var cx = canvas.getContext('2d'), sc = Math.max(w / im.naturalWidth, hh / im.naturalHeight); cx.drawImage(im, (w - im.naturalWidth * sc) / 2, (hh - im.naturalHeight * sc) / 2, im.naturalWidth * sc, im.naturalHeight * sc); };
      im.src = d.ai; return;
    }
    if (d.a) ART.draw(canvas, { mood: d.a.mood, seed: d.a.seed, time: d.a.time, warmth: d.a.warmth, motifs: d.a.m, w: w, h: hh });
  }
  function dataLabel(d) { return 'Artwork inspired by hopes for ' + (d.y + 1) + '.'; }

  function readOnlyKeepsake(d, banner) {
    var canvas = (d.a || d.ai) ? h('canvas', { role: 'img', 'aria-label': dataLabel(d) }) : null;
    if (canvas) setTimeout(function () { try { drawData(canvas, d, 900); } catch (e) { canvas.remove(); } }, 0);
    return h('div', { class: 'wrap wide keep' },
      h('header', { class: 'k-hero grain' },
        h('p', { class: 'eyebrow' }, icon('bookmark'), banner || ('Your keepsake \u00b7 ' + d.y + ' \u2192 ' + (d.y + 1))),
        h('h1', { 'data-focus': '', text: d.t || ('My ' + d.y) })),
      d.s ? h('article', { class: 'paper tone-light', style: 'max-width:46rem;margin-inline:auto;width:100%' }, h('p', { class: 'eyebrow' }, icon('pen'), 'My ' + d.y + ', in my own words'), paragraphs(d.s)) : null,
      d.w ? h('div', { class: 'k-word' }, h('p', { class: 'eyebrow' }, icon('sun'), 'A word for ' + (d.y + 1)), h('strong', { text: d.w })) : null,
      (d.f || canvas) ? h('div', { class: 'k-split' },
        d.f ? h('article', { class: 'paper tone-light' }, h('p', { class: 'eyebrow' }, icon('horizon'), 'Imagining ' + (d.y + 1) + ' \u00b7 not a prediction'), paragraphs(d.f, 'future')) : null,
        canvas ? h('div', { class: 'k-art' }, canvas, h('p', { class: 'caption', text: 'An artistic interpretation of hopes.' })) : null) : null);
  }

  function dataKeepsakeHTML(d) {
    function paras(t) { return String(t).split(/\n{2,}/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''); }
    var out = ['<header><p class="k">Rewind &amp; Renew &middot; ' + d.y + ' &rarr; ' + (d.y + 1) + '</p><h1>' + esc(d.t || ('My ' + d.y)) + '</h1></header>'];
    if (d.s) out.push('<section><h2>My ' + d.y + '</h2>' + paras(d.s) + '</section>');
    if (d.w) out.push('<section class="w"><p class="k">A word for ' + (d.y + 1) + '</p><p class="word">' + esc(d.w) + '</p></section>');
    var src = d.ai;
    if (!src && d.a) { var c = document.createElement('canvas'); drawData(c, d, 1100); src = c.toDataURL('image/jpeg', 0.9); }
    if (src) out.push('<section class="img"><img alt="' + esc(dataLabel(d)) + '" src="' + src + '"><p class="cap">An artistic interpretation of hopes, not a prediction.</p></section>');
    if (d.f) out.push('<section><h2>Imagining ' + (d.y + 1) + '</h2><p class="cap">Imagined, not predicted.</p>' + paras(d.f) + '</section>');
    var css = 'body{margin:0;background:linear-gradient(180deg,#11152B,#252A55 40%,#625A91 80%,#C9859A);font:18px/1.75 Georgia,serif;color:#11152B;padding:2rem 1rem}main{max-width:40rem;margin:0 auto;background:#FFF8EE;border-radius:20px;padding:2.2rem 1.6rem}h1,h2{font-weight:600;line-height:1.1}h1{font-size:2.6rem;margin:.3rem 0 1rem}h2{font-size:1.7rem;margin-top:2.4rem}.k{font:600 .75rem system-ui,sans-serif;letter-spacing:.15em;text-transform:uppercase;color:#625A91}.word{font-size:2.8rem;font-style:italic;text-align:center;margin:.2rem 0}.w{text-align:center;padding:1.5rem;margin:2rem 0;border-radius:14px;background:linear-gradient(135deg,#252A55,#C9859A);color:#FFF8EE}.w .k{color:#E8C989}img{width:100%;border-radius:14px;margin-top:2rem}.cap{font:.85rem system-ui,sans-serif;color:#4a4e75}';
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(d.t || ('My ' + d.y)) + '</title><style>' + css + '</style></head><body><main>' + out.join('') + '</main></body></html>';
  }

  /* ----- Calendar reminder that carries the letter's link ----- */
  function linkReminder(link, d) {
    var start = unlockDate(d), end = new Date(start.getTime() + 30 * 60000);
    function p2(n) { return (n < 10 ? '0' : '') + n; }
    function dt(x) { return '' + x.getFullYear() + p2(x.getMonth() + 1) + p2(x.getDate()) + 'T' + p2(x.getHours()) + p2(x.getMinutes()) + '00'; }
    function ics(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
    var title = 'Open your letter from ' + d.y, desc = 'A locked letter written at the end of ' + d.y + ' opens now. ' + link;
    var now = new Date(), stamp = now.getUTCFullYear() + p2(now.getUTCMonth() + 1) + p2(now.getUTCDate()) + 'T' + p2(now.getUTCHours()) + p2(now.getUTCMinutes()) + p2(now.getUTCSeconds()) + 'Z';
    var file = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Rewind and Renew//EN', 'BEGIN:VEVENT', 'UID:rewind-letter-' + d.y + '-' + now.getTime() + '@local', 'DTSTAMP:' + stamp,
      'DTSTART:' + dt(start), 'DTEND:' + dt(end), 'SUMMARY:' + ics(title), 'DESCRIPTION:' + ics(desc), 'URL:' + link, 'BEGIN:VALARM', 'TRIGGER:PT0S', 'ACTION:DISPLAY', 'DESCRIPTION:' + ics(title), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(title) + '&dates=' + dt(start) + '/' + dt(end) + '&details=' + encodeURIComponent(desc);
    return { ics: file, gcal: gcal };
  }

  /* ----- Creating a locked letter ----- */
  function showCapsule() {
    var avail = availableSel(), sel = { title: avail.title, story: avail.story, word: avail.word, future: avail.future, image: avail.image };
    var unlock = new Date(NEXT, 0, 1, 0, 0, 0);
    openDialog(function (inner, dlg) {
      var preview = h('div', { class: 'share-preview', tabindex: '0', 'aria-label': 'Exactly what the letter will contain' });
      var out = h('div', { 'aria-live': 'polite' }), makeBtn;
      function opt(k, label, enabled) { return h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: sel[k] && enabled, disabled: !enabled, onchange: function (e) { sel[k] = e.target.checked; update(); } }), label + (enabled ? '' : ' (not created yet)')); }
      function any() { return sel.title || sel.story || sel.word || sel.future || sel.image; }
      function update() { preview.textContent = selectionText(sel) || (sel.image ? '(Image only)' : 'Nothing selected yet.'); if (makeBtn) makeBtn.disabled = !any(); out.replaceChildren(); }
      inner.append(
        h('h2', { text: 'Send a letter to ' + NEXT, 'data-focus': '' }),
        h('p', { text: 'Create a link that stays closed until midnight on ' + longDate(unlock) + ' (12:00 AM, wherever it is opened). Open it yourself then, or send it to someone you trust.' }),
        h('div', { class: 'share-opts' }, opt('title', 'Title', avail.title), opt('story', 'My ' + YEAR + ' story', avail.story), opt('word', 'My word for ' + NEXT, avail.word), opt('future', 'Imagined ' + NEXT + ' story', avail.future), opt('image', 'A drawn image in your mood', avail.image)),
        h('p', { class: 'hint', style: 'margin-bottom:.4rem', text: 'This is exactly what the letter will contain:' }), preview,
        h('div', { class: 'note', style: 'margin-top:1rem' }, icon('alert'), h('span', { text: 'The letter is stored inside the link itself, so we keep no copy. Anyone who has the link can read it once it opens, so share it only with people you trust. The lock is a gentle one, kept by the page using the device\u2019s clock. It isn\u2019t a secure vault. AI images can\u2019t travel in a link, so the letter shows a drawn image instead.' })));
      makeBtn = btn('Create my locked link', 'btn-primary', async function () {
        makeBtn.classList.add('is-loading');
        try {
          var d = capsuleDataFromState(sel);
          var link = location.origin + location.pathname + '#capsule=' + await packCapsule(d);
          if (!/^https?:/.test(location.protocol)) link = 'http://localhost/#capsule=' + link.split('#capsule=')[1];
          var rem = linkReminder(link, d);
          var field = h('input', { type: 'text', readonly: true, value: link, 'aria-label': 'Your locked link', onfocus: function (e) { e.target.select(); } });
          out.replaceChildren(
            h('p', { style: 'margin-top:1rem;font-weight:600', text: 'Your letter is sealed until ' + longDate(unlock) + ', 12:00 AM.' }), field,
            link.length > 6500 ? h('p', { class: 'hint', text: 'This link is long, and some apps may cut it off. Try choosing fewer parts.' }) : null,
            !/^https?:/.test(location.protocol) || /localhost/.test(link.slice(0, 20)) ? h('p', { class: 'hint', text: 'You\u2019re viewing this from your own computer, so the address is a placeholder. Once the site is online, your link will use the real address and work anywhere.' }) : null,
            h('div', { class: 'btn-row stack' },
              btn('Copy link', 'btn-primary', async function () { try { await navigator.clipboard.writeText(link); say('Link copied.'); } catch (e) { field.select(); say('Select the link and copy it.'); } }, 'bookmark'),
              navigator.share ? btn('Share\u2026', 'btn-ghost', function () { navigator.share({ title: 'A letter for ' + NEXT, text: 'A letter that opens on ' + longDate(unlock), url: link }).catch(function () { }); }, 'share') : null,
              btn('Add a reminder with this link', 'btn-ghost', function () { download('rewind-and-renew-letter.ics', new Blob([rem.ics], { type: 'text/calendar' })); say('Reminder saved. Open the file to add it to your calendar.'); }, 'calendar'),
              h('a', { class: 'btn btn-ghost', href: rem.gcal, target: '_blank', rel: 'noopener noreferrer' }, icon('calendar'), 'Add to Google Calendar')));
        } catch (e) { out.replaceChildren(h('div', { class: 'note err', role: 'alert' }, icon('alert'), h('span', { text: 'We couldn\u2019t create the link. Please try again.' }))); }
        makeBtn.classList.remove('is-loading');
      }, 'lock');
      inner.append(h('div', { class: 'btn-row stack' }, makeBtn, btn('Not now', 'btn-text', function () { dlg.close(); })), out);
      update();
    });
  }

  /* ----- Opening a locked letter ----- */
  function capsuleScreen() {
    var wrap = h('section', { class: 'stage dark tone-dark enter' });
    var c = capsule;
    if (c.status === 'loading') { wrap.append(h('div', { class: 'wrap', style: 'text-align:center;padding-top:3rem' }, h('div', { class: 'orb', 'aria-hidden': 'true' }), h('h1', { 'data-focus': '', class: 'q-title', style: 'margin-top:1.5rem', text: 'Opening your letter\u2026' }))); return wrap; }
    if (c.status !== 'ok') {
      wrap.append(h('div', { class: 'wrap', style: 'text-align:center;padding-top:2rem' },
        h('p', { class: 'eyebrow', style: 'justify-content:center' }, icon('alert'), 'This link didn\u2019t work'),
        h('h1', { 'data-focus': '', class: 'q-title', text: 'We couldn\u2019t open this letter' }),
        h('p', { class: 'lede', style: 'margin-inline:auto', text: 'The link may be incomplete, because some apps shorten long links. Please ask for it to be sent again, or open it in a different browser.' }),
        h('div', { class: 'btn-row', style: 'justify-content:center;margin-top:1.5rem' }, btn('Make my own reflection', 'btn-primary', function () { history.replaceState({ v: 'landing' }, '', location.pathname + location.search); go('landing'); }, 'arrow-right', true))));
      return wrap;
    }
    var d = c.data, at = unlockDate(d);
    if (nowDate() >= at) { wrap.append(readOnlyKeepsake(d, 'A letter from ' + d.y + ', opened'), h('div', { class: 'wrap wide' }, h('div', { class: 'actions', style: 'justify-content:center' }, btn('Download it', 'btn-ghost', function () { download('rewind-and-renew-letter.html', new Blob([dataKeepsakeHTML(d)], { type: 'text/html' })); }, 'download'), btn('Make my own reflection', 'btn-primary', function () { history.replaceState({ v: 'landing' }, '', location.pathname + location.search); go('landing'); }, 'arrow-right', true)))); return wrap; }
    var count = h('p', { class: 'capsule-time', role: 'timer', 'aria-live': 'off' });
    function tick() {
      var ms = at - nowDate();
      if (ms <= 0) { clearInterval(capTimer); render(); return; }
      var days = Math.floor(ms / 864e5), hrs = Math.floor(ms % 864e5 / 36e5), mins = Math.floor(ms % 36e5 / 6e4);
      count.textContent = 'Opens in ' + (days ? days + (days === 1 ? ' day, ' : ' days, ') : '') + hrs + (hrs === 1 ? ' hour' : ' hours') + (days ? '' : ', ' + mins + (mins === 1 ? ' minute' : ' minutes'));
    }
    tick(); capTimer = setInterval(tick, 30000);
    var rem = linkReminder(location.href, d);
    wrap.append(h('div', { class: 'wrap', style: 'text-align:center;padding-top:2rem' },
      h('div', { class: 'k-hero grain' },
        h('p', { class: 'eyebrow', style: 'justify-content:center' }, icon('lock'), 'A letter from ' + d.y),
        h('h1', { 'data-focus': '', text: 'This letter opens on ' + longDate(at) }),
        h('p', { text: 'Someone wrote this at the end of ' + d.y + ' for the new year. It stays closed until midnight, when the year turns.' }), count),
      h('div', { class: 'btn-row', style: 'justify-content:center;margin-top:1.5rem' },
        btn('Remind me when it opens', 'btn-primary', function () { download('rewind-and-renew-letter.ics', new Blob([rem.ics], { type: 'text/calendar' })); say('Reminder saved. Open the file to add it to your calendar.'); }, 'calendar'),
        h('a', { class: 'btn btn-ghost', href: rem.gcal, target: '_blank', rel: 'noopener noreferrer' }, icon('calendar'), 'Google Calendar'),
        btn('Make my own reflection', 'btn-text', function () { history.replaceState({ v: 'landing' }, '', location.pathname + location.search); go('landing'); }))));
    return wrap;
  }
  function openCapsuleFromHash() {
    var m = /^#capsule=([A-Za-z0-9_-]+)$/.exec(location.hash);
    if (!m) return false;
    capsule = { status: 'loading', data: null }; view = 'capsule'; render();
    unpackCapsule(m[1]).then(function (d) { capsule = { status: 'ok', data: d }; })
      .catch(function () { capsule = { status: 'error', data: null }; })
      .then(function () { if (view === 'capsule') render(); });
    return true;
  }
  window.addEventListener('hashchange', function () { openCapsuleFromHash(); });

  /* ----- Earlier keepsakes (previous years kept in this browser) ----- */
  function archiveList() {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i), pre = CFG.storageKey + ':';
        if (!k || k.indexOf(pre) !== 0) continue;
        var y = k.slice(pre.length);
        if (!/^\d{4}$/.test(y) || +y === YEAR) continue;
        var s = JSON.parse(localStorage.getItem(k));
        if (s && ((s.story && s.story.text) || (s.future && s.future.text))) out.push({ y: +y, s: s });
      }
    } catch (e) { /* storage unavailable */ }
    return out.sort(function (a, b) { return b.y - a.y; });
  }
  function deleteYear(y) {
    return confirmBox({ title: 'Delete the ' + y + ' keepsake?', body: 'This removes it from this device. It can\u2019t be undone. If you downloaded it, that file stays with you.', ok: 'Delete it', cancel: 'Keep it', danger: true }).then(function (yes) {
      if (!yes) return false;
      try { localStorage.removeItem(CFG.storageKey + ':' + y); } catch (e) { /* ignore */ }
      say('The ' + y + ' keepsake was deleted from this device.'); return true;
    });
  }
  function fillArchive(root) {
    var list = archiveList(), band = root.querySelector('#archiveBand');
    if (!band || !list.length) return;
    band.hidden = false;
    var box = root.querySelector('#archiveList');
    list.forEach(function (e) {
      box.append(h('div', { class: 'card' }, h('h3', { text: e.s.story && e.s.story.title ? e.s.story.title : 'My ' + e.y }),
        h('p', { text: 'Kept on this device from ' + e.y + '.' }),
        h('div', { class: 'btn-row' },
          btn('Open', 'btn-primary', function () { archiveYear = e.y; go('archive'); }, 'book'),
          btn('Delete', 'btn-text', function () { deleteYear(e.y).then(function (ok) { if (ok) go('landing'); }); }, 'trash'))));
    });
  }
  function archiveScreen() {
    var list = archiveList(), found = list.filter(function (e) { return e.y === archiveYear; })[0];
    var wrap = h('section', { class: 'stage dark tone-dark enter' });
    if (!found) {
      wrap.append(h('div', { class: 'wrap' }, h('h1', { 'data-focus': '', class: 'q-title', text: 'Your earlier keepsakes' }),
        list.length ? list.map(function (e) { return h('div', { class: 'card', style: 'margin-bottom:1rem' }, h('h3', { text: e.s.story && e.s.story.title ? e.s.story.title : 'My ' + e.y }), h('div', { class: 'btn-row', style: 'margin-top:.8rem' }, btn('Open', 'btn-primary', function () { archiveYear = e.y; go('archive'); }, 'book'), btn('Delete', 'btn-text', function () { deleteYear(e.y).then(function () { go('archive'); }); }, 'trash'))); })
          : h('p', { class: 'lede', text: 'There\u2019s nothing kept from earlier years on this device.' }),
        h('div', { class: 'actions' }, btn('Back', 'btn-ghost', function () { go('landing'); }, 'arrow-left'))));
      return wrap;
    }
    var d = dataFromSaved(found.s, found.y);
    wrap.append(readOnlyKeepsake(d, 'Kept on this device \u00b7 ' + d.y), h('div', { class: 'wrap wide' }, h('div', { class: 'k-actions' },
      h('p', { class: 'caption', text: 'This keepsake lives only in this browser. It was never uploaded. You can delete it at any time.' }),
      h('div', { class: 'btn-row stack' },
        btn('Download it', 'btn-primary', function () { download('rewind-and-renew-' + d.y + '.html', new Blob([dataKeepsakeHTML(d)], { type: 'text/html' })); }, 'download'),
        btn('Print or save as PDF', 'btn-ghost', function () { window.print(); }, 'print'),
        btn('Delete this keepsake', 'btn-danger', function () { deleteYear(d.y).then(function (ok) { if (ok) { archiveYear = null; go('landing'); } }); }, 'trash'),
        btn('Back', 'btn-text', function () { archiveYear = null; go('landing'); }, 'arrow-left')))));
    return wrap;
  }

  /* ---------- Chrome ---------- */
  document.getElementById('brand').addEventListener('click', function (e) { e.preventDefault(); go('landing'); });
  document.getElementById('btnPrivacy').addEventListener('click', showPrivacy);
  document.getElementById('footPrivacy').addEventListener('click', function () { go('privacy'); });
  document.getElementById('footTerms').addEventListener('click', function () { go('terms'); });
  var ff = document.getElementById('footFounder');
  if (ff) { if (CFG.founder && CFG.founder.enabled) ff.addEventListener('click', showFounder); else ff.parentNode.hidden = true; }
  document.getElementById('btnDelete').addEventListener('click', deleteEverything);

  window.RR_ON_LANG = function () { if (SCREENS[view]) { try { render(); } catch (e) { /* ignore */ } } };
  if (window.RR_I18N) window.RR_I18N.mount();
  try { history.replaceState({ v: 'landing' }, '', location.pathname + location.search + location.hash); } catch (e) { /* ignore */ }
  if (!openCapsuleFromHash()) { render(); maybeShowFounder(); }
  loadAiImg().then(function () { var k = document.getElementById('keepCanvas'); if (k && view === 'keepsake') paintArt(k, 900); });
  /* On arrival, ask the server which country the visit comes from (read from the host's headers,
     no permission prompt). Used only to pick the right helpline numbers. */
  fetch('api/country').then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
    if (j && j.country && SUP.countries[j.country]) supportCountry = j.country;
  }).catch(function () { /* keep the browser-settings guess */ });
  /* Ask the server whether AI images are switched on (needs ELEVENLABS_API_KEY). Hidden otherwise. */
  if (CFG.imageEndpoint && window.fetch) {
    fetch(CFG.imageEndpoint, { method: 'GET' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      aiOK = !!(j && j.enabled);
      if (aiOK && view === 'mood') render();
      if (aiOK && (view === 'landing' || view === 'privacy')) render();
    }).catch(function () { aiOK = false; });
  }
})();
