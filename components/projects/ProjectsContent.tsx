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
    techStack: [
      'Go',
      'Bubbletea',
      'Lipgloss',
      'GitHub API',
      'SSH',
      'Glamour',
      'Wish',
    ],
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
        <div className="w-full flex flex-col gap-12 md:gap-16 max-w-4xl mx-auto pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground dark:text-white">
                Projects
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground dark:text-white/60 max-w-3xl">
                A collection of projects showcasing my work in AI, real-time
                collaboration, and full-stack development. Each project tackles
                real-world problems with modern technologies.
              </p>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/30 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span className="text-sm font-medium text-foreground dark:text-white/70">
                  {completedCount} Completed
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/30 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                <div className="h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-400" />
                <span className="text-sm font-medium text-foreground dark:text-white/70">
                  {inProgressCount} In Progress
                </span>
              </div>
            </div>
          </div>

          {/* Projects List - Single Column */}
          <div className="space-y-6 md:space-y-8">
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
