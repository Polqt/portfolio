import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';
import { SITE } from '@/data/site';
import TerminalNav from '@/components/TerminalNav';
import Reveal from '@/components/Reveal';

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TerminalNav />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <Reveal>
          <section className="border-b border-border py-12 md:py-16">
            <p className="plaque mb-4 text-primary">Arrivals</p>
            <h1 className="font-mono text-3xl font-semibold uppercase leading-tight tracking-[0.04em] sm:text-4xl">
              Blog
            </h1>
            <p className="mt-4 max-w-[55ch] text-[15px] leading-relaxed text-muted-foreground">
              A CS student&apos;s journey through code, experiments, and
              late-night discoveries. Sharing what I learn as I build, break,
              and occasionally fix things.
            </p>
          </section>
        </Reveal>

        <div className="space-y-4 py-10">
          {notes.map((note, index) => (
            <Reveal key={note.slug}>
              <article>
                <Link
                  href={`/notes/${note.slug}`}
                  className="group vitrine flex overflow-hidden transition-colors hover:border-primary/50"
                >
                  {/* pass body */}
                  <div className="min-w-0 flex-1 p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                        {note.date}
                      </p>
                      <p className="plaque">{note.readTime} read</p>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {note.title}
                    </h2>
                    <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                      {note.description}
                    </p>
                    <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      {note.tags.join(' / ')}
                    </p>
                  </div>

                  {/* tear-off stub */}
                  <div className="hidden w-36 flex-shrink-0 flex-col justify-between border-l border-dashed border-border p-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-1 sm:flex">
                    <div className="space-y-1.5">
                      <p className="plaque">Seat</p>
                      <p className="font-mono text-sm font-semibold text-foreground">
                        {String(index + 1).padStart(2, '0')}A
                      </p>
                      <p className="plaque pt-1">Gate</p>
                      <p className="font-mono text-sm font-semibold text-foreground">
                        BLOG
                      </p>
                    </div>
                    <div className="barcode h-9 w-full text-foreground/60" />
                  </div>
                </Link>
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
