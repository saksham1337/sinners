export const SITE = {
  name: "Sinnovation",
  domain: "https://sinnovation.si",
  email: "contact@sinnovation.si",
  location: "Bangalore, India",
  markets: "Canada and the USA",
  promise: "Your brand. Our team. Delivered on time.",
};

export const NAV = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/pricing", label: "Partner pricing" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

export const GUARANTEES = [
  { title: "100% white-label", body: "Our name never appears anywhere your client can see. Not in files, not in emails, not in code comments." },
  { title: "NDA before any project", body: "We sign your NDA, or ours, before a single client detail changes hands." },
  { title: "Unbranded deliverables", body: "Everything ships unbranded, or branded in your agency's own identity. Your call." },
  { title: "No client contact unless asked", body: "We never reach out to your clients. If you want us on a call, we join as part of your team." },
  { title: "You own the work", body: "All work, source files and accounts belong to your agency. Handed over in full." },
  { title: "We never sell to your clients", body: "No pitching, no poaching, no side deals. Your client list stays yours." },
];

export const PILLARS = [
  { key: "build", label: "Build", line: "Websites, software and AI agents your clients pay for." },
  { key: "grow", label: "Grow", line: "Paid ads and SEO that keep your retainers renewing." },
  { key: "content", label: "Content", line: "Social, video and design produced at agency volume." },
];

export const STEPS = [
  { title: "Discovery call", body: "We learn how your agency sells, what your clients expect and where delivery gets stuck." },
  { title: "NDA", body: "Signed before any client name, brief or login is shared." },
  { title: "Pilot project", body: "One real project, scoped small, so you can judge quality and fit before committing." },
  { title: "Shared tools", body: "We work inside your project tools and communication channels, under your agency's name." },
  { title: "Ongoing delivery", body: "Briefs come in, finished work goes out. You review, approve and present it as your own." },
  { title: "Review", body: "Regular check-ins on quality, timelines and volume, so the partnership improves over time." },
];

export const MODELS = [
  { key: "perProject", name: "Per project", line: "Fixed scope, fixed price.", body: "Best for one-off builds and campaigns. You get a clear scope and a single quote you can mark up.", fits: ["Website design & development", "Software & web app development", "AI chatbots", "AI voice agents", "Graphic design"] },
  { key: "monthlyPerClient", name: "Monthly per client", line: "A retainer for each end-client account.", body: "Best for ongoing work you already bill monthly. One predictable cost per client account.", fits: ["Paid ads", "SEO", "Social media management", "Video editing & clipping"] },
  { key: "dedicatedTeam", name: "Dedicated team", line: "Your own people, billed monthly.", body: "A designer, developer or marketer who works only on your agency's accounts. Scales with your volume.", fits: ["Website design & development", "Social media management", "Graphic design", "Video editing & clipping"] },
  { key: "pilotProject", name: "Pilot project", line: "A small first engagement at a reduced rate.", body: "Test us on a real brief before you commit. Most partnerships start here.", fits: ["Any of the nine services"] },
];

export const FAQ_GROUPS = [
  {
    group: "White-label and confidentiality",
    items: [
      { q: "Will my clients ever know you exist?", a: "No. Our name does not appear in deliverables, file metadata, emails or code. If you want us on a client call, we join as members of your team." },
      { q: "Do you sign an NDA?", a: "Yes, before any project starts. We can sign your agency's NDA or send ours. You can request one directly in the partner form." },
      { q: "Who owns the work and files?", a: "Your agency does. All source files, designs, code and ad account setups are handed over in full." },
      { q: "Will you ever contact or sell to my clients?", a: "No. We never contact your clients unless you ask us to, and we never pitch them our services." },
    ],
  },
  {
    group: "Working together",
    items: [
      { q: "How do we communicate?", a: "Through the tools you already use. We join your project management and messaging setup so briefs and feedback stay in one place." },
      { q: "What are your working hours?", a: "Our team is based in Bangalore, India. Working hours and overlap with your time zone are agreed during onboarding." },
      { q: "How fast do you respond?", a: "Response times are agreed during onboarding, based on the services and volume you need." },
      { q: "How do we start?", a: "With a discovery call, then an NDA, then a small pilot project. You decide whether to continue after the pilot." },
    ],
  },
  {
    group: "Quality and revisions",
    items: [
      { q: "How do you make sure the work meets my standards?", a: "Every piece is checked internally before it reaches you. During onboarding we document your brand rules, client preferences and quality checklist." },
      { q: "What if a deliverable needs changes?", a: "You send revision notes through your usual channel and we update it. Revision rounds are set in the scope for each project or retainer." },
      { q: "Can I see past work?", a: "Yes. Our Work page shows anonymized results from real accounts. We keep client names private for the same reason we will keep yours private." },
    ],
  },
  {
    group: "Billing and contracts",
    items: [
      { q: "How much does it cost?", a: "It depends on the service, the scope and your monthly volume. Partners get a rate card with clear prices you can mark up. Request it on the partner pricing page." },
      { q: "Why don't you publish prices?", a: "Our rates depend on volume and engagement model, and we want you to get the rate that fits your agency. The rate card is sent to agencies directly." },
      { q: "Is there a long-term contract?", a: "Not to start. Most partnerships begin with a pilot project. Longer arrangements, such as a dedicated team, are agreed once you know how we work." },
    ],
  },
  {
    group: "Services",
    items: [
      { q: "What can you deliver?", a: "Nine services across three pillars: Build (websites, software, AI chatbots, AI voice agents), Grow (paid ads, SEO) and Content (social media, video, graphic design)." },
      { q: "Can you handle a full client account?", a: "Yes. Our lead case study is one brand where we ran social, ads, websites, SEO, influencer work and design across three countries at the same time." },
      { q: "Do you work with end clients directly?", a: "No. We work only with agencies. That is how we keep the white-label promise simple and honest." },
    ],
  },
];

export const STATS = [
  { value: "150+", label: "Websites built" },
  { value: "3+ yrs", label: "Continuous paid ads account" },
  { value: "78M", label: "Combined creator views" },
  { value: "9.91%", label: "Google Ads CTR" },
];
