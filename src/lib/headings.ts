import GithubSlugger from 'github-slugger';

export type Heading = { depth: 2 | 3; slug: string; text: string };

const HEADING_RE = /^(#{2,3})\s+(.+)$/gm;

/** Extracts h2/h3 headings from raw MDX body for the table of contents. Uses github-slugger so anchors match rehype-slug's IDs exactly, including duplicate-heading suffixes. */
export function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  return [...body.matchAll(HEADING_RE)]
    .filter((match) => match[1] !== undefined && match[2] !== undefined)
    .map((match) => {
      const depth = match[1]!.length as 2 | 3;
      const text = match[2]!.replace(/[*_`]/g, '').trim();
      return { depth, slug: slugger.slug(text), text };
    });
}
