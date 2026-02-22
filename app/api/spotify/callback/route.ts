import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');

  if (error) {
    return new NextResponse(
      html(`<p style="color:#f87171">Error: ${error}</p>`),
      {
        headers: { 'Content-Type': 'text/html' },
      },
    );
  }

  if (!code) {
    return new NextResponse(
      html(`<p style="color:#f87171">No code received.</p>`),
      {
        headers: { 'Content-Type': 'text/html' },
      },
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirectUri = `${req.nextUrl.origin}/api/spotify/callback`;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return new NextResponse(
      html(
        `<p style="color:#f87171">Token exchange failed:<br><pre>${JSON.stringify(data, null, 2)}</pre></p>`,
      ),
      { headers: { 'Content-Type': 'text/html' } },
    );
  }

  return new NextResponse(
    html(`
      <p style="color:#4ade80;font-size:18px;margin-bottom:24px">✓ Success! Copy your refresh token below:</p>
      <div style="background:#1e1e2e;border:1px solid #313244;border-radius:8px;padding:16px;margin-bottom:16px">
        <p style="color:#a6adc8;font-size:12px;margin-bottom:8px">REFRESH TOKEN — add this to .env.local</p>
        <code style="color:#cba6f7;font-size:13px;word-break:break-all">${data.refresh_token}</code>
      </div>
      <p style="color:#6c7086;font-size:12px">SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</p>
      <p style="color:#f38ba8;font-size:12px;margin-top:16px">Delete <code>/app/api/spotify/callback</code> after you've saved the token.</p>
    `),
    { headers: { 'Content-Type': 'text/html' } },
  );
}

function html(body: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Spotify Auth</title></head>
<body style="font-family:monospace;background:#11111b;color:#cdd6f4;padding:40px;max-width:700px;margin:0 auto">
  <h2 style="color:#1DB954;margin-bottom:24px">Spotify Token Exchange</h2>
  ${body}
</body>
</html>`;
}
