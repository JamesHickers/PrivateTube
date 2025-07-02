export function createSpotifyPlayer(containerId, spotifyUri) {
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
      src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator"
      width="100%"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
      sandbox="allow-scripts allow-same-origin allow-presentation"
      referrerpolicy="no-referrer"
      style="border:none; border-radius:12px; overflow:hidden;"
    ></iframe>
    <p style="font-size:12px; color:#999; text-align:center; margin-top:4px;">
      Tap ▶️ to play the track
    </p>
  `;
}
