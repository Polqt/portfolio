'use client';

import { NoteCardProps } from '@/types';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function NotesCard({ note, view = 'list' }: NoteCardProps) {
  if (view === 'grid') {
    return (
      <Link href={`/notes/${note.id}`} className="block group">
        <article className="relative overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full">
          <div className="relative p-4">
            <span className="inline-flex items-center rounded-md bg-poke-psychic/10 px-2 py-0.5 text-xs font-medium text-poke-psychic mb-2">
              {note.category}
            </span>
            <h2 className="mb-1.5 text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
              {note.title}
            </h2>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 mb-2">
              {note.description}
            </p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Calendar className="h-2.5 w-2.5" />
              <span>{note.date}</span>
              <span>&bull;</span>
              <Clock className="h-2.5 w-2.5" />
              <span>{note.readTime}</span>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full" />
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/notes/${note.id}`} className="block group">
      <article className="relative overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center rounded-md bg-poke-psychic/10 px-2 py-0.5 text-xs font-medium text-poke-psychic">
              {note.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{note.date}</span>
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>{note.readTime}</span>
            </div>
          </div>

          <h2 className="mb-2 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
            {note.title}
          </h2>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {note.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {note.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

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
