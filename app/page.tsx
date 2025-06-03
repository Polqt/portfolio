import Header from '@/components/Header';
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import TechStack from '@/components/TechStack';

export const metadata: Metadata = {
  title: 'Home | Janpol Hidalgo',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900">
      <Header />
      <main className="flex-grow">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          <section className="py-10 md:py-16">
            <Hero />
          </section>

          <section className="py-12 md:py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl mb-4">
              My Digital Toolkit
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-10 md:mb-12">
              Here are some of the technologies and tools I enjoy working with
              to build engaging digital experiences.
            </p>
            <div className="h-[30rem] md:h-[35rem] w-full">
              <TechStack />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
