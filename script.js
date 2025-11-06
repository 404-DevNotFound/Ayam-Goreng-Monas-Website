document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".menu-container");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".menu-card"));
  if (cards.length <= 1) return;

  const parent = container.parentElement;
  if (parent && getComputedStyle(parent).position === "static") {
    parent.style.position = "relative";
  }

  function createBtn(className, label) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.innerText = label;
    Object.assign(btn.style, {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: "12",
      background: "rgba(0,0,0,0.45)",
      color: "#fff",
      border: "none",
      padding: "8px 10px",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "16px",
    });
    return btn;
  }

  const prevBtn = createBtn("menu-prev", "\u2039");
  const nextBtn = createBtn("menu-next", "\u203A");
  prevBtn.style.left = "8px";
  nextBtn.style.right = "8px";
  parent.appendChild(prevBtn);
  parent.appendChild(nextBtn);

  container.style.overflowX = "auto";
  container.style.scrollBehavior = "smooth";
  container.style.whiteSpace = "nowrap";
  container.style.paddingBottom = "8px";

  cards.forEach(function (card) {
    card.style.display = "inline-block";
    card.style.verticalAlign = "top";
    card.style.marginRight = card.style.marginRight || "12px";
  });

  function getCardWidth() {
    const c = cards[0];
    const rect = c.getBoundingClientRect();
    const style = getComputedStyle(c);
    const mr = parseFloat(style.marginRight) || 0;
    return rect.width + mr;
  }

  function scrollNext() {
    const step = getCardWidth();
    if (
      Math.ceil(container.scrollLeft + container.clientWidth) >=
      container.scrollWidth - 1
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  }
  function scrollPrev() {
    const step = getCardWidth();
    if (container.scrollLeft <= 0) {
      container.scrollTo({
        left: container.scrollWidth - container.clientWidth,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({ left: -step, behavior: "smooth" });
    }
  }

  prevBtn.addEventListener("click", function () {
    scrollPrev();
    resetAutoPlay();
  });
  nextBtn.addEventListener("click", function () {
    scrollNext();
    resetAutoPlay();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      scrollNext();
      resetAutoPlay();
    }
    if (e.key === "ArrowLeft") {
      scrollPrev();
      resetAutoPlay();
    }
  });

  var autoPlayInterval = 3000;
  var autoPlayTimer = null;
  var isPaused = false;

  function startAutoPlay() {
    if (autoPlayTimer) return;
    autoPlayTimer = setInterval(function () {
      if (!isPaused) scrollNext();
    }, autoPlayInterval);
  }
  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  [container, prevBtn, nextBtn].forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      isPaused = true;
      stopAutoPlay();
    });
    el.addEventListener("mouseleave", function () {
      isPaused = false;
      startAutoPlay();
    });
    el.addEventListener("focusin", function () {
      isPaused = true;
      stopAutoPlay();
    });
    el.addEventListener("focusout", function () {
      isPaused = false;
      startAutoPlay();
    });
  });

  startAutoPlay();
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".menu-container");
  if (!container) return;
  const cards = Array.from(container.querySelectorAll(".menu-card"));
  if (cards.length <= 1) return;

  const parent = container.parentElement;
  let dotsWrap = parent.querySelector(".menu-dots");
  if (!dotsWrap) {
    dotsWrap = document.createElement("div");
    dotsWrap.className = "menu-dots";
    Object.assign(dotsWrap.style, {
      textAlign: "center",
      marginTop: "10px",
      position: "relative",
      zIndex: "10",
    });
    parent.appendChild(dotsWrap);
  }

  function updateActive() {
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDiff = Infinity;
    cards.forEach(function (c, i) {
      const rect = c.getBoundingClientRect();
      const cLeft = c.offsetLeft;
      const cCenter = cLeft + rect.width / 2;
      const diff = Math.abs(cCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });

    cards.forEach(function (c, i) {
      if (i === closest) c.classList.add("active-slide");
      else c.classList.remove("active-slide");
    });
    dots.forEach(function (d, i) {
      d.style.background =
        i === closest ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.25)";
    });
  }

  container.addEventListener("scroll", function () {
    updateActive();
  });
  window.addEventListener("resize", function () {
    updateActive();
  });
  updateActive();

  cards.forEach(function (c, i) {
    c.style.cursor = "pointer";
    c.addEventListener("click", function () {
      container.scrollTo({ left: c.offsetLeft, behavior: "smooth" });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const centerSamarinda = [-0.5021, 117.1536];
  const locations = [
    {
      name: "Cabang 1",
      fullName: "Robinson Mart Samarinda Square",
      coords: [-0.4948, 117.1436],
      address: "Robinson Mart Samarinda Square, Samarinda",
      googleMaps:
        "https://www.google.com/maps/search/?api=1&query=-0.4948,117.1436",
    },
    {
      name: "Cabang 2",
      fullName: "Samarinda Central Plaza",
      coords: [-0.503573, 117.155078],
      address: "Samarinda Central Plaza, Samarinda",
      googleMaps:
        "https://www.google.com/maps/search/?api=1&query=-0.503573, 117.155078",
    },
  ];

  const map = L.map("location-map").setView(centerSamarinda, 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  locations.forEach((location) => {
    const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);

    const popupContent = `
      <div style="min-width: 200px; font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #d32f2f;">
          ${location.name}
        </h3>
        <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #333;">
          ${location.fullName}
        </p>
        <p style="margin: 0 0 12px 0; font-size: 13px; color: #666;">
          ${location.address}
        </p>
        <a href="${location.googleMaps}" target="_blank" 
           style="display: inline-block; width: 100%; padding: 10px; 
                  background: #d32f2f; color: white; text-decoration: none; 
                  border-radius: 6px; font-size: 14px; text-align: center;
                  font-weight: bold; box-sizing: border-box;">
          📍 Buka di Google Maps
        </a>
      </div>
    `;

    marker.bindPopup(popupContent);

    marker.on("click", function () {
    });
  });

  const group = new L.featureGroup(
    locations.map((loc) => L.marker(loc.coords))
  );
  map.fitBounds(group.getBounds().pad(0.1));
});
