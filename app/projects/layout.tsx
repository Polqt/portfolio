import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of web and mobile applications, from AI-powered platforms to real-time collaboration tools.',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
