'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';
import Dock from '@/components/Dock';
import { getNoteById } from '@/lib/notes';
import { renderMarkdown } from '@/utils/markdown-renderer';

export default function NotePage() {
  const params = useParams();
  const note = getNoteById(params.id as string);

  if (!note) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-[#0a0a0a]">
      <div className="flex-1">
        <div className="w-full max-w-4xl mx-auto pt-16 px-6 sm:px-8 lg:px-12 pb-20">
          {/* Back Button */}
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white transition-colors mb-12 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Notes</span>
          </Link>

          {/* Article Header */}
          <article className="space-y-6">
            <header className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white leading-tight">
                {note.title}
              </h1>

              <div className="flex items-center gap-3 text-sm text-muted-foreground dark:text-white/40">
                <span>{note.date}</span>
                <span>•</span>
                <span>{note.readTime} read</span>
              </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-[15px] prose-p:leading-relaxed prose-li:text-[15px] prose-li:leading-relaxed">
              {renderMarkdown(note.content)}
            </div>

            {/* Footer */}
            <footer className="pt-12 mt-12 border-t border-border/20 dark:border-white/5">
              <Link
                href="https://github.com/Polqt/convex-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
              </Link>
            </footer>
          </article>
        </div>
      </div>
      <div className="flex-shrink-0 py-8">
        <Dock />
      </div>
    </div>
  );
}
