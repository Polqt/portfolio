import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Dock from '@/components/Dock';

export const metadata: Metadata = {
  title: 'Home | Janpol Hidalgo',
};

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <Hero />
      </div>
      <div className="flex-shrink-0 pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pt-16 lg:pb-10">
        <Dock />
      </div>
    </div>
  );
}