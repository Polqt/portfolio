import { NextResponse } from 'next/server';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played?limit=5';

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

function formatTrack(track: {
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
  external_urls: { spotify: string };
  duration_ms: number;
}) {
  return {
    name: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    albumArt: track.album.images[0]?.url ?? null,
    songUrl: track.external_urls.spotify,
    duration: track.duration_ms,
  };
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

    // Fetch both in parallel
    const [nowRes, recentRes] = await Promise.all([
      fetch(NOW_PLAYING_ENDPOINT, {
        headers: { Authorization: `Bearer ${access_token}` },
        next: { revalidate: 0 },
      }),
      fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: { Authorization: `Bearer ${access_token}` },
        next: { revalidate: 0 },
      }),
    ]);

    // Parse recent tracks
    const recentData = recentRes.ok ? await recentRes.json() : null;
    const recentTracks = (recentData?.items ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => formatTrack(item.track))
      .slice(0, 5);

    // Currently playing?
    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item) {
        const current = {
          ...formatTrack(data.item),
          isPlaying: data.is_playing,
          progress: data.progress_ms,
        };
        // Remove duplicate from recent list
        const recent = recentTracks.filter(
          (t: { songUrl: string }) => t.songUrl !== current.songUrl,
        );
        return NextResponse.json({
          configured: true,
          current,
          recentTracks: recent.slice(0, 4),
        });
      }
    }

    // Not playing — use most recent as hero
    const [hero, ...rest] = recentTracks;
    return NextResponse.json({
      configured: true,
      current: hero ? { ...hero, isPlaying: false, progress: 0 } : null,
      recentTracks: rest.slice(0, 4),
    });
  } catch {
    return NextResponse.json({ isPlaying: false, configured: false });
  }
}
