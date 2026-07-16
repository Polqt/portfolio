import { ImageResponse } from '@vercel/og';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { APIRoute } from 'astro';
import { projects } from '@/data/site';
import { slugifyProjectName } from '@/lib/slug';

export const prerender = true;

export async function getStaticPaths() {
  return projects.map((project) => ({
    params: { slug: slugifyProjectName(project.name) },
    props: { project },
  }));
}

const bg = '#10100f';
const fg = '#f0f0ea';
const accent = '#75a7f7';

export const GET: APIRoute = async ({ props }) => {
  const { project } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];

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
        children: 'Janpol Hidalgo / Projects',
      }),
      jsx('div', {
        style: { display: 'flex', fontSize: 64, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.03em' },
        children: project.name,
      }),
      jsxs('div', {
        style: { display: 'flex', gap: '16px', fontSize: 26, color: '#a8a89f' },
        children: project.techStack.slice(0, 4).join(' · '),
      }),
    ],
  });

  return new ImageResponse(markup, { width: 1200, height: 630 });
};
