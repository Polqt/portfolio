'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GitCommit, GitPullRequest, Star, ArrowRight } from 'lucide-react';
import { IconBrandGithub } from '@tabler/icons-react';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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

        // Fetch recent events for commits
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

  if (!mounted) return null;

  return (
    <div className="bento-item group h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <IconBrandGithub className="h-4 w-4 text-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            GitHub
          </span>
        </div>
        <Link
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
        >
          @{SITE.githubUsername}
          <ArrowRight className="h-2.5 w-2.5" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[
          {
            label: 'Repos',
            value: stats?.publicRepos ?? '—',
            icon: GitPullRequest,
          },
          { label: 'Stars', value: stats?.totalStars ?? '—', icon: Star },
          {
            label: 'Follows',
            value: stats?.followers ?? '—',
            icon: IconBrandGithub,
          },
        ].map(item => (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-lg bg-muted/30 px-1.5 py-1.5"
          >
            <item.icon className="h-2.5 w-2.5 text-muted-foreground mb-0.5" />
            <span className="text-xs font-bold text-foreground">
              {item.value}
            </span>
            <span className="text-[9px] text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-1.5">
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60 font-medium">
          Recent
        </span>
        {stats?.recentCommits.length ? (
          stats.recentCommits.slice(0, 2).map((commit, i) => (
            <Link
              key={i}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 group/commit"
            >
              <GitCommit className="h-3 w-3 text-poke-grass mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-foreground truncate leading-tight group-hover/commit:text-primary transition-colors">
                  {commit.message}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  {commit.repo} · {commit.date}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted/50 animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="h-2.5 w-3/4 rounded bg-muted/50 animate-pulse" />
                  <div className="h-2 w-1/2 rounded bg-muted/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
