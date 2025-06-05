'use client';

import Experience from '@/components/Experience';
import Dock from '@/components/Dock';
import Summary from '@/components/Summary';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Stats from '@/components/Stats';

export default function AboutContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div className="w-full flex flex-col max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-8">
          <Summary />
          <Stats />

          <div className="mt-16 mb-16">
            <Skills />
          </div>

          <div className="mb-16">
            <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
              Education
            </h3>
            <div className="mt-2 flex flex-col gap-2">
              <Education />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-black dark:text-white text-2xl font-semibold mb-4">
              Work Experience
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              <Experience />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
        <Dock />
      </div>
    </div>
  );
}
