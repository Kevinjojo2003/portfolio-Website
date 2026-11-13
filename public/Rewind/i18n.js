/* Languages for Rewind & Renew.
 *
 * How it works: the site is written in English. Each English sentence is a key in a table
 * (see i18n-ui.js, i18n-q.js, i18n-x.js). After every screen is drawn, this file swaps any
 * sentence it knows for the chosen language. Anything without a translation simply stays in
 * English, so nothing ever breaks. The person's own words are never touched.
 *
 * Translations were written by an AI and should be checked by a fluent speaker before launch.
 * Privacy Policy and Terms stay in English on purpose (legal text needs a professional translator).
 *
 * Add a sentence:  RR_I18N.add('English text', hi, ta, te, kn, ml, sa, es, fr)
 * Placeholders like {year}, {next}, {n}, {total}, {date} are filled from the page text.
 */
(function () {
  'use strict';
  var LANGS = [['en', 'English'], ['hi', 'हिन्दी'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'], ['kn', 'ಕನ್ನಡ'], ['ml', 'മലയാളം'], ['sa', 'संस्कृतम्'], ['es', 'Español'], ['fr', 'Français']];
  var CODES = ['hi', 'ta', 'te', 'kn', 'ml', 'sa', 'es', 'fr'];
  var MONTHS = {
    hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्तूबर', 'नवंबर', 'दिसंबर'],
    ta: ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'],
    te: ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'],
    kn: ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್'],
    ml: ['ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ'],
    sa: ['जनवरी', 'फ़रवरी', 'मार्चः', 'अप्रैलः', 'मे', 'जूनः', 'जुलाई', 'अगस्तः', 'सप्टेम्बरः', 'अक्टोबरः', 'नवम्बरः', 'दिसम्बरः'],
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  };
  var EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var FONT = { hi: 'Devanagari', sa: 'Devanagari', ta: 'Tamil', te: 'Telugu', kn: 'Kannada', ml: 'Malayalam' };

  var table = {}, tpl = [], lang = 'en';
  var orig = new WeakMap(), done = new WeakMap();

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function add(en) {
    var tr = {}, i, args = arguments;
    for (i = 0; i < CODES.length; i++) if (args[i + 1]) tr[CODES[i]] = args[i + 1];
    table[en] = tr;
    if (/\{\w+\}/.test(en)) {
      var names = [], parts = en.split(/(\{\w+\})/), src = '^';
      parts.forEach(function (p) {
        var m = /^\{(\w+)\}$/.exec(p);
        if (m) { names.push(m[1]); src += '([\\s\\S]+?)'; } else src += esc(p);
      });
      tpl.push({ en: en, rx: new RegExp(src + '$'), names: names, tr: tr, len: en.length });
      tpl.sort(function (a, b) { return b.len - a.len; });
    }
  }
  function localMonths(v) {
    if (lang === 'en' || !MONTHS[lang]) return v;
    return v.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, function (m) { return MONTHS[lang][EN_MONTHS.indexOf(m)]; });
  }
  function fillVars(str, vars) {
    return str.replace(/\{(\w+)\}/g, function (m, k) {
      if (!vars || vars[k] == null) return m;
      return k === 'date' ? localMonths(String(vars[k])) : String(vars[k]);
    });
  }
  /* Translate one trimmed English sentence. Returns null when there is nothing to swap. */
  function lookup(s) {
    if (lang === 'en') return null;
    var hit = table[s];
    if (hit && hit[lang] && !/\{\w+\}/.test(s)) return hit[lang];
    for (var i = 0; i < tpl.length; i++) {
      var t = tpl[i], m = t.rx.exec(s);
      if (m && t.tr[lang]) {
        var vars = {};
        t.names.forEach(function (n, j) { if (!(n in vars)) vars[n] = m[j + 1]; });
        return fillVars(t.tr[lang], vars);
      }
    }
    return null;
  }
  /* For the on-device story writer. */
  function T(s, vars) {
    var hit = table[s], out = s;
    if (lang !== 'en' && hit && hit[lang]) out = hit[lang];
    return fillVars(out, vars);
  }

  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT|CODE|SELECT)$/;
  function skipEl(el) {
    for (var n = el; n && n.nodeType === 1; n = n.parentNode) {
      if (SKIP.test(n.tagName) && n.tagName !== 'SELECT') return true;
      if (n.hasAttribute && (n.hasAttribute('data-notranslate') || n.classList.contains('prose') || n.classList.contains('share-preview') || n.classList.contains('legal') || n.classList.contains('legal-body') || n.classList.contains('edit-body') || n.id === 'langSel')) return true;
    }
    return false;
  }
  function doText(node) {
    var cur = node.nodeValue;
    if (done.has(node) && done.get(node) === cur) {
      if (lang === 'en') { node.nodeValue = orig.get(node); done.delete(node); return; }
      var en0 = orig.get(node), tr0 = lookupKeep(en0);
      if (tr0 !== null && tr0 !== cur) { node.nodeValue = tr0; done.set(node, tr0); }
      return;
    }
    if (!node.parentNode || skipEl(node.parentNode)) return;
    var trimmed = cur.trim();
    if (!trimmed || trimmed.length < 2) return;
    var tr = lookup(trimmed);
    if (tr === null) { orig.delete(node); done.delete(node); return; }
    var lead = cur.match(/^\s*/)[0], trail = cur.match(/\s*$/)[0];
    orig.set(node, cur); var val = lead + tr + trail;
    node.nodeValue = val; done.set(node, val);
  }
  function lookupKeep(en) { var t = en.trim(), tr = lookup(t); if (tr === null) return null; return en.match(/^\s*/)[0] + tr + en.match(/\s*$/)[0]; }

  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  function doAttrs(el) {
    if (el.nodeType !== 1 || (el.closest && el.closest('[data-notranslate],.prose,.share-preview,.legal,#langSel'))) return;
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var store = el.__rr || (el.__rr = {}), cur = el.getAttribute(a), rec = store[a];
      if (rec && rec.tr === cur) {
        if (lang === 'en') { el.setAttribute(a, rec.en); delete store[a]; return; }
        var t0 = lookup(rec.en.trim()); if (t0 === null && a === 'placeholder') t0 = lookup('Take your time…');
        if (t0 !== null && t0 !== cur) { el.setAttribute(a, t0); rec.tr = t0; }
        return;
      }
      var tr = lookup(cur.trim());
      if (tr === null && a === 'placeholder' && el.tagName === 'TEXTAREA' && lang !== 'en') tr = lookup('Take your time…');
      if (tr === null) { delete store[a]; return; }
      store[a] = { en: cur, tr: tr }; el.setAttribute(a, tr);
    });
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doAttrs(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doAttrs(n); }
  }

  var busy = false;
  function apply(root) { busy = true; try { walk(root || document.body); } finally { busy = false; } }

  var mo = new MutationObserver(function (list) {
    if (busy) return;
    busy = true;
    try {
      list.forEach(function (m) {
        if (m.type === 'childList') m.addedNodes.forEach(function (n) { walk(n); });
        else if (m.type === 'characterData') doText(m.target);
        else if (m.type === 'attributes') doAttrs(m.target);
      });
    } finally { busy = false; }
    // observer callbacks run after our own edits too; walking again is cheap and idempotent
  });

  function loadFont(code) {
    if (!FONT[code] || document.getElementById('rrFont-' + FONT[code])) return;
    var f = FONT[code], l = document.createElement('link');
    l.id = 'rrFont-' + f; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+' + f + ':wght@400;500;600&family=Noto+Serif+' + f + ':wght@500;600&display=swap';
    document.head.appendChild(l);
  }

  function setLang(code, quiet) {
    if (code !== 'en' && !CODES.some(function (c) { return c === code; })) code = 'en';
    lang = code;
    document.documentElement.lang = code;
    loadFont(code);
    try { localStorage.setItem('rr-lang', code); } catch (e) { /* ignore */ }
    var sel = document.getElementById('langSel'); if (sel) sel.value = code;
    apply(document.body);
    if (!quiet && window.RR_ON_LANG) window.RR_ON_LANG(code);
  }
  function detect() {
    try { var s = localStorage.getItem('rr-lang'); if (s) return s; } catch (e) { /* ignore */ }
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    var p = l.slice(0, 2).toLowerCase();
    return CODES.indexOf(p) > -1 ? p : 'en';
  }
  function mount() {
    var nav = document.querySelector('.header-actions');
    if (nav && !document.getElementById('langSel')) {
      var sel = document.createElement('select');
      sel.id = 'langSel'; sel.className = 'lang-sel'; sel.setAttribute('aria-label', 'Language');
      LANGS.forEach(function (l) { var o = document.createElement('option'); o.value = l[0]; o.textContent = l[1]; sel.appendChild(o); });
      sel.addEventListener('change', function () { setLang(sel.value); });
      nav.insertBefore(sel, nav.firstChild);
    }
    mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    setLang(detect(), true);
  }

  window.RR_I18N = { add: add, T: T, setLang: setLang, mount: mount, lang: function () { return lang; }, langs: LANGS };
  window.RR_T = T;
})();
