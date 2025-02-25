import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
    title: 'About | Janpol Hidalgo',
}

export default function About() {
    return (
        <AboutContent />
    )
}
