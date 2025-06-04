import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Home | Janpol Hidalgo',
};

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <div className="flex-shrink-0 pt-4 sm:pt-6 lg:pt-8">
        <Header />
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <Hero />
      </div>
    </div>
  );
}