KEYKRAFT CHAT ASSISTANT: how it works
======================================
Free, no Firebase, no API keys, no server. Everything runs in the visitor's browser.

FILES
  knowledge.js   <-- WHAT THE BOT KNOWS. Edit this to change/add answers.
  engine.js      matching logic (typo tolerant). You shouldn't need to touch it.
  chat-config.js look & feel: title, greeting, quick-reply buttons, colours, position.
  widget.js      the chat window UI.

ADD TO ANY PAGE (before </body>), in this order:
  <script src="chat/knowledge.js"></script>
  <script src="chat/engine.js"></script>
  <script src="chat/chat-config.js"></script>
  <script src="chat/widget.js"></script>

ADD / CHANGE AN ANSWER  (open knowledge.js, copy any block in "entries")
  { id: 'warranty',
    kw: ['warranty', 'guarantee', 'money back'],     // words that trigger it
    a:  'Your answer here. Use \n for a new line and **bold** for bold.',
    links: [{ l: 'Contact us', u: 'https://www.keykraftt.com/contact.html' }],
    fu: [['Pricing', 'pricing']]                      // follow-up buttons -> ids of other entries
  },
  - Write phrase keywords without filler words: 'talk human' (not 'talk to a human').
  - If an entry keeps losing to another, add  weight: 1.5  to it.
  - When a visitor asks something unknown, the bot offers WhatsApp/email with their
    question pre-filled, so nothing is lost.

IMPORTANT: this is a rule-based assistant, not AI. It only knows what is written in
knowledge.js. Update it whenever your services, contact details or numbers change.

AFTER EDITING ANY chat/*.js FILE (real site only)
  The site's .htaccess caches .js files for 1 year. Visitors who already loaded the chat
  will keep the OLD answers until the file name changes. After you edit knowledge.js (or any
  chat file), bump the version in the 4 script tags on every page:  chat/knowledge.js?v=1 -> ?v=2
  Quick way (from the site root, Linux/Mac):  sed -i 's/chat\/\([a-z-]*\)\.js?v=1/chat\/\1.js?v=2/g' *.html
