const apiKey = process.env.GOOGLE_CLIENT_ID;

if (!apiKey) {
  console.error('❌ No YouTube API key found. Set GOOGLE_API_KEY or GOOGLE_CLIENT_ID as env vars.');
  process.exit(1);
}

const videoId = process.argv[2]; // pass the YouTube video ID as a CLI arg

if (!videoId) {
  console.error('❌ No video ID provided. Usage: node youtubeInfo.js <VIDEO_ID>');
  process.exit(1);
}

const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

async function fetchYouTubeVideoInfo() {
  const res = await fetch(YOUTUBE_API_URL);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error: ${text}`);
  }

  const data = await res.json();
  const video = data.items?.[0];
  if (!video) {
    throw new Error('❌ Video not found.');
  }
}
fetchYouTubeVideoInfo().catch(err => console.error(err.message));
