// mediaFetcher.js
export async function getSpotifyAccessToken(clientId, clientSecret) {
  if (!clientId || !clientSecret) throw new Error('Missing Spotify creds');
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error(`Spotify token error: ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

export async function getYouTubeVideoInfo(apiKey, videoId) {
  if (!apiKey) throw new Error('Missing YouTube API key');
  if (!videoId) throw new Error('Missing YouTube video ID');
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API error: ${await res.text()}`);
  const data = await res.json();
  if (!data.items.length) throw new Error('YouTube video not found');
  return data.items[0];
}

/**
 * Automatically detects input type and runs correct fetch:
 * - If input starts with 'spotify:track:' → fetch Spotify token + return it
 * - Else assumes input is YouTube video ID → fetch video info
 */
export async function fetchMediaInfo(input, env) {
  if (!input) throw new Error('No input provided');

  if (input.startsWith('spotify:track:')) {
    const token = await getSpotifyAccessToken(env.SPOTIFY_CLIENT_ID, env.SPOTIFY_CLIENT_SECRET);
    return { service: 'spotify', accessToken: token };
  } else {
    const videoInfo = await getYouTubeVideoInfo(env.GOOGLE_API_KEY || env.GOOGLE_CLIENT_ID, input);
    return { service: 'youtube', videoInfo };
  }
}
