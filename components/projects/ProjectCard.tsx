'use client';

import { Project } from '@/types';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  const isCompleted = project.status === 'completed';

  if (featured) {
    return (
      <article className="group relative">
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg">
          {/* Featured Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
              ★ Featured
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                isCompleted
                  ? 'bg-poke-grass/10 text-poke-grass'
                  : 'bg-poke-fire/10 text-poke-fire'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isCompleted ? 'bg-poke-grass' : 'bg-poke-fire animate-pulse'}`}
              />
              {isCompleted ? 'Shipped' : 'Building'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-2xl">
            {project.description}
          </p>

          {/* Content */}
          <div className="grid gap-5 md:grid-cols-2 mb-5">
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-muted/50 px-2 py-1 text-[11px] font-medium text-muted-foreground border border-border/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/30">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </Link>
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default grid card
  return (
    <article className="group relative h-full">
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-lg h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                isCompleted
                  ? 'bg-poke-grass/10 text-poke-grass'
                  : 'bg-poke-fire/10 text-poke-fire'
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${isCompleted ? 'bg-poke-grass' : 'bg-poke-fire animate-pulse'}`}
              />
              {isCompleted ? 'Shipped' : 'Building'}
            </span>
          </div>

          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Highlights Preview */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1.5">
              {project.highlights.slice(0, 2).map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-[11px] text-muted-foreground/80"
                >
                  <span className="mt-1 flex h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  <span className="leading-relaxed line-clamp-1">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mt-auto pt-3 border-t border-border/30">
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="rounded-md bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/50">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
