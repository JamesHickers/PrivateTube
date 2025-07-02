// spotifyPlayer.js
import { config } from '../config.js'; // adjust path if needed

export function createSpotifyPlayer(containerId, spotifyUri) {
  const container = document.getElementById(containerId);
  if (!container) return console.error('Container not found');
  if (!spotifyUri || !spotifyUri.startsWith('spotify:track:')) {
    return console.error('Invalid Spotify URI');
  }

  const trackId = spotifyUri.split(':').pop();

  container.innerHTML = `
    <iframe
      src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator"
      width="100%"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
      sandbox="allow-scripts allow-same-origin allow-presentation"
      referrerpolicy="no-referrer"
      style="border:none; border-radius:12px; overflow:hidden;"
      title="Spotify Player"
    ></iframe>
  `;
}
