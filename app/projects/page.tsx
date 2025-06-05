'use client';

import Dock from '@/components/Dock';

export default function ProjectsContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="w-full flex flex-col gap-12 max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
          <h1 className="font-bold text-4xl">Projects</h1>

          {/* Soon */}
          <div></div>
        </div>
      </div>
      <div className="flex-shrink-0 pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
        <Dock />
      </div>
    </div>
  );
}
