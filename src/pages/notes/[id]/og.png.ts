import { ImageResponse } from '@vercel/og';
import { getCollection } from 'astro:content';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { APIRoute } from 'astro';

export const prerender = true;

export async function getStaticPaths() {
  const notes = await getCollection('notes');
  return notes.map((note) => ({ params: { id: note.id }, props: { note } }));
}

const bg = '#10100f';
const fg = '#f0f0ea';
const accent = '#75a7f7';

export const GET: APIRoute = async ({ props }) => {
  const { note } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];

  const markup = jsxs('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '1200px',
      height: '630px',
      padding: '80px',
      background: bg,
      color: fg,
      fontFamily: 'sans-serif',
    },
    children: [
      jsx('div', {
        style: { display: 'flex', fontSize: 28, color: accent, letterSpacing: '0.04em', textTransform: 'uppercase' },
        children: 'Janpol Hidalgo / Notes',
      }),
      jsx('div', {
        style: { display: 'flex', fontSize: 64, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.03em' },
        children: note.data.title,
      }),
      jsx('div', {
        style: { display: 'flex', fontSize: 26, color: '#a8a89f' },
        children: note.data.date,
      }),
    ],
  });

  return new ImageResponse(markup, { width: 1200, height: 630 });
};
