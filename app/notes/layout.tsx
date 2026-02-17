import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Janpol Hidalgo',
  description: 'Janpol Hidalgo Portfolio',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
  },
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
