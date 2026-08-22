import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Stable research areas — see src/pillars.js for labels/blurbs.
// Every post belongs to one area; `tags` carry fine-grained topics such as
// Kafka, Flink, ASR, context, or memory.
const PILLAR_SLUGS = [
  'distributed-systems',
  'ai-ml',
  'speech-audio',
  'vision-video',
  'multimodal-ai',
  'context-memory',
  'manaska-research'
] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    pillar: z.enum(PILLAR_SLUGS).default('distributed-systems'),
    tags: z.array(z.string()).default([]),
    status: z.enum(['published', 'archived']).default('published'),
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
