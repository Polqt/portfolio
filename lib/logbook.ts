export type LogbookEntry = {
  name: string;
  stamp: string;
  ts: number;
};

export const STAMPS = [
  'Smooth landing',
  'Hire this dev',
  'Frequent flyer',
  'Came for the haiku',
] as const;

const KEY = 'logbook:entries';
const MAX_ENTRIES = 500;

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// ponytail: in-memory fallback for local dev without Upstash creds;
// entries vanish on restart, which is fine for dev
const memory = globalThis as unknown as { __logbook?: LogbookEntry[] };

async function redis(...command: (string | number)[]): Promise<unknown> {
  const res = await fetch(url!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

export async function getEntries(): Promise<{
  entries: LogbookEntry[];
  total: number;
}> {
  if (!url || !token) {
    const entries = memory.__logbook ?? [];
    return { entries: entries.slice(0, 12), total: entries.length };
  }
  const [raw, total] = await Promise.all([
    redis('LRANGE', KEY, 0, 11) as Promise<string[]>,
    redis('LLEN', KEY) as Promise<number>,
  ]);
  const entries = raw
    .map(item => {
      try {
        return JSON.parse(item) as LogbookEntry;
      } catch {
        return null;
      }
    })
    .filter((e): e is LogbookEntry => e !== null);
  return { entries, total };
}

export async function addEntry(entry: LogbookEntry): Promise<void> {
  if (!url || !token) {
    memory.__logbook = [entry, ...(memory.__logbook ?? [])].slice(
      0,
      MAX_ENTRIES,
    );
    return;
  }
  await redis('LPUSH', KEY, JSON.stringify(entry));
  await redis('LTRIM', KEY, 0, MAX_ENTRIES - 1);
}
