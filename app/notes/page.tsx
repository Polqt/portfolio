'use client';

import Dock from '@/components/Dock';
import NotesContent from '@/components/notes/NotesContent';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { getNotesCount } from '@/lib/notes';

export default function NotesPage() {
  const [activeIcon, setActiveIcon] = useState('list');
  const notesCount = getNotesCount();

  const placeholders = [
    'Search notes...',
    'Find tech insights...',
    'Explore my learnings...',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="w-full flex flex-col gap-12 md:gap-16 max-w-4xl mx-auto pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground dark:text-white">
                Notes
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground dark:text-white/60 max-w-3xl">
                A CS student&apos;s journey through code, experiments, and
                late-night discoveries. Sharing what I learn as I build, break,
                and occasionally fix things.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full [&>form]:!max-w-full">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/30 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                <div className="h-2 w-2 rounded-full bg-primary dark:bg-primary animate-pulse" />
                <span className="text-sm font-medium text-foreground dark:text-white/70">
                  {notesCount} {notesCount === 1 ? 'Article' : 'Articles'}
                </span>
              </div>

              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => setActiveIcon('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    activeIcon === 'list'
                      ? 'bg-muted text-foreground dark:bg-white/10 dark:text-white'
                      : 'text-muted-foreground hover:bg-muted/50 dark:text-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveIcon('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    activeIcon === 'grid'
                      ? 'bg-muted text-foreground dark:bg-white/10 dark:text-white'
                      : 'text-muted-foreground hover:bg-muted/50 dark:text-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <NotesContent />
        </div>
      </div>
      <div className="flex-shrink-0 pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
        <Dock />
      </div>
    </div>
  );
}
