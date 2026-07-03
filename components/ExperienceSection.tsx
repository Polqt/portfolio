import Link from 'next/link';
import {
  experiences,
  education,
  certifications,
  hackathons,
  achievements,
} from '@/data/site';

function RecordGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr] md:gap-8">
      <h3 className="plaque pt-1">{title}</h3>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <div className="space-y-12">
      <RecordGroup title="Work">
        {experiences.map((exp, index) => (
          <article key={index} className="py-5 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h4 className="text-base font-semibold tracking-tight text-foreground">
                {exp.title}
              </h4>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary">
                {exp.type}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {exp.website ? (
                <Link
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  {exp.company}
                </Link>
              ) : (
                exp.company
              )}
            </p>
            <p className="plaque mt-1.5">
              {exp.period} · {exp.location}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {exp.description}
            </p>
            <ul className="mt-3 space-y-1.5">
              {exp.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-2 h-px w-3 flex-shrink-0 bg-primary" />
                  {achievement}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </RecordGroup>

      <RecordGroup title="Education">
        {education.map((edu, index) => (
          <article key={index} className="py-5 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h4 className="text-base font-semibold tracking-tight text-foreground">
                {edu.degree}
              </h4>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary">
                {edu.status}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {edu.institution}
            </p>
            <p className="plaque mt-1.5">
              {edu.period} · {edu.location}
            </p>
          </article>
        ))}
      </RecordGroup>

      <RecordGroup title="Certifications">
        {certifications.map((cert, index) => (
          <article key={index} className="py-5 first:pt-0 last:pb-0">
            <h4 className="text-base font-semibold tracking-tight text-foreground">{cert.name}</h4>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {cert.issuer}
            </p>
            <p className="plaque mt-1.5">{cert.date}</p>
            {cert.credentialUrl && (
              <Link
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
              >
                View credential
              </Link>
            )}
          </article>
        ))}
      </RecordGroup>

      {hackathons.length > 0 && (
        <RecordGroup title="Hackathons">
          {hackathons.map((hack, index) => (
            <article key={index} className="py-5 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-base font-semibold tracking-tight text-foreground">
                  {hack.name}
                </h4>
                {hack.placement && (
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary">
                    {hack.placement}
                  </span>
                )}
              </div>
              <p className="plaque mt-1.5">
                {hack.organizer} · {hack.date}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {hack.description}
              </p>
              {hack.techUsed && (
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                  {hack.techUsed.join(' / ')}
                </p>
              )}
            </article>
          ))}
        </RecordGroup>
      )}

      <RecordGroup title="Awards">
        {achievements.map((achievement, index) => (
          <article key={index} className="py-5 first:pt-0 last:pb-0">
            <h4 className="text-base font-semibold tracking-tight text-foreground">
              {achievement.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {achievement.description}
            </p>
            <p className="plaque mt-1.5">{achievement.date}</p>
          </article>
        ))}
      </RecordGroup>
    </div>
  );
}
