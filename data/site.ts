import type {
  Experience,
  Education,
  Certification,
  Hackathon,
  Achievement,
  SkillCategory,
  Project,
} from '@/types';

// ─── JSON data imports ───
import experiencesData from './experiences.json';
import educationData from './education.json';
import certificationsData from './certifications.json';
import hackathonsData from './hackathons.json';
import achievementsData from './achievements.json';
import skillsData from './skills.json';
import projectsData from './projects.json';

// ─── Personal Info ───
export const SITE = {
  name: 'Janpol Hidalgo',
  role: 'Software Engineer',
  email: 'janpolhidalgo@gmail.com',
  location: 'Sagay City, Philippines',
  timezone: 'Asia/Manila',
  lat: 10.8986,
  lon: 123.4246,
  github: 'https://github.com/Polqt',
  githubUsername: 'Polqt',
  linkedin: 'https://www.linkedin.com/in/janpol-hidalgo-64174a241/',
  available: true,
  cvPath: '/Hidalgo-CV.pdf',
  bio: `Like most devs, it started with curiosity. 
  What started with simple projects eventually pulled me toward the deeper layers: 
  backend engineering in Go, solving DSA puzzles for fun, and exploring the data pipelines that keep systems breathing. 
  Along the way, I picked up the craft of building AI systems, not just using them. 
  These days, I’m more focused on designing durable backends, shaping data, and engineering solutions that actually solve problems—not just websites. 
  Always learning, always shipping, building my own little universe one meaningful fix at a time.`,
} as const;

// ─── Pokémon Type Color Map ───
export const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-poke-fire/10 text-poke-fire border-poke-fire/20',
  water: 'bg-poke-water/10 text-poke-water border-poke-water/20',
  electric: 'bg-poke-electric/10 text-poke-electric border-poke-electric/20',
  grass: 'bg-poke-grass/10 text-poke-grass border-poke-grass/20',
  ghost: 'bg-poke-ghost/10 text-poke-ghost border-poke-ghost/20',
  psychic: 'bg-poke-psychic/10 text-poke-psychic border-poke-psychic/20',
  ice: 'bg-poke-ice/10 text-poke-ice border-poke-ice/20',
  steel: 'bg-poke-steel/10 text-poke-steel border-poke-steel/20',
  fairy: 'bg-poke-fairy/10 text-poke-fairy border-poke-fairy/20',
  dragon: 'bg-poke-dragon/10 text-poke-dragon border-poke-dragon/20',
};

// ─── Experience Type Badge Colors ───
export const EXPERIENCE_TYPE_COLORS: Record<string, string> = {
  'Full-Time': 'bg-poke-electric/10 text-poke-electric border-poke-electric/20',
  Fellowship: 'bg-poke-ghost/10 text-poke-ghost border-poke-ghost/20',
  Freelance: 'bg-poke-grass/10 text-poke-grass border-poke-grass/20',
  Internship: 'bg-poke-water/10 text-poke-water border-poke-water/20',
  'Part-Time': 'bg-poke-psychic/10 text-poke-psychic border-poke-psychic/20',
};

// ─── Typed re-exports from JSON ───
export const experiences = experiencesData as Experience[];
export const education = educationData as Education[];
export const certifications = certificationsData as Certification[];
export const hackathons = hackathonsData as Hackathon[];
export const achievements = achievementsData as Achievement[];
export const skillCategories = skillsData.categories as SkillCategory[];
export const techSlugs = skillsData.techSlugs;
export const projects = projectsData as Project[];
