// Scale each ASCII drawing so it fills the width without overflowing (max 12px).
(function () {
  function fit() {
    document.querySelectorAll('pre.art').forEach(function (p) {
      p.style.fontSize = '12px';
      var w = p.clientWidth, s = p.scrollWidth;
      if (s > w) p.style.fontSize = Math.max(5, Math.floor(12 * w / s * 10) / 10) + 'px';
    });
  }
  // Re-jump to #section after drawings change size, so links like #eat land right.
  function rejump() {
    if (!location.hash) return;
    var t = document.getElementById(location.hash.slice(1));
    if (t) t.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  fit(); rejump();
  window.addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(function () { fit(); rejump(); });
  window.addEventListener('load', rejump);
})();
