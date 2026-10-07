import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A topic is a section of the site, e.g. "Human Rights".
const topics = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/topics' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    order: z.number().default(99),
  }),
});

// One file per contributor. The text under the top lines is the bio.
const authors = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    affiliation: z.string().optional(),
    country: z.string().optional(),
    photo: z.string().optional(), // e.g. /src/assets/authors/name.jpg
    orcid: z.string().optional(), // e.g. 0000-0002-1825-0097
    linkedin: z.string().url().optional(),
    website: z.string().url().optional(),
  }),
});

// One file per article.
const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(400), // shown on cards and in search results
    authors: z.array(reference('authors')).min(1),
    topic: reference('topics'),
    kind: z.enum(['Article', 'Case summary', 'Commentary', 'Opinion']).default('Article'),
    date: z.coerce.date(),
    cover: z.string().optional(), // e.g. /src/assets/covers/my-image.jpg
    coverAlt: z.string().default(''), // describes the image for readers who cannot see it
    coverCredit: z.string().optional(), // e.g. Photo: Name / Unsplash. Shown under the image
    featured: z.boolean().default(false), // pinned in the Featured block on the front page
    keywords: z.array(z.string()).default([]),
    peerReviewed: z.boolean().default(true),
  }),
});

export const collections = { topics, authors, articles };
