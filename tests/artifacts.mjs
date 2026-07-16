import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const output = join('.vercel', 'output', 'static');
const required = [
  'Hidalgo_CV.pdf',
  'rss.xml',
  'sitemap-0.xml',
  'sitemap-index.xml',
  join('pagefind', 'pagefind.js'),
];

for (const path of required) {
  const contents = await readFile(join(output, path));
  assert.ok(contents.length > 0, `${path} must be emitted for Vercel.`);
}

const assets = await readdir(join(output, '_astro'));
assert.ok(assets.some((asset) => asset.endsWith('.webp')), 'Sharp must emit optimized WebP assets.');
console.log(`Verified ${required.length} publishing artifacts and Sharp WebP output.`);
