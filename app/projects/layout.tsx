import { Metadata } from 'next';
import ProjectsPage from './page';

export const metadata: Metadata = {
  title: 'Projects | Janpol Hidalgo',
  description:
    'Explore my portfolio of web and mobile applications, from AI-powered platforms to real-time collaboration tools.',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
  },
};

export default function Projects() {
  return <ProjectsPage />;
}
