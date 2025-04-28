'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ProjectsContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="w-full flex flex-col gap-12 max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-4xl">Projects</h1>

        {/* Soon */}
        <div></div>
        <div className="pt-10 md:pt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
