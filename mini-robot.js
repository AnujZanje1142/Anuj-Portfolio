/**
 * Ask AI about me — a small canned-answer chat widget.
 * No external API calls. Everything below is keyword-matched
 * against a fixed knowledge base pulled from the portfolio content.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var widget = document.getElementById("aiChatWidget");
    var fab = document.getElementById("aiChatFab");
    var panel = document.getElementById("aiChatPanel");
    var closeBtn = document.getElementById("aiChatClose");
    var messages = document.getElementById("aiChatMessages");
    var form = document.getElementById("aiChatForm");
    var input = document.getElementById("aiChatInput");
    var chips = document.querySelectorAll(".ai-chat-chip");

    if (!widget || !fab || !panel) return;

    var hasGreeted = false;

    // ---- Knowledge base: keyword -> response ----
    var knowledge = [
      {
        keywords: ["skill", "tech stack", "stack", "tools", "languages"],
        answer: "Anuj's core toolkit: Python and SQL (advanced), Pandas, NumPy, Scikit-learn, and NLTK for ML/NLP work, plus Power BI and Excel for analysis. He's also learning OpenCV and YOLOv8 for computer vision. Full breakdown is in the Skills section."
      },
      {
        keywords: ["best project", "top project", "favorite project", "flagship", "main project"],
        answer: "His flagship build is the AI University Admission Chatbot — a multilingual admissions assistant with voice and text support, built with Python, NLP, and ML. Check the Projects section for the repo link."
      },
      {
        keywords: ["project", "portfolio piece", "built", "work"],
        answer: "He's built a range of projects: an AI admissions chatbot, a Flask-based library management system, a Python quiz app, a URL shortener, a music player, and this Spotify-styled portfolio itself. Scroll to Projects to see them all."
      },
      {
        keywords: ["contact", "email", "reach", "get in touch", "linkedin", "message", "whatsapp"],
        answer: "Best ways to reach him: email (anujzanje@gmail.com), LinkedIn, or WhatsApp — all linked in the Contact section and sidebar. There's also a downloadable resume."
      },
      {
        keywords: ["resume", "cv"],
        answer: "Yes — his resume is downloadable as a PDF from the sidebar and the Contact section."
      },
      {
        keywords: ["intern", "job", "hire", "open to work", "opportunit", "available"],
        answer: "He's actively looking for an AI/ML or data engineering internship for his junior year, and is open to hackathons and collaborative builds. Reach out through the Contact section."
      },
      {
        keywords: ["goal", "plan", "future", "next"],
        answer: "His near-term goals: land an AI/ML or data engineering internship, go deeper into LLM agent architectures, and get more consistent with algorithm practice and applied ML research."
      },
      {
        keywords: ["who", "about", "background", "student", "study", "education"],
        answer: "Anuj is a Computer Application student based in Ahmedabad, India, heading into his 3rd year. He focuses on AI/ML and data analysis, and builds full-stack and ML projects in his free time."
      },
      {
        keywords: ["github", "repo", "open source", "code"],
        answer: "His GitHub activity and public repos are listed in the GitHub Activity section — Python, SQL, Flask, and web projects mostly."
      },
      {
        keywords: ["prompt", "method", "workflow"],
        answer: "He also documents a prompt-engineering workflow he uses for data and research tasks — see the 'Prompt Method' section for a before/after example."
      },
      {
        keywords: ["research", "paper", "publication"],
        answer: "He's developing a research direction around prompt-guided literature synthesis for applied ML — it's an ongoing effort, not a published paper yet. Details are in Academic Reports."
      },
      {
        keywords: ["hello", "hi", "hey", "yo"],
        answer: "Hey! Ask me about Anuj's skills, projects, goals, or how to contact him."
      },
      {
        keywords: ["thank", "thanks"],
        answer: "You're welcome — feel free to ask anything else, or reach Anuj directly through the Contact section."
      }
    ];

    var fallback = "I don't have a canned answer for that yet — try asking about his skills, projects, goals, or how to contact him.";

    function findAnswer(text) {
      var lower = text.toLowerCase();
      for (var i = 0; i < knowledge.length; i++) {
        var entry = knowledge[i];
        for (var j = 0; j < entry.keywords.length; j++) {
          if (lower.indexOf(entry.keywords[j]) !== -1) return entry.answer;
        }
      }
      return fallback;
    }

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function addMessage(text, role) {
      var el = document.createElement("div");
      el.className = "ai-chat-msg " + role;
      el.textContent = text;
      messages.appendChild(el);
      scrollToBottom();
    }

    function showTyping() {
      var el = document.createElement("div");
      el.className = "ai-chat-msg bot typing";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = "<span></span><span></span><span></span>";
      messages.appendChild(el);
      scrollToBottom();
      return el;
    }

    function respond(userText) {
      addMessage(userText, "user");
      var typingEl = showTyping();
      var delay = 450 + Math.random() * 400;
      window.setTimeout(function () {
        typingEl.remove();
        addMessage(findAnswer(userText), "bot");
      }, delay);
    }

    function openPanel() {
      panel.hidden = false;
      widget.setAttribute("data-open", "true");
      fab.setAttribute("aria-expanded", "true");
      if (!hasGreeted) {
        hasGreeted = true;
        var typingEl = showTyping();
        window.setTimeout(function () {
          typingEl.remove();
          addMessage("Hi, I'm a small AI assistant trained on Anuj's portfolio content. Ask about his skills, projects, or how to reach him — or tap a suggestion below.", "bot");
        }, 500);
      }
      window.setTimeout(function () { input.focus(); }, 220);
    }

    function closePanel() {
      panel.hidden = true;
      widget.setAttribute("data-open", "false");
      fab.setAttribute("aria-expanded", "false");
    }

    fab.addEventListener("click", function () {
      if (panel.hidden) openPanel();
      else closePanel();
    });

    closeBtn.addEventListener("click", closePanel);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) closePanel();
    });

    document.addEventListener("click", function (e) {
      if (!panel.hidden && !widget.contains(e.target)) closePanel();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      input.value = "";
      respond(text);
    });

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        respond(chip.getAttribute("data-q"));
      });
    });
  });
})();