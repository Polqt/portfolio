import { NextRequest, NextResponse } from 'next/server';
import { addEntry, getEntries, STAMPS } from '@/lib/logbook';

export const dynamic = 'force-dynamic';

// ponytail: in-memory rate limit, resets on redeploy; per-instance on
// serverless which is loose but good enough for a guestbook
const lastPost = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

export async function GET() {
  try {
    const data = await getEntries();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ entries: [], total: 0 });
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  const last = lastPost.get(ip);
  if (last && Date.now() - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: 'One signature every 30 seconds, please.' },
      { status: 429 },
    );
  }

  let body: { name?: unknown; stamp?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name =
    typeof body.name === 'string'
      ? // strip control characters, collapse whitespace
        body.name
          .replace(/[\p{Cc}\p{Cf}]/gu, '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 24)
      : '';
  const stamp = typeof body.stamp === 'string' ? body.stamp : '';

  if (!name) {
    return NextResponse.json({ error: 'A name is required.' }, { status: 400 });
  }
  if (!(STAMPS as readonly string[]).includes(stamp)) {
    return NextResponse.json({ error: 'Unknown stamp.' }, { status: 400 });
  }

  try {
    await addEntry({ name, stamp, ts: Date.now() });
    lastPost.set(ip, Date.now());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'The register is unavailable right now.' },
      { status: 503 },
    );
  }
}
