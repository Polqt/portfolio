import { ImageResponse } from '@vercel/og';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const prerender = true;

export async function getStaticPaths() {
  const notes = await getCollection('notes');
  return notes.map((note) => ({ params: { id: note.id }, props: { note } }));
}

const bg = '#10100f';
const fg = '#f0f0ea';
const accent = '#75a7f7';

// Satori (the engine behind @vercel/og) consumes plain {type, props} nodes;
// it doesn't need a real React runtime, so build the tree with object
// literals instead of importing react/jsx-runtime, which isn't a declared
// dependency and can fail to resolve on a clean install.
type Node = { type: string; props: { style: Record<string, string | number>; children: Node | Node[] | string } };

function el(type: string, style: Record<string, string | number>, children: Node | Node[] | string): Node {
  return { type, props: { style, children } };
}

export const GET: APIRoute = async ({ props }) => {
  const { note } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];

  const markup = el(
    'div',
    {
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
    [
      el('div', { display: 'flex', fontSize: 28, color: accent, letterSpacing: '0.04em', textTransform: 'uppercase' }, 'Janpol Hidalgo / Notes'),
      el('div', { display: 'flex', fontSize: 64, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.03em' }, note.data.title),
      el('div', { display: 'flex', fontSize: 26, color: '#a8a89f' }, note.data.date),
    ],
  );

  return new ImageResponse(markup as never, { width: 1200, height: 630 });
};
