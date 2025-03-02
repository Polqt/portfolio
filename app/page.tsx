import { Links } from '@/components/Links';
import Header from '@/components/Header';
import { Metadata } from 'next';
import Hero from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Home | Janpol Hidalgo',
};

export default function Home() {
  return (
    <div>
      <Header />

      <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="mt-8 mb-8">
          <Links />
        </div>
      </div>
    </div>
  );
}
