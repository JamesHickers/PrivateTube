// youtubePlayer.js
export function createYouTubePlayer(containerId, videoId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ Container with ID "${containerId}" not found.`);
    return;
  }

  if (!videoId || typeof videoId !== 'string') {
    console.error('❌ Invalid YouTube video ID.');
    return;
  }

  container.innerHTML = `
    <iframe
      width="300"
      height="180"
      src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin allow-presentation"
      style="border:none; border-radius:12px; overflow:hidden;"
      referrerpolicy="no-referrer"
    ></iframe>
  `;
}
