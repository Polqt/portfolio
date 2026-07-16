import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { projects } from '@/data/site';

export const prerender = false;

const repoSchema = z.object({
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  license: z.object({ spdx_id: z.string() }).nullable(),
  pushed_at: z.string(),
  size: z.number(),
  html_url: z.url(),
});

function slugFrom(githubUrl: string): string | null {
  const match = /github\.com\/([^/]+)\/([^/]+)/.exec(githubUrl);
  return match ? `${match[1]}/${match[2]}` : null;
}

async function fetchRepo(slug: string): Promise<unknown> {
  const headers = new Headers({
    Accept: 'application/vnd.github+json',
    'User-Agent': 'janpol-hidalgo-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  });
  if (import.meta.env.GITHUB_TOKEN) {
    headers.set('Authorization', `Bearer ${import.meta.env.GITHUB_TOKEN}`);
  }
  const response = await fetch(`https://api.github.com/repos/${slug}`, {
    headers,
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new Error(`GitHub ${response.status} for ${slug}`);
  return response.json();
}

export const GET: APIRoute = async () => {
  const slugs = projects
    .map((project) => ('githubUrl' in project && typeof project.githubUrl === 'string' ? slugFrom(project.githubUrl) : null))
    .filter((slug): slug is string => slug !== null);

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const repo = repoSchema.parse(await fetchRepo(slug));
        return [slug, {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          license: repo.license?.spdx_id ?? null,
          lastCommit: repo.pushed_at,
          sizeKb: repo.size,
        }] as const;
      } catch {
        return [slug, null] as const;
      }
    }),
  );

  return Response.json(
    Object.fromEntries(results),
    { headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400' } },
  );
};
