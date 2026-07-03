'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE } from '@/data/site';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  recentCommits: RecentCommit[];
}

interface RecentCommit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

export default function GitHubWidget() {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const userRes = await fetch(
          `https://api.github.com/users/${SITE.githubUsername}`,
        );
        const user = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${SITE.githubUsername}/repos?per_page=100&sort=updated`,
        );
        const repos = await reposRes.json();
        const totalStars = Array.isArray(repos)
          ? repos.reduce(
              (sum: number, r: { stargazers_count: number }) =>
                sum + r.stargazers_count,
              0,
            )
          : 0;

        const eventsRes = await fetch(
          `https://api.github.com/users/${SITE.githubUsername}/events?per_page=30`,
        );
        const events = await eventsRes.json();

        const pushEvents = Array.isArray(events)
          ? events
              .filter((e: { type: string }) => e.type === 'PushEvent')
              .slice(0, 3)
          : [];

        const recentCommits: RecentCommit[] = await Promise.all(
          pushEvents.map(
            async (e: {
              repo: { name: string };
              payload: {
                commits: { message: string; sha: string }[];
                head: string;
              };
              created_at: string;
            }) => {
              const repoName = e.repo.name;
              const shortRepo = repoName.split('/')[1];
              const date = new Date(e.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
              const url = `https://github.com/${repoName}`;

              let message = e.payload.commits?.[0]?.message?.split('\n')[0];

              if (!message) {
                const sha = e.payload.head || e.payload.commits?.[0]?.sha;
                if (sha) {
                  try {
                    const commitRes = await fetch(
                      `https://api.github.com/repos/${repoName}/commits/${sha}`,
                    );
                    const commitData = await commitRes.json();
                    message = commitData?.commit?.message?.split('\n')[0];
                  } catch {}
                }
              }

              return {
                repo: shortRepo,
                message: message || 'commit',
                date,
                url,
              };
            },
          ),
        );

        setStats({
          publicRepos: user.public_repos || 0,
          followers: user.followers || 0,
          totalStars,
          recentCommits,
        });
      } catch {}
    }

    fetchGitHub();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border pb-3">
        {[
          { label: 'Repos', value: stats?.publicRepos },
          { label: 'Stars', value: stats?.totalStars },
          { label: 'Followers', value: stats?.followers },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center gap-0.5">
            <span className="font-mono text-xl font-semibold leading-none text-foreground">
              {item.value ?? '·'}
            </span>
            <span className="plaque">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-2 pt-3">
        {stats?.recentCommits.length ? (
          stats.recentCommits.slice(0, 3).map((commit, i) => (
            <Link
              key={i}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/commit block"
            >
              <p className="truncate text-[12px] leading-tight text-foreground/85 transition-colors group-hover/commit:text-primary">
                {commit.message}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                {commit.repo} · {commit.date}
              </p>
            </Link>
          ))
        ) : (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-1">
                <div className="h-2.5 w-3/4 animate-pulse bg-muted" />
                <div className="h-2 w-1/2 animate-pulse bg-muted" />
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="plaque mt-3 border-t border-border pt-2.5 transition-colors hover:text-foreground"
      >
        @{SITE.githubUsername} on GitHub
      </Link>
    </div>
  );
}
