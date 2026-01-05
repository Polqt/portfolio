'use client';

import { getAllNotes } from '@/lib/notes';
import NotesCard from './NotesCard';

export default function NotesContent() {
  const notes = getAllNotes();

  return (
    <div className="space-y-6 md:space-y-8">
      {notes.map((note, index) => (
        <NotesCard key={note.id} note={note} index={index} />
      ))}
    </div>
  );
}
