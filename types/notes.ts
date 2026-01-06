export interface Notes {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  githubUrl?: string;
}

export interface NotesCardProps {
  note: Notes;
  index: number;
}
