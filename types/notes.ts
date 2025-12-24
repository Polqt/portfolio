export interface Notes {
  name: string;
  description: string;
}

export interface NotesCardProps {
  notes: Notes;
  index: number;
}