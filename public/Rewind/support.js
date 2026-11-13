/* Gentle crisis support. Everything here runs on the device: the text is checked in the
   browser, nothing is sent anywhere, and no location permission is requested.
   The country is guessed from the browser's time zone and language, and the person can change it.
   Helpline numbers can change. Please re-check this list from time to time. */
(function () {
  'use strict';

  /* Phrases that suggest the person may be thinking about harming themselves or ending their life.
     Kept specific to avoid false alarms on everyday phrases such as "killing it" or "kill time". */
  var SELF = [
    /\bsuicid(e|al)\b/i, /\bkill(ing)? (my|him|her)self\b/i, /\bkill myself\b/i, /\bend(ing)? (my|it all|my own) life\b/i,
    /\bend it all\b/i, /\btake my (own )?life\b/i, /\bwant(ed)? to die\b/i, /\bwish i (was|were) dead\b/i, /\bbetter off dead\b/i,
    /\bdon'?t want to (live|be here|be alive|exist)\b/i, /\bno reason to (live|go on|be here)\b/i, /\bnot want(ing)? to (live|be alive)\b/i,
    /\bself[- ]?harm/i, /\b(hurt|harm|cut|cutting|hurting|harming) (my|him|her)self\b/i, /\boverdos(e|ed|ing)\b/i,
    /\bcan'?t (go on|do this anymore|take it anymore)\b/i, /\bgive up on life\b/i, /\bnot worth living\b/i
  ];
  /* Phrases about harming other people. */
  var OTHERS = [
    /\b(want|wanted|going|plan(ning)?|thinking of|thought about|thinking about) (to )?(kill|murder|hurt|harm|shoot|stab)(ing)? (him|her|them|someone|somebody|people|my|a person)\b/i,
    /\bkill(ing)? (him|her|them|someone|somebody)\b/i, /\bmurder\b/i
  ];

  function detect(text) {
    var t = String(text || '');
    if (!t.trim()) return null;
    for (var i = 0; i < SELF.length; i++) if (SELF[i].test(t)) return 'self';
    for (var j = 0; j < OTHERS.length; j++) if (OTHERS[j].test(t)) return 'others';
    return null;
  }

  /* name, emergency number, and support lines [label, display number, tel: value, note] */
  var C = {
    US: { n: 'United States', e: '911', l: [['988 Suicide & Crisis Lifeline', '988', '988', 'Call or text, 24/7']] },
    CA: { n: 'Canada', e: '911', l: [['988 Suicide Crisis Helpline', '988', '988', 'Call or text, 24/7']] },
    GB: { n: 'United Kingdom', e: '999', l: [['Samaritans', '116 123', '116123', 'Free, 24/7']] },
    IE: { n: 'Ireland', e: '999 or 112', l: [['Samaritans', '116 123', '116123', 'Free, 24/7']] },
    AU: { n: 'Australia', e: '000', l: [['Lifeline', '13 11 14', '131114', '24/7']] },
    NZ: { n: 'New Zealand', e: '111', l: [['Need to Talk? (call or text)', '1737', '1737', 'Free, 24/7']] },
    IN: { n: 'India', e: '112', l: [['Tele-MANAS (government helpline)', '14416', '14416', 'Free, 24/7, many languages']] },
    DE: { n: 'Germany', e: '112', l: [['Telefonseelsorge', '0800 111 0 111', '08001110111', 'Free, 24/7']] },
    FR: { n: 'France', e: '112', l: [['3114, national suicide prevention line', '3114', '3114', 'Free, 24/7']] },
    ES: { n: 'Spain', e: '112', l: [['024, suicide prevention line', '024', '024', 'Free, 24/7']] },
    SG: { n: 'Singapore', e: '999', l: [['Samaritans of Singapore', '1767', '1767', '24/7']] },
    ZA: { n: 'South Africa', e: '112', l: [['SADAG Suicide Crisis Line', '0800 567 567', '0800567567', '24/7']] },
    JP: { n: 'Japan', e: '110 or 119', l: [['Yorisoi Hotline', '0120-279-338', '0120279338', 'Free, 24/7']] },
    PH: { n: 'Philippines', e: '911', l: [['NCMH Crisis Hotline', '1553', '1553', 'Free']] },
    BR: { n: 'Brazil', e: '192', l: [['CVV', '188', '188', 'Free, 24/7']] },
    MX: { n: 'Mexico', e: '911', l: [['Línea de la Vida', '800 911 2000', '8009112000', 'Free, 24/7']] }
  };

  var TZ = { 'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Pacific/Auckland': 'NZ', 'Europe/Berlin': 'DE', 'Europe/Paris': 'FR', 'Europe/Madrid': 'ES', 'Asia/Singapore': 'SG', 'Africa/Johannesburg': 'ZA', 'Asia/Tokyo': 'JP', 'Asia/Manila': 'PH', 'America/Sao_Paulo': 'BR', 'America/Mexico_City': 'MX',
    'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Winnipeg': 'CA', 'America/Halifax': 'CA', 'America/St_Johns': 'CA', 'America/Regina': 'CA' };

  function guess() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (TZ[tz]) return TZ[tz];
      if (/^Australia\//.test(tz)) return 'AU';
      if (/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Indiana|Kentucky|Juneau)|^Pacific\/Honolulu/.test(tz)) return 'US';
    } catch (e) { /* fall through */ }
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var m = /-([A-Za-z]{2})$/.exec(langs[i] || '');
      if (m && C[m[1].toUpperCase()]) return m[1].toUpperCase();
    }
    return '';
  }

  /* Rough boxes [south, west, north, east] so GPS coordinates can be matched to a listed country
     entirely on the device (no outside look-up). Boxes overlap near borders, so if more than one
     matches we prefer the country already chosen, then the nearest centre. The person can always change it. */
  var BOX = {
    US: [[24.4, -125, 49.4, -66.9], [51.2, -171, 71.5, -129.9], [18.8, -160.3, 22.3, -154.8]],
    CA: [[41.6, -141, 83.2, -52.6]], GB: [[49.8, -8.7, 60.9, 1.8]], IE: [[51.3, -10.7, 55.5, -5.9]],
    AU: [[-44, 112.9, -10.5, 153.7]], NZ: [[-47.4, 166.3, -34.3, 178.7]], IN: [[6.5, 68, 35.7, 97.5]],
    DE: [[47.2, 5.8, 55.1, 15.1]], FR: [[41.3, -5.2, 51.2, 9.6]], ES: [[35.9, -9.4, 43.9, 4.4]],
    SG: [[1.15, 103.6, 1.48, 104.1]], ZA: [[-34.9, 16.4, -22.1, 32.9]], JP: [[24, 122.9, 45.6, 146]],
    PH: [[4.5, 116.9, 21.2, 127]], BR: [[-33.8, -74, 5.3, -34.8]], MX: [[14.5, -118.4, 32.8, -86.7]]
  };
  function fromCoords(lat, lon, prefer) {
    var hits = [], best = null, bestD = Infinity;
    Object.keys(BOX).forEach(function (k) {
      BOX[k].forEach(function (b) {
        if (lat >= b[0] && lat <= b[2] && lon >= b[1] && lon <= b[3]) {
          var cy = (b[0] + b[2]) / 2, cx = (b[1] + b[3]) / 2, d = Math.pow(lat - cy, 2) + Math.pow(lon - cx, 2);
          hits.push({ k: k, d: d });
        }
      });
    });
    if (!hits.length) return '';
    for (var i = 0; i < hits.length; i++) if (hits[i].k === prefer) return prefer;
    hits.forEach(function (x) { if (x.d < bestD) { bestD = x.d; best = x.k; } });
    return best;
  }

  window.RR_SUPPORT = { detect: detect, guess: guess, fromCoords: fromCoords, countries: C };
})();
