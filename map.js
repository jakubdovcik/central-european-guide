// Numbered OpenStreetMap maps. Each .map-box holds its points as
// [name, lat, lon]; the <ol class="legend"> right after it gets the names.
(function () {
  if (!window.L) return;
  document.querySelectorAll('.map-box').forEach(function (box) {
    var pts = JSON.parse(box.getAttribute('data-points'));
    var city = box.getAttribute('data-city') || '';
    var map = L.map(box, { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var legend = box.nextElementSibling;
    var bounds = [];
    pts.forEach(function (p, i) {
      var n = i + 1;
      var gmaps = 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(p[0] + (city ? ' ' + city : ''));
      var icon = L.divIcon({ className: 'pin', html: String(n), iconSize: [22, 22], iconAnchor: [11, 11] });
      L.marker([p[1], p[2]], { icon: icon, title: p[0] }).addTo(map)
        .bindPopup('<b>' + n + '. ' + p[0] + '</b><br><a href="' + gmaps + '" target="_blank" rel="noopener">open in Google Maps</a>');
      bounds.push([p[1], p[2]]);
      if (legend && legend.classList.contains('legend')) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = gmaps; a.target = '_blank'; a.rel = 'noopener'; a.textContent = p[0];
        li.appendChild(a);
        legend.appendChild(li);
      }
    });
    map.fitBounds(bounds, { padding: [24, 24] });

    // On phones one finger scrolls the page; tap the map to unlock dragging.
    if (L.Browser.mobile) {
      box.classList.add('locked');
      map.on('click', function () { map.dragging.enable(); box.classList.remove('locked'); });
    }
  });
})();
