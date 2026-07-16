import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/notes' }),
  schema: z.object({
    category: z.string(),
    date: z.string(),
    description: z.string(),
    githubUrl: z.url().optional(),
    tags: z.array(z.string()),
    title: z.string(),
    updated: z.string().optional(),
  }),
});

const projectWriteups = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/projects' }),
  schema: z.object({
    // must match a `name` in data/projects.json exactly
    project: z.string(),
  }),
});

export const collections = { notes, projectWriteups };
