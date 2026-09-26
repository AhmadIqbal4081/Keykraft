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

  function init() {
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
