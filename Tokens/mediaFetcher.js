// mediaFetcher.js
export async function getSpotifyAccessToken(clientId, clientSecret) {
  if (!clientId || !clientSecret) 
    throw new Error('Missing Spotify credentials (client ID or secret).');

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Spotify token error: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function getYouTubeVideoInfo(apiKey, videoId) {
  if (!apiKey) throw new Error('Missing YouTube API key.');
  if (!videoId) throw new Error('Missing YouTube video ID.');

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
  const res = await fetch(url);
  
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`YouTube API error: ${err}`);
  }

  const data = await res.json();
  if (!data.items || data.items.length === 0)
    throw new Error('YouTube video not found.');

  return data.items[0];
}

/**
 * Detects input type and fetches data accordingly:
 * - accepts Spotify URI like 'spotify:track:TRACK_ID' or just 'TRACK_ID'
 * - or YouTube video ID
 */
export async function fetchMediaInfo(input, env) {
  if (!input) throw new Error('No input provided.');

  // Normalize Spotify track id if full URI given
  let spotifyTrackId = null;
  if (input.startsWith('spotify:track:')) {
    spotifyTrackId = input.split(':').pop();
  } else if (/^[a-zA-Z0-9]{22}$/.test(input)) {
    // Could be either a Spotify track id (22 chars) or YouTube video id (11 chars),
    // but Spotify IDs are always 22 chars
    spotifyTrackId = input.length === 22 ? input : null;
  }

  if (spotifyTrackId) {
    // Spotify token fetch — you can extend this to fetch track info later
    const token = await getSpotifyAccessToken(env.SPOTIFY_CLIENT_ID, env.SPOTIFY_CLIENT_SECRET);
    return { service: 'spotify', accessToken: token, trackId: spotifyTrackId };
  } else {
    // Otherwise treat input as YouTube video ID
    const videoInfo = await getYouTubeVideoInfo(env.GOOGLE_API_KEY || env.GOOGLE_CLIENT_ID, input);
    return { service: 'youtube', videoInfo };
  }
}
