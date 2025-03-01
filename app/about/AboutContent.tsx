'use client';

import Experience from '@/components/Experience';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutContent() {
    const isLoading = false;

    return (
        <div className="">
            <Header />

            <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
                <Hero />

                {/* Tech Stack */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl font-semibold mb-2">
                        Technology Stack
                    </h3>
                    <TechStack />
                </div>

                {/* Education */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl font-semibold">
                        Education
                    </h3>
                    <div className="mt-2 flex flex-col gap-2">
                        <p>
                            {isLoading ? (
                                <Skeleton className="w-64 h-4 rounded-md" />
                            ) : (
                                <p>University of Saint La Salle - Bacolod</p>
                            )}
                        </p>
                        <p>
                            {isLoading ? (
                                <Skeleton className="w-48 h-4 rounded-md" />
                            ) : (
                                <p>
                                    BS in Computer Science Major in Game
                                    Development
                                </p>
                            )}
                        </p>
                    </div>
                </div>

                {/* What I Do */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl font-semibold">
                        What I Do
                    </h3>
                    <ul className="mt-2 flex flex-col gap-2">
                        <li>💻 Full-Stack Web Development</li>
                        <li>📊 Data Engineering & Problem-Solving</li>
                        <li>🏆 Competitive Programming & Hackathons</li>
                    </ul>
                </div>

                {/* Work Experience */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl">
                        Work Experience
                    </h3>
                    <div className="mt-2 flex flex-col gap-2">
                        <Experience />
                    </div>
                </div>
            </div>
        </div>
    );
}
