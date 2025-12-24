'use client';

import { ProjectCardProps } from '@/types/projects';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ project }: ProjectCardProps) {
  const isCompleted = project.status === 'completed';

  return (
    <article className="group h-full">
      <div className="flex h-full flex-col rounded-lg border border-border/50 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-md">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
              isCompleted
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-orange-500/10 text-orange-400'
            }`}
          >
            {isCompleted ? 'Done' : 'In Progress'}
          </span>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-white/70">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="mb-5 flex-1">
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1.5">
              {project.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <span className="text-white/40">•</span>
                  <span className="flex-1">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="rounded bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70 transition-colors hover:bg-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-border/30 pt-4">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <Github className="h-4 w-4" />
            <span>View on GitHub</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
