let ytApiReady = false;
let ytApiLoaded = false;
let pendingPlayers = [];

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (ytApiReady) return resolve();
    if (ytApiLoaded) {
      pendingPlayers.push(resolve);
      return;
    }

    ytApiLoaded = true;

    // Load YouTube iframe API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    // Wait for API to be ready
    window.onYouTubeIframeAPIReady = () => {
      ytApiReady = true;
      resolve();
      for (const res of pendingPlayers) res();
      pendingPlayers = [];
    };
  });
}

export async function createYouTubePlayer(containerId, videoId, options = {}) {
  if (!videoId || typeof videoId !== 'string') {
    console.error('❌ Invalid YouTube video ID.');
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ Container with ID "${containerId}" not found.`);
    return;
  }

  // Ensure API is loaded
  await loadYouTubeAPI();

  // Create a new div for YouTube to attach to
  const playerElementId = `${containerId}-yt-player`;
  container.innerHTML = `<div id="${playerElementId}"></div>`;

  const player = new YT.Player(playerElementId, {
    height: options.height || '180',
    width: options.width || '320',
    videoId: videoId,
    playerVars: {
      autoplay: options.autoplay ? 1 : 0,
      controls: options.controls !== false ? 1 : 0,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: (event) => {
        if (options.muted) event.target.mute();
        if (options.onReady) options.onReady(event);
      },
      onStateChange: options.onStateChange || null,
    },
  });
  return player;
}
