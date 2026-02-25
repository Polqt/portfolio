import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import type { HaikuData } from '@/types';
import { gatherSignals, getFallbackPoem, buildPrompt } from '@/utils/haiku';

// ─── Cached generator (one poem per calendar day) ───

const generateHaiku = unstable_cache(
  async (dateKey: string): Promise<HaikuData> => {
    const signals = await gatherSignals(dateKey);
    const apiKey = process.env.OPENAI_API_KEY;

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
            messages: [{ role: 'user', content: buildPrompt(signals) }],
            max_tokens: 120,
            temperature: 0.94,
          }),
        });

        const json = await res.json();
        const text: string = json?.choices?.[0]?.message?.content?.trim() ?? '';
        const lines = text
          .split('\n')
          .map((l: string) => l.trim())
          .filter(Boolean)
          .slice(0, 6);

        if (lines.length >= 3) {
          return { lines, ...signals, generated: true, date: dateKey };
        }
      } catch {}
    }

    return {
      lines: getFallbackPoem(signals.weather),
      ...signals,
      generated: false,
      date: dateKey,
    };
  },
  ['daily-haiku'],
  { revalidate: 86400 },
);

// ─── Handler ───

export async function GET() {
  const dateKey = new Date().toISOString().split('T')[0];
  const data = await generateHaiku(dateKey);
  return NextResponse.json(data);
}
