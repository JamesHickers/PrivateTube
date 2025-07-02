// spotifyToken.js
import fetch from 'node-fetch'; // if needed in your Node version

export async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify client ID or secret in environment variables');
  }

  const creds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    throw new Error(`Failed to get token: ${res.statusText}`);
  }

  const data = await res.json();
  return data.access_token;
}
