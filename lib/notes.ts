import { Notes } from '@/types/notes';
import notesData from '@/data/notes.json';

/**
 * Get all notes
 * @returns Array of all notes
 */
export function getAllNotes(): Notes[] {
  return notesData as Notes[];
}

/**
 * Get a single note by ID
 * @param id - The note ID
 * @returns The note if found, undefined otherwise
 */
export function getNoteById(id: string): Notes | undefined {
  return notesData.find(note => note.id === id) as Notes | undefined;
}

/**
 * Get notes count
 * @returns Total number of notes
 */
export function getNotesCount(): number {
  return notesData.length;
}

/**
 * Search notes by query
 * @param query - Search query
 * @returns Filtered notes matching the query
 */
export function searchNotes(query: string): Notes[] {
  const lowercaseQuery = query.toLowerCase();
  return notesData.filter(
    note =>
      note.title.toLowerCase().includes(lowercaseQuery) ||
      note.description.toLowerCase().includes(lowercaseQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      note.category.toLowerCase().includes(lowercaseQuery),
  ) as Notes[];
}
