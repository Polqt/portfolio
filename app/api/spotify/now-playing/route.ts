import { NextResponse } from 'next/server';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    next: { revalidate: 0 },
  });
  return res.json();
}

export async function GET() {
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return NextResponse.json({ isPlaying: false, configured: false });
  }

  try {
    const { access_token } = await getAccessToken();

    // 1. Try currently playing
    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 0 },
    });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item) {
        const track = data.item;
        return NextResponse.json({
          isPlaying: data.is_playing,
          configured: true,
          name: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url ?? null,
          songUrl: track.external_urls.spotify,
          progress: data.progress_ms,
          duration: track.duration_ms,
        });
      }
    }

    // 2. Fall back to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 0 },
    });

    if (recentRes.ok) {
      const data = await recentRes.json();
      const track = data?.items?.[0]?.track;
      if (track) {
        return NextResponse.json({
          isPlaying: false,
          configured: true,
          name: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url ?? null,
          songUrl: track.external_urls.spotify,
          progress: 0,
          duration: track.duration_ms,
        });
      }
    }

    return NextResponse.json({ isPlaying: false, configured: true });
  } catch {
    return NextResponse.json({ isPlaying: false, configured: false });
  }
}
