import { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
    title: 'Projects | Janpol Hidalgo',
}


export default function Projects() {
    return (
        <ProjectsContent />
    )
}