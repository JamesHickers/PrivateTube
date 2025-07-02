// runTokens.js
import { getSpotifyAccessToken } from './spotifyToken.js';
import { getYouTubeAccessToken } from './youtubeToken.js';

(async () => {
  try {
    // Spotify token — no args needed, grabs secrets from process.env internally
    const spotifyToken = await getSpotifyAccessToken();
    console.log('Spotify Access Token:', spotifyToken);

    // YouTube token — you MUST provide a real code and redirect URI from OAuth flow
    const oauthCode = process.env.YOUTUBE_OAUTH_CODE || 'your-oauth-code-here';
    const redirectUri = process.env.YOUTUBE_REDIRECT_URI || 'https://krynet.ai';

    if (oauthCode === 'your-oauth-code-here' || redirectUri === 'your-redirect-uri-here') {
      console.log('YouTube OAuth code or redirect URI missing. Skipping YouTube token fetch.');
    } else {
      const youtubeTokenData = await getYouTubeAccessToken(oauthCode, redirectUri);
      console.log('YouTube Token Data:', youtubeTokenData);
    }
  } catch (err) {
    console.error('Error:', err);
  }
})();
