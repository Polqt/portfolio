// ─── Notes ───
export interface Note {
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

export interface NoteCardProps {
  note: Note;
  view?: 'list' | 'grid';
}

// ─── Projects ───
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
  featured?: boolean;
}

// ─── Experience ───
export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type: 'full-time' | 'fellowship' | 'freelance' | 'internship' | 'part-time';
  description: string;
  achievements: string[];
  website?: string;
}

// ─── Education ───
export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: 'Currently Enrolled' | 'Graduated';
}

// ─── Achievements ───
export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badge?: string;
}

export interface Hackathon {
  name: string;
  organizer: string;
  date: string;
  placement?: string;
  project?: string;
  description: string;
  teamSize?: number;
  techUsed?: string[];
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  category: 'award' | 'recognition' | 'milestone';
  icon?: string;
}

// ─── Skills ───
export interface SkillCategory {
  category: string;
  type: string;
  skills: string[];
}

// ─── Spotify ───
export interface SpotifyTrack {
  name: string;
  artist: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
  duration?: number;
}

export interface SpotifyData {
  configured: boolean;
  current: (SpotifyTrack & { isPlaying: boolean; progress?: number }) | null;
  recentTracks: SpotifyTrack[];
}

// ─── Geolocation ───
export interface GeoLocation {
  city: string;
  region: string;
  country: string;
  flag: string;
  timezone: string;
  lat?: number;
  lon?: number;
}
