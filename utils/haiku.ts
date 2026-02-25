import { SITE } from '@/data/site';
import type { HaikuSignals } from '@/types';

// ─── Weather ────────────────────────────────────────────────

const WEATHER_TABLE: [number, string][] = [
  [0, 'clear sky'],
  [3, 'partly cloudy'],
  [48, 'foggy'],
  [67, 'rainy'],
  [82, 'light rain showers'],
];

export function weatherFromCode(code: number): string {
  for (const [max, label] of WEATHER_TABLE) {
    if (code <= max) return label;
  }
  return 'stormy';
}

export async function fetchWeather(): Promise<string> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${SITE.lat}&longitude=${SITE.lon}&current=weathercode`,
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    return weatherFromCode(data?.current?.weathercode ?? 2);
  } catch {
    return 'partly cloudy';
  }
}

// ─── Time of Day ────────────────────────────────────────────

const TIME_BANDS: [number, string][] = [
  [5, 'deep night'],
  [9, 'early morning'],
  [12, 'morning'],
  [14, 'midday'],
  [17, 'afternoon'],
  [20, 'golden hour'],
];

export function getTimeOfDay(): string {
  const h = new Date(
    new Date().toLocaleString('en-US', { timeZone: SITE.timezone }),
  ).getHours();
  for (const [until, label] of TIME_BANDS) {
    if (h < until) return label;
  }
  return 'night';
}

// ─── Moon Phase ─────────────────────────────────────────────

const MOON_PHASES: [number, string][] = [
  [2, 'new moon'],
  [7, 'waxing crescent'],
  [9, 'first quarter'],
  [14, 'waxing gibbous'],
  [16, 'full moon'],
  [21, 'waning gibbous'],
  [23, 'last quarter'],
  [28, 'waning crescent'],
];

export function getMoonPhase(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  let r = y % 100;
  r = r % 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + m + day;
  if (m < 3) r += 2;
  r = (((r - (y < 2000 ? 4 : 8.3)) % 30) + 30) % 30;

  for (const [until, label] of MOON_PHASES) {
    if (r < until) return label;
  }
  return 'new moon';
}

// ─── Emotion Tint ───────────────────────────────────────────

const EMOTIONS = [
  'longing',
  'stillness',
  'wonder',
  'melancholy',
  'relief',
  'tenderness',
  'awe',
  'restlessness',
  'contentment',
  'nostalgia',
  'solitude',
  'curiosity',
  'bittersweet',
  'serenity',
  'unease',
] as const;

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getEmotion(dateKey: string): string {
  return EMOTIONS[hashString(dateKey) % EMOTIONS.length];
}

// ─── Rare Daily Signal ──────────────────────────────────────

const RARE_SIGNALS = [
  'a stranger smiled at you today',
  'you woke before the alarm',
  'a song you forgot played on loop in your head',
  'you noticed the color of the sky for the first time this week',
  'someone said your name in a crowded room',
  'the coffee tasted different this morning',
  'you almost called someone but did not',
  'a book fell open to a page you needed',
  'the streetlight outside flickered twice',
  'you remembered a dream from years ago',
  'rain stopped the exact moment you stepped outside',
  'you heard laughter from an open window',
  'a bird landed close and stayed',
  'the milk ran out at the perfect time',
  'you caught your reflection and paused',
  'someone left a door open for you',
  'the wind carried a scent you could not place',
  'you found a coin face-up',
  'a cloud looked like something from childhood',
  'you said the same word as someone at the same time',
] as const;

export function getRareSignal(dateKey: string): string {
  return RARE_SIGNALS[hashString(dateKey + '-rare') % RARE_SIGNALS.length];
}

// ─── Latest Commit ──────────────────────────────────────────

export async function fetchLatestCommit(): Promise<string> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${SITE.githubUsername}/events?per_page=15`,
      { next: { revalidate: 3600 } },
    );
    const events = await res.json();
    const push = Array.isArray(events)
      ? events.find((e: { type: string }) => e.type === 'PushEvent')
      : null;
    return (
      push?.payload?.commits?.[0]?.message?.split('\n')[0].slice(0, 80) ??
      'building something new'
    );
  } catch {
    return 'building something new';
  }
}

// ─── Gather All Signals ─────────────────────────────────────

export async function gatherSignals(dateKey: string): Promise<HaikuSignals> {
  const [weather, commit] = await Promise.all([
    fetchWeather(),
    fetchLatestCommit(),
  ]);

  return {
    weather,
    commit,
    timeOfDay: getTimeOfDay(),
    moonPhase: getMoonPhase(),
    emotion: getEmotion(dateKey),
    rareSignal: getRareSignal(dateKey),
  };
}

// ─── Fallback Poems (atmospheric, no tech) ──────────────────

const FALLBACK_POEMS: Record<string, string[]> = {
  'clear sky': [
    'light clings to the ridge',
    'a door left open somewhere',
    'the field breathes alone',
  ],
  cloudy: [
    'grey wool over hills',
    'someone is humming a name',
    'the river forgets',
  ],
  rainy: [
    'rain on the tin roof',
    'a letter half-folded waits',
    'puddles hold the sky',
  ],
  foggy: [
    'fog swallows the pier',
    'a bell rings from nowhere near',
    'salt air, nothing more',
  ],
  stormy: [
    'wind bends the tall grass',
    'a window rattles its frame',
    'petrichor arrives',
  ],
};

export function getFallbackPoem(weather: string): string[] {
  if (weather.includes('rain')) return FALLBACK_POEMS['rainy'];
  if (weather.includes('fog')) return FALLBACK_POEMS['foggy'];
  if (weather.includes('storm') || weather.includes('thunder'))
    return FALLBACK_POEMS['stormy'];
  if (weather === 'clear sky') return FALLBACK_POEMS['clear sky'];
  return FALLBACK_POEMS['cloudy'];
}

// ─── AI Prompt Builder ──────────────────────────────────────

export function buildPrompt(signals: HaikuSignals): string {
  return [
    'You generate a short atmospheric micro-poem that reacts to real-time signals.',
    'The poem must NOT mention technology, computers, code, software, or digital concepts.',
    '',
    'Inputs you may interpret symbolically, not literally:',
    `• sky and weather: "${signals.weather}"`,
    `• emotional tone implied by my latest commit: "${signals.commit}"`,
    `• feeling of this moment in the day: "${signals.timeOfDay}"`,
    `• current moon phase: "${signals.moonPhase}"`,
    `• emotional tint: "${signals.emotion}"`,
    `• rare daily signal: "${signals.rareSignal}"`,
    '',
    'Instructions:',
    '• 3 to 6 lines',
    '• no titles, no explanations',
    '• avoid predictable AI-haiku patterns and syllable structure',
    '• feel free to use surreal, cinematic, or quiet imagery',
    '• avoid clichés (no "gentle breeze", no "whispering wind", no "endless sky")',
    '• allow unusual metaphors or unexpected sensory details',
    "• poem should feel fleeting, like a moment the reader wasn't meant to see",
    '• output only the poem',
  ].join('\n');
}
