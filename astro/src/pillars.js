// Stable research areas. Fine-grained subjects belong in post tags so this
// navigation does not become a wall of near-duplicate categories.
export const PILLARS = [
  {
    slug: 'distributed-systems',
    label: 'Distributed Systems',
    blurb: 'Kafka, Flink, DDIA, data infrastructure, and the trade-offs behind reliable systems.'
  },
  {
    slug: 'ai-ml',
    label: 'AI & ML',
    blurb: 'Models, agents, evaluation, and the engineering required to make AI systems useful and dependable.'
  },
  {
    slug: 'speech-audio',
    label: 'Speech & Audio',
    blurb: 'ASR, speech models, audio understanding, and the systems that make voice interfaces work.'
  },
  {
    slug: 'vision-video',
    label: 'Vision & Video',
    blurb: 'Visual understanding, video generation and processing, and production systems for moving images.'
  },
  {
    slug: 'multimodal-ai',
    label: 'Multimodal AI',
    blurb: 'Systems that reason across text, images, audio, and video instead of treating each modality alone.'
  },
  {
    slug: 'context-memory',
    label: 'Context & Memory',
    blurb: 'Retrieval, long context, memory architectures, and how intelligent systems preserve useful state.'
  },
  {
    slug: 'manaska-research',
    label: 'Manaska Research',
    blurb: 'Research notes and engineering decisions from building Manaska as an adaptive learning system.'
  }
];

export const pillarBySlug = (slug) => PILLARS.find((p) => p.slug === slug);
