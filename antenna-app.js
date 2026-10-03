(function () {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("header nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  const answers = [
    { keys: ["hello", "yo", "whatsup"], text: "Hi there, I am David, what can i help you with today?" },
    { keys: ["hi"], text: "Hi, how are you doing today?" },
    { keys: ["owner of God's Antenna", "owners", "creators", "founder"], text: "By the grace of God, Mr. Oluwadamilola Emmanuel Kehinde and Mr. Israel Ayomide Kusimo are the founders' of God's Antenna." },
    { keys: ["history", "when was it made"], text: "God's Antenna was founded on the 25th of September, 2026" },
    { keys: ["ehmm", "still thinking", "thinking about it"], text: "Tell me, when you're done!" },
    { keys: ["feeling good", "i am ok", "good"], text: "Glad to hear that — 😁😎" },
    { keys: ["nth", "nothing"], text: "Ok, when you decide what you want to do today, just remember that I am here and active — 😁😎." },
    { keys: ["phenomenal", "nice", "yh"], text: "Alright Let's dive in, what do you want to do today?" },
    { keys: ["age", "old", "born"], text: "I dont have an age, I am a robot. What can i help you with today? Do you want to know which program is live right now?" },
    { keys: ["who you", "you" ], text: "I am David, GOD'S ANTENNA AI ASSISTANT" },
    { keys: ["ok"], text: "Yh, If you need anything else just ask me — 😀🎉" },
    { keys: ["thx", "thanks", "thank you"], text: "You're welcome, I am always her to help — 😃😎🎉" },
    { keys: ["phone", "number", "call", "whatsapp", "contact"], text: "Call Agent on 08000000000 or 08000000000. Email godsantenna@gmail.com." },
    { keys: ["email", "gmail", "mail"], text: "'Coming soon!'." },
    { keys: ["Sunday", "Tuesday", "Thursday"], text: "Our Sunday Service starts with FRESH ANOINTING - Time - 7:30AM to 8:00AM then we move into SUNDAY SCHOOL - Time - 8:30AM to 9:15AM then our CELEBRATION SERVICE - Time - 9:15AM - 11:30AM" },
    { keys: ["Weekly Services", "Tuesday", "Thursday"], text: "WEEKLY SERVICES    Tuesday Service - Digging Deep  Time - 6:30pm to 7:30pm   Thursday Service - Faith Clinic   Time - 6:30pm to 7:30pm " },
    { keys: ["Open", "Heavens", "Today's", "Topic"], text: "Today's Open Heaven <br> DATE: FRIDAY SEPTEMBER 25TH 2026 <br> Topic : GOD OF HOPE. <br> Memorise 💭: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost'. Romans 15:13 (KJV)" },
    { keys: ["Location", "where"], text: "6, ITESIWAJU STREET, AKOKA, LAGOS STATE, NIGERIA" },
    { keys: ["Hymn", "Events", "Announcement", "Services", "Prayers", "Open Heaven Devotional" ], text:"GOD'S ANTENNA helps you to Listen to past messages, read inspiring devotianals live Open Heaven, access all RCCG Hymns, it even gives you access to talk to a counsellor and connect you to our prayer team, if you need prayers." },
    { keys: ["events", "Convention", "Praise", "Carol", "Holy Ghost Service"], text: "We have a few upcoming events — 🎉🎆. Like 'Fragrance of Worship Akoka 2.0' coming up in October where alot of Musician like P-SAX and many other gospel ministers will be leading us into the presence of God through soul-lifting worship and praise at its peak and you are invited." },
    { keys: ["tiktok", "instagram", "social", "platform"], text: "TikTok: @Coming soon. Instagram: @Coming soon. Email: Coming soon. Shop: http://fs-technical-hymn.base44.app" }
  ];

  function replyTo(message) {
    const q = (message || "").toLowerCase();
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].keys.some(function (k) { return q.indexOf(k) !== -1; })) {
        return answers[i].text;
      }
    }
    return "You can ask me anything about the church, events, RCCG programs, Prayer meeting, Weekly Services. If you need a counsellor or someone to talk to — call 08028385955 or 08055554744 for that.";
  }

  const toggle = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const log = document.getElementById("chatLog");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  function addBubble(text, who) {
    if (!log) return;
    const div = document.createElement("div");
    div.className = "bubble " + who;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      panel.classList.toggle("open");
      if (panel.classList.contains("open") && log && !log.dataset.ready) {
        addBubble("Hello! I am David the RCCG Freedom Sanctuary Parish AI Assistant. You can ask me anything about the church, events, RCCG programs, Prayer meeting, Weekly Services. If you need a counsellor or someone to talk to — call 08028385955 or 08055554744 for that.", "bot");
        log.dataset.ready = "1";
      }
    });
  }

  if (form && input) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      addBubble(text, "user");
      input.value = "";
      setTimeout(function () { addBubble(replyTo(text), "bot"); }, 250);
    });
  }

  document.querySelectorAll("[data-ask]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!panel.classList.contains("open")) toggle.click();
      addBubble(btn.getAttribute("data-ask"), "user");
      setTimeout(function () { addBubble(replyTo(btn.getAttribute("data-ask")), "bot"); }, 250);
    });
  });
})();
