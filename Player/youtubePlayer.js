// youtubePlayer.js
let ytApiReady = false;
let ytApiLoading = false;
let ytCallbacks = [];

function loadYouTubeEmbedAPI() {
  return new Promise((resolve) => {
    if (ytApiReady) return resolve();
    if (ytApiLoading) {
      ytCallbacks.push(resolve);
      return;
    }

    ytApiLoading = true;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.setAttribute('referrerpolicy', 'no-referrer');
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      ytApiReady = true;
      resolve();
      ytCallbacks.forEach(cb => cb());
    };
  });
}

async function fetchVideoMetadata(apiKey, videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
  const res = await fetch(url, {
    referrerPolicy: 'no-referrer',
    credentials: 'omit'
  });

  if (!res.ok) throw new Error(`YouTube Data API error: ${await res.text()}`);
  const data = await res.json();
  if (!data.items || !data.items.length) throw new Error('❌ Video not found');
  return data.items[0];
}

export async function createYouTubePlayer(containerId, videoId, apiKey, options = {}) {
  if (!videoId || typeof videoId !== 'string') {
    console.error('❌ Invalid YouTube video ID.');
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ Container with ID "${containerId}" not found.`);
    return;
  }

  let meta;
  try {
    meta = await fetchVideoMetadata(apiKey, videoId);
  } catch (err) {
    container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    return;
  }

  const playerDivId = `${containerId}-yt`;

  // Display metadata
  container.innerHTML = `
    <div style="margin-bottom:6px; font-family:sans-serif;">
      <strong style="font-size:1rem;">${meta.snippet.title}</strong><br />
      <span style="font-size:0.85rem; color:gray;">by ${meta.snippet.channelTitle}</span><br />
      <span style="font-size:0.85rem; color:gray;">👁️ ${Number(meta.statistics.viewCount).toLocaleString()} views</span>
    </div>
    <div id="${playerDivId}"></div>
  `;

  // Load embed API
  await loadYouTubeEmbedAPI();

  // Build the player
  const player = new YT.Player(playerDivId, {
    height: options.height || '180',
    width: options.width || '320',
    videoId,
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      autoplay: options.autoplay ? 1 : 0,
      controls: options.controls !== false ? 1 : 0,
      modestbranding: 1,
      rel: 0,
      fs: 0
    },
    events: {
      onReady: event => {
        if (options.muted) event.target.mute();
        if (typeof options.onReady === 'function') options.onReady(event);
      },
      onStateChange: options.onStateChange || null
    }
  });

  return player;
}
