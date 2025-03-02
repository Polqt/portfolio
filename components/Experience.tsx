import { Laptop, Pencil, Smartphone } from 'lucide-react';

export default function Experience() {
  const experience = [
    {
      title: 'Writer',
      company: 'Stalwrites',
      companyUrl: 'https://stalwrites.com/',
      date: '2023 - 2024',
      description:
        'I worked as a writer, creating content focused on anime and manhwa. ',
      icon: Pencil,
    },
    {
      title: 'Software Engineer',
      company: 'Headstarter AI',
      companyUrl: 'https://headstarter.co/',
      date: 2024,
      description:
        'As a Software Engineer Fellow at Headstarter AI, I specialized in full-stack development  with AI integration, building scalable applications.',
      icon: Laptop,
    },
    {
      title: 'Mobile Developer',
      company: 'K92',
      companyUrl: '',
      date: '2024 - 2025',
      description: 'Started as a Mobile Developer at K92',
      icon: Smartphone,
    },
  ];

  return (
    <div className="relative mx-auto max-w-3xl mb-1">
      <div className="absolute left-6 top-0 h-full w-px bg-gray-200 dark:bg-gray-800"></div>
      <ul className="space-y-8">
        {experience.map((exp, i) => (
          <li key={i} className="relative pl-14">
            <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <exp.icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-900 dark:bg-gray-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exp.title} at {''}
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exp.company}
                  </a>
                </h4>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {exp.date}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-neutral-300">
                {exp.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
