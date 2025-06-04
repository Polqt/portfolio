'use client';

import Header from '@/components/Header';

export default function ProjectsContent() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <div className="flex-shrink-0 pt-4 sm:pt-6 lg:pt-8">
        <Header />
      </div>

      <div className="w-full flex flex-col gap-12 max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-4xl">Projects</h1>

        {/* Soon */}
        <div></div>
      </div>
    </div>
  );
}