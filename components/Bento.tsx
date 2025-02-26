import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandSpotify,
} from "@tabler/icons-react";

export function Bento() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "LinkedIn",
    description: "Let’s get professionally awkward together.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconBrandLinkedin className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "GitHub",
    description: "Check out my projects and contributions.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconBrandGithub className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Spotify",
    description: "Eavesdrop on my questionable music taste.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconBrandSpotify className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Discord",
    description: "Ping me, and I may or may not reply instantly.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconBrandDiscord className="h-4 w-4 text-neutral-500" />,
  },
];
