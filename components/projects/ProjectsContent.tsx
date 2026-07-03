import Link from 'next/link';
import { projects, SITE } from '@/data/site';
import TerminalNav from '@/components/TerminalNav';
import Reveal from '@/components/Reveal';
import SplitFlapBoard from '@/components/SplitFlapBoard';

function projectCode(techStack: readonly string[]) {
  return techStack
    .slice(0, 2)
    .map(t => t.replace(/[^a-z]/gi, '').slice(0, 4))
    .join('/');
}

export default function ProjectsContent() {
  const boardRows = projects.map((project, index) => ({
    cells: [
      project.name,
      projectCode(project.techStack),
      project.status === 'completed' ? 'Departed' : 'Boarding',
    ],
    href: `#flight-${index + 1}`,
    active: project.status !== 'completed',
  }));

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TerminalNav />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <Reveal>
          <section className="py-12 md:py-16">
            <p className="plaque mb-4 text-primary">Departures</p>
            <h1 className="font-mono text-3xl font-semibold uppercase leading-tight tracking-[0.04em] sm:text-4xl">
              Projects
            </h1>
            <p className="mt-4 max-w-[55ch] text-[15px] leading-relaxed text-muted-foreground">
              Building things that solve real problems, from AI pipelines to
              real-time collaboration tools.
            </p>

            <div className="mt-8">
              <SplitFlapBoard
                caption="All departures"
                columns={['Project', 'Stack', 'Status']}
                rows={boardRows}
              />
            </div>
          </section>
        </Reveal>

        <div className="divide-y divide-border border-t border-border">
          {projects.map((project, index) => (
            <Reveal key={project.name}>
              <article
                id={`flight-${index + 1}`}
                className="grid scroll-mt-20 grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-2xl font-semibold text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="plaque mt-3">
                    {project.status === 'completed' ? 'Departed' : 'Boarding'}
                  </p>
                </div>

                <div className="md:col-span-9">
                  <h2 className="font-mono text-xl font-semibold uppercase tracking-[0.04em] sm:text-2xl">
                    {project.name}
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-5 space-y-1.5">
                      {project.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-px w-3 flex-shrink-0 bg-primary" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 border-t border-border pt-4">
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[110px_1fr] sm:gap-4">
                      <span className="plaque pt-0.5">Equipment</span>
                      <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                        {project.techStack.join(' / ')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-5">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
                    >
                      Source
                    </Link>
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Live demo
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-4xl items-baseline justify-between px-4 py-5 sm:px-6">
          <span className="plaque">Hidalgo Intl</span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            {SITE.location}
          </span>
        </div>
      </footer>
    </div>
  );
}
