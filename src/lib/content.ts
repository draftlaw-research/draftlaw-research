import { getCollection, getEntry, getEntries } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { getCover } from './images';
import mostRead from '../data/most-read.json';

export type Topic = CollectionEntry<'topics'>;
export type Author = CollectionEntry<'authors'>;

export type Article = {
  id: string;
  entry: CollectionEntry<'articles'>;
  data: CollectionEntry<'articles'>['data'];
  topic: Topic;
  authors: Author[];
  minutes: number;
  url: string;
  cover: ImageMetadata;
};

/** All articles, newest first, with topic and authors already looked up. */
export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection('articles');
  const articles = await Promise.all(
    entries.map(async (entry): Promise<Article> => {
      const topic = await getEntry(entry.data.topic);
      const authors = await getEntries(entry.data.authors);
      if (!topic) throw new Error(`Article "${entry.id}" uses a topic that does not exist.`);
      if (authors.some((a) => !a)) throw new Error(`Article "${entry.id}" uses an author that does not exist.`);
      const words = (entry.body ?? '').split(/\s+/).filter(Boolean).length;
      return {
        id: entry.id,
        entry,
        data: entry.data,
        topic,
        authors,
        minutes: Math.max(1, Math.round(words / 220)),
        url: `/articles/${entry.id}/`,
        cover: getCover(entry.data.cover),
      };
    }),
  );
  return articles.sort((a, b) => +b.data.date - +a.data.date);
}

export async function getTopics(): Promise<Topic[]> {
  const topics = await getCollection('topics');
  return topics.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export async function getAuthors(): Promise<Author[]> {
  const authors = await getCollection('authors');
  return authors.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/** Most read list: the order comes from src/data/most-read.json. */
export function getMostRead(articles: Article[], count = 5): Article[] {
  const byId = new Map(articles.map((a) => [a.id, a]));
  const picked = mostRead.slugs.map((s) => byId.get(s)).filter((a): a is Article => Boolean(a));
  return picked.slice(0, count);
}

export const topicUrl = (t: Topic) => `/topics/${t.id}/`;
export const authorUrl = (a: Author) => `/authors/${a.id}/`;

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

export function nameList(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/** OSCOLA-style citation for an online article. */
export function citation(article: Article, siteName: string, origin: string): string {
  const names = article.authors.map((a) => a.data.name);
  const who = names.length > 3 ? `${names[0]} and others` : nameList(names);
  return `${who}, '${article.data.title}' (${siteName}, ${formatDate(article.data.date)}) <${origin}${article.url}>`;
}
