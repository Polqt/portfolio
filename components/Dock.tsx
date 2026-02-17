'use client';

import {
  Download,
  FolderIcon,
  HomeIcon,
  PencilIcon,
  UserIcon,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FloatingDock } from '@/components/ui/floating-dock';
import { SITE } from '@/data/site';
import ThemeToggle from './Theme';

export default function Dock() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    {
      title: 'Home',
      icon: <HomeIcon className="h-full w-full text-muted-foreground" />,
      href: '/',
    },
    {
      title: 'About',
      icon: <UserIcon className="h-full w-full text-muted-foreground" />,
      href: '/about',
    },
    {
      title: 'Projects',
      icon: <FolderIcon className="h-full w-full text-muted-foreground" />,
      href: '/projects',
    },
    {
      title: 'Blog',
      icon: <PencilIcon className="h-full w-full text-muted-foreground" />,
      href: '/notes',
    },
    {
      title: 'CV',
      icon: <Download className="h-full w-full text-muted-foreground" />,
      href: SITE.cvPath,
    },
    {
      title: 'Theme',
      icon: <ThemeToggle theme={theme} setTheme={setTheme} mounted={mounted} />,
      href: '#',
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-auto z-50">
      <FloatingDock items={links} />
    </div>
  );
}
