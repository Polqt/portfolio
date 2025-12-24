export interface Project {
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  status: 'completed' | 'in-progress';
  liveUrl?: string;
  highlights?: string[];
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}