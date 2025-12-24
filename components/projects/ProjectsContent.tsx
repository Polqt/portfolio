'use client';

import Dock from '@/components/Dock';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/projects';

const projects: Project[] = [
  {
    name: 'AICA Bot',
    description:
      'AI-Powered Job Matching Platform using RAG to intelligently match job seekers with opportunities through semantic search and AI analysis.',
    techStack: [
      'FastAPI',
      'Next.js',
      'TypeScript',
      'LangChain',
      'Claude AI',
      'FAISS',
      'PostgreSQL',
      'Supabase',
    ],
    githubUrl: 'https://github.com/Polqt/aica_bot',
    status: 'completed',
    highlights: [
      'RAG pipeline with 90%+ match accuracy',
      'Semantic search using FAISS vector store',
      'AI-powered resume parsing extracting 15-25 skills',
      'Real-time job matching with detailed reasoning',
    ],
  },
  {
    name: 'Tandaan',
    description:
      'Collaborative note-taking app with real-time editing, document sharing, and version control powered by Liveblocks.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Clerk',
      'Liveblocks',
      'Firebase',
      'Tailwind CSS',
      'Sentry',
    ],
    githubUrl: 'https://github.com/Polqt/tandaan-app',
    status: 'in-progress',
    highlights: [
      'Real-time collaborative editing',
      'Document version history and restoration',
      'User authentication with Clerk',
      'Firebase integration for data persistence',
    ],
  },
  {
    name: 'Yappin',
    description:
      'Real-time chat application featuring WebSocket-powered messaging, user achievements, and comprehensive admin panel.',
    techStack: [
      'SvelteKit',
      'Go',
      'TypeScript',
      'PostgreSQL',
      'WebSockets',
      'Docker',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/Polqt/yappin',
    status: 'in-progress',
    highlights: [
      'WebSocket-powered instant messaging',
      'User achievements system',
      'Public and private chat rooms',
      'Responsive mobile-friendly interface',
    ],
  },
  {
    name: 'CLIFolio',
    description:
      'Interactive terminal portfolio accessible via SSH. Navigate through projects, skills, and experience using keyboard controls.',
    techStack: ['Go', 'Bubbletea', 'Lipgloss', 'GitHub API', 'SSH', 'Glamour', 'Wish'],
    githubUrl: 'https://github.com/Polqt/clifolio',
    status: 'in-progress',
    highlights: [
      'SSH server for remote access',
      'GitHub integration for live project data',
      'Multiple theme support',
      'Matrix rain easter egg',
    ],
  },
  {
    name: 'PharmaFetch',
    description:
      'Mobile pharmacy finder app built with Expo and React Native, featuring location-based search and AI assistance.',
    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'TanStack Query',
      'Appwrite',
      'NativeWind',
    ],
    githubUrl: 'https://github.com/Polqt/pharmafetch',
    status: 'in-progress',
    highlights: [
      'Location-based pharmacy search',
      'Interactive map integration',
      'User authentication with Appwrite',
      'Modern mobile UI with NativeWind',
    ],
  },
];

export default function ProjectsContent() {
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const inProgressCount = projects.filter(
    p => p.status === 'in-progress',
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="w-full flex flex-col gap-10 md:gap-12 max-w-6xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 md:px-8 pb-12 md:pb-16">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                Projects
              </h1>
              <p className="text-base md:text-lg text-white/60 max-w-2xl pt-2">
                Projects I’ve built instead of touching grass. Includes AI and real-time features.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-white/70">
                  {completedCount} Completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-400" />
                <span className="text-white/70">
                  {inProgressCount} In Progress
                </span>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
        <Dock />
      </div>
    </div>
  );
}
