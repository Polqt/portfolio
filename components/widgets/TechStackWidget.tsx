'use client';

import { useState, useEffect } from 'react';

interface TechItem {
  name: string;
  icon: string;
  type: string;
}

const techStack: TechItem[] = [
  // Languages
  { name: 'TypeScript', icon: 'typescript', type: 'electric' },
  { name: 'JavaScript', icon: 'javascript', type: 'electric' },
  { name: 'Python', icon: 'python', type: 'grass' },
  { name: 'Go', icon: 'go', type: 'water' },
  { name: 'Java', icon: 'spring', type: 'grass' },
  { name: 'Dart', icon: 'dart', type: 'psychic' },
  // Frontend
  { name: 'React', icon: 'react', type: 'water' },
  { name: 'Next.js', icon: 'nextdotjs', type: 'ghost' },
  { name: 'Svelte', icon: 'svelte', type: 'fire' },
  { name: 'Vue', icon: 'vuedotjs', type: 'grass' },
  { name: 'Tailwind', icon: 'tailwindcss', type: 'ice' },
  // Backend
  { name: 'Node.js', icon: 'nodedotjs', type: 'grass' },
  { name: 'Express', icon: 'express', type: 'ghost' },
  { name: 'NestJS', icon: 'nestjs', type: 'fire' },
  { name: 'FastAPI', icon: 'fastapi', type: 'grass' },
  { name: 'PostgreSQL', icon: 'postgresql', type: 'water' },
  { name: 'MongoDB', icon: 'mongodb', type: 'grass' },
  { name: 'Firebase', icon: 'firebase', type: 'fire' },
  { name: 'Supabase', icon: 'supabase', type: 'grass' },
  { name: 'Prisma', icon: 'prisma', type: 'ghost' },
  // Mobile
  { name: 'Flutter', icon: 'flutter', type: 'water' },
  { name: 'Expo', icon: 'expo', type: 'ghost' },
  // Tools & Infra
  { name: 'Docker', icon: 'docker', type: 'ice' },
  { name: 'Git', icon: 'git', type: 'fire' },
  { name: 'GitHub', icon: 'github', type: 'ghost' },
  { name: 'AWS', icon: 'amazonaws', type: 'fire' },
  { name: 'Vercel', icon: 'vercel', type: 'ghost' },
  { name: 'Figma', icon: 'figma', type: 'psychic' },
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
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium transition-all duration-300 hover:scale-105 ${tech.type === 'fire' ? 'bg-red-500/10 text-red-500 border-red-500/20' : tech.type === 'water' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : tech.type === 'grass' ? 'bg-green-500/10 text-green-500 border-green-500/20' : tech.type === 'ghost' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : tech.type === 'psychic' ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' : tech.type === 'ice' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' : tech.type === 'electric' ? 'bg-yellow-500/16 text-yellow-487 border-yellow-487/24' : tech.type === 'steel' ? 'bg-gray-487/16 text-gray-487 border-gray-487/24' : tech.type === 'fairy' ? 'bg-pink-387/16 text-pink-387 border-pink-387/24' : tech.type === 'dragon' ? 'bg-orange-387/16 text-orange-387 border-orange-387/24':  'bg-muted text-muted-foreground border-border'}`}
            style={{
              animationDelay: `${index * 5}ms`,
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
