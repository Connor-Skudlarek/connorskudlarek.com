export const site = {
  name: "Connor Skudlarek",
  role: "Equipment Engineer & Software Developer",
  location: "Portland, Oregon",
  email: "connor.skudlarek@gmail.com",
  github: "https://github.com/Connor-Skudlarek",
  linkedin: "https://www.linkedin.com/in/connor-skudlarek",
  url: "https://connorskudlarek.com",
  tagline: "Semiconductor equipment engineer who builds software.",
  description:
    "Connor Skudlarek is an engineer in Portland, Oregon. He works on semiconductor manufacturing equipment at Lam Research and builds full-stack software with TypeScript, React, Next.js, and PostgreSQL.",
} as const;

export const hero = {
  greeting: "Hi, I'm Connor Skudlarek.",
  lead: "I work on semiconductor manufacturing equipment at Lam Research, and I write software — increasingly for the same kinds of problems.",
  body: "Measurement, instrumentation, and root-cause analysis on machines where being wrong is expensive. I taught myself full-stack development along the way, and led the frontend on a nonprofit's e-commerce build.",
  looking:
    "Open to conversations about equipment troubleshooting, internal tooling, and software that has to agree with a machine — Portland or remote.",
} as const;

export const about = {
  heading: "Two kinds of engineering",
  paragraphs: [
    "My day job is semiconductor capital equipment: the machines that manufacture chips, and the work of keeping them inside specification. It is a job about trusting numbers. A tool reports a measurement, and someone has to decide whether the measurement is real, whether the process drifted or the instrument did — and be right, because the wrong call gets expensive in a way that shows up on a wafer.",
    "I studied mechanical engineering at Oregon Tech with a minor in applied mathematics, then started writing software and didn't stop. The Odin Project, then Frontend Masters, then projects with real users and real deadlines. In 2024 I joined 4Human Corporation as a volunteer and ended up leading the frontend on their largest build, working with ten-plus other volunteers across several time zones.",
    "The two halves have converged more than I expected. Manufacturing runs on software that most software people never see: data collection, tolerance analysis, test and maintenance systems, anything that turns instrument output into a decision someone has to stand behind. I know that domain from the inside and I can build the tools, and I would rather use both than pick one.",
    "I also spend a fair amount of time directing AI agents through research and build work, which mostly means writing precise specifications and then designing the check that decides whether the result survives. On one study I built a random-entry control that invalidated my own best model — it was measuring market beta rather than skill — and I closed the project. Knowing which result deserves to be distrusted is the part that stays with a person.",
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
    period: "2021 – Present",
    location: "Tualatin, OR",
    summary:
      "Semiconductor capital equipment in an R&D lab: keeping production and prototype tools inside specification, and finding out why when they aren't. Root-cause work across mechanical, electrical, gas, vacuum, and software systems; supporting the engineers and scientists who need the tool back; reviewing and correcting service procedures; training newer engineers. I also build the small internal tools the work keeps asking for.",
  },
  {
    org: "4Human Corporation",
    role: "Volunteer Lead Frontend Engineer",
    period: "Jan – Jun 2024",
    summary:
      "A 501(c)(3) that builds software for other nonprofits. I led the frontend for the Murphy Charitable Foundation Uganda storefront and became the project's top contributor, coordinating a distributed volunteer team of ten-plus.",
  },
  {
    org: "Oregon Institute of Technology",
    role: "BS Mechanical Engineering, minor in Applied Mathematics",
    period: "2016 – 2020",
    summary:
      "Hands-on engineering program. The applied math minor is where the statistics and numerical methods came from, and it is why the data side of software felt familiar later on.",
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  demonstrates: string;
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
    demonstrates: "Leading a team",
    blurb:
      "The Murphy Charitable Foundation Uganda needed a storefront that could take donations and sell goods without a budget for software. I led the frontend build: component architecture, the design system, and the review process that let a rotating cast of volunteers ship without stepping on each other.",
    role: "Volunteer Lead Frontend Engineer, 4Human Corporation",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Firebase",
      "NextAuth",
    ],
    metrics: [
      { label: "Top contributor", value: "91 commits" },
      { label: "Next most active", value: "25 commits" },
      { label: "Volunteer team", value: "10+ people" },
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
    subtitle: "Equipment maintenance tracking, designed from the lab floor",
    demonstrates: "Domain knowledge, applied",
    blurb:
      "A tool goes down. Three people each know part of why, and none of it is written anywhere. Six months later the same failure costs the same afternoon. I built the tracker I wanted on the floor — organized around equipment and its history rather than around tickets — first on a MERN stack, then rewritten on Next.js and Postgres once the client-side data fetching stopped paying for itself.",
    role: "Solo build, 104 commits",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "NextAuth",
      "Zod",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Commits", value: "104" },
      { label: "Rewrite", value: "MERN → Next.js" },
      { label: "Data layer", value: "Raw SQL, no ORM" },
    ],
    links: [
      {
        label: "Live demo",
        href: "https://wafer-wizards.vercel.app",
        note: "the tracker itself needs an account",
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
    demonstrates: "Local-only by design",
    blurb:
      "Recommendation algorithms learn from what you engage with, and arguing with strangers teaches them to show you more strangers to argue with. This extension watches what you're typing into a reply box and gives you a moment to reconsider before you post. Everything runs inside the extension; nothing you type leaves the machine. A tone classifier is the next milestone — today it's the intercept-and-nudge loop.",
    role: "Solo build",
    stack: ["TypeScript", "Chrome Manifest V3", "esbuild"],
    links: [
      {
        label: "Source",
        href: "https://github.com/Connor-Skudlarek/negative-nancy-negator",
      },
    ],
    featured: false,
  },
];

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
      "I wanted to know what a Risk attack actually costs before committing to it, so I simulated the dice. Ties go to the defender, and that one rule moves the odds further than most players expect. Runs in your browser, no sign-in.",
    href: "/risk/",
    internal: true,
    cta: "Try it",
  },
  {
    title: "Meatball Truck",
    blurb:
      "A MERN replacement for a local food truck's Squarespace site. The client decided to stay put, which taught me to confirm someone will actually switch before building the thing they would switch to — a check I have run on every project since.",
    href: "https://github.com/Connor-Skudlarek/meatball-truck",
    cta: "GitHub",
  },
];

export const contact = {
  heading: "Let's talk",
  body: "Open to conversations — data collection, test and measurement, maintenance and process tooling, or anything where the software has to agree with a machine. Portland or remote.",
} as const;
