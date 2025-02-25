'use client'

import { Folder, Moon, NotebookPenIcon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";    

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return(
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
            <nav className="mt-5 relative max-w-3xl w-full bg-white border border-gray-200 rounded-[2rem] py-1 flex items-center justify-between md:px-4 md:mx-auto dark:border-neutral-700 bg-white/50 dark:bg-black/30 backdrop-blur-lg opacity-90">
                <Avatar className="w-8 h-8">
                    <Link href={"/"}>
                        <AvatarImage 
                            src="SmallAvatar.png" 
                        />
                        <AvatarFallback>JP</AvatarFallback>
                    </Link>
                </Avatar>

                <div className="flex items-center space-x-4">
                    <Link href={"/about"}>
                        <Button 
                            variant={"ghost"} 
                            size={"icon"}
                            className="transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full p-2"
                        >
                            <User />
                        </Button>
                    </Link>
                    <Link href={"/projects"}>
                        <Button 
                            variant={"ghost"} 
                            size={"icon"}
                            className="transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full p-2"
                        >
                            <Folder  />
                        </Button>
                    </Link>
                    <Link href={"/notes"}>
                        <Button 
                            variant={"ghost"} 
                            size={"icon"}
                            className="transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full p-2"
                        >
                            <NotebookPenIcon />
                        </Button>
                    </Link>
                    <Button 
                        variant={"ghost"} 
                        size={"icon"}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full p-2"
                    >
                        <span suppressHydrationWarning>
                            {mounted ? (theme === 'dark' ? <Sun /> : <Moon />) : <Moon />}
                        </span>
                    </Button>
                </div>
            </nav>
        </header>
    )
}