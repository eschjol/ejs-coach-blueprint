export const INTRO_FUNNEL = {
  headline: "Elevate Your Golf Game",
  subheadline: "Schedule your intro lesson and get better from day one.",
  cta: "Book Intro Lesson",
  steps: [
    {
      title: "Book online",
      description: "Pick a time that works. No back-and-forth texts.",
    },
    {
      title: "Show up ready",
      description: "We analyze your swing with data-driven tools.",
    },
    {
      title: "Leave with a plan",
      description: "Clear drills and follow-up so improvement continues at home.",
    },
  ],
  faqs: [
    {
      q: "Who is this for?",
      a: "All skill levels — beginners, plateaued golfers, competitive juniors, and low handicaps.",
    },
    {
      q: "What should I bring?",
      a: "Your clubs, athletic shoes, and an open mind. We provide everything else.",
    },
    {
      q: "Do you offer online lessons?",
      a: "Yes — if you're not local or prefer evenings, online lessons are available.",
    },
  ],
} as const;

export const NURTURE_SEQUENCE = {
  introToPackage: [
    {
      delayHours: 0,
      channel: "email" as const,
      subject: "Great session today — here's what's next",
      template: "intro-recap-package-offer",
    },
    {
      delayHours: 48,
      channel: "sms" as const,
      template: "package-nudge-sms",
    },
    {
      delayHours: 120,
      channel: "email" as const,
      subject: "Lock in your improvement plan",
      template: "package-final-offer",
    },
  ],
  lapsedWinBack: [
    {
      delayDays: 60,
      channel: "sms" as const,
      template: "lapsed-winback-sms",
    },
    {
      delayDays: 63,
      channel: "email" as const,
      subject: "We'd love to see you back on the range",
      template: "lapsed-winback-email",
    },
  ],
} as const;

export const LEAGUE_TEMPLATES = {
  womensLeague: {
    name: "Women's Golf League",
    description:
      "9-hole league for women of all levels with monthly rounds, group lesson discounts, and community events.",
  },
  duosLeague: {
    name: "Duos Golf League",
    description:
      "Casual coed league with monthly events at local courses and optional social gatherings.",
  },
} as const;

export const LESSON_TYPES = [
  { id: "intro", label: "Intro Lesson", duration: 60, defaultPriceCents: 0 },
  { id: "private", label: "Private Lesson", duration: 60, defaultPriceCents: 15000 },
  { id: "playing", label: "Playing Lesson", duration: 120, defaultPriceCents: 25000 },
  { id: "group", label: "Group Clinic", duration: 90, defaultPriceCents: 7500 },
  { id: "junior", label: "Junior Lesson", duration: 45, defaultPriceCents: 10000 },
  { id: "online", label: "Online Lesson", duration: 45, defaultPriceCents: 12500 },
] as const;
