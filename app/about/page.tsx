import Image from 'next/image';
import { SITE } from '@/data/site';
import TerminalNav from '@/components/TerminalNav';
import Reveal from '@/components/Reveal';
import ExperienceSection from '@/components/ExperienceSection';
import TechStackWidget from '@/components/widgets/TechStackWidget';

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TerminalNav />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        {/* ─── Crew file ─── */}
        <Reveal>
          <section className="grid grid-cols-1 gap-8 border-b border-border py-12 md:grid-cols-12 md:gap-10 md:py-16">
            <div className="md:col-span-4">
              <figure className="max-w-[220px]">
                <div className="rounded-sm border border-border bg-card p-3">
                  <Image
                    src="/Hidalgo.png"
                    alt={SITE.name}
                    width={220}
                    height={220}
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

            <div className="md:col-span-8">
              <p className="plaque mb-4 text-primary">Crew file</p>
              <h1 className="font-mono text-3xl font-semibold uppercase leading-tight tracking-[0.04em] sm:text-4xl">
                {SITE.name}
              </h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {SITE.role} · {SITE.location}
              </p>
              <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
                {SITE.bio}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ─── Tech stack ─── */}
        <Reveal>
          <section className="border-b border-border py-10 md:py-14">
            <h2 className="mb-8 text-xl font-semibold tracking-tight">
              Tech stack
            </h2>
            <TechStackWidget />
          </section>
        </Reveal>

        {/* ─── Flight record ─── */}
        <Reveal>
          <section className="py-10 md:py-14">
            <h2 className="mb-10 text-xl font-semibold tracking-tight">
              Flight record
            </h2>
            <ExperienceSection />
          </section>
        </Reveal>
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
