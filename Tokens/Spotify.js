const clientId = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !secret) {
  console.error('❌ Missing Spotify credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET as env vars.');
  process.exit(1);
}

async function getSpotifyAccessToken() {
  const authHeader = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Spotify token request failed: ${err}`);
  }

  const { access_token } = await response.json();
  return access_token;
}

// Just run it
getSpotifyAccessToken()
  //.then(token => console.log('✅ Access token:', token))
  .catch(err => console.error('❌ Error:', err.message));
