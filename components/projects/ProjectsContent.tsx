'use client';

import { useState } from 'react';
import Dock from '@/components/Dock';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/site';
import { FolderOpen, Rocket, Wrench } from 'lucide-react';

type FilterStatus = 'all' | 'completed' | 'in-progress';

export default function ProjectsContent() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const completedCount = projects.filter(p => p.status === 'completed').length;
  const inProgressCount = projects.filter(
    p => p.status === 'in-progress',
  ).length;

  const featured = projects.find(p => p.status === 'completed') ?? projects[0];
  const rest = projects.filter(p => p !== featured);

  const filtered =
    filter === 'all' ? rest : rest.filter(p => p.status === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="w-full max-w-5xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-24">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="h-4 w-4 text-primary" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Projects
                </h1>
              </div>
              <p className="text-sm text-muted-foreground max-w-lg">
                Building things that solve real problems — from AI pipelines to
                real-time collaboration tools.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1">
              {(
                [
                  { key: 'all', label: 'All', count: projects.length },
                  {
                    key: 'completed',
                    label: 'Shipped',
                    count: completedCount,
                    icon: Rocket,
                  },
                  {
                    key: 'in-progress',
                    label: 'Building',
                    count: inProgressCount,
                    icon: Wrench,
                  },
                ] as const
              ).map(tab => {
                const Icon = 'icon' in tab ? tab.icon : null;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      filter === tab.key
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {Icon && <Icon className="h-3 w-3" />}
                    {tab.label}
                    <span
                      className={`ml-0.5 text-[10px] ${filter === tab.key ? 'text-primary/70' : 'text-muted-foreground/50'}`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Project */}
          {filter === 'all' && (
            <div className="mb-6">
              <ProjectCard project={featured} featured />
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(project => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          {filtered.length === 0 && filter !== 'all' && (
            <div className="text-center py-16">
              <p className="text-sm text-muted-foreground">
                No {filter === 'completed' ? 'shipped' : 'in-progress'} projects
                yet.
              </p>
            </div>
          )}
        </div>
      </div>
      <Dock />
    </div>
  );
}
