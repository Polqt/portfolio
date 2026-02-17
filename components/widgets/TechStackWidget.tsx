'use client';

import { useState, useEffect } from 'react';
import { TYPE_COLORS } from '@/data/site';

interface TechItem {
  name: string;
  icon: string;
  type: string;
}

const techStack: TechItem[] = [
  { name: 'TypeScript', icon: 'typescript', type: 'electric' },
  { name: 'JavaScript', icon: 'javascript', type: 'electric' },
  { name: 'Python', icon: 'python', type: 'grass' },
  { name: 'Java', icon: 'spring', type: 'grass' },
  { name: 'Go', icon: 'go', type: 'water' },
  { name: 'SQL', icon: 'postgresql', type: 'water' },
  { name: 'Dart', icon: 'dart', type: 'ice' },
  { name: 'React', icon: 'react', type: 'water' },
  { name: 'Next.js', icon: 'nextdotjs', type: 'ghost' },
  { name: 'Svelte', icon: 'svelte', type: 'fire' },
  { name: 'Spring Boot', icon: 'spring', type: 'grass' },
  { name: 'Node.js', icon: 'nodedotjs', type: 'grass' },
  { name: 'FastAPI', icon: 'fastapi', type: 'grass' },
  { name: 'Express', icon: 'express', type: 'ghost' },
  { name: 'PostgreSQL', icon: 'postgresql', type: 'water' },
  { name: 'MariaDB', icon: 'mariadb', type: 'water' },
  { name: 'Firebase', icon: 'firebase', type: 'fire' },
  { name: 'Supabase', icon: 'supabase', type: 'grass' },
  { name: 'Docker', icon: 'docker', type: 'ice' },
  { name: 'AWS', icon: 'amazonaws', type: 'fire' },
  { name: 'Tailwind', icon: 'tailwindcss', type: 'ice' },
  { name: 'Flutter', icon: 'flutter', type: 'psychic' },
  { name: 'Git', icon: 'git', type: 'fire' },
  { name: 'JUnit', icon: 'junit5', type: 'steel' },
];

export default function TechStackWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bento-item group h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium text-muted-foreground">
          Tech Stack
        </span>
        <span className="text-[10px] text-muted-foreground/60 ml-auto">
          {techStack.length} tools
        </span>
      </div>

      <div className="flex-1 flex flex-wrap gap-1.5 content-start">
        {techStack.map((tech, index) => (
          <span
            key={tech.name}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium transition-all duration-300 hover:scale-105 ${TYPE_COLORS[tech.type] || 'bg-muted text-muted-foreground border-border'}`}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://cdn.simpleicons.org/${tech.icon}`}
              alt={tech.name}
              className="h-3 w-3 opacity-70"
              loading="lazy"
            />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
