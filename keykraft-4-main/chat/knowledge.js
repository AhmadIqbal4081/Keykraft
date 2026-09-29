/* ============================================================
   Keykraft chat — KNOWLEDGE BASE
   This is the ONLY file you need to edit to change what the bot says.

   Each entry:
     id        unique name
     kw        keywords / phrases that trigger it (typos are tolerated).
               Phrases match when ALL their words appear anywhere in the
               visitor's message, so write "talk human" not "talk to a human".
     weight    optional, default 1 (raise it if the entry keeps losing)
     intent    optional: true = this entry wins over topic pages (used for pricing / human)
     a         the answer. Use \n for new lines and **bold** for bold.
     links     optional buttons: [{l:'Label', u:'https://...'}]
     fu        optional follow-up chips: [['Label','target-id'], ...]
   ============================================================ */
(function () {
  var SITE = 'https://keykraftt.com/';
  var WA = 'https://wa.me/923201848137';
  var MAIL = 'mailto:info@keykraftt.com';
  var TEL = 'tel:+923025008869';

  var L = {
    contact: { l: 'Contact page', u: SITE + 'contact.html' },
    wa: { l: 'WhatsApp us', u: WA },
    mail: { l: 'Email us', u: MAIL },
    tel: { l: 'Call us', u: TEL },
    web: { l: 'Web Development', u: SITE + 'web-development.html' },
    bill: { l: 'Medical Billing', u: SITE + 'medical-billing.html' },
    soc: { l: 'Social & Marketing', u: SITE + 'social.html' },
    agentic: { l: 'Agentic AI', u: SITE + 'agentic-ai.html' },
    aiagent: { l: 'AI Agent Development', u: SITE + 'ai-agent-development.html' },
    aiauto: { l: 'AI Automation', u: SITE + 'ai-automation.html' },
    cloud: { l: 'Cloud Services', u: SITE + 'cloud-services.html' },
    it: { l: 'IT Services', u: SITE + 'it-services.html' }
  };

  window.KK_KB = {
    business: {
      name: 'Keykraft',
      whatsapp: WA,
      email: 'info@keykraftt.com'
    },

    entries: [
      /* ───────── small talk ───────── */
      { id: 'hello', kw: ['hi', 'hello', 'hey', 'hola', 'salam', 'assalam', 'asalam', 'aoa', 'greetings', 'good morning', 'good afternoon', 'good evening'],
        a: 'Hi there! 👋 I\'m the Keykraft assistant. I can tell you about our web development, medical billing and social media marketing services, pricing, and how to reach the team. What would you like to know?',
        fu: [['Our services', 'services'], ['Pricing', 'pricing'], ['Get started', 'start'], ['Talk to a human', 'human']] },

      { id: 'thanks', kw: ['thanks', 'thank', 'thx', 'thankyou', 'shukriya', 'appreciate', 'awesome', 'perfect'],
        a: 'You\'re very welcome! Is there anything else I can help you with?',
        fu: [['Our services', 'services'], ['Contact us', 'contact']] },

      { id: 'bye', kw: ['bye', 'goodbye', 'see you', 'khuda hafiz', 'allah hafiz', 'take care', 'cya', 'thats all', 'nothing else'],
        a: 'Thanks for stopping by! If you need us later, we\'re available 24/7. Have a great day! 👋' },

      { id: 'bot', intent: true, kw: ['are you bot', 'are you human', 'are you real', 'are you ai', 'are you robot', 'is this bot', 'is this ai', 'this chatbot', 'your chatbot', 'are you chatbot', 'who are you', 'what are you', 'your name'],
        weight: 1.1,
        a: 'I\'m Keykraft\'s virtual assistant, an automated helper that knows our website inside out. I can\'t handle everything, so if you\'d like a real person, the team is reachable 24/7.',
        links: [L.wa, L.mail],
        fu: [['Our services', 'services'], ['Talk to a human', 'human']] },

      { id: 'help', kw: ['help', 'menu', 'options', 'what can you do', 'what can you help'],
        weight: 0.95,
        a: 'I can help with:\n• Our services (agentic AI, web, cloud, IT, medical billing, social & marketing)\n• Pricing and how to get started\n• Results and client stats\n• Contact details and office locations\n\nJust type your question, or tap a topic below.',
        fu: [['Our services', 'services'], ['Agentic AI', 'ai'], ['Pricing', 'pricing'], ['Contact us', 'contact']] },

      /* ───────── company ───────── */
      { id: 'about', weight: 0.96, kw: ['keykraft', 'about us', 'about keykraft', 'who is keykraft', 'what is keykraft', 'keykraft company', 'company', 'agency', 'overview', 'introduction', 'your website', 'this website', 'revenue group'],
        a: '**Keykraft** is one integrated partner for **agentic AI, web development, cloud, IT services, medical billing & RCM, and social media marketing**.\n\nWe\'ve served 427+ businesses across 6 industry verticals, with 24/7 support, and offices in Lahore (Pakistan) and Austin (Texas).',
        links: [L.web, L.bill, L.soc, L.agentic],
        fu: [['Our services', 'services'], ['Results', 'results'], ['Contact us', 'contact']] },

      { id: 'services', kw: ['services', 'service', 'what do you offer', 'what you offer', 'what do you do', 'offering', 'solutions', 'products', 'capabilities', 'everything you'],
        a: 'We offer six services:\n\n• **Agentic AI**: custom AI agents and workflow automation that move real work forward.\n• **Web Development**: fast, animated React & Next.js sites and apps built to convert.\n• **Cloud Services**: secure, cost-aware cloud strategy, migration and operations.\n• **IT Services**: managed IT, cybersecurity and integrations with one accountable team.\n• **Medical Billing**: HIPAA-compliant revenue cycle management (RCM) that gets practices paid faster.\n• **Social & Marketing**: SEO, content, and paid campaigns that turn attention into growth.\n\nWhich one would you like to hear more about?',
        links: [L.agentic, L.web, L.cloud, L.it, L.bill, L.soc],
        fu: [['Agentic AI', 'ai'], ['Web development', 'web'], ['Cloud services', 'cloud'], ['IT services', 'it-services'], ['Medical billing', 'billing'], ['Social & marketing', 'social'], ['Pricing', 'pricing']] },

      /* ───────── web development ───────── */
      { id: 'web', kw: ['web', 'website', 'web development', 'web developer', 'development', 'developer', 'develop', 'web design', 'web app', 'landing page', 'react', 'nextjs', 'frontend', 'front end', 'build website'],
        a: '**Web Development**: we design and build blazing-fast, animated web applications with React and Next.js, the kind of digital presence that turns visitors into customers.\n\nWhat we build:\n• Custom web applications\n• Motion & interaction\n• Responsive, mobile-first layouts\n• SEO & Core Web Vitals (90+ Lighthouse scores)\n• Design systems\n• APIs & integrations\n\nOur process: **Discover → Design → Build → Launch & Scale.**',
        links: [L.web, L.contact],
        fu: [['Tech stack', 'web-tech'], ['SEO & speed', 'seo'], ['Pricing', 'pricing'], ['Get started', 'start']] },

      { id: 'web-tech', kw: ['tech stack', 'technology', 'technologies', 'stack', 'typescript', 'tailwind', 'nodejs', 'node', 'graphql', 'javascript', 'vercel', 'framework', 'programming language'],
        a: 'Our web work is built with modern tools: **React, Next.js, TypeScript, Tailwind CSS, Node.js, GraphQL and JavaScript**, deployed on platforms like Vercel.',
        links: [L.web], fu: [['Web development', 'web'], ['APIs & integrations', 'apis']] },

      { id: 'web-custom', kw: ['custom web application', 'web application', 'ssr', 'server side', 'routing', 'state management', 'scalable', 'saas', 'web platform'],
        a: 'Yes, we build bespoke **custom web applications** in React & Next.js, with server-side rendering, routing and state management engineered to scale.',
        links: [{ l: 'Learn more', u: SITE + 'service-custom-web-applications.html' }], fu: [['Get started', 'start'], ['Pricing', 'pricing']] },

      { id: 'web-motion', kw: ['motion', 'animation', 'animated', 'animations', 'interaction', 'interactive', 'micro interaction', 'webgl', 'scroll animation', '3d', 'effects'],
        a: 'We do **motion & interaction**: micro-interactions, scroll animations and WebGL effects that make products feel alive.',
        links: [{ l: 'Learn more', u: SITE + 'service-motion-interaction.html' }], fu: [['Web development', 'web'], ['Get started', 'start']] },

      { id: 'web-responsive', kw: ['responsive', 'mobile friendly', 'mobile first', 'mobile', 'tablet', 'all devices', 'phone friendly', 'accessibility', 'accessible'],
        weight: 0.9,
        a: 'Every site we build is **responsive by default**: mobile-first, pixel-perfect layouts that adapt from watch to widescreen, and built to be accessible.',
        links: [{ l: 'Learn more', u: SITE + 'service-responsive-design.html' }], fu: [['Web development', 'web']] },

      { id: 'seo', kw: ['seo', 'core web vitals', 'lighthouse', 'page speed', 'site speed', 'performance', 'speed', 'ranking', 'rank', 'google', 'search engine', 'sem', 'structured data', 'keyword research', 'search'],
        a: 'We cover SEO from two angles:\n\n• **On the web build**: technical SEO, structured data and 90+ Lighthouse scores baked into every site.\n• **In marketing**: SEO & SEM including keyword research and paid search that ranks you higher and captures ready-to-buy demand.',
        links: [{ l: 'Technical SEO', u: SITE + 'service-seo-core-web-vitals.html' }, { l: 'SEO & SEM', u: SITE + 'service-seo-sem.html' }],
        fu: [['Web development', 'web'], ['Social & marketing', 'social']] },

      { id: 'design-systems', kw: ['design system', 'component library', 'ui kit', 'design tokens', 'ui', 'ux', 'style guide'],
        weight: 0.9,
        a: 'We create **design systems**: reusable component libraries and tokens so your product stays consistent as it grows.',
        links: [{ l: 'Learn more', u: SITE + 'service-design-systems.html' }], fu: [['Web development', 'web']] },

      { id: 'apis', kw: ['api', 'apis', 'integration', 'integrations', 'headless cms', 'cms', 'payment gateway', 'payments', 'authentication', 'auth', 'third party', 'stripe', 'login system'],
        a: 'We wire up **APIs & integrations** cleanly: headless CMS, payments, authentication and other third-party services.',
        links: [{ l: 'Learn more', u: SITE + 'service-apis-integrations.html' }], fu: [['Tech stack', 'web-tech'], ['Get started', 'start']] },

      { id: 'other-platforms', weight: 1.2, kw: ['wordpress', 'shopify', 'wix', 'woocommerce', 'squarespace', 'webflow', 'no code', 'ecommerce', 'e commerce', 'online store'],
        a: 'Our web development focuses on **custom React & Next.js builds**, with headless CMS, payments and integrations. I don\'t have specifics about platforms like WordPress or Shopify, so please ask the team directly and they\'ll tell you what\'s possible for your project.',
        links: [L.wa, L.contact], fu: [['Web development', 'web'], ['Talk to a human', 'human']] },

      { id: 'mobile-app', kw: ['mobile app', 'android', 'ios', 'flutter', 'react native', 'app development', 'apk', 'play store', 'app store'],
        a: 'Our listed web services cover **web applications** (React & Next.js). I don\'t have details on native mobile apps, so please check with the team about your app idea.',
        links: [L.wa, L.contact], fu: [['Web development', 'web'], ['Talk to a human', 'human']] },

      /* ───────── medical billing ───────── */
      { id: 'billing', kw: ['medical billing', 'billing', 'bill', 'rcm', 'revenue cycle', 'medical', 'healthcare', 'health care', 'practice', 'clinic', 'doctor', 'physician', 'hospital', 'claims', 'claim', 'insurance', 'payer', 'reimbursement', 'coding'],
        a: '**Medical Billing & RCM**: we run your entire revenue cycle, from coding to collections, so you capture every dollar you earn. It\'s HIPAA-compliant and powered by AI-driven revenue cycle management.\n\nOur numbers: **96%** first-pass acceptance, **12 days** average A/R, **2.1%** denial rate.\n\nHow it works: **Onboard → Submit → Recover → Report.**',
        links: [L.bill, { l: 'Book a free demo', u: SITE + 'contact.html' }],
        fu: [['Billing services', 'billing-services'], ['Specialties', 'specialties'], ['HIPAA', 'hipaa'], ['Free demo', 'demo']] },

      { id: 'billing-services', kw: ['billing services', 'what billing', 'denial', 'denials', 'denied', 'rejected', 'rejection', 'rejections', 'appeal', 'appeals', 'denial management', 'credentialing', 'enrollment', 'eligibility', 'verification', 'coder', 'certified coder', 'billing coding', 'medical coding', 'billing report'],
        weight: 1.15,
        a: 'Our medical billing services include:\n• **Medical Billing & Coding**\n• **Revenue Cycle Management**\n• **Denial Management & Appeals**\n• **Credentialing & Enrollment**\n• **Eligibility & Verification**\n• **Reporting & Analytics**\n\nCertified specialists manage every step with full transparency and compliance.',
        links: [{ l: 'View details', u: SITE + 'medical-billing.html' }],
        fu: [['RCM stages', 'rcm-stages'], ['Specialties', 'specialties'], ['Free demo', 'demo']] },

      { id: 'rcm-stages', kw: ['stages', 'thirteen', '13 stages', 'prior authorization', 'authorization', 'charge capture', 'payment posting', 'underpayment', 'underpayments', 'patient statements', 'ar follow', 'claims audit', 'claims submission'],
        a: 'Our AI-driven RCM covers **13 coordinated stages**: Eligibility Verification, Prior Authorization, Medical Coding, Charge Capture, Claims Submission, Claims Audit, Payment Posting, Denial Management, A/R Follow-Up, Patient Statements, Credentialing, Reporting, and Underpayment Recovery.',
        links: [{ l: 'See the stages', u: SITE + 'medical-billing.html' }], fu: [['Billing services', 'billing-services'], ['Free demo', 'demo']] },

      { id: 'specialties', weight: 1.2, kw: ['specialty', 'specialties', 'speciality', 'specialities', 'cardiology', 'dermatology', 'pediatrics', 'pediatric', 'orthopedics', 'orthopedic', 'psychiatry', 'behavioral health', 'anesthesiology', 'radiology', 'urology', 'podiatry', 'surgery', 'gastroenterology', 'nephrology', 'pulmonology', 'pain management', 'ob gyn', 'nursing home', 'internal medicine', 'family medicine', 'family care', 'infectious medicine', 'ambulatory'],
        a: 'We bill across many specialties, including: Ambulatory Services, Anesthesiology, Cardiology, Dermatology, Family Medicine, Gastroenterology, Infectious Medicine, Internal Medicine, Nephrology, Nursing Home, Pain Management, Podiatry, Psychiatry, Pulmonology, Radiology, Surgery, Urology, and Women & OB Gyn. We also work with Pediatrics, Orthopedics, Family Care and Behavioral Health practices.\n\nDon\'t see yours? Ask the team, they\'ll confirm.',
        links: [L.bill, L.wa], fu: [['Billing services', 'billing-services'], ['Free demo', 'demo']] },

      { id: 'hipaa', kw: ['hipaa', 'compliance', 'compliant', 'secure', 'security', 'privacy', 'confidential', 'patient data', 'data protection', 'safe'],
        a: 'Yes, our medical billing and RCM services are **HIPAA-compliant**, with full transparency and compliance at every step of your revenue cycle.',
        links: [{ l: 'Privacy Policy', u: SITE + 'privacy.html' }], fu: [['Medical billing', 'billing'], ['Free demo', 'demo']] },

      { id: 'ehr', kw: ['ehr', 'emr', 'practice management', 'pm system', 'software', 'onboarding', 'onboard'],
        a: 'During **onboarding** we map your specialty, payers and workflows, then integrate with your **EHR or practice-management (PM) system**. After that, certified coders scrub and submit clean claims daily.',
        links: [L.bill], fu: [['Billing services', 'billing-services'], ['Free demo', 'demo']] },

      { id: 'demo', kw: ['demo', 'audit', 'revenue audit', 'free', 'consultation', 'consult', 'discovery call', 'book call', 'schedule', 'appointment', 'meeting', 'book', 'trial'],
        a: 'Absolutely! For medical billing you can book a **free demo and revenue audit**. We\'ll show you exactly where your practice is losing money and how to fix it. For web and social, you can book a discovery call or start a conversation, with **no commitments**.',
        links: [{ l: 'Book via contact page', u: SITE + 'contact.html' }, L.wa],
        fu: [['Pricing', 'pricing'], ['Contact us', 'contact']] },

      /* ───────── social & marketing ───────── */
      { id: 'social', kw: ['social', 'social media', 'marketing', 'digital marketing', 'brand', 'branding', 'followers', 'engagement', 'grow', 'growth', 'agency marketing', 'promote', 'promotion'],
        a: '**Social & Marketing**: strategy, content and campaigns that turn attention into revenue, all from one team.\n\nHow we work: **Discover your voice → Create content that connects → Grow your community → Measure & scale.**\n\nBrands typically see measurable growth in reach and engagement within the first 60–90 days.',
        links: [L.soc, L.contact],
        fu: [['Marketing services', 'social-services'], ['Platforms', 'social-platforms'], ['Content creation', 'social-content'], ['Pricing', 'pricing']] },

      { id: 'social-services', kw: ['social services', 'marketing services', 'paid social', 'paid ads', 'ads', 'ad', 'advertising', 'ppc', 'meta ads', 'roas', 'campaign', 'campaigns', 'community management', 'influencer', 'influencers', 'email marketing', 'newsletter', 'content marketing', 'social strategy', 'analytics', 'social analytics'],
        weight: 1.1,
        a: 'Our social & marketing services:\n• **Social Strategy & Brand Voice**\n• **SEO & SEM**\n• **Paid Social & Ads** (Meta, TikTok, LinkedIn)\n• **Content Studio** (reels, carousels, video, design)\n• **Community Management**\n• **Influencer & Partnerships**\n• **Email & Content Marketing**\n• **Analytics & Reporting**, transparent, with no vanity metrics',
        links: [L.soc], fu: [['Platforms', 'social-platforms'], ['Content creation', 'social-content'], ['Get started', 'start']] },

      { id: 'social-platforms', kw: ['platform', 'platforms', 'instagram', 'tiktok', 'facebook', 'youtube', 'linkedin', 'twitter', 'snapchat', 'pinterest'],
        a: 'We manage **Instagram, TikTok, Facebook, YouTube and LinkedIn**, with content tailored to how each platform works. Paid campaigns run across Meta, TikTok and LinkedIn.',
        links: [L.soc], fu: [['Marketing services', 'social-services'], ['Content creation', 'social-content']] },

      { id: 'social-content', kw: ['content', 'content creation', 'content studio', 'reels', 'reel', 'video', 'videos', 'graphics', 'carousel', 'carousels', 'posts', 'post', 'create content', 'design posts'],
        weight: 0.95,
        a: 'Yes, we create the content too! Our in-house **Content Studio** produces reels, carousels, graphics and short-form video end to end, on a reliable, always-on content calendar.',
        links: [{ l: 'Content Studio', u: SITE + 'service-content-studio.html' }], fu: [['Brand style', 'brand-voice'], ['Marketing services', 'social-services']] },

      { id: 'brand-voice', kw: ['brand voice', 'existing brand', 'brand style', 'brand identity', 'my brand', 'keep brand', 'brand guidelines', 'logo'],
        weight: 1.1,
        a: 'Absolutely. We build around your **existing brand voice and visual identity**, and elevate it.',
        fu: [['Social & marketing', 'social'], ['Get started', 'start']] },

      /* ───────── cross-service ───────── */
      { id: 'process', kw: ['process', 'workflow', 'how does it work', 'how do you work', 'how it works', 'steps', 'methodology', 'approach', 'how work'],
        a: 'Every service follows a clear path:\n\n• **Web:** Discover → Design → Build → Launch & Scale\n• **Medical Billing:** Onboard → Submit → Recover → Report\n• **Social:** Discover your voice → Create content → Grow your community → Measure & scale\n\nWhich one would you like details on?',
        fu: [['Web development', 'web'], ['Medical billing', 'billing'], ['Social & marketing', 'social']] },

      { id: 'timeline', kw: ['timeline', 'how long', 'how soon', 'turnaround', 'duration', 'delivery time', 'deadline', 'how fast', 'when will', 'see results', 'time frame', 'timeframe'],
        a: 'It depends on the service:\n• **Web:** timelines depend on scope, and we agree deliverables upfront with you.\n• **Medical billing:** our average days in A/R is 12, and you get transparent monthly reporting.\n• **Social:** most brands see measurable growth in reach and engagement within the first 60–90 days.\n\nFor a precise estimate on your project, the team can scope it with you.',
        links: [L.contact, L.wa], fu: [['Pricing', 'pricing'], ['Get started', 'start']] },

      { id: 'results', kw: ['results', 'result', 'stats', 'statistics', 'numbers', 'track record', 'success', 'proof', 'roi', 'clients', 'customers', 'testimonial', 'testimonials', 'review', 'reviews', 'feedback', 'rating', 'trusted', 'trust', 'reliable', 'legit', 'legitimate', 'experience', '427', 'how many', 'different', 'why choose', 'why keykraft', 'why you', 'better', 'best', 'advantage', 'unique', 'stand out', 'compare', 'competitors'],
        a: 'Here\'s our track record:\n• **427+ businesses** served across 6 industry verticals\n• **35% average revenue growth** within the first year\n• **Medical billing:** 96% first-pass acceptance, 12-day average A/R, 2.1% denial rate. One multi-specialty clinic reported its denial rate cut in half and collections up 31% in the first quarter.\n• **Social:** 1,020+ client reviews and campaigns spanning Instagram, TikTok and Facebook.',
        links: [L.bill, L.soc], fu: [['Our work', 'portfolio'], ['Free demo', 'demo'], ['Contact us', 'contact']] },

      { id: 'portfolio', kw: ['portfolio', 'your work', 'our work', 'past work', 'examples', 'example', 'brands', 'case study', 'case studies', 'coca cola', 'cocacola', 'mirinda', 'sanity', 'metris', 'tqa', 'magnific', 'samples', 'previous'],
        weight: 0.95,
        a: 'On our Social & Marketing page you can see campaigns and content we\'ve made for brands including **Coca-Cola, Sanity, Mirinda, Metris, TQA and Magnific**.',
        links: [{ l: 'See our work', u: SITE + 'social.html' }], fu: [['Results', 'results'], ['Get started', 'start']] },

      { id: 'industries', kw: ['industry', 'industries', 'sector', 'sectors', 'verticals', 'who do you work', 'which businesses', 'types of business'],
        a: 'We serve **427+ businesses across 6 industry verticals**, from healthcare practices in many specialties to brands looking to grow online. If you\'d like to know about your specific industry, ask the team.',
        links: [L.contact, L.wa], fu: [['Specialties', 'specialties'], ['Results', 'results']] },

      { id: 'ai', kw: ['ai', 'artificial intelligence', 'agentic', 'agentic ai', 'ai services', 'ai solutions', 'machine learning', 'llm', 'rag', 'chatgpt', 'gpt', 'generative', 'ai integration', 'ai integrations', 'knowledge base', 'retrieval'],
        a: '**Agentic AI**: we build AI agents that turn intent into action. They understand your business, use your tools and move real work forward, with guardrails on every decision.\n\nWhat we do:\n• Custom AI agent development\n• Workflow automation\n• Knowledge & RAG systems (agents grounded in your trusted documents and data)\n• AI integrations (CRMs, help desks, email, internal systems)\n• Evaluation & guardrails\n• Optimization & operations\n\nOur medical billing RCM is also AI-driven.',
        links: [L.agentic, L.aiagent, L.aiauto],
        fu: [['AI agents', 'ai-agents'], ['AI automation', 'ai-automation'], ['Pricing', 'pricing'], ['Get started', 'start']] },

      { id: 'ai-agents', weight: 1.2, kw: ['ai agent', 'ai agents', 'custom ai agent', 'agent development', 'agents development', 'custom agent', 'ai agent development', 'agent architecture', 'ai assistant', 'chatbot', 'chat bot', 'voice agent'],
        a: '**AI Agent Development**: custom agents built around your workflow, not a generic chatbot. They reason through defined tasks, use connected tools, retrieve trusted knowledge and hand over to a person when human judgment is needed.\n\nWhat we deliver:\n• Custom AI agent development\n• AI agent strategy\n• Agent architecture\n• Agent integrations\n• Evaluation & safety\n• Production deployment',
        links: [L.aiagent, L.contact],
        fu: [['AI automation', 'ai-automation'], ['All Agentic AI', 'ai'], ['Get started', 'start']] },

      { id: 'ai-automation', weight: 1.2, kw: ['ai automation', 'workflow automation', 'automation', 'automate', 'automated', 'automating', 'rpa', 'process automation', 'business automation', 'document automation', 'data automation', 'repetitive work', 'repetitive tasks', 'human approval'],
        a: '**AI Automation**: we turn repetitive business processes into reliable AI-powered workflows that combine AI reasoning, integrations and fixed business rules, with people in control wherever decisions matter.\n\nWhat we deliver:\n• Workflow discovery\n• AI workflow design\n• Automation engineering\n• Document & data automation\n• Human approval systems\n• Automation monitoring',
        links: [L.aiauto, L.contact],
        fu: [['AI agents', 'ai-agents'], ['All Agentic AI', 'ai'], ['Get started', 'start']] },

      /* ───────── cloud & IT ───────── */
      { id: 'cloud', weight: 1.2, kw: ['cloud', 'cloud services', 'cloud service', 'cloud computing', 'cloud strategy', 'cloud migration', 'migrate cloud', 'cloud security', 'multi cloud', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'kubernetes', 'k8s', 'docker', 'terraform', 'devops', 'ci cd', 'finops', 'landing zone', 'landing zones', 'platform engineering', 'infrastructure as code', 'sre', 'cloud operations'],
        a: '**Cloud Services**: a secure cloud foundation that stays fast, resilient and cost-aware as you grow. We work across AWS, Azure and Google Cloud, with Kubernetes, Docker, Terraform and CI/CD.\n\nCapabilities:\n• Cloud strategy & migration\n• Secure landing zones\n• Platform engineering\n• Cloud security\n• FinOps & optimization\n• Reliability & cloud operations',
        links: [L.cloud, L.contact],
        fu: [['IT services', 'it-services'], ['Pricing', 'pricing'], ['Get started', 'start']] },

      { id: 'it-services', weight: 1.2, kw: ['it services', 'it service', 'it support', 'it partner', 'it company', 'it solutions', 'managed it', 'managed service', 'managed services', 'cybersecurity', 'cyber security', 'cyber', 'network security', 'endpoint', 'endpoints', 'help desk', 'helpdesk', 'service desk', 'technology partner', 'it roadmap', 'it strategy', 'it infrastructure'],
        a: '**IT Services**: one technology partner for strategy, engineering and managed operations. We modernize infrastructure, secure operations and connect your tools with one accountable team.\n\nWhat we cover:\n• Managed IT & support\n• Cybersecurity\n• Cloud & infrastructure\n• AI & workflow automation\n• APIs & integration\n• Data & analytics\n\nWith 24/7 support-ready operations.',
        links: [L.it, L.contact],
        fu: [['Cloud services', 'cloud'], ['Agentic AI', 'ai'], ['Pricing', 'pricing'], ['Get started', 'start']] },

      /* ───────── commercial ───────── */
      { id: 'pricing', kw: ['price', 'pricing', 'prices', 'cost', 'costs', 'how much', 'quote', 'quotation', 'fee', 'fees', 'charges', 'package', 'packages', 'budget', 'affordable', 'cheap', 'expensive', 'payment terms', 'retainer', 'invoice', 'pay', 'paying', 'qeemat', 'kharcha', 'paisa', 'discount'],
        intent: true, weight: 2.6,
        a: 'We don\'t publish fixed prices because every project is different. Tell us your goals and we\'ll design a **tailored solution with clear scope, deliverables and pricing**, with no commitments.\n\nThe quickest way to get a quote is to message the team on WhatsApp or use the contact form.',
        links: [L.wa, L.contact, L.mail], fu: [['Free demo', 'demo'], ['Get started', 'start']] },

      { id: 'start', kw: ['get started', 'start', 'begin', 'new project', 'hire', 'hire you', 'want hire', 'work together', 'sign up', 'join', 'become client', 'form', 'inquiry', 'enquiry', 'request', 'proposal', 'start project'],
        weight: 1.15,
        a: 'Getting started is easy:\n1. Send us your goals through the **contact form** (name, email, company, service of interest, project details) or on WhatsApp.\n2. We design a tailored plan with clear scope, deliverables and pricing.\n3. You decide, with **no commitments**.',
        links: [L.contact, L.wa], fu: [['Pricing', 'pricing'], ['Free demo', 'demo'], ['Talk to a human', 'human']] },

      /* ───────── contact & company info ───────── */
      { id: 'contact', kw: ['contact', 'contact us', 'get touch', 'reach', 'email', 'mail', 'phone', 'call', 'whatsapp', 'number', 'telephone', 'message', 'connect', 'rabta', 'contact details'],
        weight: 1.3,
        a: 'You can reach Keykraft here:\n• **WhatsApp:** +92 320 1848137\n• **Phone:** +92 (302) 5008-869\n• **Email:** info@keykraftt.com\n• **Support:** 24/7, we\'re always available',
        links: [L.wa, L.tel, L.mail, L.contact], fu: [['Office locations', 'location'], ['Get started', 'start']] },

      { id: 'location', kw: ['address', 'location', 'office', 'offices', 'where', 'head office', 'austin', 'texas', 'lahore', 'pakistan', 'usa', 'america', 'map', 'visit', 'directions', 'located', 'based', 'worldwide', 'international', 'global', 'countries', 'remote', 'overseas', 'abroad'],
        a: 'We have two offices:\n• **Head Office:** Shop #2 Musa Market, Defence Road, Lahore, Pakistan\n• **Site Office:** 5900 Balcones Drive STE 100, Austin, TX 78731, USA\n\nWe serve clients worldwide.',
        links: [{ l: 'Lahore on Maps', u: 'https://www.google.com/maps/search/?api=1&query=Shop+%232+Musa+Market+Defense+Road+Lahore' }, { l: 'Austin on Maps', u: 'https://www.google.com/maps/search/?api=1&query=5900+Balcones+Drive+STE+100+Austin+TX+78731' }],
        fu: [['Contact us', 'contact'], ['Get started', 'start']] },

      { id: 'hours', kw: ['support', '24/7', 'hours', 'opening hours', 'business hours', 'working hours', 'office hours', 'open', 'available', 'availability', 'always available', 'timing', 'timings'],
        a: 'Our support is **24/7**, we\'re always available. The fastest way to reach us is on WhatsApp.',
        links: [L.wa, L.mail], fu: [['Contact us', 'contact'], ['Talk to a human', 'human']] },

      { id: 'human', kw: ['talk human', 'speak human', 'talk person', 'human', 'talk agent', 'speak agent', 'chat agent', 'support agent', 'human agent', 'need agent', 'want agent', 'representative', 'real person', 'live chat', 'live agent', 'operator', 'someone', 'person', 'somebody', 'anyone', 'customer service', 'manager', 'sales', 'sales team', 'call back', 'callback', 'team member'],
        intent: true, weight: 1.4,
        a: 'Of course! I\'m an automated assistant, but the Keykraft team is available 24/7. For the fastest reply, message us on WhatsApp.',
        links: [L.wa, L.tel, L.mail, L.contact] },

      { id: 'login', weight: 1.2, kw: ['login', 'client login', 'log in', 'sign in', 'signin', 'account', 'portal', 'dashboard', 'client portal', 'password'],
        a: 'I don\'t have information about a client login or portal on our website. If you\'re an existing client and need access to reports or your account, please contact the team directly.',
        links: [L.wa, L.mail], fu: [['Talk to a human', 'human']] },

      { id: 'careers', kw: ['career', 'careers', 'job', 'jobs', 'hiring', 'vacancy', 'vacancies', 'internship', 'intern', 'recruit', 'apply', 'work for you', 'join team', 'cv', 'resume'],
        weight: 1.2,
        a: 'I don\'t have details on job openings. If you\'d like to work with Keykraft, please email your CV to **info@keykraftt.com** and the team will get back to you.',
        links: [L.mail]},

      { id: 'legal', kw: ['privacy policy', 'terms', 'terms of service', 'terms conditions', 'tos', 'cookies', 'refund', 'refunds', 'cancel', 'cancellation', 'policy', 'policies', 'legal', 'contract', 'agreement'],
        a: 'You can read our policies here. For anything specific, like refunds or contract terms, I don\'t have details, so please check with the team.',
        links: [{ l: 'Privacy Policy', u: SITE + 'privacy.html' }, { l: 'Terms of Service', u: SITE + 'terms.html' }, L.wa] }
    ],

    /* Shown when nothing matches */
    fallback: {
      a: 'I\'m not sure I have the answer to that one. I know about our **agentic AI, web development, cloud, IT, medical billing and social media** services, pricing, results, and contact details. For anything else, the team can help directly, 24/7.',
      fu: [['Our services', 'services'], ['Pricing', 'pricing'], ['Talk to a human', 'human']]
    },

    /* Typed exactly (nothing else) → jump straight to an entry */
    aliases: { 'keykraft': 'about', 'keykraftt': 'about', 'key kraft': 'about', 'start over': 'help' }
  };
})();
