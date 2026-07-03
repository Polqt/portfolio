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

// ─── Typed re-exports from JSON ───
export const experiences = experiencesData as Experience[];
export const education = educationData as Education[];
export const certifications = certificationsData as Certification[];
export const hackathons = hackathonsData as Hackathon[];
export const achievements = achievementsData as Achievement[];
export const skillCategories = skillsData.categories as SkillCategory[];
export const projects = projectsData as Project[];
