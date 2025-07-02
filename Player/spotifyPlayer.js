// spotifyPlayer.js
import { enablePrivacyProtections } from './privacyHelper.js';

export function createSpotifyPlayer(containerId, spotifyUri) {
  // Enable privacy protections before injecting player
  enablePrivacyProtections();

  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found');
    return;
  }

  if (!spotifyUri || !spotifyUri.startsWith('spotify:track:')) {
    console.error('Invalid Spotify URI');
    return;
  }

  const trackId = spotifyUri.split(':').pop();

  container.innerHTML = `
    <iframe
      src="https://open.spotify.com/embed/track/${trackId}"
      width="100%"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
      sandbox="allow-scripts allow-same-origin allow-presentation"
      referrerpolicy="no-referrer"
      style="border:none; border-radius:12px; overflow:hidden;"
    ></iframe>
  `;
}
