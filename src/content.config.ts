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

const organisations = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'content/organisations/' }),
  schema: z.object({
    name: z.string(),
    orgType: z.enum(['department', 'agency', 'public body']).default('department'),
    mailAddress: z.object({
      line1: z.string(),
      line2: z.string().optional(),
      postCode: z.string(),
      city: z.string(),
      country: z.string(),
    }).optional(),
  }),
});

export const collections = {
  guides: guides,
  organisations: organisations,
};