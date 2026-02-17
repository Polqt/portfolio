'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import {
  experiences,
  education,
  certifications,
  hackathons,
  achievements,
  EXPERIENCE_TYPE_COLORS,
} from '@/data/site';

const tabs = [
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'awards', label: 'Awards', icon: Trophy },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<TabId>('work');

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-xl border border-border/50 bg-card/30 p-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-[200px]">
        {activeTab === 'work' && <WorkTab />}
        {activeTab === 'education' && <EducationTab />}
        {activeTab === 'certifications' && <CertificationsTab />}
        {activeTab === 'awards' && <AwardsTab />}
      </div>
    </div>
  );
}

function WorkTab() {
  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-border hover:bg-card/80"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                  {exp.title}
                </h4>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {exp.company}
                  </p>
                  {exp.website && (
                    <Link
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`text-[10px] border ${EXPERIENCE_TYPE_COLORS[exp.type] || 'bg-muted text-muted-foreground border-border'}`}
              >
                {exp.type}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {exp.description}
            </p>

            <div className="space-y-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                Key Achievements
              </h5>
              <ul className="space-y-1.5">
                {exp.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full flex-shrink-0 mt-1.5" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationTab() {
  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div
          key={index}
          className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-border hover:bg-card/80"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-poke-electric flex-shrink-0" />
                  {edu.degree}
                </h4>
                <p className="text-sm font-medium text-muted-foreground">
                  {edu.institution}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={`text-[10px] border ${
                  edu.status === 'Currently Enrolled'
                    ? 'bg-poke-grass/10 text-poke-grass border-poke-grass/20'
                    : 'bg-poke-water/10 text-poke-water border-poke-water/20'
                }`}
              >
                {edu.status}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {edu.period}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {edu.location}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificationsTab() {
  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-border hover:bg-card/80"
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl flex-shrink-0">{cert.badge}</div>
            <div className="flex-1 space-y-1">
              <h4 className="text-base font-semibold text-foreground">
                {cert.name}
              </h4>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {cert.date}
              </p>
              {cert.credentialUrl && (
                <Link
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Credential
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {hackathons.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-foreground mt-6 flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-poke-fire" />
            Hackathons
          </h3>
          {hackathons.map((hack, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-border hover:bg-card/80"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-semibold text-foreground">
                    {hack.name}
                  </h4>
                  {hack.placement && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] border bg-poke-electric/10 text-poke-electric border-poke-electric/20"
                    >
                      {hack.placement}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {hack.organizer} &bull; {hack.date}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hack.description}
                </p>
                {hack.techUsed && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {hack.techUsed.map(tech => (
                      <span
                        key={tech}
                        className="rounded-md bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function AwardsTab() {
  return (
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-border hover:bg-card/80"
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl flex-shrink-0">
              {achievement.icon || '🏆'}
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-base font-semibold text-foreground">
                {achievement.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {achievement.description}
              </p>
              <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {achievement.date}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
