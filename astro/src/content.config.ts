import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Strategic content pillars — see src/pillars.js for labels/blurbs.
// Every post belongs to exactly one pillar; `category` stays as the
// fine-grained topic shown on chips (e.g. "Kafka", "DDIA").
const PILLAR_SLUGS = [
  'system-design',
  'software-craft',
  'ai-agents',
  'everyday-ai',
  'learning',
  'build-in-public'
] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    pillar: z.enum(PILLAR_SLUGS).default('system-design'),
    videoId: z.string().optional(), // YouTube ID — renders a video embed at the top of the post
    featured: z.boolean().default(false),
    author: z.string().default('Hritik Kumar')
  })
});

const scribbles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scribbles' }),
  schema: z.object({
    date: z.coerce.date(),
    kind: z.enum(['thought', 'link', 'photo']).default('thought'),
    linkUrl: z.string().optional(),
    linkTitle: z.string().optional(),
    photo: z.string().optional(),
    caption: z.string().optional()
  })
});

export const collections = { blog, scribbles };
