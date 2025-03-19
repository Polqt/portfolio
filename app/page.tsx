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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="w-full flex flex-col max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className='mt-8'>
          <TechStack />
        </div>
        <div className="pt-10 md:pt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
}
