'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getLatestNote } from '@/lib/data';

export default function LatestBlogWidget() {
  const latest = getLatestNote();

  if (!latest) return null;

  return (
    <div className="bento-item group h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">
          Latest Blog Post
        </span>
        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          {latest.category}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-foreground mb-1.5 leading-snug line-clamp-2">
          {latest.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {latest.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-2.5 w-2.5" />
            {latest.date}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-2.5 w-2.5" />
            {latest.readTime}
          </span>
        </div>
        <Link
          href={`/notes/${latest.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span>Read</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
