'use client';

import { NotesCardProps } from '@/types/notes';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function NotesCard({ note }: NotesCardProps) {
  return (
    <Link href={`/notes/${note.id}`} className="block group">
      <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm transition-all duration-500 hover:border-border hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10">
        {/* Content */}
        <div className="relative p-8 sm:p-10">
          {/* Meta Info */}
          <div className="mb-6 flex items-center gap-4 text-sm">
            <time className="flex items-center gap-2 text-muted-foreground dark:text-white/50">
              <Calendar className="h-4 w-4" />
              <span>{note.date}</span>
            </time>
            <span className="text-border dark:text-white/20">•</span>
            <div className="flex items-center gap-2 text-muted-foreground dark:text-white/50">
              <Clock className="h-4 w-4" />
              <span>{note.readTime} read</span>
            </div>
            <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary-foreground">
              {note.category}
            </span>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-lg bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm transition-all hover:bg-muted dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Hover Effect Line */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Background Accent */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 dark:bg-primary/10" />
      </article>
    </Link>
  );
}
