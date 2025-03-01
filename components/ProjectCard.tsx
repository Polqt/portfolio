import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  featured = false,
}: ProjectCardProps) {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
      featured ? 'border-amber-500/50 dark:border-amber-500/30' : ''
    }`}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {featured && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        {githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>Code</span>
            </a>
          </Button>
        )}
        {liveUrl && (
          <Button size="sm" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}