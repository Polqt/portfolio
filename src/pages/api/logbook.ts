import type { APIRoute } from 'astro';
import { z } from 'astro/zod';

export const prerender = false;

const stamps = ['GG WP', 'Hire this dev', 'Great portfolio', "Let's build something"] as const;
// closed set of flag emoji -- never accept arbitrary emoji/text here, that's
// the whole point of keeping this a dropdown instead of free text
const flags = ['🇵🇭', '🇺🇸', '🇬🇧', '🇯🇵', '🇩🇪', '🇫🇷', '🇮🇳', '🇧🇷', '🇨🇦', '🇦🇺', '🌍'] as const;

const entrySchema = z.object({
  flag: z.enum(flags).optional(),
  message: z.string().max(80).optional(),
  name: z.string(),
  stamp: z.enum(stamps),
  ts: z.number(),
});
const requestSchema = z.object({
  flag: z.enum(flags).optional(),
  message: z.string().optional(),
  name: z.string(),
  stamp: z.enum(stamps),
});
const upstashSchema = z.object({ result: z.unknown() });
const memory: z.infer<typeof entrySchema>[] = [];
const lastPost = new Map<string, number>();

function sanitize(value: string, maxLength: number): string {
  return value.replace(/[\p{Cc}\p{Cf}]/gu, '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

async function redis(command: readonly (string | number)[]): Promise<unknown> {
  const url = import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const response = await fetch(url, {
    body: JSON.stringify(command),
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    method: 'POST',
  });
  if (!response.ok) throw new Error(`Redis request failed: ${response.status}`);
  return upstashSchema.parse(await response.json()).result;
}

async function entries(): Promise<readonly z.infer<typeof entrySchema>[]> {
  if (!import.meta.env.UPSTASH_REDIS_REST_URL) return memory.slice(0, 12);
  const raw = z.array(z.string()).parse(await redis(['LRANGE', 'logbook:entries', 0, 11]));
  return raw.flatMap((value) => {
    try {
      const parsed = entrySchema.safeParse(JSON.parse(value));
      return parsed.success ? [parsed.data] : [];
    } catch {
      return [];
    }
  });
}

export const GET: APIRoute = async () => {
  try {
    const values = await entries();
    return Response.json({ entries: values, total: values.length });
  } catch {
    return Response.json({ entries: [], total: 0 });
  }
};

export const POST: APIRoute = async ({ clientAddress, request }) => {
  const last = lastPost.get(clientAddress);
  if (last && Date.now() - last < 30_000) {
    return Response.json({ error: 'One signature every 30 seconds, please.' }, { status: 429 });
  }
  try {
    const payload = requestSchema.parse(await request.json());
    const name = sanitize(payload.name, 24);
    if (!name) return Response.json({ error: 'A name is required.' }, { status: 400 });
    const message = payload.message ? sanitize(payload.message, 80) : undefined;
    const entry = entrySchema.parse({
      ...(payload.flag ? { flag: payload.flag } : {}),
      ...(message ? { message } : {}),
      name,
      stamp: payload.stamp,
      ts: Date.now(),
    });
    if (import.meta.env.UPSTASH_REDIS_REST_URL) {
      await redis(['LPUSH', 'logbook:entries', JSON.stringify(entry)]);
      await redis(['LTRIM', 'logbook:entries', 0, 499]);
    } else {
      memory.unshift(entry);
      memory.splice(500);
    }
    lastPost.set(clientAddress, Date.now());
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }
};
