import { Links } from '@/components/Links';
import Header from '@/components/Header';
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Home | Janpol Hidalgo',
};

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <div className="w-full flex flex-col gap-12 max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="mt-8 mb-8">
          <Links />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
