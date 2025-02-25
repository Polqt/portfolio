import Header from "@/components/Header";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Home | Janpol Hidalgo',
}


export default function Home() {
  return (
    <div >
      <Header />

      <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-4">
          <Image 
            src={"/AvatarCoffee.png"} 
            alt="Pol Hidalgo" 
            width={150}
            height={150}
            className="border-2 border-gray-100 shrink-0 rounded-full dark:border-neutral-800"
          />
          <div className="grow">
            <h2 className="text-2xl font-bold sm:text-4xl text-transparent relative bg-clip-text bg-gradient-to-r z-70 from-cyan-400 to-amber-400">Hi, I&apos;m Pol Hidalgo </h2>
            <h5 className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-400">Student Software Engineer 🚀</h5>
          </div>
        </div>
        <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
          I’m a pretty okay Software Engineer from the Philippines, currently surviving <span className="underline decoration-cyan-500">Computer Science</span> at the University of St. La Salle - Bacolod. 
          I’ve written code that works, breaks, and somehow fixes itself across backend, frontend, and now mobile app development. 
          In my spare time, I’m diving into <span className="underline decoration-amber-500">Data Engineering</span>, teaching machines to think—so maybe one day they can debug my code for me! 
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}