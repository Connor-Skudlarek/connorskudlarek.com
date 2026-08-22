export const site = {
  name: "Connor Skudlarek",
  role: "Software Engineer",
  location: "Portland, Oregon",
  email: "connor.skudlarek@gmail.com",
  github: "https://github.com/Connor-Skudlarek",
  linkedin: "https://www.linkedin.com/in/connor-skudlarek",
  url: "https://connorskudlarek.com",
  tagline: "Mechanical engineer turned software engineer.",
  description:
    "Connor Skudlarek is a software engineer in Portland, Oregon. A mechanical engineer at Lam Research who taught himself to build software, he leads frontend development for a nonprofit e-commerce platform and writes full-stack TypeScript, React, and Next.js.",
} as const;

export const hero = {
  greeting: "Hi, I'm Connor.",
  lead: "I'm a mechanical engineer at Lam Research who taught himself to build software.",
  body: "These days I lead frontend development on an e-commerce platform for a charity in Uganda. I bring the same habit to code that I brought to lab equipment: measure it, test it, and don't trust a result you haven't tried to break.",
} as const;

export const about = {
  heading: "How I got here",
  paragraphs: [
    "I studied mechanical engineering at Oregon Tech with a minor in applied mathematics, and went into semiconductor capital equipment at Lam Research. My job is keeping the machines that make chips running and, more to the point, keeping them honest — when a tool reports a number, someone has to know whether to believe it.",
    "Somewhere in there I started writing software and didn't stop. The Odin Project, then Frontend Masters, then real projects with real users and real deadlines. In 2024 I joined 4Human Corporation as a volunteer and ended up leading the frontend for their largest build, working alongside ten-plus other volunteers scattered across time zones.",
    "The engineering background turns out to be the useful part. Instrumentation, tolerance stacks, and root-cause analysis are all the same skill as debugging: form a hypothesis, design the measurement that could disprove it, and believe the measurement over your intuition. I also spend a fair amount of time directing AI agents through research and build work — which mostly means writing very precise specifications and then checking the results far more carefully than anyone wants to.",
  ],
} as const;

export type Experience = {
  org: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  href?: string;
};

export const experience: Experience[] = [
  {
    org: "Lam Research",
    role: "Laboratory Service Engineer II",
    period: "Current",
    location: "Portland, OR",
    summary:
      "Semiconductor capital equipment. I keep the tools that manufacture chips running to spec, which means a lot of instrumentation, measurement, and root-cause work on systems where a wrong number is expensive.",
  },
  {
    org: "4Human Corporation",
    role: "Volunteer Lead Frontend Engineer",
    period: "2024 – present",
    summary:
      "A 501(c)(3) that builds software for other nonprofits. I led the frontend for the Murphy Charitable Foundation Uganda storefront and became the project's top contributor, coordinating with a distributed volunteer team of ten-plus.",
    href: "https://www.4human.co/",
  },
  {
    org: "Oregon Institute of Technology",
    role: "BS Mechanical Engineering, minor in Applied Mathematics",
    period: "2016 – 2020",
    summary:
      "Hands-on engineering program. The applied math minor is where the statistics and numerical methods came from, and it's the reason the data side of software felt like home later on.",
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  blurb: string;
  role: string;
  stack: string[];
  metrics?: { label: string; value: string }[];
  links: { label: string; href: string; note?: string }[];
  caseStudy?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "murphy",
    title: "Murphy Storefront",
    subtitle: "E-commerce for a Ugandan charity, built by volunteers",
    blurb:
      "The Murphy Charitable Foundation Uganda needed a storefront that could take donations and sell goods without a budget for software. I led the frontend build: component architecture, the design system, and the review pipeline that let a rotating cast of volunteers ship without stepping on each other.",
    role: "Volunteer Lead Frontend Engineer, 4Human Corporation",
    stack: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Firebase",
      "NextAuth",
    ],
    metrics: [
      { label: "Top contributor", value: "91 commits" },
      { label: "Volunteer team", value: "10+ people" },
      { label: "Client", value: "Nonprofit, live" },
    ],
    links: [
      { label: "Live site", href: "https://murphy-4human.vercel.app" },
      {
        label: "Source",
        href: "https://github.com/4human-org/murphy-ecommerce-frontend",
        note: "org repo",
      },
    ],
    caseStudy: "/projects/murphy/",
    featured: true,
  },
  {
    slug: "wafer-wizards",
    title: "Wafer Wizards",
    subtitle: "An issue tracker shaped by the fab floor",
    blurb:
      "Maintenance tracking for lab equipment, built because I'd lived the problem: a tool goes down, three people know something about why, and none of it is written anywhere. I built it first as a MERN app, then rewrote it on Next.js and Postgres when the client-side data fetching stopped paying for itself.",
    role: "Solo build, 103 commits",
    stack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "NextAuth v5",
      "Zod",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Commits", value: "103" },
      { label: "Rewrite", value: "MERN → Next.js" },
      { label: "Auth", value: "Credentials + sessions" },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://wafer-wizards.vercel.app",
        note: "sign-in required",
      },
      {
        label: "Source",
        href: "https://github.com/Connor-Skudlarek/issue-tracker",
      },
    ],
    caseStudy: "/projects/wafer-wizards/",
    featured: true,
  },
  {
    slug: "negative-nancy",
    title: "Negative Nancy Negator",
    subtitle: "A browser extension that asks if you really want to post that",
    blurb:
      "Recommendation algorithms learn from what you engage with, and arguing with strangers teaches them to show you more strangers to argue with. This extension notices when you're typing something heated and gives you a moment to reconsider — classification runs entirely on-device, so nothing you type leaves your machine.",
    role: "Solo build",
    stack: ["TypeScript", "Chrome Manifest V3", "TensorFlow.js", "esbuild"],
    links: [
      {
        label: "Source",
        href: "https://github.com/Connor-Skudlarek/negative-nancy-negator",
      },
    ],
    featured: false,
  },
];

export const aiWork = {
  heading: "Research I direct, rather than write",
  intro:
    "A growing share of my work is specifying a problem carefully enough that AI agents can execute it, then designing the checks that decide whether the result survives. I want to be precise about the distinction: I set the questions and the controls, agents write most of the code, and my job is to try to break what comes back.",
  study: {
    title: "Six generations of a trading model, and the control that killed the best one",
    body: [
      "Over four days I ran a machine-learning study on US equity signals — six successive model generations, walk-forward validated, leak-checked. The sixth looked good enough to be interesting.",
      "So I built a control: 200 simulations that ignored the model entirely and bought twenty random names a day. The random control returned a median Sharpe of 1.54. My model's three recorded runs landed at the 24th, 86th, and 88th percentile of doing nothing clever at all. Layer in transaction costs — each 10 basis points of round-trip cost removes roughly 1.0 to 1.3 Sharpe — and the edge is gone entirely.",
      "The model was measuring market beta and calling it alpha. I wrote that up and shut the project down. Nothing in it ever placed a trade, and there are no broker credentials anywhere near it.",
    ],
    takeaway:
      "I think this is the more useful thing to show. Anyone can produce a backtest that looks profitable; the skill worth hiring is the one that goes looking for the control experiment that would embarrass it.",
    links: [
      {
        label: "Source",
        href: "https://github.com/Connor-Skudlarek/my-AI-shindigs",
      },
    ],
  },
} as const;

export type Tool = {
  title: string;
  blurb: string;
  href?: string;
  internal?: boolean;
  cta?: string;
};

export const tools: Tool[] = [
  {
    title: "Risk battle calculator",
    blurb:
      "I kept losing at Risk and wanted to know whether it was the dice or me. It was me. Monte Carlo simulation of the dice mechanics, running in your browser.",
    href: "/risk/",
    internal: true,
    cta: "Try it",
  },
  {
    title: "Crunchyroll dub check",
    blurb:
      "A tiny Chrome extension that turns the Dub badge green only when an English dub actually exists, instead of when one theoretically might.",
    href: "https://github.com/Connor-Skudlarek",
    cta: "GitHub",
  },
  {
    title: "Meatball Truck",
    blurb:
      "A local food truck wanted off Squarespace, so I built them a replacement on the MERN stack. It never shipped — the client stayed put — and the lesson stuck: confirm someone will actually switch before you build the thing they'd switch to.",
    href: "https://github.com/Connor-Skudlarek/meatball-truck",
    cta: "GitHub",
  },
];

export const contact = {
  heading: "Let's talk",
  body: "I'm employed and not in a hurry, which means I can be picky and so can you. If you're building something where measurement matters, I'd like to hear about it.",
} as const;
