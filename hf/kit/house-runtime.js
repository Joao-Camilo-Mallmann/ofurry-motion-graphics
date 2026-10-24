/*
 * OFurry house runtime para HyperFrames.
 * Tudo aqui e funcao do tempo da timeline (contrato do HyperFrames): sem relogio, sem Math.random solto.
 *
 * - House.entry(tl, el, kind, at, opts): entradas medidas no canal (cut, pop, whip, rise, glitch, blur)
 * - House.lucide(tl, root, start, dur, opts): toca os icones do Lucide Animated (spec gravada no build)
 * - House.drive(tl, start, dur, fn): chama fn(tLocal) a cada quadro (contadores, digitacao, estrelas, poeira)
 * - House.rng(seed): PRNG deterministico (mulberry32)
 */
(function (g) {
  if (g.House) return;
  var H = {};
  var FPS = 30;

  // -------------------------------------------------------------------------
  // PRNG e utilitarios
  // -------------------------------------------------------------------------
  H.rng = function (seed) {
    var a = typeof seed === 'number' ? seed >>> 0 : H.hash(String(seed));
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  H.hash = function (s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h >>> 0;
  };
  var clamp01 = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };

  /** Chama fn(tLocal) em todo quadro entre start e start+dur. */
  H.drive = function (tl, start, dur, fn) {
    var proxy = { t: 0 };
    fn(0);
    tl.fromTo(proxy, { t: 0 }, { t: dur, duration: dur, ease: 'none', onUpdate: function () { fn(proxy.t); } }, start);
  };

  // -------------------------------------------------------------------------
  // Curvas (mesmas do shim do Remotion: src/lucide-animated/motion-shim.tsx)
  // -------------------------------------------------------------------------
  function bezier(x1, y1, x2, y2) {
    function a(p1, p2) { return 1 - 3 * p2 + 3 * p1; }
    function b(p1, p2) { return 3 * p2 - 6 * p1; }
    function c(p1) { return 3 * p1; }
    function calc(t, p1, p2) { return ((a(p1, p2) * t + b(p1, p2)) * t + c(p1)) * t; }
    function slope(t, p1, p2) { return 3 * a(p1, p2) * t * t + 2 * b(p1, p2) * t + c(p1); }
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 8; i++) {
        var s = slope(t, x1, x2);
        if (Math.abs(s) < 1e-6) break;
        t -= (calc(t, x1, x2) - x) / s;
      }
      t = clamp01(t);
      return calc(t, y1, y2);
    };
  }
  var circIn = function (t) { return 1 - Math.sqrt(1 - t * t); };
  var EASE = {
    linear: function (t) { return t; },
    easeIn: bezier(0.42, 0, 1, 1),
    easeOut: bezier(0, 0, 0.58, 1),
    easeInOut: bezier(0.42, 0, 0.58, 1),
    circIn: circIn,
    circOut: function (t) { return 1 - circIn(1 - t); },
    circInOut: function (t) { return t < 0.5 ? circIn(t * 2) / 2 : 1 - circIn((1 - t) * 2) / 2; },
    backIn: bezier(0.31, 0.01, 0.66, -0.59),
    backOut: bezier(0.33, 1.53, 0.69, 0.99),
    backInOut: bezier(0.68, -0.6, 0.32, 1.6),
    anticipate: bezier(0.68, -0.6, 0.32, 1.6),
  };
  function toEase(e) {
    if (Array.isArray(e) && e.length === 4 && typeof e[0] === 'number') return bezier(e[0], e[1], e[2], e[3]);
    if (typeof e === 'string' && EASE[e]) return EASE[e];
    if (e && e.__bezier) return bezier.apply(null, e.__bezier);
    return EASE.easeOut;
  }

  /** Mola fisica fechada (rigidez, amortecimento, massa), de 0 a 1 com velocidade inicial 0. */
  function spring(t, k, c, m) {
    var w0 = Math.sqrt(k / m);
    var z = c / (2 * Math.sqrt(k * m));
    if (z < 1) {
      var wd = w0 * Math.sqrt(1 - z * z);
      return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t));
    }
    if (z === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    var r1 = -w0 * (z - Math.sqrt(z * z - 1));
    var r2 = -w0 * (z + Math.sqrt(z * z - 1));
    var A = r2 / (r1 - r2);
    var B = -1 - A;
    return 1 + A * Math.exp(r1 * t) + B * Math.exp(r2 * t);
  }

  function parseUnit(v) {
    if (typeof v === 'number') return { n: v, u: '' };
    if (typeof v === 'string') {
      var m = v.match(/^(-?[\d.]+)(px|%|deg)?$/);
      if (m) return { n: parseFloat(m[1]), u: m[2] || '' };
    }
    return null;
  }
  function parseColor(c) {
    if (typeof c !== 'string') return null;
    var m = c.match(/^#([0-9a-f]{3,8})$/i);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h.replace(/(.)/g, '$1$1');
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
    }
    m = c.match(/^rgba?\(([^)]+)\)$/);
    if (m) {
      var p = m[1].split(',').map(function (x) { return parseFloat(x); });
      return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    }
    return null;
  }
  function mixColor(a, b, t) {
    var r = a.map(function (x, i) { return x + (b[i] - x) * t; });
    return 'rgba(' + Math.round(r[0]) + ',' + Math.round(r[1]) + ',' + Math.round(r[2]) + ',' + r[3].toFixed(3) + ')';
  }

  var DEFAULTS = { scale: 1, scaleX: 1, scaleY: 1, opacity: 1, pathLength: 1, pathOffset: 0, pathSpacing: 1 };

  /** Valor de uma propriedade no tempo t (s) desde o disparo. Porte de animateValue do shim Remotion. */
  function animateValue(key, from, target, tr, t) {
    var frames = Array.isArray(target) ? target.slice() : [from, target];
    if (frames[0] === null || frames[0] === undefined) frames[0] = from !== undefined ? from : DEFAULTS[key] !== undefined ? DEFAULTS[key] : 0;
    if (frames.length === 1) frames = [frames[0], frames[0]];
    var delay = tr.delay || 0;
    var te = t - delay;
    if (te < 0) return Array.isArray(target) ? frames[0] : from;

    var isSpring = tr.type === 'spring' && frames.length === 2;
    var duration = Math.max(0.001, tr.duration !== undefined ? tr.duration : isSpring ? 0.8 : 0.3);
    var repeat = tr.repeat === 'Infinity' ? Infinity : tr.repeat || 0;
    var cycle = duration + (tr.repeatDelay || 0);
    var local = te;
    var reverse = false;
    var mirror = tr.repeatType === 'reverse' || tr.repeatType === 'mirror';
    if (repeat > 0) {
      var idx = Math.floor(te / cycle);
      if (idx <= repeat) {
        local = Math.min(te - idx * cycle, duration);
        if (mirror && idx % 2 === 1) reverse = true;
      } else {
        local = duration;
        reverse = mirror && repeat % 2 === 1;
      }
    }

    var p = isSpring ? spring(local, tr.stiffness || 100, tr.damping || 10, tr.mass || 1) : Math.min(1, local / duration);
    if (reverse) p = 1 - p;

    var n = frames.length;
    var times = tr.times && tr.times.length === n ? tr.times : frames.map(function (_, i) { return i / (n - 1); });
    var seg = 0;
    while (seg < n - 2 && p > times[seg + 1]) seg++;
    var span = times[seg + 1] - times[seg] || 1;
    var sp = (p - times[seg]) / span;
    if (!isSpring) {
      sp = clamp01(sp);
      var ed = Array.isArray(tr.ease) && typeof tr.ease[0] !== 'number' ? tr.ease[seg] || tr.ease[0] : tr.ease || 'easeInOut';
      sp = toEase(ed)(sp);
    }
    var a = frames[seg];
    var b = frames[seg + 1];
    var ca = parseColor(a);
    var cb = parseColor(b);
    if (ca && cb) return mixColor(ca, cb, clamp01(sp));
    var pa = parseUnit(a);
    var pb = parseUnit(b);
    if (pa && pb) {
      var val = pa.n + (pb.n - pa.n) * sp;
      return pb.u ? val + pb.u : val;
    }
    return sp < 0.5 ? a : b;
  }
  H.animateValue = animateValue;

  var TRANSFORM_KEYS = ['x', 'y', 'translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY'];
  var SKIP = { opacity: 1, pathLength: 1, pathOffset: 1, pathSpacing: 1, originX: 1, originY: 1, transition: 1, transitionEnd: 1 };
  function num(v, f) { var p = parseUnit(v); return p ? p.n : f; }

  function applyValues(el, tag, values, styleOrigin) {
    var tf = [];
    for (var i = 0; i < TRANSFORM_KEYS.length; i++) {
      var k = TRANSFORM_KEYS[i];
      if (!(k in values)) continue;
      var v = values[k];
      if (k === 'x' || k === 'translateX') tf.push('translateX(' + (typeof v === 'number' ? v + 'px' : v) + ')');
      else if (k === 'y' || k === 'translateY') tf.push('translateY(' + (typeof v === 'number' ? v + 'px' : v) + ')');
      else if (k.indexOf('scale') === 0) tf.push(k + '(' + num(v, 1) + ')');
      else tf.push(k + '(' + (typeof v === 'number' ? v + 'deg' : v) + ')');
    }
    if (tf.length) {
      el.style.transform = tf.join(' ');
      if (tag !== 'svg' && tag !== 'div') el.style.transformBox = 'fill-box';
      var ox = values.originX !== undefined ? values.originX : styleOrigin && styleOrigin.originX;
      var oy = values.originY !== undefined ? values.originY : styleOrigin && styleOrigin.originY;
      if (ox !== undefined || oy !== undefined) {
        var f = function (o) { return typeof o === 'number' ? o * 100 + '%' : o || '50%'; };
        el.style.transformOrigin = f(ox) + ' ' + f(oy);
      } else if (!el.style.transformOrigin) el.style.transformOrigin = '50% 50%';
    }
    if ('opacity' in values) el.style.opacity = num(values.opacity, 1);
    if ('pathLength' in values || 'pathOffset' in values) {
      var pl = clamp01(num(values.pathLength, 1));
      el.setAttribute('pathLength', '1');
      el.setAttribute('stroke-dasharray', pl + ' ' + num(values.pathSpacing, 1));
      el.setAttribute('stroke-dashoffset', String(-num(values.pathOffset, 0)));
    }
    for (var key in values) {
      if (TRANSFORM_KEYS.indexOf(key) >= 0 || SKIP[key]) continue;
      var val = values[key];
      if (val === undefined || val === null || typeof val === 'object') continue;
      el.setAttribute(key.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); }), String(val));
    }
  }

  /**
   * Icones do Lucide Animated. Cada elemento animado traz data-lm = {tag, base, target, transition, style}
   * gravado no build (scripts/hf/lucide-svg.ts). Toca a variante "animate" a partir de start.
   */
  H.lucide = function (tl, root, start, dur, opts) {
    opts = opts || {};
    var els = Array.prototype.slice.call(root.querySelectorAll('[data-lm]')).map(function (el) {
      return { el: el, spec: JSON.parse(el.getAttribute('data-lm')) };
    });
    if (!els.length) return;
    var delay = opts.delay || 0;
    var loop = opts.loopEvery || 0;
    var speed = opts.speed || 1;
    H.drive(tl, start, dur, function (t) {
      var local = t - delay;
      if (loop && local >= 0) local = local % loop;
      var active = local >= 0;
      var ts = Math.max(0, local) * speed;
      for (var i = 0; i < els.length; i++) {
        var s = els[i].spec;
        var values = {};
        var k;
        for (k in s.base || {}) values[k] = s.base[k];
        if (active && s.target) {
          var vt = s.target.transition || null;
          for (k in s.target) {
            if (k === 'transition' || k === 'transitionEnd') continue;
            var tr = {};
            var src = [s.transition || {}, vt || {}, (vt || s.transition || {})[k] || {}];
            for (var j = 0; j < src.length; j++) for (var q in src[j]) if (typeof src[j][q] !== 'object' || q === 'times' || q === 'ease') tr[q] = src[j][q];
            var from = s.base && s.base[k] !== undefined ? s.base[k] : DEFAULTS[k];
            values[k] = animateValue(k, from, s.target[k], tr, ts);
          }
        }
        applyValues(els[i].el, s.tag, values, s.style);
      }
    });
  };

  // -------------------------------------------------------------------------
  // Entradas da casa (quadros medidos a 30 fps)
  // -------------------------------------------------------------------------
  var F = 1 / FPS;
  /**
   * kind: cut | pop | whip | rise | glitch | blur
   * opts.dir: 1 | -1 (whip/rise), opts.distance (px)
   * O elemento precisa ser filho de um .clip (nunca o proprio .clip) e sem transform no CSS.
   */
  H.entry = function (tl, el, kind, at, opts) {
    opts = opts || {};
    var dir = opts.dir || 1;
    switch (kind) {
      case 'cut':
        tl.fromTo(el, { opacity: 1 }, { opacity: 1, duration: F }, at);
        break;
      case 'pop':
        tl.fromTo(el, { scale: 0.45, opacity: 0.6 }, { scale: 1.05, opacity: 1, duration: 2.4 * F, ease: 'power2.out' }, at);
        tl.fromTo(el, { scale: 1.05 }, { scale: 1, duration: 1.6 * F, ease: 'power1.out', immediateRender: false }, at + 2.4 * F);
        break;
      case 'whip':
        tl.fromTo(
          el,
          { x: dir * (opts.distance || 260), opacity: 0.4, filter: 'blur(14px)' },
          { x: 0, opacity: 1, filter: 'blur(0px)', duration: 4 * F, ease: 'expo.out' },
          at
        );
        break;
      case 'rise':
        tl.fromTo(
          el,
          { y: dir * (opts.distance || 90), opacity: 0.3, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: (opts.frames || 4) * F, ease: 'expo.out' },
          at
        );
        break;
      case 'blur':
        tl.fromTo(
          el,
          { opacity: 0, scale: 1.06, filter: 'blur(18px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: (opts.frames || 6) * F, ease: 'power3.out' },
          at
        );
        break;
      case 'glitch': {
        // 2 quadros de fatias deslocadas na cor de destaque + 1 de desfoque
        var slices = el.parentNode ? el.parentNode.querySelectorAll('.house-slice') : [];
        var offs = [[34, -22, 48, -12], [-20, 13, -29, 7]];
        for (var i = 0; i < slices.length; i++) {
          tl.fromTo(slices[i], { opacity: 1, x: offs[0][i % 4] }, { opacity: 1, x: offs[0][i % 4], duration: F }, at);
          tl.fromTo(slices[i], { x: offs[1][i % 4] }, { x: offs[1][i % 4], duration: F, immediateRender: false }, at + F);
          tl.fromTo(slices[i], { opacity: 1 }, { opacity: 0, duration: 0.001, immediateRender: false }, at + 2 * F);
        }
        tl.fromTo(el, { opacity: 0 }, { opacity: 0, duration: 2 * F }, at);
        tl.fromTo(el, { opacity: 1, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0px)', duration: 2 * F, immediateRender: false }, at + 2 * F);
        break;
      }
    }
  };

  /** Saida rapida (encolhe e some), 40-50% mais curta que a entrada. */
  H.exit = function (tl, el, at, frames) {
    tl.fromTo(el, { opacity: 1 }, { opacity: 0, duration: (frames || 4) * F, ease: 'power3.in', immediateRender: false }, at);
  };

  /** Ajusta o tamanho da fonte para caber na largura (mede uma vez, no init). */
  H.fit = function (el, base, maxWidth, family, weight) {
    var hf = g.__hyperframes;
    if (hf && hf.fitTextFontSize) {
      var r = hf.fitTextFontSize(el.textContent, { fontFamily: family, fontWeight: weight, maxWidth: maxWidth, baseFontSize: base, minFontSize: 42 });
      if (r && r.fontSize) el.style.fontSize = Math.min(base, r.fontSize) + 'px';
    }
  };

  g.House = H;
})(window);
