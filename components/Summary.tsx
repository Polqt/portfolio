import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function Summary() {
  const summaryText = `Like most devs, it started with curiosity. 
    One moment I was just clicking stuff, next thing I know I’m knee-deep in console logs and late-night "why isn't this working?!" breakdowns 😭. 
    Started from basic projects, now slowly climbing the tech jungle — from backend chaos to exploring the mind-blowing world of AI. 
    Still on the grind, always learning, and lowkey building my own multiverse of apps one bug at a time. Not perfect, but built diff.`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          <TextGenerateEffect
            words={summaryText}
            className="text-slate-600 dark:text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
