/* Agentic AI page: hero mascot + workflow animation (Spline removed). */
(function () {
  'use strict';

  /* Hero mascot: same bot as the chat support, eyes follow the mouse, blinks, scans when idle. */
  function mascot() {
    var root = document.querySelector('[data-mascot]');
    if (!root) return;
    var svg = root.querySelector('svg'),
        eyes = root.querySelector('.bot__eyes'),
        blink = root.querySelector('.bot__blink');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var REST = { x: 0.5, y: -0.42 }, R = 20;
    var cur = { x: REST.x, y: REST.y }, mouse = null, running = false, visible = true;
    var blinkStart = -1, blinkAt = performance.now() + 2500;
    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    function aim() {
      if (!mouse) return REST;
      var r = svg.getBoundingClientRect();
      if (!r.width) return REST;
      var dx = mouse.x - (r.left + r.width / 2), dy = mouse.y - (r.top + r.height / 2);
      var d = Math.hypot(dx, dy) || 1, k = clamp(d / 120, 0, 1);
      return { x: dx / d * k, y: dy / d * k };
    }

    function loop(now) {
      if (!visible) { running = false; return; }
      var t = aim(), f = reduce ? 1 : 0.085;
      cur.x += (t.x - cur.x) * f;
      cur.y += (t.y - cur.y) * f;
      var b = 1;
      if (!reduce) {
        if (blinkStart < 0 && now >= blinkAt) blinkStart = now;
        if (blinkStart >= 0) {
          var p = (now - blinkStart) / 170;
          if (p >= 1) { blinkStart = -1; blinkAt = now + 2200 + Math.random() * 3500; }
          else b = 1 - Math.sin(p * Math.PI) * 0.9;
        }
      }
      /* axis-aligned squash only (no rotate/skew) so the eyes always stay upright */
      eyes.setAttribute('transform', 'translate(' + (50 + cur.x * R) + ' ' + (50 + cur.y * R) + ') scale(' + (1.2 * (1 - 0.25 * Math.abs(cur.x))) + ' ' + (1.2 * (1 - 0.12 * Math.abs(cur.y))) + ')');
      blink.setAttribute('transform', 'scale(1 ' + b + ')');
      var m = svg.getBoundingClientRect().width / 48 * 1.5; /* body leans toward the cursor like the chat bot */
      svg.style.transform = 'translate(' + (cur.x * m).toFixed(2) + 'px,' + (cur.y * m).toFixed(2) + 'px)';
      requestAnimationFrame(loop);
    }
    function start() { if (!running) { running = true; requestAnimationFrame(loop); } }

    window.addEventListener('pointermove', function (e) { mouse = { x: e.clientX, y: e.clientY }; }, { passive: true });
    document.addEventListener('mouseleave', function () { mouse = null; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(root);
    }
    start();
  }

  function workflowAnimation() {
    var graph = document.querySelector('[data-workflow-model]');
    if (!graph) return;

    var nodes = {};
    Array.prototype.forEach.call(graph.querySelectorAll('[data-flow-node]'), function (node) {
      var name = node.getAttribute('data-flow-node');
      if (!nodes[name]) nodes[name] = [];
      nodes[name].push(node);
    });

    var links = {};
    Array.prototype.forEach.call(graph.querySelectorAll('[data-flow-link]'), function (link) {
      var name = link.getAttribute('data-flow-link');
      if (!links[name]) links[name] = [];
      links[name].push(link);
    });

    var stages = [
      { active: ['trigger'], complete: [], live: ['trigger-agent'] },
      { active: ['agent'], complete: ['trigger'], live: ['agent-decision', 'agent-model', 'agent-memory', 'agent-tools', 'agent-knowledge'] },
      { active: ['decision'], complete: ['trigger', 'agent', 'model', 'memory', 'tools', 'knowledge'], live: ['agent-decision'] },
      { active: ['success'], complete: ['trigger', 'agent', 'decision', 'model', 'memory', 'tools', 'knowledge'], live: ['decision-success'] },
      { active: ['fallback'], complete: ['trigger', 'agent', 'decision', 'success', 'model', 'memory', 'tools', 'knowledge'], live: ['decision-fallback'] }
    ];
    var stage = 0;

    function paint() {
      Object.keys(nodes).forEach(function (name) {
        nodes[name].forEach(function (node) { node.classList.remove('is-active', 'is-complete'); });
      });
      Object.keys(links).forEach(function (name) {
        links[name].forEach(function (link) { link.classList.remove('is-live'); });
      });

      var current = stages[stage];
      current.complete.forEach(function (name) { if (nodes[name]) nodes[name].forEach(function (node) { node.classList.add('is-complete'); }); });
      current.active.forEach(function (name) { if (nodes[name]) nodes[name].forEach(function (node) { node.classList.add('is-active'); }); });
      current.live.forEach(function (name) {
        if (links[name]) links[name].forEach(function (link) { link.classList.add('is-live'); });
      });
      stage = (stage + 1) % stages.length;
    }

    paint();
    window.setInterval(paint, 1550);
  }

  function init() {
    workflowAnimation();
    mascot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
