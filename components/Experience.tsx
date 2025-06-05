import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const experienceData = [
  {
    title: 'Software Engineer Fellow',
    company: 'Headstarter AI',
    location: 'New York (Remote)',
    period: 'July 2024 - December 2024',
    type: 'Fellowship',
    description:
      'Built scalable applications using cutting-edge AI technologies and modern backend platforms. Collaborated in agile teams on innovative projects leveraging popular frontend frameworks, serverless architectures, and AI integrations. Featured in an NPC interview discussing practical solutions to real-world challenges.',

    achievements: [
      'Architected and deployed full-stack applications with modern backend services and AI-powered features',
      'Worked cross-functionally using contemporary frameworks and libraries',
      'Showcased problem-solving strategies in a high-profile NPC interview',
    ],
    website: 'https://headstarter.co/',
  },
  {
    title: 'Writer',
    company: 'Stalwrites',
    location: 'Bacolod City',
    period: 'January 2024 - Present',
    type: 'Freelance',
    description:
      'Create engaging written content focused on anime, manhwa, and documentary topics for a growing YouTube audience.',
    achievements: [
      'Produced high-quality scripts and articles for anime and manhwa content',
      'Contributed documentary-style writing enhancing channel diversity',
      'Built a loyal audience through consistent, well-researched content',
    ],
    website: 'https://stalwrites.com/',
  },
];

export default function Experience() {
  return (
    <div className="space-y-6">
      {experienceData.map((exp, index) => (
        <Card
          key={index}
          className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:shadow-md transition-shadow duration-300"
        >
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    {exp.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-medium text-slate-600 dark:text-slate-400">
                      {exp.company}
                    </p>
                    {exp.website && (
                      <Link
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    exp.type === 'Internship'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : exp.type === 'Freelance'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : exp.type === 'Part-time'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                  }
                >
                  {exp.type}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-2">
                <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Key Achievements:
                </h5>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0 mt-2"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
