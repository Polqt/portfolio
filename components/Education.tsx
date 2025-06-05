import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';

const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Saint La Salle - Bacolod',
    location: 'Bacolod City, Philippines',
    period: '2022 - Present',
    status: 'Currently Enrolled',
  },
  {
    degree: 'Senior High School - STEM Track',
    institution: 'Sagay National High School Senior High School',
    location: 'Sagay City, Philippines',
    period: '2020 - 2022',
    status: 'Graduated',
  },
];

export default function Education() {
  return (
    <div className="space-y-6">
      {educationData.map((edu, index) => (
        <Card
          key={index}
          className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:shadow-md transition-shadow duration-300"
        >
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    {edu.degree}
                  </h4>
                  <p className="text-base font-medium text-slate-600 dark:text-slate-400">
                    {edu.institution}
                  </p>
                </div>
                <Badge
                  variant={
                    edu.status === 'Currently Enrolled'
                      ? 'default'
                      : 'secondary'
                  }
                  className={
                    edu.status === 'Currently Enrolled'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }
                >
                  {edu.status}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {edu.period}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {edu.location}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
