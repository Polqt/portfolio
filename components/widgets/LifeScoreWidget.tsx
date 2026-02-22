'use client';

import { useState, useEffect } from 'react';
import {
  Gamepad2,
  GitCommit,
  BookOpen,
  Music,
  Activity,
  PenLine,
} from 'lucide-react';
import xpRaw from '@/data/xp.json';

const xpData = xpRaw as {
  githubCommits: number;
  wordsWritten: number;
  songsPlayed: number;
  booksRead: number;
  stepsBonus: number;
  lastUpdated: string;
};

const LEVELS = [
  { level: 1, title: 'Fresh Clone', min: 0 },
  { level: 2, title: 'Hello World', min: 200 },
  { level: 3, title: 'Debug Mode', min: 500 },
  { level: 4, title: 'Junior Dev', min: 1000 },
  { level: 5, title: 'Code Craftsman', min: 1700 },
  { level: 6, title: 'Wandering Engineer', min: 2600 },
  { level: 7, title: 'Senior Hacker', min: 4000 },
  { level: 8, title: 'Systems Architect', min: 6000 },
  { level: 9, title: 'Legendary Dev', min: 9000 },
];

function getCurrentLevel(xp: number) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.min) current = lvl;
  }
  return current;
}

const LEVEL_COLORS = [
  'text-zinc-400', // 1
  'text-poke-grass', // 2
  'text-poke-water', // 3
  'text-poke-electric', // 4
  'text-poke-ice', // 5
  'text-poke-psychic', // 6
  'text-poke-fire', // 7
  'text-poke-dragon', // 8
  'text-primary', // 9
];

const LEVEL_BG_COLORS = [
  'bg-zinc-400/10 border-zinc-400/20',
  'bg-poke-grass/10 border-poke-grass/20',
  'bg-poke-water/10 border-poke-water/20',
  'bg-poke-electric/10 border-poke-electric/20',
  'bg-poke-ice/10 border-poke-ice/20',
  'bg-poke-psychic/10 border-poke-psychic/20',
  'bg-poke-fire/10 border-poke-fire/20',
  'bg-poke-dragon/10 border-poke-dragon/20',
  'bg-primary/10 border-primary/20',
];

const LEVEL_BAR_COLORS = [
  'bg-zinc-400',
  'bg-poke-grass',
  'bg-poke-water',
  'bg-poke-electric',
  'bg-poke-ice',
  'bg-poke-psychic',
  'bg-poke-fire',
  'bg-poke-dragon',
  'bg-primary',
];

export default function LifeScoreWidget() {
  const [mounted, setMounted] = useState(false);

  const githubXP = xpData.githubCommits * 5;
  const wordsXP = Math.floor(xpData.wordsWritten / 100) * 2;
  const musicXP = xpData.songsPlayed;
  const booksXP = xpData.booksRead * 10;
  const stepsXP = xpData.stepsBonus * 3;
  const totalXP = githubXP + wordsXP + musicXP + booksXP + stepsXP;

  const current = getCurrentLevel(totalXP);
  const nextLevel = LEVELS.find(l => l.level === current.level + 1);
  const progressXP = totalXP - current.min;
  const rangeXP = nextLevel ? nextLevel.min - current.min : 1;
  const progressPct = nextLevel
    ? Math.min((progressXP / rangeXP) * 100, 100)
    : 100;

  const colorIdx = current.level - 1;
  const textColor = LEVEL_COLORS[colorIdx];
  const badgeBg = LEVEL_BG_COLORS[colorIdx];
  const barColor = LEVEL_BAR_COLORS[colorIdx];

  const breakdown = [
    {
      label: 'Commits',
      xp: githubXP,
      icon: GitCommit,
      color: 'text-poke-grass',
    },
    {
      label: 'Writing',
      xp: wordsXP,
      icon: PenLine,
      color: 'text-poke-electric',
    },
    { label: 'Music', xp: musicXP, icon: Music, color: 'text-poke-psychic' },
    { label: 'Books', xp: booksXP, icon: BookOpen, color: 'text-poke-fire' },
    { label: 'Steps', xp: stepsXP, icon: Activity, color: 'text-poke-water' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bento-item h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Gamepad2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">
            Life Score
          </span>
        </div>
        <span className="text-[9px] text-muted-foreground/40 font-medium">
          updated {xpData.lastUpdated}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div
          className={`h-10 w-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${badgeBg}`}
        >
          <span className={`text-sm font-black ${textColor}`}>
            {current.level}
          </span>
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-bold leading-tight ${textColor}`}>
            {current.title}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {totalXP.toLocaleString()} XP total
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[9px] text-muted-foreground/50 mb-1">
          <span>
            {progressXP.toLocaleString()} / {rangeXP.toLocaleString()} XP
          </span>
          {nextLevel && (
            <span>
              Lvl {nextLevel.level}: {nextLevel.title}
            </span>
          )}
        </div>
        <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* XP Breakdown */}
      <div className="grid grid-cols-5 gap-1.5 mt-auto">
        {breakdown.map(item => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-0.5 rounded-lg bg-muted/20 py-1.5"
          >
            <item.icon className={`h-2.5 w-2.5 ${item.color}`} />
            <span className="text-[9px] font-bold text-foreground tabular-nums">
              {item.xp}
            </span>
            <span className="text-[8px] text-muted-foreground/50 leading-none">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
