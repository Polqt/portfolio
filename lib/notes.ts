import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type NoteMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  githubUrl?: string;
};

const NOTES_DIR = path.join(process.cwd(), 'content', 'notes');

export function getAllNotes(): NoteMeta[] {
  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.mdx'));
  return files
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), 'utf8');
      const { data } = matter(raw);
      return { slug, ...data } as NoteMeta;
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getNote(
  slug: string,
): { meta: NoteMeta; content: string } | null {
  const file = path.join(NOTES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as NoteMeta, content };
}
