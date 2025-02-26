'use client';

import Header from "@/components/Header";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

// TODO: Add portrait and landscape mode

export default function NotesContent() {
    const placeholders = [
        'Sorry, I don\'t have notes yet',
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
                <div className="flex flex-col items-start">
                    <h1 className="font-bold text-4xl">Notes</h1>
                    <p className="text-neutral-400 dark:text-gray-400 mt-4">All the important blogs or notes related to tech, design and other stuffs.</p>
                    <div className="w-full flex mt-6 align-super">
                        <PlaceholdersAndVanishInput 
                            placeholders={placeholders}
                            onChange={handleChange}
                            onSubmit={onSubmit}  
                        />
                    </div>    
                </div>

                <hr className="mt-8 border-gray-400/30 dark:border-gray-600/30" />

                <div>

                </div>
            </div>
        </div>
    )
}