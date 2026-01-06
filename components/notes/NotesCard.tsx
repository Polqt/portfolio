'use client';

import { NotesCardProps } from '@/types/notes';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function NotesCard({ note }: NotesCardProps) {
  return (
    <Link href={`/notes/${note.id}`} className="block group">
      <article className="relative overflow-hidden rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 dark:bg-card/30">
        <div className="relative p-6">
          {/* Category badge */}
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary-foreground">
              {note.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-white/40">
              <Calendar className="h-3.5 w-3.5" />
              <span>{note.date}</span>
              <span>•</span>
              <Clock className="h-3.5 w-3.5" />
              <span>{note.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-xl font-bold tracking-tight text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors leading-tight">
            {note.title}
          </h2>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground dark:text-white/50 line-clamp-2">
            {note.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {note.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-xs text-foreground/70 dark:bg-white/5 dark:text-white/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Read more indicator */}
          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
            <span>Read more</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full" />
        </div>
      </article>
    </Link>
  );
}
