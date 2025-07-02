import { getSpotifyAccessToken } from './spotifyToken.js';
import { getYouTubeAccessToken } from './youTubeToken.js';

(async () => {
  try {
    const spotifyToken = await getSpotifyAccessToken();
    console.log('Spotify Token:', spotifyToken);

    const code = process.env.YOUTUBE_OAUTH_CODE;
    const redirectUri = process.env.YOUTUBE_REDIRECT_URI;

    if (code && redirectUri) {
      const yt = await getYouTubeAccessToken(code, redirectUri);
      console.log('YouTube Token:', yt.access_token);
    } else {
      console.log('YouTube skipped: no code or redirect URI in env');
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
