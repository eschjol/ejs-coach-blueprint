export const BRAND = {
  name: "EJS Coach Blueprint",
  tagline: "The system behind Scottsdale's #1 coach — now yours.",
  owner: "Erik Schjolberg",
  ownerEmail: "erik@ejsgolf.com",
  ownerPhone: "4808619370",
  website: "https://ejsgolf.com",
} as const;

export const TIERS = {
  core: {
    name: "Blueprint Core",
    priceMonthly: 149,
    features: [
      "Intro lesson booking page",
      "AI SMS front desk",
      "Automated reminders",
      "Review request engine",
    ],
  },
  growth: {
    name: "Blueprint Growth",
    priceMonthly: 299,
    features: [
      "Everything in Core",
      "Local SEO landing pages",
      "Content autopilot (4 posts + 1 blog/mo)",
      "Student nurture sequences",
    ],
  },
  amplify: {
    name: "Blueprint Amplify",
    priceMonthly: 499,
    features: [
      "Everything in Growth",
      "Google & Meta ads management",
      "Quarterly strategy call",
      "Monthly plain-English report",
    ],
  },
} as const;

export const SETUP_FEE = 997;
