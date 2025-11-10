// Carousel
class Carousel {
  constructor() {
    this.track = document.querySelector(".carousel-track");
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".dot");

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 4000; // 4 detik

    this.init();
  }

  init() {
    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        this.goToSlide(index);
      });
    });

    const carousel = document.querySelector(".image-carousel");
    carousel.addEventListener("mouseenter", () => this.stopAutoPlay());
    carousel.addEventListener("mouseleave", () => this.startAutoPlay());

    this.startAutoPlay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  goToNext() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.goToNext();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});

// Detail-Btn

const googleMapsLinks = {
  "AGM Mall SCP": "https://maps.app.goo.gl/DZd2yCgrp4CzVrni9",
  "AGM Mall Lembuswana": "https://maps.app.goo.gl/e6Z7DnGi2DDGtJtZA",
  "AGM Mall Samarinda Square": "https://maps.app.goo.gl/cc82P97bxeyLUBux8",
};

const detailButtons = document.querySelectorAll(".detail-btn");

detailButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    const card = this.closest(".card");
    const outletName = card.querySelector("h3").textContent;

    const mapsLink = googleMapsLinks[outletName];

    if (mapsLink && mapsLink !== "") {
      window.open(mapsLink, "_blank");
    } else {
      alert("Link Google Maps untuk " + outletName + " belum tersedia");
    }
  });
});
