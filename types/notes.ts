export interface Notes {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

export interface NotesCardProps {
  note: Notes;
  index: number;
}
