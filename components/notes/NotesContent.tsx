'use client';

import { searchNotes } from '@/lib/data';
import NotesCard from './NotesCard';

interface NotesContentProps {
  query?: string;
  view?: 'list' | 'grid';
}

export default function NotesContent({
  query = '',
  view = 'list',
}: NotesContentProps) {
  const notes = searchNotes(query);

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">No notes found.</p>
        {query && (
          <p className="text-xs text-muted-foreground/60 mt-1">
            Try a different search term.
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={
        view === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
          : 'space-y-6 md:space-y-8'
      }
    >
      {notes.map(note => (
        <NotesCard key={note.id} note={note} view={view} />
      ))}
    </div>
  );
}
