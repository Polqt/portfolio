'use client';

import Experience from '@/components/Experience';
import Header from '@/components/Header';
import Summary from '@/components/Summary';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Footer from '@/components/Footer';
import Links from '@/components/Links';

export default function AboutContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="w-full flex flex-col max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <Summary />

        {/* What I Do */}
        <div className="mt-16 mb-16">
          <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
            What I Do
          </h3>
          <Skills />
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
            Education
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            <Education />
          </div>
        </div>

        {/* Experience */}
        <div className='mb-16'>
          <h3 className="text-black dark:text-white text-2xl font-semibold mb-4">
            Work Experience
          </h3>
          <div className="mt-4 flex flex-col gap-2">
            <Experience />
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-black dark:text-white text-2xl font-semibold mb-2">
            Social Media Links
          </h3>
          <Links />
        </div>

        <div className="pt-10 md:pt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
