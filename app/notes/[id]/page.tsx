import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { getAllNotes, getNote } from '@/lib/notes';
import { SITE } from '@/data/site';
import TerminalNav from '@/components/TerminalNav';

export function generateStaticParams() {
  return getAllNotes().map(note => ({ id: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = getNote(id);
  if (!note) return {};
  return {
    title: note.meta.title,
    description: note.meta.description,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = getNote(id);

  if (!note) {
    notFound();
  }

  const { meta, content } = note;

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TerminalNav />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <article>
          <header className="border-b border-border py-12 md:py-14">
            <Link
              href="/notes"
              className="plaque transition-colors hover:text-foreground"
            >
              Back to blog
            </Link>
            <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {meta.date} · {meta.readTime} read
            </p>
          </header>

          <div className="prose prose-invert max-w-none py-10 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:text-[15px] prose-p:leading-relaxed prose-li:text-[15px] prose-a:text-primary prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none prose-code:rounded-none prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[13px] prose-code:font-normal prose-pre:rounded-none prose-pre:border prose-pre:border-border prose-pre:bg-card prose-blockquote:border-l-primary prose-blockquote:italic">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [[rehypePrettyCode, { theme: 'vesper' }]],
                },
              }}
            />
          </div>

          {meta.githubUrl && (
            <footer className="border-t border-border pt-6">
              <Link
                href={meta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
              >
                View on GitHub
              </Link>
            </footer>
          )}
        </article>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-3xl items-baseline justify-between px-4 py-5 sm:px-6">
          <span className="plaque">Hidalgo Intl</span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            {SITE.location}
          </span>
        </div>
      </footer>
    </div>
  );
}
