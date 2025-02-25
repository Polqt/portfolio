'use client';

import Header from "@/components/Header";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function NotesContent() {
    const placeholders = [
        'Write a note...',
        'What are you thinking?',
        'What do you want to remember?',
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };

    return (
        <div>
            <Header />
            <div className="w-full max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
                <h1 className="font-bold text-4xl">Notes</h1>
                <p className="text-gray-900 dark:text-gray-400 mt-2">All the important blogs or notes related to tech, design and other stuffs.</p>

                <div className="mt-5 max-w-full">     
                    <PlaceholdersAndVanishInput 
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    )
}