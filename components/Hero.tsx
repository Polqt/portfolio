import Image from 'next/image';
import { ColourfulText } from './ui/colourful-text';

export default function Hero() {
  return (
    <section className="py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-4">
        <Image
          src={'/AvatarCoffee.png'}
          alt="Pol Hidalgo"
          width={120} 
          height={120}
          className="border-2 border-gray-100 shrink-0 rounded-full dark:border-neutral-800"
          priority
        />
        <div className="flex flex-col text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-black dark:text-white">
            Hi, I&apos;m Pol Hidalgo
          </h1>
          <h2 className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-400">
            Student Software Developer 🚀
          </h2>
        </div>
      </div>
      <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty text-base md:text-lg leading-relaxed">
        <p>
          I’m a passionate{' '}
          <span className="font-semibold">
            <ColourfulText text="Software Developer" />
          </span>{' '}
          from the Philippines, currently navigating the exciting world of{' '}
          <span className="underline decoration-cyan-500/70 decoration-2 underline-offset-2">Computer Science</span>{' '}
          at the University of St. La Salle - Bacolod.
        </p>
        <p className="mt-3">
          I build things for the web and mobile, and I&apos;m always eager to learn new technologies.
          Currently diving deep into{' '}
          <span className="underline decoration-amber-500/70 decoration-2 underline-offset-2">AI and Data Engineering</span>
          , exploring how data can shape the future.
        </p>
      </div>
    </section>
  );
}