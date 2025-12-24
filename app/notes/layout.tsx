import { Metadata } from "next";
import NotesContent from "./page";

export const metadata: Metadata = {
  title: 'Notes | Janpol Hidalgo',
  description: 'Janpol Hidalgo Portfolio',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
  },
};

export default function Notes() {
    return (
      <NotesContent />
    )
}