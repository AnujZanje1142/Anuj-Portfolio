(function () {
  "use strict";

  var root = document.documentElement;
  var themeToggles = document.querySelectorAll("#themeToggle, #themeToggleMobile");
  var themeLabel = document.getElementById("themeLabel");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeLabel) themeLabel.textContent = theme === "light" ? "Dark mode" : "Light mode";
    themeToggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    });
    try { localStorage.setItem("anuj-theme", theme); } catch (error) {}
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem("anuj-theme"); } catch (error) {}
  setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark");
  themeToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var greeting = document.getElementById("greeting-message");
  if (greeting) {
    var hour = new Date().getHours();
    greeting.textContent = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  }

  /* -----------------------------------------------------------------------
     AI Tool — client-side portfolio chatbot
     Runs entirely in the browser (no backend/API key), matching the
     visitor's question against a small knowledge base built from Anuj's
     actual projects, skills, and resume content.
  --------------------------------------------------------------------- */
 
  /* -----------------------------------------------------------------------
     Projects — the draggable GSAP slider now lives in project-slider.js,
     loaded after this file. It progressively enhances the plain
     horizontally-scrollable #projViewport markup below.
  --------------------------------------------------------------------- */

  var sidebar = document.getElementById("sidebar");
  var navToggle = document.getElementById("mobileNavToggle");
  var backdrop = document.getElementById("drawerBackdrop");
  function closeDrawer() {
    if (!sidebar || !backdrop || !navToggle) return;
    sidebar.classList.remove("open"); backdrop.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle) navToggle.addEventListener("click", function () {
    var open = sidebar.classList.toggle("open"); backdrop.classList.toggle("open"); navToggle.setAttribute("aria-expanded", String(open));
  });
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  document.querySelectorAll(".nav-link").forEach(function (link) { link.addEventListener("click", closeDrawer); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeDrawer(); });

  var sections = Array.prototype.slice.call(document.querySelectorAll(".section, .hero"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute("data-target") === id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true"); else link.removeAttribute("aria-current");
    });
  }
  if (window.IntersectionObserver) {
    var spy = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) setActiveLink(entry.target.id); }); }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(function (section) { spy.observe(section); });
  }

  var tracks = Array.prototype.slice.call(document.querySelectorAll(".skill-bar-track"));
  if (window.IntersectionObserver) {
    var observer = new IntersectionObserver(function (entries, currentObserver) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("in-view"); currentObserver.unobserve(entry.target); } }); }, { threshold: .4 });
    tracks.forEach(function (track) { observer.observe(track); });
  } else tracks.forEach(function (track) { track.classList.add("in-view"); });

  var topbar = document.getElementById("topbar");
  var fill = document.getElementById("scrollFill");
  var track = document.getElementById("scrollTrack");
  var progress = document.getElementById("progressLabel");
  function updateScroll() {
    var doc = document.documentElement; var max = doc.scrollHeight - doc.clientHeight || 1; var percent = Math.round(Math.min(100, Math.max(0, window.scrollY / max * 100)));
    if (fill) fill.style.width = percent + "%"; if (track) track.setAttribute("aria-valuenow", percent); if (progress) progress.textContent = percent + "%"; if (topbar) topbar.classList.toggle("scrolled", window.scrollY > 8);
  }
  updateScroll(); window.addEventListener("scroll", updateScroll, { passive: true }); window.addEventListener("resize", updateScroll);

  function movePage(direction) { window.scrollBy({ top: direction * window.innerHeight * .8, behavior: "smooth" }); }
  var up = document.getElementById("playerUp"); var down = document.getElementById("playerDown"); var home = document.getElementById("playerHome"); var back = document.getElementById("navBack"); var forward = document.getElementById("navForward");
  if (up) up.addEventListener("click", function () { movePage(-1); }); if (down) down.addEventListener("click", function () { movePage(1); }); if (back) back.addEventListener("click", function () { movePage(-1); }); if (forward) forward.addEventListener("click", function () { movePage(1); }); if (home) home.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  if (track) track.addEventListener("click", function (event) { var box = track.getBoundingClientRect(); var ratio = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)); window.scrollTo({ top: ratio * (document.documentElement.scrollHeight - document.documentElement.clientHeight), behavior: "smooth" }); });
  var like = document.getElementById("likeBtn"); if (like) like.addEventListener("click", function () { var liked = like.classList.toggle("liked"); like.setAttribute("aria-pressed", String(liked)); });
})();
