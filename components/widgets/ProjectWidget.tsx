'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { projects } from '@/data/site';

export default function ProjectWidget() {
  const featured = projects[0];
  return (
    <div className="bento-item group h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">
          Featured Project
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
            featured.status === 'completed'
              ? 'bg-poke-grass/10 text-poke-grass'
              : 'bg-poke-fire/10 text-poke-fire'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              featured.status === 'completed'
                ? 'bg-poke-grass'
                : 'bg-poke-fire animate-pulse'
            }`}
          />
          {featured.status === 'completed' ? 'Shipped' : 'Building'}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground mb-1.5">
          {featured.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {featured.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {featured.techStack.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {featured.techStack.length > 4 && (
            <span className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{featured.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
        <Link
          href={featured.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <IconBrandGithub className="h-3.5 w-3.5" />
          <span>Source</span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span>All projects</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
