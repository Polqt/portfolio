'use client'

import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Email, Linkedin, Github } from "@deemlol/next-icons";

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

                {/* Links */}
                <div className="mt-8 text-gray-600 dark:text-neutral-300 max-w-full text-pretty">
                    <h3 className="text-black dark:text-white text-xl">Find Me Online</h3>
                    <nav>
                        <ul className="flex flex-col gap-2 mt-2">
                            <li>
                                <a href="https://www.linkedin.com/in/janpol-hidalgo-64174a241/" target="_blank" rel="noopener" className="flex items-center">
                                    {isLoading ?(   
                                        <Skeleton className="w-32 h-4 rounded-md" />
                                    ) : (
                                        <>
                                            <Linkedin size={16} color="blue" />
                                            <span className="ml-2 text-sm">Linkedin</span>
                                        </>
                                    )}
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank" rel="noopener" className="flex items-center">
                                    {isLoading ? (
                                        <Skeleton className="w-24 h-4 rounded-md" />
                                    ) : (
                                        <>
                                            <Github size={16} color="green" />
                                            <span className="ml-2 text-sm">Github</span>
                                        </>
                                    )}
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank" rel="noopener" className="flex items-center">
                                    {isLoading ? (
                                        <Skeleton className="w-24 h-4 rounded-md" />
                                    ) : (
                                        <>
                                            <Email size={16} color="yellow" />
                                            <span className="ml-2 text-sm">Email</span>    
                                        </>
                                    )}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}