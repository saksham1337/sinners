const TURNAROUND = "Confirmed during onboarding, based on scope and volume.";

export const SERVICES = [
  {
    slug: "website-design-development", pillar: "build", name: "Website design & development",
    short: "WordPress, Shopify and custom sites, designed and built under your brand.",
    seoTitle: "White Label Web Development for Agencies",
    seoDesc: "White label website design and development for agencies in Canada and the USA. WordPress, Shopify and custom builds delivered under your brand.",
    included: ["Design in Figma, based on your client's brand", "WordPress, Shopify or custom builds", "Responsive layouts for every screen size", "On-page SEO basics and speed checks", "E-commerce storefronts and product setup", "Handover with access, files and notes"],
    resell: "Sell full builds, redesigns or ongoing site care under your agency's name. You set the price to your client; we deliver to your scope.",
    flow: ["Brief and sitemap from you", "Design draft for your review", "Build on a staging link you control", "Revisions and QA", "Launch and handover"],
    proof: "electronics",
    faq: [
      { q: "Which platforms do you build on?", a: "WordPress, Shopify and custom stacks. If your client is on another platform, ask and we will tell you honestly whether we can deliver it well." },
      { q: "Where is the site hosted during the build?", a: "On a staging environment you or your client control, so nothing points back to us." },
    ],
  },
  {
    slug: "software-web-app-development", pillar: "build", name: "Software & web app development",
    short: "Dashboards, portals and internal tools built to your client's spec.",
    seoTitle: "White Label Software and Web App Development",
    seoDesc: "White label software and web app development for digital agencies. Portals, dashboards and internal tools delivered under your agency brand.",
    included: ["Scoping and technical planning", "Front end and back end development", "Client portals, dashboards and internal tools", "Integrations with third-party services", "Testing before every release", "Code and documentation handed to you"],
    resell: "Offer custom software to clients who have outgrown templates. We work to your spec and you own the code.",
    flow: ["Requirements from you", "Technical plan and estimate", "Build in agreed milestones", "Testing and fixes", "Release and handover"],
    proof: null,
    faq: [
      { q: "Who owns the code?", a: "Your agency, or your client if you transfer it. We hand over the repository and documentation in full." },
      { q: "Can you take over an existing project?", a: "Often, yes. We review the code first and tell you what we find before agreeing to a scope." },
    ],
  },
  {
    slug: "ai-chatbots", pillar: "build", name: "AI chatbots",
    short: "Website, WhatsApp and support chatbots trained on your client's business.",
    seoTitle: "White Label AI Chatbots for Agencies",
    seoDesc: "White label AI chatbot development for agencies. Website, WhatsApp and support bots built and delivered under your agency's brand.",
    included: ["Website chat widgets", "WhatsApp chatbots", "Support bots trained on your client's content", "Lead capture and hand-off to a human", "Setup inside your client's tools", "Testing and tuning before launch"],
    resell: "Add AI chatbots to your offer without hiring for it. Package setup as a project and tuning as a monthly fee.",
    flow: ["Use case and content from you", "Conversation design", "Build and connect", "Testing with real questions", "Launch and handover"],
    proof: null,
    faq: [
      { q: "What does the bot learn from?", a: "The content you and your client approve, such as website pages, FAQs and documents." },
      { q: "Can it hand off to a person?", a: "Yes. We set up a hand-off so a real person can take over when the bot cannot help." },
    ],
  },
  {
    slug: "ai-voice-agents", pillar: "build", name: "AI voice agents",
    short: "Inbound and outbound call agents and AI receptionists for your clients.",
    seoTitle: "White Label AI Voice Agents for Agencies",
    seoDesc: "White label AI voice agents for agencies: inbound and outbound call agents and AI receptionists, delivered under your agency brand.",
    included: ["Inbound call answering and AI receptionists", "Outbound call agents", "Call scripts and conversation flows", "Booking and lead capture", "Call summaries sent to your client", "Testing before go-live"],
    resell: "Sell AI receptionists and call agents to clients who miss calls or need follow-up at scale. Setup as a project, running costs as a retainer.",
    flow: ["Call goals and script inputs from you", "Conversation flow design", "Voice agent build and connection", "Test calls", "Go-live and handover"],
    proof: null,
    faq: [
      { q: "What kind of businesses is this for?", a: "Any client who gets calls they cannot always answer, or who needs consistent follow-up calls." },
      { q: "Can calls be transferred to a person?", a: "Yes. We set rules for when the agent transfers a call to your client's team." },
    ],
  },
  {
    slug: "paid-ads", pillar: "grow", name: "Paid ads",
    short: "Google, Meta and TikTok campaigns run and optimized for your clients.",
    seoTitle: "White Label Google Ads and Meta Ads for Agencies",
    seoDesc: "White label PPC management for agencies: Google Ads, Meta Ads and TikTok Ads run and optimized under your brand.",
    included: ["Account setup and audits", "Google Search and Performance Max", "Meta feed, engagement and lead campaigns", "TikTok campaigns", "Ongoing optimization and testing", "Reports in your agency's format"],
    resell: "Offer ad management as a monthly retainer per client. We run the accounts; you own the relationship and the reporting.",
    flow: ["Goals and access from you", "Audit and campaign plan", "Launch", "Weekly optimization", "Monthly report in your branding"],
    proof: "education",
    faq: [
      { q: "Whose ad account is used?", a: "Your client's, or your agency's. We work through the access you give us and never set up accounts in our name." },
      { q: "Can reports carry our branding?", a: "Yes. Reports are produced in your agency's format and branding." },
    ],
  },
  {
    slug: "seo", pillar: "grow", name: "SEO",
    short: "On-page, technical, local and content SEO delivered under your brand.",
    seoTitle: "White Label SEO for Agencies",
    seoDesc: "White label SEO for agencies in Canada and the USA. On-page, technical, local and content SEO delivered under your brand.",
    included: ["Technical audits and fixes", "On-page optimization", "Local SEO and business listings", "Keyword research and content plans", "SEO content writing", "Monthly reports in your branding"],
    resell: "Sell SEO as a monthly retainer. We do the work and the reporting; you present the results to your client.",
    flow: ["Site and goals from you", "Audit and priorities", "Monthly work plan", "Delivery and tracking", "Monthly report"],
    proof: "electronics",
    faq: [
      { q: "Do you build links?", a: "We focus on technical, on-page, local and content work. Any outreach is agreed with you first and done under your agency's name." },
      { q: "How do you report progress?", a: "With a monthly report in your format covering work done, rankings and traffic." },
    ],
  },
  {
    slug: "social-media-management", pillar: "content", name: "Social media management",
    short: "Content calendars, posting, community and influencer work for your clients.",
    seoTitle: "White Label Social Media Management for Agencies",
    seoDesc: "White label social media management for agencies: content calendars, posting, community management and influencer campaigns under your brand.",
    included: ["Monthly content calendars", "Post design, captions and scheduling", "Community management", "Giveaways and campaigns", "Influencer and creator coordination", "Monthly performance reports"],
    resell: "Bill social media as a monthly retainer per client. We plan, produce and post; you approve and present.",
    flow: ["Brand guide and goals from you", "Monthly calendar for approval", "Production", "Posting and community management", "Monthly report"],
    proof: "camera",
    faq: [
      { q: "Do you post directly to client accounts?", a: "Yes, with the access you give us. Or we prepare everything and your team posts it." },
      { q: "Can you work with influencers?", a: "Yes. We have sourced and coordinated 20+ creators for a single product launch." },
    ],
  },
  {
    slug: "video-editing-clipping", pillar: "content", name: "Video editing & clipping",
    short: "Short-form clips, reels and edited videos at agency volume.",
    seoTitle: "White Label Video Editing for Agencies",
    seoDesc: "White label video editing and clipping for agencies: reels, short-form clips and edited videos delivered under your agency brand.",
    included: ["Short-form reels and clips", "Long-form video edits", "Captions and on-screen text", "Brand-matched graphics and motion", "Formats for each platform", "Source project files on request"],
    resell: "Sell video as a monthly package or per piece. Send raw footage, get finished edits back ready to present.",
    flow: ["Footage and brief from you", "First edit", "Your revision notes", "Final export in every format", "Delivery to your shared folder"],
    proof: "electronics",
    faq: [
      { q: "How do you receive footage?", a: "Through a shared folder you control." },
      { q: "Can you match an existing style?", a: "Yes. Send examples and brand assets and we match them." },
    ],
  },
  {
    slug: "graphic-design", pillar: "content", name: "Graphic design",
    short: "Print and digital design, from social creative to catalogues and packaging.",
    seoTitle: "White Label Graphic Design for Agencies",
    seoDesc: "White label graphic design for agencies: social creative, brochures, catalogues, packaging and print design under your brand.",
    included: ["Social media creative", "Brochures and catalogues", "Packaging design", "Exhibition backdrops and signage", "Ad creative", "Editable source files"],
    resell: "Offer design per project or as a dedicated designer working only on your accounts.",
    flow: ["Brief and brand assets from you", "First concepts", "Revisions", "Final files", "Print-ready and source handover"],
    proof: "electronics",
    faq: [
      { q: "Do you do print design?", a: "Yes. Brochures, flex boards, exhibition backdrops, catalogues and packaging are all part of our real work." },
      { q: "Will I get source files?", a: "Yes. Editable source files are included." },
    ],
  },
].map((s) => ({ ...s, turnaround: TURNAROUND }));

export const SERVICE_NAMES = SERVICES.map((s) => s.name);

export const servicesByPillar = (pillar) => SERVICES.filter((s) => s.pillar === pillar);
