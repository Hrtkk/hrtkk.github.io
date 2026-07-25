import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
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
