/* Keep the supplied Spline robot while removing scene-only presentation layers. */
(function () {
  'use strict';

  function cleanModel(viewer) {
    var app = viewer && viewer._spline;
    if (!app) return false;

    var cleaned = false;
    ['Button', 'Plane'].forEach(function (name) {
      try {
        var object = app.findObjectByName(name);
        if (object) {
          object.visible = false;
          cleaned = true;
        }
      } catch (_) {}
    });

    try { app.setBackgroundColor('rgba(0,0,0,0)'); } catch (_) {}
    try { app._scene.background = null; } catch (_) {}
    try { app.requestRender(); } catch (_) {}
    return cleaned;
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
    var viewer = document.querySelector('.aix-spline');
    if (!viewer) return;

    viewer.addEventListener('load', function () {
      window.setTimeout(function () { cleanModel(viewer); }, 50);
    });

    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (cleanModel(viewer) || attempts >= 80) window.clearInterval(timer);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
