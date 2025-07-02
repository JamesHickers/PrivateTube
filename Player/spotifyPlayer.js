// youtubePlayer.js
import { config } from '../config.js'; // adjust path

export async function createYouTubePlayer(containerId, videoId, options = {}) {
  if (!videoId) return console.error('Invalid video ID');

  if (!containerId) return console.error('Container not found');

  // use the API key from config here
  const apiKey = config.GOOGLE_API_KEY;

  // fetch metadata or just embed player
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=${options.autoplay ? 1 : 0}`;
  iframe.width = options.width || '320';
  iframe.height = options.height || '180';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.sandbox = 'allow-scripts allow-same-origin allow-presentation';
  iframe.referrerPolicy = 'no-referrer';
  iframe.loading = 'lazy';
  iframe.style.borderRadius = '12px';
  iframe.style.border = 'none';
  iframe.style.overflow = 'hidden';
  iframe.title = 'YouTube Player';

  const container = document.getElementById(containerId);
  container.innerHTML = ''; // clear old
  container.appendChild(iframe);
}
