import type { APIRoute } from 'astro';
import { z } from 'astro/zod';

export const prerender = false;

const tokenSchema = z.object({ access_token: z.string() });
const profileSchema = z.object({
  display_name: z.string(),
  external_urls: z.object({ spotify: z.url() }),
  images: z.array(z.object({ url: z.url() })),
});
const trackSchema = z.object({
  album: z.object({ images: z.array(z.object({ url: z.url() })), name: z.string() }),
  artists: z.array(z.object({ name: z.string() })),
  duration_ms: z.number(),
  external_urls: z.object({ spotify: z.url() }),
  name: z.string(),
});
const playbackSchema = z.object({
  is_playing: z.boolean(),
  item: trackSchema.nullable(),
  progress_ms: z.number().nullable(),
});
const recentSchema = z.object({
  items: z.array(z.object({ track: trackSchema })),
});
const topArtistsSchema = z.object({
  items: z.array(z.object({
    external_urls: z.object({ spotify: z.url() }),
    name: z.string(),
  })),
});

type Track = z.infer<typeof trackSchema>;
const formatTrack = (track: Track) => ({
  album: track.album.name,
  albumArt: track.album.images[0]?.url ?? null,
  artist: track.artists.map((artist) => artist.name).join(', '),
  duration: track.duration_ms,
  name: track.name,
  songUrl: track.external_urls.spotify,
});

const uniqueTracks = (tracks: readonly ReturnType<typeof formatTrack>[]) =>
  tracks.filter((track, index) => tracks.findIndex((item) => item.songUrl === track.songUrl) === index);

export const GET: APIRoute = async () => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    return Response.json({ configured: false, current: null, profile: null, recentTracks: [] });
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });
    const token = tokenSchema.parse(await tokenResponse.json());
    const headers = { Authorization: `Bearer ${token.access_token}` };
    const [profileResponse, playbackResponse, recentResponse, topArtistsResponse] = await Promise.all([
      fetch('https://api.spotify.com/v1/me', { headers, signal: AbortSignal.timeout(5_000) }),
      fetch('https://api.spotify.com/v1/me/player/currently-playing', { headers, signal: AbortSignal.timeout(5_000) }),
      fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', { headers, signal: AbortSignal.timeout(5_000) }),
      // requires the user-top-read scope on the refresh token; missing scope
      // degrades to an empty list rather than failing the whole route
      fetch('https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term', { headers, signal: AbortSignal.timeout(5_000) }),
    ]);
    const profile = profileResponse.ok ? profileSchema.parse(await profileResponse.json()) : null;
    const recent = recentResponse.ok
      ? uniqueTracks(recentSchema.parse(await recentResponse.json()).items.map(({ track }) => formatTrack(track)))
      : [];
    const topArtists = topArtistsResponse.ok
      ? topArtistsSchema.parse(await topArtistsResponse.json()).items.map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
      }))
      : [];
    const profileValue = profile ? {
      displayName: profile.display_name,
      image: profile.images[0]?.url ?? null,
      url: profile.external_urls.spotify,
    } : null;

    if (playbackResponse.status === 204) {
      const [latest, ...rest] = recent;
      return Response.json({
        configured: true,
        current: latest ? { ...latest, isPlaying: false, progress: 0 } : null,
        profile: profileValue,
        recentTracks: rest.slice(0, 3),
        topArtists,
      });
    }
    const playback = playbackSchema.parse(await playbackResponse.json());
    if (!playback.item) {
      return Response.json({
        configured: true,
        current: null,
        profile: profileValue,
        recentTracks: recent.slice(0, 3),
        topArtists,
      });
    }
    const current = formatTrack(playback.item);
    return Response.json({
      configured: true,
      current: {
        ...current,
        isPlaying: playback.is_playing,
        progress: playback.progress_ms ?? 0,
      },
      profile: profileValue,
      recentTracks: recent.filter((track) => track.songUrl !== current.songUrl).slice(0, 3),
      topArtists,
    });
  } catch {
    return Response.json({ configured: false, current: null, profile: null, recentTracks: [], topArtists: [] });
  }
};
