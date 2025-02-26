'use client'

import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutContent() {
    const isLoading = false;

    return (
        <div className="">
            <Header />

            {/* Introduction */}
            <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
                <div className="text-gray-600 dark:text-neutral-400 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl">
                        {isLoading ? <Skeleton className="w-48 h-6 rounded-md" /> : <p>Janpol Hidalgo</p>}
                    </h3>
                    <p>
                        {isLoading ? <Skeleton className="w-64 h-4 rounded-md" /> : <p>A student software engineer from the Philippines.</p>}
                    </p>
                    <p>
                        {isLoading ? <Skeleton className="w-48 h-6 rounded-md" /> : <p></p>}
                    </p>
                </div>

                {/* Tech Stack */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl">Technology Stack</h3>
                    <div>
                        
                    </div>
                </div>

                {/* Education */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl">Education</h3>
                    <div className="mt-2 flex flex-col gap-2">
                        <p>
                            {isLoading ? <Skeleton className="w-64 h-4 rounded-md" /> : <p>University of Saint La Salle - Bacolod</p>}
                        </p>
                        <p>
                            {isLoading ? <Skeleton className="w-48 h-4 rounded-md" /> : <p>BS in Computer Science Major in Game Development</p>}
                        </p>
                    </div>
                </div>

                {/* What I Do */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl">What I Do</h3>
                    <ul className="mt-2 flex flex-col gap-2">
                        <li>💻 Full-Stack Web Development</li>
                        <li>📊 Data Engineering & Problem-Solving</li>
                        <li>🏆 Competitive Programming & Hackathons</li>
                    </ul>
                </div>

                {/* Work Experience */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl">Work Experience</h3>
                    <div className="mt-2 flex flex-col gap-2">
                        <p>
                            {isLoading ? <Skeleton className="w-72 h-4 rounded-md" /> : <p>✍️ Writer at Stalwrites</p>}
                        </p>
                        <p>
                            {isLoading ? <Skeleton className="w-80 h-4 rounded-md" /> : <p>👨‍💻 Software Engineering Fellow at Headstarter AI</p>}
                        </p>
                        <p>
                            {isLoading ? <Skeleton className="w-64 h-4 rounded-md" /> : <p>🚀 Mobile Developer at K92</p>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}