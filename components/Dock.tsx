'use client';

import { FolderIcon, HomeIcon, Mail, PencilIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconBrandGithub,
  IconBrandLinkedin,
} from '@tabler/icons-react';
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
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '/',
    },
    {
      title: 'About',
      icon: (
        <UserIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '/about',
    },
    {
      title: 'Projects',
      icon: (
        <FolderIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '/projects',
    },
    {
      title: 'Notes',
      icon: (
        <PencilIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '/notes',
    },
    {
      title: 'GitHub',
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: 'https://github.com/Polqt',
    },
    {
      title: 'LinkedIn',
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: 'https://www.linkedin.com/in/janpol-hidalgo-64174a241/',
    },
    {
      title: 'Email',
      icon: (
        <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#',
    },
    {
      title: 'Theme',
      icon: <ThemeToggle theme={theme} setTheme={setTheme} mounted={mounted} />,
      href: '#',
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </div>
  );
}
