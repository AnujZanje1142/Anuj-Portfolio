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
  var knowledgeBase = [
    {
      keys: ["hello", "hi", "hey", "yo"],
      reply: "Hey! I can tell you about Anuj's projects, ML/data skills, research direction, or how to reach him. What do you want to know?"
    },
    {
      keys: ["admission", "chatbot", "university"],
      reply: "His flagship build is the AI University Admission Chatbot — a multilingual, voice + text NLP chatbot with eligibility checks, scholarship info, admission-probability prediction, career guidance, and an admin analytics panel. Repo: AI-Chatbot-for-University-Admission-and-Personalised-"
    },
    {
      keys: ["book ninja", "book"],
      reply: "Book Ninja is a project for auto-generating books for platforms like Amazon KDP, Etsy, and Shopify. Repo: Book-Ninja"
    },
    {
      keys: ["url shortener", "shortener"],
      reply: "The URL Shortener is a Python service from a CodeClause internship — it generates short codes and reliably redirects back to the original links."
    },
    {
      keys: ["library"],
      reply: "The Library Management System is a Flask + SQL app for tracking a library's catalog, checkouts, and returns."
    },
    {
      keys: ["quiz"],
      reply: "The Python Quiz System is a quiz application built in Python — one of his smaller supporting projects."
    },
    {
      keys: ["project", "portfolio", "built", "work"],
      reply: "Top projects: AI University Admission Chatbot (NLP + ML), Book Ninja (AI book generator), URL Shortener, Library Management System, and a Python Quiz System. Ask me about any of them by name."
    },
    {
      keys: ["skill", "tech stack", "stack", "tools", "know", "ml", "machine learning"],
      reply: "Programming & analysis: Python, SQL, statistics, data wrangling/cleaning/visualization. ML libraries: Pandas, NumPy, Scikit-learn, NLTK, Flask, OpenCV, YOLOv8. BI & tools: Power BI, Excel (pivot tables, XLOOKUP, DAX), Google Analytics, MS Word/PowerPoint."
    },
    {
      keys: ["research", "paper", "publication"],
      reply: "His current research direction looks at prompt-guided literature synthesis for applied ML — using structured prompts to organize literature reviews and surface disagreements between sources. Ongoing, not yet published."
    },
    {
      keys: ["contact", "email", "reach", "hire", "linkedin", "whatsapp"],
      reply: "Best ways to reach Anuj: WhatsApp, email (anujzanje@gmail.com), or LinkedIn — all linked in the sidebar and Contact section."
    },
    {
      keys: ["resume", "cv"],
      reply: "Yes — his resume PDF is linked in the sidebar under 'Get in touch' and again in the Contact section."
    },
    {
      keys: ["who", "about", "student"],
      reply: "Anuj Zanje is a Computer Application student in Ahmedabad, India, focused on AI/ML and data analysis, who builds practical NLP, ML, and full-stack projects."
    }
  ];

  function findReply(rawText) {
    var text = rawText.toLowerCase();
    for (var i = 0; i < knowledgeBase.length; i++) {
      var entry = knowledgeBase[i];
      for (var j = 0; j < entry.keys.length; j++) {
        if (text.indexOf(entry.keys[j]) !== -1) return entry.reply;
      }
    }
    return "I don't have a canned answer for that yet — try asking about his projects, skills, research, or how to contact him.";
  }

  var chatWidget = document.getElementById("aiChatWidget");
  var chatFab = document.getElementById("aiChatFab");
  var chatPanel = document.getElementById("aiChatPanel");
  var chatClose = document.getElementById("aiChatClose");
  var chatForm = document.getElementById("aiChatForm");
  var chatInput = document.getElementById("aiChatInput");
  var chatWindow = document.getElementById("aiChatMessages");
  var chatSuggestions = document.getElementById("aiChatSuggestions");

  function appendChatMessage(text, isUser) {
    if (!chatWindow) return null;
    var bubble = document.createElement("p");
    bubble.className = "ai-chat-msg " + (isUser ? "user" : "bot");
    bubble.textContent = text;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return bubble;
  }

  function sendQuestion(question) {
    question = question.trim();
    if (!question) return;

    appendChatMessage(question, true);
    if (chatInput) chatInput.value = "";

    var typing = document.createElement("div");
    typing.className = "ai-chat-msg typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    var reply = findReply(question);
    window.setTimeout(function () {
      typing.remove();
      appendChatMessage(reply, false);
    }, 500);
  }

  var chatGreeted = false;
  function openChat() {
    if (!chatWidget || !chatPanel || !chatFab) return;
    chatPanel.hidden = false;
    chatWidget.setAttribute("data-open", "true");
    chatFab.setAttribute("aria-expanded", "true");
    if (!chatGreeted) {
      chatGreeted = true;
      appendChatMessage("Hey! I can tell you about Anuj's projects, ML/data skills, research direction, or how to reach him. What do you want to know?", false);
    }
    if (chatInput) chatInput.focus();
  }

  function closeChat() {
    if (!chatWidget || !chatPanel || !chatFab) return;
    chatPanel.hidden = true;
    chatWidget.setAttribute("data-open", "false");
    chatFab.setAttribute("aria-expanded", "false");
    chatFab.focus();
  }

  if (chatFab) {
    chatFab.addEventListener("click", function () {
      var isOpen = chatWidget.getAttribute("data-open") === "true";
      if (isOpen) closeChat(); else openChat();
    });
  }

  if (chatClose) chatClose.addEventListener("click", closeChat);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && chatWidget && chatWidget.getAttribute("data-open") === "true") closeChat();
  });

  document.addEventListener("click", function (event) {
    if (!chatWidget) return;
    if (chatWidget.getAttribute("data-open") !== "true") return;
    if (!chatWidget.contains(event.target)) closeChat();
  });

  if (chatSuggestions) {
    chatSuggestions.querySelectorAll(".ai-chat-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        sendQuestion(chip.getAttribute("data-q") || chip.textContent);
      });
    });
  }

  if (chatForm && chatInput && chatWindow) {
    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();
      sendQuestion(chatInput.value);
    });
  }

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
