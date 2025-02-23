import Header from "@/components/Header";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'About | Janpol Hidalgo',
}

export default function About() {
    return (
        <div className="">
            <Header />
        </div>
    )
}