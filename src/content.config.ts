import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: 'content/guides/' }),
  schema: z.object({
    layout: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.date(),
    authors: z.array(z.object({
        name: z.string(),
        url: z.string().optional(),
    })),
    tags: z.array(z.string()),
  }),
});

export const collections = { guides: guides };