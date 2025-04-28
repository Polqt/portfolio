import { Metadata } from "next";
import ProjectsContent from "./page";

export const metadata: Metadata = {
  title: 'Projects | Janpol Hidalgo',
  description: 'Janpol Hidalgo Portfolio',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
  },
};


export default function Projects() {
    return (
        <ProjectsContent />
    )
}