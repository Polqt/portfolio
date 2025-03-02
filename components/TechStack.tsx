import {
  IconBrandFlutter,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { SiExpress, SiPostgresql } from 'react-icons/si';
import { useRef } from 'react';

const technologies = [
  {
    name: 'Python',
    icon: <IconBrandPython />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    name: 'JavaScript',
    icon: <IconBrandJavascript />,
    color:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  },
  {
    name: 'TypeScript',
    icon: <IconBrandTypescript />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    name: 'React',
    icon: <IconBrandReact />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Next.js',
    icon: <IconBrandNextjs />,
    color: 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400',
  },
  {
    name: 'Tailwind CSS',
    icon: <IconBrandTailwind />,
    color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
  },
  {
    name: 'Node.js',
    icon: <IconBrandNodejs />,
    color:
      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  },
  {
    name: 'Express.js',
    icon: <SiExpress />,
    color:
      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  },
  {
    name: 'MongoDB',
    icon: <IconBrandMongodb />,
    color:
      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Flutter',
    icon: <IconBrandFlutter />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
];

const duplicatedTech = [...technologies, ...technologies];

export default function TechStack() {
  const scrollRef = useRef(null);

  return (
    <div className="w-full overflow-hidden py-4">
      <div className="relative flex gap-4 w-full overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex gap-4 animate-infinite-scroll"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTech.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className={`flex-shrink-0 ${tech.color} rounded-xl px-4 py-2 flex items-center gap-2 transition-transform hover:scale-105`}
            >
              <span className="text-xl font-bold">{tech.icon}</span>
              <span className="font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
