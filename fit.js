// Scale each ASCII drawing so it fills the width without overflowing (max 12px).
(function () {
  function fit() {
    document.querySelectorAll('pre.art').forEach(function (p) {
      p.style.fontSize = '12px';
      var w = p.clientWidth, s = p.scrollWidth;
      if (s > w) p.style.fontSize = Math.max(5, Math.floor(12 * w / s * 10) / 10) + 'px';
    });
  }
  fit();
  window.addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(fit);
})();
