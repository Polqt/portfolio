import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('The RSS feed requires a canonical site URL.');
  }

  const notes = (await getCollection('notes')).sort(
    (left, right) => Date.parse(right.data.date) - Date.parse(left.data.date),
  );

  return rss({
    title: 'Janpol Hidalgo — Notes',
    description: 'Engineering notes on backend systems, AI, and software craft.',
    site,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      link: `/notes/${note.id}`,
      pubDate: new Date(note.data.date),
    })),
  });
};
