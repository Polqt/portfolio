import { expect, test } from 'playwright/test';

const pages = [
  { path: '/', heading: "I'm Janpol" },
  { path: '/about', heading: 'About' },
  { path: '/projects', heading: 'Projects' },
  { path: '/notes', heading: 'Notes' },
  {
    path: '/notes/convex-tanstack-experience',
    heading: 'I Built a Lost & Found System with Convex',
  },
];

for (const pageCase of pages) {
  test(`${pageCase.path} renders preserved portfolio content`, async ({ page }) => {
    await page.goto(pageCase.path);

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      pageCase.heading,
    );
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toContainText('Projects');
    await expect(page.locator('main')).toBeVisible();
  });
}

test('legacy endpoints and the haiku home module are removed', async ({ page, request }) => {
  for (const path of ['/api/haiku', '/api/spotify/now-playing', '/api/spotify/callback']) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
  }
  await page.goto('/');
  await expect(page.getByText('Haiku', { exact: true })).toHaveCount(0);
});

test('logbook rejects an empty signature', async ({ request }) => {
  const response = await request.post('/api/logbook', {
    data: { name: '', stamp: 'GG WP' },
  });

  expect(response.status()).toBe(400);
});
test('navigation exposes all preserved routes', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute(
    'href',
    '/#about',
  );
  await expect(page.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
    'href',
    '/projects',
  );
  await expect(page.getByRole('link', { name: 'Notes' })).toHaveAttribute(
    'href',
    '/notes',
  );
});

test('CV links download the supplied Hidalgo CV PDF', async ({ page, request }) => {
  await page.goto('/');

  const link = page.getByRole('link', { name: 'Download CV' });
  await expect(link).toHaveAttribute('href', '/Hidalgo_CV.pdf');
  await expect(link).toHaveAttribute('download', 'Hidalgo_CV.pdf');

  const response = await request.get('/Hidalgo_CV.pdf');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
});

test('home includes map-backed profile, experience, credentials, and tools', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#about')).toContainText("I'm Janpol");
  await expect(page.locator('#about')).toContainText('I make things people actually have to use');
  await expect(page.getByTitle('Map showing Sagay City, Philippines')).toBeVisible();
  for (const name of ['Download CV', 'Email Janpol', 'Janpol on GitHub', 'Janpol on LinkedIn']) {
    const link = page.getByRole('link', { name });
    await expect(link).toBeVisible();
    await expect(link.locator('svg')).toHaveCount(1);
  }
  await expect(page.getByText('Noteworthy VA', { exact: true })).toBeVisible();
  await expect(page.getByText('Wittelsbach.AI', { exact: true })).toBeVisible();
  await expect(page.getByText('Graduated April 2026', { exact: true })).toBeVisible();
  await expect(page.getByText('Data Engineer Associate', { exact: true })).toBeVisible();
  await expect(page.getByText('Google UX Design Specialization', { exact: true })).toBeVisible();
  await expect(page.getByText('Spring Boot', { exact: true })).toBeVisible();
  await expect(page.getByText('Snowflake', { exact: true })).toBeVisible();
});

test('projects use compact note-style rows without feature grids', async ({ page }) => {
  await page.goto('/projects');

  await expect(page.locator('.project-row')).toHaveCount(5);
  await expect(page.locator('.highlights')).toHaveCount(0);
  await expect(page.getByText('RAG pipeline with 90%+ match accuracy')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Tandaan' })).toBeVisible();
});

test('GitHub endpoint degrades without returning 503', async ({ request }) => {
  const response = await request.get('/api/github');
  const payload = await response.json();

  expect(response.status()).toBe(200);
  expect(typeof payload.configured).toBe('boolean');
});

test('Spotify account renders current track and three recent plays', async ({ page }) => {
  await page.route('**/api/github', (route) => route.fulfill({
    body: JSON.stringify({ configured: true, followers: 12, publicRepos: 34, recentCommits: [], totalStars: 56 }),
    contentType: 'application/json',
  }));
  await page.route('**/api/spotify', (route) => route.fulfill({
    body: JSON.stringify({
      configured: true,
      current: { album: 'Album', albumArt: null, artist: 'Artist', duration: 180000, isPlaying: true, name: 'Current song', progress: 30000, songUrl: 'https://open.spotify.com/track/current' },
      profile: { displayName: 'Janpol on Spotify', image: null, url: 'https://open.spotify.com/user/janpol' },
      recentTracks: [
        { album: 'One', albumArt: null, artist: 'Artist A', duration: 1, name: 'Recent one', songUrl: 'https://open.spotify.com/track/one' },
        { album: 'Two', albumArt: null, artist: 'Artist B', duration: 1, name: 'Recent two', songUrl: 'https://open.spotify.com/track/two' },
        { album: 'Three', albumArt: null, artist: 'Artist C', duration: 1, name: 'Recent three', songUrl: 'https://open.spotify.com/track/three' },
      ],
    }),
    contentType: 'application/json',
  }));
  await page.goto('/');

  const spotify = page.getByRole('region', { name: 'Spotify' });
  await expect(spotify.getByRole('link', { name: 'Janpol on Spotify' })).toHaveAttribute('href', 'https://open.spotify.com/user/janpol');
  await expect(spotify.getByText('Current song')).toBeVisible();
  await expect(spotify.locator('[data-recent-track]')).toHaveCount(3);
});

test('logbook uses a native stamp dropdown', async ({ page }) => {
  await page.goto('/');

  const stamp = page.getByRole('combobox', { name: 'Pick a stamp' });
  await expect(stamp).toBeVisible();
  await expect(stamp.locator('option')).toHaveCount(4);
  await expect(page.getByRole('radio')).toHaveCount(0);
});

test('RSS publishes the notes with canonical URLs', async ({ request }) => {
  const response = await request.get('/rss.xml');
  const xml = await response.text();

  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('xml');
  expect(xml).toContain('<rss');
  expect(xml).toContain('https://janpolhidalgo.dev/notes/convex-tanstack-experience');
});

test('note reading time is derived from the MDX body', async ({ page }) => {
  await page.goto('/notes/convex-tanstack-experience');

  await expect(page.locator('.page-header .meta')).toContainText('4 min read');
  await expect(page.locator('.page-header .meta')).not.toContainText('5 min read');
});

test('MDX code blocks use the Expressive Code and Shiki renderer', async ({ page }) => {
  await page.goto('/notes/convex-tanstack-experience');

  const codeBlock = page.locator('.expressive-code').first();
  await expect(codeBlock).toBeVisible();
  await expect(codeBlock.locator('pre')).toHaveAttribute('data-language', 'typescript');
  await expect(codeBlock.locator('code')).not.toBeEmpty();
});

test('MDX notes render accessible Mermaid diagrams', async ({ page }) => {
  await page.goto('/notes/layered-project-structure-vs-feature-based');

  const diagram = page.locator('.mermaid-diagram');
  await expect(diagram).toHaveAttribute('aria-label', 'Layered and feature-first project structures');
  await expect(diagram.locator('svg')).toBeVisible();
  await expect(diagram.locator('.mermaid-source')).toBeHidden();
  await page.getByRole('button', { name: 'Use dark theme' }).click();
  await expect(page.getByRole('button', { name: 'Use light theme' })).toHaveAttribute('aria-pressed', 'true');
  await expect(diagram.locator('svg')).toBeVisible();
});

test('notes expose a keyboard-accessible Pagefind search', async ({ page }) => {
  await page.goto('/notes');

  const search = page.getByRole('search', { name: 'Search notes' });
  const input = page.getByRole('combobox', { name: 'Search notes' });
  await expect(search).toBeVisible();
  await input.fill('Feature-First');
  await expect(search.locator('a[href*="layered-project-structure"]')).toBeVisible();
});

test('notes keep Giscus disabled until GitHub Discussions is configured', async ({ page }) => {
  await page.goto('/notes/convex-tanstack-experience');

  const discussion = page.getByRole('region', { name: 'Discussion' });
  await expect(discussion).toContainText('GitHub Discussions');
  await expect(page.locator('script[src="https://giscus.app/client.js"]')).toHaveCount(0);
});
