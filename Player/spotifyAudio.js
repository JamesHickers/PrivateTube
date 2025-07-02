// spotifyAudio.js
export function createSpotifyAudioPlayer(containerId, spotifyUri) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found');
    return;
  }
  const trackId = spotifyUri.split(':').pop();
  container.innerHTML = `
    <iframe
      src="https://open.spotify.com/embed/track/${trackId}"
      width="300"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
      sandbox="allow-scripts allow-same-origin allow-presentation"
      style="border:none; overflow:hidden;"
    ></iframe>
  `;
}
