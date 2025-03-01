'use client'

import Header from "@/components/Header"
import ProjectCard from "@/components/ProjectCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function ProjectsContent() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div>
            <Header />

            <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="font-bold text-4xl">Projects</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">Showcasing some of my work and experiments</p>
                </motion.div>

                <Tabs defaultValue="all" className="mt-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="web">Web</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile</TabsTrigger>
                        <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div variants={item}>
                                <ProjectCard
                                    title="Personal Portfolio"
                                    description="A modern portfolio website built with Next.js, Tailwind CSS and Aceternity UI components."
                                    image="/api/placeholder/600/400"
                                    technologies={["Next.js", "React", "Tailwind CSS", "TypeScript"]}
                                    githubUrl="https://github.com/yourusername/portfolio"
                                    liveUrl="https://yourportfolio.com"
                                    featured={true}
                                />
                            </motion.div>
                            <motion.div variants={item}>
                                <ProjectCard
                                    title="Notes App"
                                    description="A simple notes application with search functionality and markdown support."
                                    image="/api/placeholder/600/400"
                                    technologies={["React", "Node.js", "MongoDB", "Express"]}
                                    githubUrl="https://github.com/yourusername/notes-app"
                                />
                            </motion.div>
                            <motion.div variants={item}>
                                <ProjectCard
                                    title="Mobile Game"
                                    description="2D puzzle game developed using Unity and C#."
                                    image="/api/placeholder/600/400"
                                    technologies={["Unity", "C#", "Game Development"]}
                                    githubUrl="https://github.com/yourusername/puzzle-game"
                                />
                            </motion.div>
                            <motion.div variants={item}>
                                <ProjectCard
                                    title="Data Visualization Dashboard"
                                    description="Interactive dashboard for visualizing and analyzing data."
                                    image="/api/placeholder/600/400"
                                    technologies={["React", "D3.js", "Firebase"]}
                                    githubUrl="https://github.com/yourusername/data-dashboard"
                                    liveUrl="https://yourdashboard.com"
                                />
                            </motion.div>
                        </motion.div>
                    </TabsContent>
                    <TabsContent value="web">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Web projects here */}
                            <ProjectCard
                                title="Personal Portfolio"
                                description="A modern portfolio website built with Next.js, Tailwind CSS and Aceternity UI components."
                                image="/api/placeholder/600/400"
                                technologies={["Next.js", "React", "Tailwind CSS", "TypeScript"]}
                                githubUrl="https://github.com/yourusername/portfolio"
                                liveUrl="https://yourportfolio.com"
                                featured={true}
                            />
                            <ProjectCard
                                title="Data Visualization Dashboard"
                                description="Interactive dashboard for visualizing and analyzing data."
                                image="/api/placeholder/600/400"
                                technologies={["React", "D3.js", "Firebase"]}
                                githubUrl="https://github.com/yourusername/data-dashboard"
                                liveUrl="https://yourdashboard.com"
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="mobile">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Mobile projects here */}
                            <ProjectCard
                                title="Mobile Game"
                                description="2D puzzle game developed using Unity and C#."
                                image="/api/placeholder/600/400"
                                technologies={["Unity", "C#", "Game Development"]}
                                githubUrl="https://github.com/yourusername/puzzle-game"
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="other">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Other projects here */}
                            <ProjectCard
                                title="Notes App"
                                description="A simple notes application with search functionality and markdown support."
                                image="/api/placeholder/600/400"
                                technologies={["React", "Node.js", "MongoDB", "Express"]}
                                githubUrl="https://github.com/yourusername/notes-app"
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}