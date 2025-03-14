import { BentoCard, BentoGrid } from './magicui/bento-grid';
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { IconBrandSpotify } from '@tabler/icons-react';

const links = [
  {
    Icon: IconBrandSpotify,
    name: 'Spotify',
    description: 'Earbuds in, judgment welcome.',
    href: 'https://open.spotify.com/user/31cxnzvp3rafo7tiw7xtdc7kpjli',
    cta: 'Judge my taste',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 to-black rounded-xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-8 border-green-500 opacity-20"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border-4 border-green-400 opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border-6 border-green-300 opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    ),
  },
  {
    Icon: DiscordLogoIcon,
    name: 'Discord',
    description: 'Where I fake expertise in everything and nothing.',
    href: 'https://discord.com/channels/fanboyniyeji',
    cta: 'Join the chaos',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-black rounded-xl"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/5 w-6 h-6 rounded-md bg-indigo-300 opacity-20"></div>
            <div className="absolute top-1/3 left-2/5 w-8 h-8 rounded-md bg-indigo-400 opacity-20"></div>
            <div className="absolute top-2/3 left-1/3 w-12 h-12 rounded-md bg-indigo-500 opacity-20"></div>
            <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-md bg-indigo-400 opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/3 w-6 h-6 rounded-md bg-indigo-300 opacity-20"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    ),
  },
  {
    Icon: GitHubLogoIcon,
    name: 'Github',
    description: 'Commits public, debugging sessions private.',
    href: 'https://github.com/Polqt',
    cta: 'See my code',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-8 rounded-md bg-gray-500 opacity-20"></div>
          <div className="absolute top-1/3 left-1/3 w-48 h-8 rounded-md bg-gray-400 opacity-20"></div>
          <div className="absolute top-1/2 left-1/5 w-56 h-8 rounded-md bg-gray-500 opacity-20"></div>
          <div className="absolute top-2/3 left-2/5 w-40 h-8 rounded-md bg-gray-400 opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    ),
  },
  {
    Icon: LinkedInLogoIcon,
    name: 'LinkedIn',
    description: 'Resume by day, memer by night.',
    className: 'col-span-3 lg:col-span-1',
    href: 'https://www.linkedin.com/in/janpol-hidalgo-64174a241/',
    cta: "Let's connect",
    background: (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black rounded-xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-32 h-20 rounded-md bg-blue-500 opacity-20 transform rotate-6"></div>
          <div className="absolute top-1/3 left-1/3 w-28 h-4 rounded-sm bg-blue-300 opacity-30 transform rotate-6 translate-y-4"></div>
          <div className="absolute top-1/3 left-1/3 w-20 h-4 rounded-sm bg-blue-300 opacity-30 transform rotate-6 translate-y-10"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    ),
  },
];

export default function Bento() {
  return (
    <BentoGrid className='text-white'>
      {links.map((link, idx) => (
        <BentoCard key={idx} {...link} />
      ))}
    </BentoGrid>
  );
}
