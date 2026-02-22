import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { SITE } from '@/data/site';

// ─── Weather code → description ───
function getWeatherDesc(code: number): string {
  if (code === 0) return 'clear sky';
  if (code <= 3) return 'partly cloudy';
  if (code <= 48) return 'foggy';
  if (code <= 67) return 'rainy';
  if (code <= 82) return 'light rain showers';
  return 'stormy';
}

// ─── Time of day ───
function getTimeOfDay(): string {
  const h = new Date(
    new Date().toLocaleString('en-US', { timeZone: SITE.timezone }),
  ).getHours();
  if (h < 5) return 'deep night';
  if (h < 9) return 'early morning';
  if (h < 12) return 'morning';
  if (h < 14) return 'midday';
  if (h < 17) return 'afternoon';
  if (h < 20) return 'golden hour';
  return 'night';
}

// ─── Curated fallback haiku (used when no AI key is set) ───
const FALLBACK_HAIKU: Record<string, string[]> = {
  'clear sky': [
    'stars still hold their place',
    'a function returns nothing',
    'stdout blinks and waits',
  ],
  cloudy: [
    'clouds drift without merge',
    'the terminal glows steady',
    'something compiles now',
  ],
  rainy: [
    'rain logs each window',
    'the diff grows line by line here',
    'console stays quiet',
  ],
  foggy: [
    'fog wraps the server',
    'undefined creeps in at dusk',
    'still, the build goes through',
  ],
  stormy: [
    'lightning forks the sky',
    'git push force at three AM',
    'main branch holds the light',
  ],
};

function getFallbackHaiku(weather: string): string[] {
  if (weather.includes('rain')) return FALLBACK_HAIKU['rainy'];
  if (weather.includes('fog')) return FALLBACK_HAIKU['foggy'];
  if (weather.includes('storm') || weather.includes('thunder'))
    return FALLBACK_HAIKU['stormy'];
  if (weather === 'clear sky') return FALLBACK_HAIKU['clear sky'];
  return FALLBACK_HAIKU['cloudy'];
}

// ─── Cached generator (resets each calendar day via dateKey) ───
const generateHaiku = unstable_cache(
  async (dateKey: string) => {
    let weather = 'partly cloudy';
    let commit = 'building something new';

    // Fetch weather from Open-Meteo (free, no key needed)
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${SITE.lat}&longitude=${SITE.lon}&current=weathercode`,
        { next: { revalidate: 3600 } },
      );
      const data = await res.json();
      weather = getWeatherDesc(data?.current?.weathercode ?? 2);
    } catch {}

    // Fetch latest GitHub commit message
    try {
      const res = await fetch(
        `https://api.github.com/users/${SITE.githubUsername}/events?per_page=15`,
        { next: { revalidate: 3600 } },
      );
      const events = await res.json();
      const push = Array.isArray(events)
        ? events.find((e: { type: string }) => e.type === 'PushEvent')
        : null;
      if (push?.payload?.commits?.[0]?.message) {
        commit = push.payload.commits[0].message.split('\n')[0].slice(0, 80);
      }
    } catch {}

    const timeOfDay = getTimeOfDay();
    const apiKey = process.env.OPENAI_API_KEY;

    // ─── AI generation if key is present ───
    if (apiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'user',
                content: [
                  "Write a haiku (3 lines, 5-7-5 syllables) for a developer's day.",
                  `Context: weather is "${weather}", latest commit: "${commit}", time of day: "${timeOfDay}".`,
                  'Return exactly 3 lines only — no labels, no titles, no punctuation besides what feels natural.',
                ].join('\n'),
              },
            ],
            max_tokens: 80,
            temperature: 0.88,
          }),
        });
        const json = await res.json();
        const text: string = json?.choices?.[0]?.message?.content?.trim() ?? '';
        const lines = text
          .split('\n')
          .map((l: string) => l.trim())
          .filter(Boolean)
          .slice(0, 3);
        if (lines.length === 3) {
          return {
            lines,
            weather,
            timeOfDay,
            commit,
            generated: true,
            date: dateKey,
          };
        }
      } catch {}
    }

    // ─── Fallback ───
    return {
      lines: getFallbackHaiku(weather),
      weather,
      timeOfDay,
      commit,
      generated: false,
      date: dateKey,
    };
  },
  ['daily-haiku'],
  { revalidate: 86400 },
);

export async function GET() {
  const dateKey = new Date().toISOString().split('T')[0];
  const data = await generateHaiku(dateKey);
  return NextResponse.json(data);
}
