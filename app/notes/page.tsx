import { Metadata } from "next";
import NotesContent from "./NotesContent";

export const metadata: Metadata = {
    title: 'Notes | Janpol Hidalgo',
}

export default function Notes() {
    return (
        <NotesContent />
    )
}