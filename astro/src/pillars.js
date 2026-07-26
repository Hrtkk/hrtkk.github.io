// The six content pillars. Slugs are stable URLs (/topics/<slug>/) used in
// YouTube descriptions and social bios — do not rename without redirects.
export const PILLARS = [
  {
    slug: 'system-design',
    label: 'System Design',
    blurb: 'Distributed systems, architecture trade-offs, and how large-scale systems actually work — starting at the constraint, not the API.'
  },
  {
    slug: 'software-craft',
    label: 'Software Craft',
    blurb: 'The everyday skills of building good software: patterns worth using, testing, code review, and reading unfamiliar codebases.'
  },
  {
    slug: 'ai-agents',
    label: 'AI & Agents',
    blurb: 'AI engineering for developers — agents, RAG, tool use, and adding AI features to real applications without the hype.'
  },
  {
    slug: 'everyday-ai',
    label: 'Everyday AI',
    blurb: 'Practical AI for everyone else: real tasks, free tools, and exactly which buttons to press. No jargon.'
  },
  {
    slug: 'learning',
    label: 'Learning',
    blurb: 'How people actually learn — spaced repetition, active recall, and using AI as a tutor instead of a shortcut.'
  },
  {
    slug: 'build-in-public',
    label: 'Build in Public',
    blurb: 'Devlogs from building Manaska, an adaptive learning platform: real architecture decisions and what they cost.'
  }
];

export const pillarBySlug = (slug) => PILLARS.find((p) => p.slug === slug);
