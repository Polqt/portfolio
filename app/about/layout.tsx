import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Janpol Hidalgo — a software engineer and CS student from the Philippines, building modern web and mobile experiences.',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
