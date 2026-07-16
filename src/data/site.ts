import achievementsData from '../../data/achievements.json';
import certificationsData from '../../data/certifications.json';
import educationData from '../../data/education.json';
import experiencesData from '../../data/experiences.json';
import hackathonsData from '../../data/hackathons.json';
import projectsData from '../../data/projects.json';
import skillsData from '../../data/skills.json';

export const SITE = {
  available: true,
  bio: `I build durable backend, data, and AI automation systems. My work spans full-stack, mobile, collaborative software, and practical AI tools using Java, TypeScript, and Python.`,
  cvPath: '/Hidalgo_CV.pdf',
  email: 'janpolhidalgo@gmail.com',
  github: 'https://github.com/Polqt',
  githubUsername: 'Polqt',
  lat: 10.8986,
  linkedin: 'https://www.linkedin.com/in/janpol-hidalgo-64174a241/',
  location: 'Sagay City, Philippines',
  lon: 123.4246,
  name: 'Janpol Hidalgo',
  role: 'Software Engineer',
  timezone: 'Asia/Manila',
} as const;

export const achievements = achievementsData;
export const certifications = certificationsData;
export const education = educationData;
export const experiences = experiencesData;
export const hackathons = hackathonsData;
export const projects = projectsData;
export const skillCategories = skillsData.categories;
