import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandSpotify,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

export function Bento() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <BentoGridItem
              title={item.title}
              description={item.description}
              header={item.header}
              className={` ${item.className} cursor-pointer border border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 transition-all`}
              icon={item.icon}
            />
          </a>
        </motion.div>
      ))}
    </BentoGrid>
  );
}

const LinkedInHeader = () => (
  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
    <IconBrandLinkedin className="h-16 w-16 text-blue-500 dark:text-blue-400" />
  </div>
);

const GitHubHeader = () => (
  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-900/50 dark:to-neutral-800/50 w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
    <IconBrandGithub className="h-16 w-16 text-gray-900 dark:text-white" />
  </div>
);

const SpotifyHeader = () => (
  <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
    <IconBrandSpotify className="h-16 w-16 text-green-500 dark:text-green-400" />
  </div>
);

const DiscordHeader = () => (
  <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
    <IconBrandDiscord className="h-16 w-16 text-indigo-500 dark:text-indigo-400" />
  </div>
);

const items = [
  {
    title: 'LinkedIn',
    description: "Let's get professionally awkward together.",
    header: <LinkedInHeader />,
    className: 'md:col-span-2',
    icon: <IconBrandLinkedin className="h-4 w-4 text-blue-500" />,
    link: 'https://www.linkedin.com/in/janpol-hidalgo-64174a241/',
  },
  {
    title: 'GitHub',
    description: 'Check out my projects and contributions.',
    header: <GitHubHeader />,
    className: 'md:col-span-1',
    icon: <IconBrandGithub className="h-4 w-4 text-black dark:text-white" />,
    link: 'https://github.com/Polqt',
  },
  {
    title: 'Spotify',
    description: 'Eavesdrop on my questionable music taste.',
    header: <SpotifyHeader />,
    className: 'md:col-span-1',
    icon: <IconBrandSpotify className="h-4 w-4 text-green-500" />,
    link: 'https://open.spotify.com/user/31cxnzvp3rafo7tiw7xtdc7kpjli',
  },
  {
    title: 'Discord',
    description: 'Ping me, and I may or may not reply instantly.',
    header: <DiscordHeader />,
    className: 'md:col-span-2',
    icon: <IconBrandDiscord className="h-4 w-4 text-indigo-500" />,
    link: 'https://discord.com/fanboyniyeji',
  },
];
