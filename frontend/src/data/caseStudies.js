export const CASE_STUDIES = [
  {
    id: "electronics", lead: true, type: "results",
    industry: "Consumer electronics brand, multi-country",
    markets: "India / Sri Lanka / Bangladesh",
    title: "One brand. Three countries. All three pillars.",
    services: ["Social media management", "Paid ads", "Website development", "SEO", "Influencer partnerships", "Graphic design"],
    summary: "We ran the entire digital presence for one consumer electronics brand across three markets at the same time: social, ads, websites, SEO, influencer work and design.",
    stats: [
      { value: "+206%", label: "Instagram growth, India (to 38K)" },
      { value: "+394%", label: "Instagram growth, Sri Lanka" },
      { value: "+368%", label: "Instagram growth, Bangladesh" },
      { value: "450+", label: "Posts, graphics and videos for India alone" },
    ],
    details: [
      "Quarterly reach targets set and achieved every quarter, across three country accounts on Facebook and Instagram.",
      "Built and maintained e-commerce storefronts for all three countries.",
      "Print and digital design: brochures, flex boards, exhibition backdrops, product catalogues, packaging and social creative.",
      "Influencer partnerships run alongside organic and paid social.",
    ],
  },
  {
    id: "education", type: "results",
    industry: "Education",
    markets: "Debate, writing and scholar competition coaching",
    title: "A paid ads account that has run for 3+ years.",
    services: ["Paid ads (Google)", "Paid ads (Meta)"],
    summary: "We run and optimize a multi-platform paid acquisition program for a seasonal education business, adjusting campaigns around every academic cycle and competition season. Continuous since August 2023, and still active.",
    stats: [
      { value: "1.04M", label: "Google Ads impressions" },
      { value: "103K", label: "Google Ads clicks" },
      { value: "9.91%", label: "Click-through rate" },
      { value: "4,880", label: "Tracked results" },
      { value: "12.4M", label: "Meta impressions" },
      { value: "7.9M", label: "Meta reach" },
    ],
    details: [
      "Google: Search and Performance Max. The tracked results include contact actions, direction requests and phone-call leads.",
      "Meta: feed, engagement and lead campaigns across competition prep, writing training, counseling and summer camps.",
      "Longevity is the result: an account only runs this long when the ads keep earning their place.",
    ],
  },
  {
    id: "camera", type: "results",
    industry: "Consumer tech brand",
    markets: "Cameras",
    title: "Social and creators, managed end to end.",
    services: ["Social media management", "Influencer partnerships"],
    summary: "End-to-end organic social management, plus creator sourcing and coordination for product launches and giveaways.",
    stats: [
      { value: "408%", label: "Follower growth across 5 campaigns" },
      { value: "+41.3K", label: "Followers gained" },
      { value: "172K", label: "Impressions from one giveaway" },
      { value: "78M", label: "Combined views from 20+ creators" },
    ],
    details: [
      "The flagship giveaway alone drove 17,197 interactions and 10,329 profile actions.",
      "20+ creators coordinated for a single product launch across YouTube and Instagram.",
      "Individual creator collaborations delivered 9.3M and 2.4M views.",
    ],
  },
  {
    id: "auto", type: "strategy",
    industry: "Luxury auto dealership group",
    markets: "Automotive / luxury retail",
    title: "A lead generation strategy for a long buying cycle.",
    services: ["Paid ads strategy", "Social media", "Go-to-market planning"],
    summary: "Strategy and planning work for a high-ticket product with a long consideration cycle. This case study describes the approach. It does not report results.",
    stats: [],
    details: [
      "Google Search and Display plus Meta lead-gen ads, structured for a multi-dealership account.",
      "Audience planning built around how luxury car buyers research and decide.",
      "A funnel designed to move buyers from first interest to a showroom visit.",
    ],
  },
];

export const caseById = (id) => CASE_STUDIES.find((c) => c.id === id);
