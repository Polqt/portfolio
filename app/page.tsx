import Image from 'next/image';
import Link from 'next/link';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { SITE, projects } from '@/data/site';
import TerminalNav from '@/components/TerminalNav';
import Reveal from '@/components/Reveal';
import CloudLayer from '@/components/CloudLayer';
import PlaneFlyby from '@/components/PlaneFlyby';
import ExhibitFrame from '@/components/ExhibitFrame';
import SplitFlapBoard, { FlapText } from '@/components/SplitFlapBoard';
import HaikuWidget from '@/components/widgets/HaikuWidget';
import LocationWidget from '@/components/widgets/LocationWidget';
import TechStackWidget from '@/components/widgets/TechStackWidget';
import GitHubWidget from '@/components/widgets/GitHubWidget';
import SpotifyWidget from '@/components/widgets/SpotifyWidget';
import VisitorLogbook from '@/components/widgets/VisitorLogbook';
import BoardingPass from '@/components/BoardingPass';

function projectCode(techStack: readonly string[]) {
  return techStack
    .slice(0, 2)
    .map(t => t.replace(/[^a-z]/gi, '').slice(0, 4))
    .join('/');
}

export default function Home() {
  const boardRows = projects.map(project => ({
    cells: [
      project.name,
      projectCode(project.techStack),
      project.status === 'completed' ? 'Departed' : 'Boarding',
    ],
    href: '/projects',
    active: project.status !== 'completed',
  }));

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TerminalNav />
      <CloudLayer />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* ─── Hero ─── */}
        <Reveal>
          <section className="grid grid-cols-1 gap-8 border-b border-border py-12 md:grid-cols-12 md:gap-10 md:py-16">
            <div className="flex flex-col justify-center md:col-span-7">
              <p className="plaque mb-4 text-primary">Now serving</p>
              <h1 className="font-mono text-4xl font-semibold uppercase leading-[1.1] tracking-[0.04em] sm:text-5xl">
                <FlapText text="Janpol" />
                <br />
                <FlapText text="Hidalgo" startIndex={7} />
              </h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {SITE.role}
              </p>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Filipino developer building things that matter. Exploring AI,
                real-time systems, and the craft of modern software, one commit
                at a time.
              </p>

              <div className="mt-8 flex items-center gap-5">
                <Link
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <IconBrandGithub className="h-3.5 w-3.5" />
                  GitHub
                </Link>
                <Link
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <IconBrandLinkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 border-b border-primary pb-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:border-foreground hover:text-foreground"
                >
                  About me
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <figure className="mx-auto max-w-[260px] md:ml-auto md:mr-0">
                <div className="rounded-sm border border-border bg-card p-3">
                  <Image
                    src="/Hidalgo.png"
                    alt={SITE.name}
                    width={260}
                    height={260}
                    className="w-full object-cover"
                    priority
                  />
                  <figcaption className="mt-3 flex items-baseline justify-between border-t border-border pt-2.5">
                    <span className="plaque">Crew photo</span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary">
                      since 2022
                    </span>
                  </figcaption>
                </div>
              </figure>
            </div>
          </section>
        </Reveal>

        {/* ─── Departures: projects at a glance ─── */}
        <PlaneFlyby targetId="departures" />
        <Reveal>
          <section id="departures" className="py-10 md:py-14">
            <SplitFlapBoard
              caption="Departures"
              columns={['Project', 'Stack', 'Status']}
              rows={boardRows}
            />
          </section>
        </Reveal>

        {/* ─── Terminal panels: live widgets ─── */}
        <section className="border-t border-border py-10 md:py-14">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="sm:col-span-2" delay={0.05}>
              <ExhibitFrame number="01" title="Tech stack" className="h-full">
                <TechStackWidget />
              </ExhibitFrame>
            </Reveal>

            <Reveal delay={0.1}>
              <ExhibitFrame number="02" title="Daily haiku" className="h-full">
                <HaikuWidget />
              </ExhibitFrame>
            </Reveal>

            <Reveal delay={0.05}>
              <ExhibitFrame number="03" title="Cabin audio" className="h-full">
                <SpotifyWidget />
              </ExhibitFrame>
            </Reveal>

            <Reveal delay={0.1}>
              <ExhibitFrame number="04" title="Commit log" className="h-full">
                <GitHubWidget />
              </ExhibitFrame>
            </Reveal>

            <Reveal delay={0.15}>
              <ExhibitFrame
                number="05"
                title="Position"
                className="h-full"
                flush
              >
                <LocationWidget />
              </ExhibitFrame>
            </Reveal>
          </div>
        </section>

        {/* ─── Boarding pass printer ─── */}
        <Reveal>
          <BoardingPass />
        </Reveal>

        {/* ─── Passenger manifest ─── */}
        <Reveal className="mt-10 md:mt-14">
          <VisitorLogbook />
        </Reveal>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-baseline justify-between px-4 py-5 sm:px-6">
          <span className="plaque">Hidalgo Intl</span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            {SITE.location}
          </span>
        </div>
      </footer>
    </div>
  );
}
