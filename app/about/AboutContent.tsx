'use client';

import Experience from '@/components/Experience';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import TechStack from '@/components/TechStack';

export default function AboutContent() {
  return (
    <div className="">
      <Header />

      <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <Hero />

        {/* Tech Stack */}
        <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
          <h3 className="text-black dark:text-white text-xl font-semibold mb-2">
            Technology Stack
          </h3>
          <TechStack />
        </div>

        {/* What I Do */}
        <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
          <h3 className="text-black dark:text-white text-xl font-semibold mb-2">
            What I Do
          </h3>
          <Skills />
        </div>

        {/* Education & Work Experience */}
        <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
          <h3 className="text-black dark:text-white text-xl">
            Education & Work Experience
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            <Experience />
          </div>
        </div>
      </div>
    </div>
  );
}
