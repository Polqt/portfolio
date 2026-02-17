import type { Note } from '@/types';
import notesData from '@/data/notes.json';

const notes = notesData as Note[];

export function getAllNotes(): Note[] {
  return notes;
}

export function getNoteById(id: string): Note | undefined {
  return notes.find(note => note.id === id);
}

export function getNotesCount(): number {
  return notes.length;
}

export function searchNotes(query: string): Note[] {
  const q = query.toLowerCase().trim();
  if (!q) return notes;
  return notes.filter(
    note =>
      note.title.toLowerCase().includes(q) ||
      note.description.toLowerCase().includes(q) ||
      note.tags.some(tag => tag.toLowerCase().includes(q)) ||
      note.category.toLowerCase().includes(q),
  );
}

export function getLatestNote(): Note | undefined {
  return notes[notes.length - 1];
}
