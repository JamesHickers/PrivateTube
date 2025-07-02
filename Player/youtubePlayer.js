// youTubePlayer.js
export function createYouTubePlayer(containerId, videoId) {
  const container = document.getElementById(containerId);
  if (!container) return console.error('Container not found');

  container.innerHTML = `
    <iframe
      width="100%"
      height="80"
      src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin allow-presentation"
      referrerpolicy="no-referrer"
      style="border:none; border-radius:12px;"
    ></iframe>
  `;
}
