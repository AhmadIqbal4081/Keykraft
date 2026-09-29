/* ============================================================
   Chat widget settings (look & feel only).
   No API keys, no Firebase, no accounts: the bot runs entirely in
   the visitor's browser. To change what it SAYS, edit knowledge.js.
   ============================================================ */
window.KK_CHAT = {
  enabled: true,

  title:       'Keykraft Assistant',
  status:      'Online · instant answers',
  label:       'Need help?',                          // bubble text next to the button
  greeting:    'Hi! I\'m the Keykraft assistant 👋',
  subtitle:    'Ask me about our AI, web, cloud, IT, medical billing and social media services.',
  suggestions: 'Our services,Agentic AI,Cloud services,IT services,Pricing,Talk to a human',   // comma-separated quick replies

  position:     'right',    // 'right' or 'left'
  offset:       '24px',     // distance from the edge
  accentBg:     '',         // empty = pink→purple gradient, or e.g. '#7f00ff'
  borderRadius: '22px',
  remember:     true        // keep the conversation while the tab is open (survives page changes)
};
