'use client';

import Dock from '@/components/Dock';
import NotesContent from '@/components/notes/NotesContent';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { getNotesCount } from '@/lib/data';

export default function NotesPage() {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [query, setQuery] = useState('');
  const notesCount = getNotesCount();

  const placeholders = [
    'Search notes...',
    'Find tech insights...',
    'Explore my learnings...',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="w-full flex flex-col gap-8 md:gap-10 max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-24">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Blog
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
              A CS student&apos;s journey through code, experiments, and
              late-night discoveries. Sharing what I learn as I build, break,
              and occasionally fix things.
            </p>

            <div className="w-full [&>form]:!max-w-full">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-3 py-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">
                  {notesCount} {notesCount === 1 ? 'Article' : 'Articles'}
                </span>
              </div>

              <div className="hidden sm:flex gap-1.5">
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    view === 'list'
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    view === 'grid'
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <NotesContent query={query} view={view} />
        </div>
      </div>
      <Dock />
    </div>
  );
}
