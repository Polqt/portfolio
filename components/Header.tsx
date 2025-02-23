'use client'

import { Home, Mail, Moon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";


export default function Header() {
    // TODO: Implement Dark Mode

    return(
        <header className="sticky top-0 inset-x-0 flex lfex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
            <nav className="mt-5 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] py-1 flex items-center justify-between md:px-4 md:mx-auto opacity-90">
                <Avatar className="w-8 h-8">
                    <AvatarImage 
                        src="https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/478574169_9077837935604452_3537622823525496935_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHH5fRapQnAOHZWoQlq-5QJJy11jp23DSgnLXWOnbcNKHsgefMgUcRRxVPe5kWVq8phu1Dicm90KWfkbQEI43MU&_nc_ohc=EfvRQCs3HLAQ7kNvgEZWAnf&_nc_oc=AdjEovaIU6DK7yK3s1397dMONmMiU-5_nGAU3CqiXYSIJ3rxHkePrXBo-xEfa6cu9q8&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=ACnvfGZGoxns7Cn5AbhmxEW&oh=00_AYA3j-hTbXAM7sxqYkyBOH6lwU17ikjZxurCkSt8UZFi3Q&oe=67C06536" 
                    />
                    <AvatarFallback>Jepoy</AvatarFallback>
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
                    <Button variant={"ghost"} size={"icon"}>
                        <Moon />
                    </Button>
                </div>
            </nav>
        </header>
    )
}