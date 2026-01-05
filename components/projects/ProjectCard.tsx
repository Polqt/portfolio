'use client';

import { ProjectCardProps } from '@/types/projects';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project }: ProjectCardProps) {
  const isCompleted = project.status === 'completed';

  return (
    <article className="group relative">
      <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        {/* Header Section */}
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
              {project.name}
            </h3>
            <span
              className={`inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-colors ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30'
                  : 'bg-orange-500/10 text-orange-600 ring-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/30'
              }`}
            >
              {isCompleted ? '✓ Completed' : '⏳ In Progress'}
            </span>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground dark:text-white/70">
            {project.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Key Features */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground dark:text-white/50">
              Key Features
            </h4>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-muted-foreground dark:text-white/60"
                  >
                    <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary dark:bg-white/40" />
                    <span className="flex-1 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground dark:text-white/50">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center gap-4 border-t border-border/30 pt-5 dark:border-white/10">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground dark:text-white/60 dark:hover:text-white"
          >
            <Github className="h-4 w-4" />
            <span className='text-xs'>View Source</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground dark:text-white/60 dark:hover:text-white"
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
