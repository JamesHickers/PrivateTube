export function createSpotifyAudioPlayer(containerId, spotifyUri) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`❌ Container with ID "${containerId}" not found.`);
    return;
  }

  if (!spotifyUri || !spotifyUri.startsWith('spotify:track:')) {
    console.error('❌ Invalid Spotify URI. Must be in format "spotify:track:TRACK_ID".');
    return;
  }

  const trackId = spotifyUri.split(':').pop();

  container.innerHTML = `
    <iframe
      src="https://open.spotify.com/embed/track/${trackId}"
      width="300"
      height="80"
      frameborder="0"
      allow="encrypted-media"
      allowtransparency="true"
      sandbox="allow-scripts allow-same-origin allow-presentation"
      style="border:none; overflow:hidden; border-radius:12px;"
    ></iframe>
  `;
}
