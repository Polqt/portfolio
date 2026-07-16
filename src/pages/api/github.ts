import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { SITE } from '@/data/site';

export const prerender = false;

const userSchema = z.object({
  avatar_url: z.url(),
  followers: z.number(),
  html_url: z.url(),
  login: z.string(),
  name: z.string().nullable(),
  public_repos: z.number(),
});
const repoSchema = z.array(z.object({ stargazers_count: z.number().nullable() }));
const eventSchema = z.array(z.object({
  created_at: z.string().nullable(),
  payload: z.object({ commits: z.array(z.object({ message: z.string() })).optional() }),
  repo: z.object({ name: z.string() }),
  type: z.string(),
}));

class GitHubRequestError extends Error {
  override readonly name = 'GitHubRequestError';

  constructor(readonly status: number) {
    super(`GitHub request failed: ${status}`);
  }
}

async function github(path: string): Promise<unknown> {
  const headers = new Headers({
    Accept: 'application/vnd.github+json',
    'User-Agent': 'janpol-hidalgo-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  });
  if (import.meta.env.GITHUB_TOKEN) {
    headers.set('Authorization', `Bearer ${import.meta.env.GITHUB_TOKEN}`);
  }
  const response = await fetch(`https://api.github.com${path}`, {
    headers,
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new GitHubRequestError(response.status);
  return response.json();
}

const contributionQuery = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
    }
  }
`;

const contributionSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          weeks: z.array(z.object({
            contributionDays: z.array(z.object({ date: z.string(), contributionCount: z.number() })),
          })),
        }),
      }),
    }).nullable(),
  }),
});

/** Contribution calendar needs GitHub's GraphQL API; the REST API has no equivalent endpoint. */
async function fetchContributions(login: string): Promise<{ date: string; count: number }[] | null> {
  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) return null;
  const response = await fetch('https://api.github.com/graphql', {
    body: JSON.stringify({ query: contributionQuery, variables: { login } }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'janpol-hidalgo-portfolio',
    },
    method: 'POST',
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) return null;
  const parsed = contributionSchema.safeParse(await response.json());
  if (!parsed.success || !parsed.data.data.user) return null;
  return parsed.data.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({ date: day.date, count: day.contributionCount }));
}

function currentStreak(days: readonly { date: string; count: number }[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if (days[i]!.count === 0) {
      // allow today to have zero contributions so far without breaking an
      // otherwise-live streak
      if (i === days.length - 1) continue;
      break;
    }
    streak += 1;
  }
  return streak;
}

export const GET: APIRoute = async () => {
  try {
    const [userValue, repoValue, eventResult, contributions] = await Promise.all([
      github(`/users/${SITE.githubUsername}`),
      github(`/users/${SITE.githubUsername}/repos?per_page=100&sort=updated`),
      github(`/users/${SITE.githubUsername}/events?per_page=30`).catch(() => []),
      fetchContributions(SITE.githubUsername).catch(() => null),
    ]);
    const user = userSchema.parse(userValue);
    const repos = repoSchema.parse(repoValue);
    const events = eventSchema.parse(eventResult);
    const recentCommits = events
      .filter((event) => event.type === 'PushEvent' && event.payload.commits?.length)
      .slice(0, 3)
      .map((event) => ({
        date: event.created_at ?? '',
        message: event.payload.commits?.[0]?.message.split('\n')[0] ?? 'commit',
        repo: event.repo.name,
        url: `https://github.com/${event.repo.name}`,
      }));
    return Response.json({
      avatar: user.avatar_url,
      configured: true,
      contributions,
      displayName: user.name ?? user.login,
      followers: user.followers,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      recentCommits,
      streak: contributions ? currentStreak(contributions) : null,
      totalStars: repos.reduce((total, repo) => total + (repo.stargazers_count ?? 0), 0),
    }, { headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400' } });
  } catch {
    return Response.json({
      configured: false,
      contributions: null,
      followers: 0,
      publicRepos: 0,
      recentCommits: [],
      streak: null,
      totalStars: 0,
    });
  }
};
