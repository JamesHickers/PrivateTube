// youtubeAudio.js
export function createYouTubeAudioPlayer(containerId, videoId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found');
    return;
  }
  container.innerHTML = `
    <iframe
      width="0"
      height="0"
      src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&rel=0"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin allow-presentation"
      style="display:block; visibility:hidden;"
    ></iframe>
  `;
}
