'use client'

import { Home, Mail, Moon, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function Header() {
    // TODO: Implement Dark Mode
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return(
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
            <nav className="mt-5 relative max-w-3xl w-full bg-white border border-gray-200 rounded-[2rem] py-1 flex items-center justify-between md:px-4 md:mx-auto opacity-90">
                <Avatar className="w-8 h-8">
                    <AvatarImage 
                        src="/avatar.png" 
                    />
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>


                <div className="flex items-center space-x-2">
                    <Link href={"/"}>
                        <Button variant={"ghost"} size={"icon"}>
                            <Home />
                        </Button>
                    </Link>
                    <Link href={"/about"}>
                        <Button variant={"ghost"} size={"icon"}>
                            <User />
                        </Button>
                    </Link>
                    <Link href={"/contact"}>
                        <Button variant={"ghost"} size={"icon"}>
                            <Mail />
                        </Button>
                    </Link>
                    <Button 
                        variant={"ghost"} 
                        size={"icon"}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {mounted ? (theme === 'dark' ? <Sun /> : <Moon />) : <Moon />}
                    </Button>
                </div>
            </nav>
        </header>
    )
}