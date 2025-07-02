export function createSpotifyPlayer(containerId, spotifyUri) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('❌ Container not found');
    return;
  }

  if (!spotifyUri || !spotifyUri.startsWith('spotify:track:')) {
    console.error('❌ Invalid Spotify URI');
    return;
  }

  const trackId = spotifyUri.split(':').pop();
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;

  // Clear any existing content
  container.innerHTML = '';

  // Create iframe securely
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.width = '100%';
  iframe.height = '80';
  iframe.frameBorder = '0';
  iframe.allow = 'encrypted-media';
  iframe.allowTransparency = true;
  iframe.sandbox = 'allow-scripts allow-same-origin allow-presentation';
  iframe.referrerPolicy = 'no-referrer';
  iframe.loading = 'lazy';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.overflow = 'hidden';
  iframe.title = 'Spotify player';

  const tip = document.createElement('p');
  tip.textContent = 'Tap ▶️ to play the track';
  tip.style.fontSize = '12px';
  tip.style.color = '#999';
  tip.style.textAlign = 'center';
  tip.style.marginTop = '4px';
  tip.style.fontFamily = 'sans-serif';

  container.appendChild(iframe);
  container.appendChild(tip);
}
