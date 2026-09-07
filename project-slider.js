/**
 * Project Slider - Smooth draggable horizontal carousel with GSAP enhancement
 */
(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    var viewport = document.getElementById("projViewport");
    var track = document.getElementById("projTrack");
    var prevBtn = document.getElementById("projPrev");
    var nextBtn = document.getElementById("projNext");
    var progressFill = document.getElementById("projProgressFill");
    var progressBar = document.getElementById("projProgress");

    if (!viewport || !track) return;

    var isDown = false;
    var startX;
    var scrollLeft;

    // Mouse drag scrolling
    viewport.addEventListener("mousedown", function(e) {
      isDown = true;
      viewport.classList.add("is-dragging");
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
    });

    viewport.addEventListener("mouseleave", function() {
      isDown = false;
      viewport.classList.remove("is-dragging");
    });

    viewport.addEventListener("mouseup", function() {
      isDown = false;
      viewport.classList.remove("is-dragging");
    });

    viewport.addEventListener("mousemove", function(e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - viewport.offsetLeft;
      var walk = (x - startX) * 1.5;
      viewport.scrollLeft = scrollLeft - walk;
      updateProgress();
    });

    function updateProgress() {
      var maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if (maxScroll <= 0) {
        if (progressFill) progressFill.style.width = "100%";
        return;
      }
      var percent = (viewport.scrollLeft / maxScroll) * 100;
      percent = Math.max(0, Math.min(100, percent));
      if (progressFill) progressFill.style.width = Math.max(12, percent) + "%";
      if (progressBar) progressBar.setAttribute("aria-valuenow", Math.round(percent));
      
      if (prevBtn) prevBtn.disabled = viewport.scrollLeft <= 5;
      if (nextBtn) nextBtn.disabled = viewport.scrollLeft >= maxScroll - 5;
    }

    viewport.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    var cardWidth = 360;

    if (prevBtn) {
      prevBtn.addEventListener("click", function() {
        viewport.scrollBy({ left: -cardWidth, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function() {
        viewport.scrollBy({ left: cardWidth, behavior: "smooth" });
      });
    }

    if (progressBar) {
      progressBar.addEventListener("click", function(e) {
        var rect = progressBar.getBoundingClientRect();
        var ratio = (e.clientX - rect.left) / rect.width;
        var maxScroll = viewport.scrollWidth - viewport.clientWidth;
        viewport.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
      });
    }

    updateProgress();
  });
})();