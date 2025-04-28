import { Metadata } from "next";
import AboutContent from "./page";

export const metadata: Metadata = {
  title: 'About | Janpol Hidalgo',
  description: 'Janpol Hidalgo Portfolio',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
  }
};

export default function About() {
    return (
        <AboutContent />
    )
}
