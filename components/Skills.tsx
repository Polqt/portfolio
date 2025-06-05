import { IconCloud } from '@/components/magicui/icon-cloud';
import { Badge } from '@/components/ui/badge';

const slugs = [
  'typescript',
  'javascript',
  'dart',
  'react',
  'flutter',
  'drizzle',
  'express',
  'nextdotjs',
  'svelte',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'go',
  'vercel',
  'docker',
  'git',
  'jira',
  'github',
  'supabase',
  'postgresql',
  'androidstudio',
  'figma',
];

const skillCategories = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'Python', 'Go', 'Javascript'],
    color:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Astro', 'Tailwind CSS'],
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'Firebase',
      'Supabase',
    ],
    color:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    category: 'Mobile',
    skills: ['Flutter', 'React Native', 'Dart'],
    color:
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    category: 'Tools & Others',
    skills: ['Git', 'Docker', 'Figma', 'Postman', 'Vercel', 'AWS'],
    color:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  },
];

export default function Skills() {
  const images = slugs.map(
    slug => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className={`${category.color} border-0 hover:scale-105 transition-transform duration-200`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <IconCloud images={images} />
          </div>
        </div>
      </div>
    </div>
  );
}
