/* Procedural "mood piece" artwork. No text, logos, people or literal events —
   an abstract interpretation seeded by the person's words. Runs fully on-device. */
(function () {
  'use strict';
  var TAU = Math.PI * 2;

  function hash(s) {
    var h = 2166136261;
    s = String(s);
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hsl(h, s, l, a) {
    return 'hsla(' + (((h % 360) + 360) % 360) + ',' + s + '%,' + Math.max(0, Math.min(100, l)) + '%,' + (a == null ? 1 : a) + ')';
  }
  function c3(arr, dl, a) { return hsl(arr[0], arr[1], arr[2] + (dl || 0), a); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // Sky palettes keyed to the site's midnight → violet → rose → gold range. [h, s, l]
  var SKY = {
    dawn:  { top: [238, 34, 24], mid: [330, 36, 52], bot: [34, 80, 76], sun: [40, 90, 84], ink: [236, 40, 14] },
    day:   { top: [214, 52, 60], mid: [262, 30, 76], bot: [38, 85, 89], sun: [44, 100, 94], ink: [232, 34, 22] },
    dusk:  { top: [233, 46, 13], mid: [262, 30, 38], bot: [345, 46, 64], sun: [40, 82, 76], ink: [233, 48, 9] },
    night: { top: [231, 50, 8],  mid: [236, 42, 17], bot: [256, 30, 30], sun: [44, 40, 90], ink: [231, 52, 6] }
  };

  var MOTIF_RX = {
    water: /\b(sea|ocean|water|swim|swimming|river|lake|beach|wave|waves|sail|rain|coast|shore)\b/i,
    mountain: /\b(mountain|mountains|hike|hiking|climb|climbing|trail|summit|peak|walk|walks|walking|run|running)\b/i,
    growth: /\b(garden|gardening|grow|growing|growth|plant|plants|seed|seeds|bloom|tree|trees|learn|learning|nurture|heal|healing|flower|flowers|rest)\b/i,
    path: /\b(travel|journey|road|path|trip|explore|adventure|move|moving|city|cross|new place|wander|drive|train)\b/i,
    light: /\b(light|star|stars|sky|night|dream|quiet|calm|moon|peace|peaceful|sleep|stillness|slow|space)\b/i,
    home: /\b(home|house|family|kitchen|table|friend|friends|people|together|connect|community|belong|love)\b/i
  };
  function motifs(text, seed) {
    var out = [];
    Object.keys(MOTIF_RX).forEach(function (k) { if (MOTIF_RX[k].test(text || '')) out.push(k); });
    out = out.slice(0, 2);
    if (!out.length) {
      var all = ['light', 'path', 'growth', 'water', 'mountain', 'home'];
      out = [all[(seed || 0) % all.length]];
    }
    return out;
  }

  function ridge(ctx, W, H, baseY, amp, r, fill, sharp) {
    var n = 4, ph = [], fr = [], i;
    for (i = 0; i < n; i++) { ph.push(r() * TAU); fr.push((0.7 + r() * 1.3) * (i + 1) * TAU / W); }
    function y(x) {
      var s = 0, ws = 0;
      for (var j = 0; j < n; j++) {
        var w = 1 / (j + 1), v = Math.sin(x * fr[j] + ph[j]);
        if (sharp && j < 2) v = 1 - 2 * Math.abs(v);
        s += w * v; ws += w;
      }
      return baseY - amp * (s / ws);
    }
    ctx.beginPath(); ctx.moveTo(0, H);
    for (var x = 0; x <= W; x += 6) ctx.lineTo(x, y(x));
    ctx.lineTo(W, H); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    return y;
  }

  function stars(ctx, W, maxY, r, n) {
    for (var i = 0; i < n; i++) {
      ctx.fillStyle = 'hsla(40,50%,92%,' + (0.2 + r() * 0.6) + ')';
      ctx.beginPath(); ctx.arc(r() * W, r() * maxY, (0.5 + r() * 1.5) * (W / 1000), 0, TAU); ctx.fill();
    }
  }

  function leaf(ctx, x, y, len, ang, fill) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(len * 0.35, -len * 0.28, len, 0);
    ctx.quadraticCurveTo(len * 0.35, len * 0.28, 0, 0);
    ctx.fillStyle = fill; ctx.fill(); ctx.restore();
  }

  function stalk(ctx, x, H, h, r, fill) {
    ctx.strokeStyle = fill; ctx.lineWidth = Math.max(2, H * 0.003);
    ctx.beginPath(); ctx.moveTo(x, H);
    var bx = x + (r() - 0.5) * H * 0.08;
    ctx.quadraticCurveTo(bx, H - h * 0.6, x + (r() - 0.5) * H * 0.05, H - h); ctx.stroke();
    for (var k = 1; k <= 3; k++) {
      var t = k / 4;
      leaf(ctx, x + (bx - x) * t * 0.6, H - h * t, h * 0.22, -Math.PI / 2 + (k % 2 ? 0.9 : -0.9) + (r() - 0.5) * 0.4, fill);
    }
  }

  /* ---------- Soft & cinematic ---------- */
  function soft(ctx, W, H, r, o) {
    var s = SKY[o.time], g, i;
    g = ctx.createLinearGradient(0, 0, 0, H * 0.72);
    g.addColorStop(0, c3(s.top)); g.addColorStop(0.55, c3(s.mid)); g.addColorStop(1, c3(s.bot));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    var hz = H * (0.6 + r() * 0.06);
    var sx = W * (0.3 + r() * 0.4), sy = hz - H * (0.1 + r() * 0.1);
    if (o.time === 'night' || o.time === 'dusk' || o.motifs.indexOf('light') > -1)
      stars(ctx, W, hz * 0.8, r, o.time === 'night' ? 160 : 70);

    g = ctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.7);
    g.addColorStop(0, c3(s.sun, 0, 0.8)); g.addColorStop(0.25, c3(s.sun, -12, 0.3)); g.addColorStop(1, c3(s.sun, -20, 0));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = c3(s.sun, 6, 0.96);
    ctx.beginPath(); ctx.arc(sx, sy, W * 0.055, 0, TAU); ctx.fill();

    var water = o.motifs.indexOf('water') > -1;
    var sharp = o.motifs.indexOf('mountain') > -1;
    var layers = water ? 2 : 4, ys = [], t;
    if (water) {
      g = ctx.createLinearGradient(0, hz, 0, H);
      g.addColorStop(0, c3(s.bot, -8)); g.addColorStop(1, c3(s.ink));
      ctx.fillStyle = g; ctx.fillRect(0, hz, W, H - hz);
      for (i = 0; i < 42; i++) {
        t = i / 42;
        var wd = (30 + t * 260) * (0.5 + r() * 0.8);
        ctx.fillStyle = c3(s.sun, 0, 0.4 * (1 - t));
        ctx.fillRect(sx - wd / 2, hz + t * (H - hz) * 0.9, wd, 3 + t * 3);
      }
    }
    for (i = 0; i < layers; i++) {
      t = i / (layers - 1 || 1);
      var base = water ? hz + 2 : hz + i * H * 0.05;
      var col = hsl(lerp(s.mid[0], s.ink[0], t), 28 + t * 8, lerp(s.bot[2] - 18, s.ink[2] + 3, t));
      var f = ridge(ctx, W, H, base, H * (water ? 0.07 + i * 0.03 : 0.07 + i * 0.01), r, col, sharp && i < 3);
      ys.push(f);
      if (water && i === layers - 1) { ctx.fillStyle = 'rgba(0,0,0,0)'; }
    }
    if (water) { // re-lay water in front of land edge so land reads as far shore
      g = ctx.createLinearGradient(0, hz + 4, 0, H);
      g.addColorStop(0, c3(s.bot, -8, 0.0)); g.addColorStop(0.02, c3(s.bot, -8, 0.0));
    }
    if (o.motifs.indexOf('home') > -1 && ys.length > 1) {
      for (i = 0; i < 5; i++) {
        var hx = W * (0.15 + r() * 0.7), f2 = ys[Math.min(1, ys.length - 1)];
        ctx.fillStyle = hsl(40, 95, 72, 0.9);
        ctx.fillRect(hx, f2(hx) + 6, W * 0.007, W * 0.01);
      }
    }
    if (o.motifs.indexOf('path') > -1) {
      var px = W * (0.3 + r() * 0.4);
      g = ctx.createLinearGradient(0, hz, 0, H);
      g.addColorStop(0, c3(s.sun, 0, 0.0)); g.addColorStop(1, c3(s.sun, -4, 0.45));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(px - 6, hz + H * 0.06);
      ctx.bezierCurveTo(px - W * 0.1, H * 0.78, px + W * 0.25, H * 0.86, W * 0.5 - W * 0.2, H);
      ctx.lineTo(W * 0.5 + W * 0.22, H);
      ctx.bezierCurveTo(px + W * 0.3, H * 0.86, px + W * 0.02, H * 0.78, px + 6, hz + H * 0.06);
      ctx.closePath(); ctx.fill();
    }
    if (o.motifs.indexOf('growth') > -1) {
      var fc = c3(s.ink, 2);
      for (i = 0; i < 9; i++) stalk(ctx, W * (0.05 + r() * 0.9), H, H * (0.1 + r() * 0.16), r, fc);
    }
    g = ctx.createLinearGradient(0, hz - H * 0.1, 0, hz + H * 0.12);
    g.addColorStop(0, c3(s.bot, 8, 0)); g.addColorStop(0.5, c3(s.bot, 10, 0.22)); g.addColorStop(1, c3(s.bot, 8, 0));
    ctx.fillStyle = g; ctx.fillRect(0, hz - H * 0.1, W, H * 0.22);
  }

  /* ---------- Bright & playful ---------- */
  function bright(ctx, W, H, r, o) {
    var bgs = { dawn: [24, 80, 92], day: [42, 90, 93], dusk: [268, 40, 88], night: [233, 42, 15] };
    var P = [
      [[345, 52, 64], [40, 85, 66], [255, 32, 58], [195, 40, 52], [12, 70, 66]],
      [[40, 85, 64], [335, 45, 66], [236, 40, 46], [168, 34, 52], [262, 34, 66]],
      [[258, 34, 60], [350, 55, 70], [42, 88, 70], [212, 46, 56], [20, 72, 68]]
    ][o.seed % 3];
    var bg = bgs[o.time], i, k;
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, c3(bg, 3)); g.addColorStop(1, c3(bg, o.time === 'night' ? 8 : -6));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    for (i = 0; i < 12; i++) {
      var cx = r() * W, cy = r() * H * 0.62, cr = W * (0.03 + r() * 0.1);
      ctx.fillStyle = c3(P[i % 5], 0, 0.85);
      ctx.beginPath(); ctx.arc(cx, cy, cr, 0, TAU); ctx.fill();
      if (i % 4 === 0) { ctx.strokeStyle = c3(P[(i + 2) % 5], 0, 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, cr * 1.4, 0, TAU); ctx.stroke(); }
    }
    var baseY = H * 0.8;
    for (i = 0; i < 5; i++) {
      ctx.fillStyle = c3(P[i], 0, 0.95);
      ctx.beginPath(); ctx.arc(W / 2, baseY, W * (0.46 - i * 0.075), Math.PI, 0); ctx.closePath(); ctx.fill();
    }
    for (k = 0; k < 4; k++) {
      ctx.fillStyle = c3(P[(k + 1) % 5], k % 2 ? -4 : 2, 1);
      ctx.beginPath(); ctx.moveTo(0, H);
      for (var x = 0; x <= W; x += 8) ctx.lineTo(x, baseY + 10 + k * H * 0.045 + Math.sin(x / W * TAU * (2 + k) + k) * H * 0.015);
      ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    }
    var m = o.motifs;
    if (m.indexOf('light') > -1) {
      ctx.strokeStyle = c3(P[1], 4, 0.9); ctx.lineWidth = 5; ctx.lineCap = 'round';
      for (i = 0; i < 16; i++) {
        var a = Math.PI + (i / 15) * Math.PI, r0 = W * 0.5, r1 = W * (0.56 + (i % 2) * 0.04);
        ctx.beginPath(); ctx.moveTo(W / 2 + Math.cos(a) * r0, baseY + Math.sin(a) * r0); ctx.lineTo(W / 2 + Math.cos(a) * r1, baseY + Math.sin(a) * r1); ctx.stroke();
      }
    }
    if (m.indexOf('mountain') > -1) {
      for (i = 0; i < 3; i++) { ctx.fillStyle = c3(P[(i + 2) % 5], -4, 0.95); var tx = W * (0.2 + i * 0.3); ctx.beginPath(); ctx.moveTo(tx - W * 0.14, baseY); ctx.lineTo(tx, baseY - H * (0.14 + r() * 0.06)); ctx.lineTo(tx + W * 0.14, baseY); ctx.closePath(); ctx.fill(); }
    }
    if (m.indexOf('growth') > -1) { for (i = 0; i < 6; i++) stalk(ctx, W * (0.08 + i * 0.17), H, H * (0.14 + r() * 0.12), r, c3(P[(i + 3) % 5], -8)); }
    if (m.indexOf('home') > -1) {
      for (i = 0; i < 3; i++) { var hx = W * (0.15 + i * 0.3), hw = W * 0.1; ctx.fillStyle = c3(P[(i + 1) % 5], 0, 1); ctx.fillRect(hx, baseY - hw, hw, hw); ctx.beginPath(); ctx.moveTo(hx - 8, baseY - hw); ctx.lineTo(hx + hw / 2, baseY - hw * 1.6); ctx.lineTo(hx + hw + 8, baseY - hw); ctx.closePath(); ctx.fillStyle = c3(P[(i + 3) % 5], -6); ctx.fill(); }
    }
    if (m.indexOf('path') > -1) {
      ctx.strokeStyle = c3(P[0], 8, 0.9); ctx.lineWidth = W * 0.012; ctx.lineCap = 'round'; ctx.setLineDash([W * 0.03, W * 0.03]);
      ctx.beginPath(); ctx.moveTo(W * 0.1, H * 0.95); ctx.bezierCurveTo(W * 0.4, H * 0.8, W * 0.2, H * 0.55, W * 0.8, H * 0.35); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.fillStyle = c3(bg, o.time === 'night' ? 40 : -30, 0.35);
    for (i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(W * 0.06 + (i % 8) * W * 0.022, H * 0.05 + Math.floor(i / 8) * W * 0.022, 2.4 * (W / 1000), 0, TAU); ctx.fill(); }
  }

  /* ---------- Dreamlike ---------- */
  function dream(ctx, W, H, r, o) {
    var s = SKY[o.time === 'day' ? 'dusk' : o.time], i, g;
    g = ctx.createLinearGradient(0, 0, W * 0.4, H);
    g.addColorStop(0, c3(s.top)); g.addColorStop(0.5, c3(s.mid, 2)); g.addColorStop(1, c3(s.bot, -4));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    stars(ctx, W, H * 0.7, r, 110);
    ctx.globalCompositeOperation = 'lighter';
    var hues = [340, 40, 262, 220];
    for (i = 0; i < 11; i++) {
      var x = r() * W, y = r() * H, rad = W * (0.12 + r() * 0.3);
      g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      var hh = hues[i % 4];
      g.addColorStop(0, hsl(hh, 60, 62, 0.28)); g.addColorStop(1, hsl(hh, 60, 50, 0));
      ctx.fillStyle = g; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
    for (i = 0; i < 7; i++) {
      ctx.strokeStyle = hsl(hues[i % 4], 55, 78, 0.12 + r() * 0.1);
      ctx.lineWidth = W * (0.004 + r() * 0.02); ctx.lineCap = 'round';
      var y0 = H * (0.2 + r() * 0.6);
      ctx.beginPath(); ctx.moveTo(-20, y0);
      ctx.bezierCurveTo(W * 0.3, y0 - H * 0.2 * r(), W * 0.6, y0 + H * 0.25 * r(), W + 20, y0 - H * 0.1 + r() * H * 0.1); ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
    var aw = W * 0.26, ax = W / 2, ay = H * 0.72, ah = H * 0.34;
    g = ctx.createLinearGradient(0, ay - ah, 0, ay);
    g.addColorStop(0, hsl(42, 85, 82, 0.95)); g.addColorStop(1, hsl(340, 55, 72, 0.7));
    ctx.beginPath(); ctx.moveTo(ax - aw / 2, ay); ctx.lineTo(ax - aw / 2, ay - ah + aw / 2);
    ctx.arc(ax, ay - ah + aw / 2, aw / 2, Math.PI, 0); ctx.lineTo(ax + aw / 2, ay); ctx.closePath();
    ctx.fillStyle = g; ctx.shadowColor = hsl(42, 90, 75, 0.7); ctx.shadowBlur = W * 0.07; ctx.fill(); ctx.shadowBlur = 0;
    g = ctx.createLinearGradient(0, ay, 0, H);
    g.addColorStop(0, hsl(250, 35, 20, 0.0)); g.addColorStop(0.3, c3(s.ink, 0, 0.85)); g.addColorStop(1, c3(s.ink));
    ctx.fillStyle = g; ctx.fillRect(0, ay - 4, W, H - ay + 4);
    ctx.globalCompositeOperation = 'lighter';
    g = ctx.createRadialGradient(ax, ay, 0, ax, ay, W * 0.4);
    g.addColorStop(0, hsl(42, 80, 70, 0.35)); g.addColorStop(1, hsl(42, 80, 60, 0));
    ctx.fillStyle = g; ctx.fillRect(0, ay - W * 0.4, W, W * 0.8);
    ctx.globalCompositeOperation = 'source-over';
    if (o.motifs.indexOf('water') > -1) { ctx.strokeStyle = hsl(42, 70, 80, 0.25); ctx.lineWidth = 2; for (i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(ax - aw * (0.4 + i * 0.1), ay + 20 + i * 24); ctx.lineTo(ax + aw * (0.4 + i * 0.1), ay + 20 + i * 24); ctx.stroke(); } }
    if (o.motifs.indexOf('growth') > -1) { for (i = 0; i < 6; i++) stalk(ctx, W * (0.1 + r() * 0.8), H, H * (0.08 + r() * 0.12), r, hsl(232, 40, 4)); }
  }

  /* ---------- Minimal & symbolic ---------- */
  function minimal(ctx, W, H, r, o) {
    var dark = o.time === 'night' || o.time === 'dusk';
    var bg = dark ? [233, 44, o.time === 'night' ? 9 : 15] : (o.time === 'dawn' ? [28, 60, 92] : [40, 55, 94]);
    var fg = dark ? [40, 40, 88] : [233, 40, 20];
    var ac = [345, 42, 66];
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, c3(bg, dark ? 4 : 0)); g.addColorStop(1, c3(bg, dark ? -3 : -6));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var hz = H * (0.62 + r() * 0.08), cx = W * (0.35 + r() * 0.3), cy = hz - H * 0.17, cr = W * 0.12, m = o.motifs[0], i;
    ctx.fillStyle = hsl(ac[0], ac[1], ac[2], 0.95);
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, TAU); ctx.fill();
    ctx.strokeStyle = c3(fg, 0, 0.9); ctx.fillStyle = c3(fg, 0, 0.9); ctx.lineWidth = Math.max(2, W * 0.003); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(W * 0.14, hz); ctx.lineTo(W * 0.86, hz); ctx.stroke();
    if (m === 'water') { for (i = 1; i <= 5; i++) { ctx.globalAlpha = 0.7 - i * 0.1; ctx.beginPath(); ctx.moveTo(W * (0.5 - 0.3 / i * 1.2), hz + i * H * 0.03); ctx.lineTo(W * (0.5 + 0.3 / i * 1.2), hz + i * H * 0.03); ctx.stroke(); } ctx.globalAlpha = 1; }
    else if (m === 'mountain') { ctx.beginPath(); ctx.moveTo(W * 0.5, hz - H * 0.2); ctx.lineTo(W * 0.66, hz); ctx.lineTo(W * 0.34, hz); ctx.closePath(); ctx.stroke(); }
    else if (m === 'growth') { ctx.beginPath(); ctx.moveTo(W / 2, hz); ctx.lineTo(W / 2, hz + H * 0.16); ctx.stroke(); leaf(ctx, W / 2, hz + H * 0.08, W * 0.07, -0.6, c3(fg)); leaf(ctx, W / 2, hz + H * 0.12, W * 0.07, Math.PI + 0.6, c3(fg)); }
    else if (m === 'path') { ctx.beginPath(); ctx.moveTo(W * 0.5 - 4, hz + 6); ctx.lineTo(W * 0.5 - W * 0.12, H * 0.95); ctx.moveTo(W * 0.5 + 4, hz + 6); ctx.lineTo(W * 0.5 + W * 0.12, H * 0.95); ctx.stroke(); }
    else if (m === 'light') { for (i = 1; i <= 3; i++) { ctx.globalAlpha = 0.5 / i; ctx.beginPath(); ctx.arc(cx, cy, cr + i * W * 0.05, 0, TAU); ctx.stroke(); } ctx.globalAlpha = 1; }
    else { var hw = W * 0.08; ctx.strokeRect(W * 0.5 - hw / 2, hz + H * 0.04, hw, hw); ctx.fillStyle = hsl(40, 85, 70, 0.95); ctx.fillRect(W * 0.5 - hw * 0.15, hz + H * 0.04 + hw * 0.3, hw * 0.3, hw * 0.35); }
  }

  var MOODS = { soft: soft, bright: bright, dream: dream, minimal: minimal };

  function grain(ctx, W, H, r, amount) {
    var n = Math.round(W * H / 220 * amount);
    for (var i = 0; i < n; i++) {
      ctx.fillStyle = r() > 0.5 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.045)';
      ctx.fillRect(r() * W, r() * H, 1.4, 1.4);
    }
  }

  function draw(canvas, opts) {
    var W = opts.w || 900, H = opts.h || Math.round(W * 1.25);
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas is not available');
    var o = {
      mood: MOODS[opts.mood] ? opts.mood : 'soft',
      time: SKY[opts.time] ? opts.time : 'dusk',
      seed: opts.seed >>> 0,
      motifs: opts.motifs || motifs('', opts.seed >>> 0)
    };
    var r = rng(o.seed + 17);
    ctx.clearRect(0, 0, W, H);
    MOODS[o.mood](ctx, W, H, r, o);
    // warmth: gentle tint toward gold (+) or indigo (−)
    var w = Math.max(-1, Math.min(1, opts.warmth || 0));
    if (w !== 0) {
      ctx.globalCompositeOperation = 'soft-light';
      ctx.fillStyle = w > 0 ? 'rgba(255,184,110,' + (w * 0.4) + ')' : 'rgba(70,100,230,' + (-w * 0.4) + ')';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
    }
    grain(ctx, W, H, r, opts.grain == null ? 1 : opts.grain);
    var v = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.45, W / 2, H / 2, Math.max(W, H) * 0.8);
    v.addColorStop(0, 'rgba(10,12,30,0)'); v.addColorStop(1, 'rgba(10,12,30,0.35)');
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  }

  window.RR_ART = { draw: draw, motifs: motifs, hash: hash, TIMES: ['dawn', 'day', 'dusk', 'night'] };
})();
