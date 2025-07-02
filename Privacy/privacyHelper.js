// === privacyHelper.js – Hardened Mode ===

// 🛡️ Block known 3rd-party trackers (real-time DOM mutations)
const blockedDomains = [
  'google-analytics.com', 'doubleclick.net', 'facebook.net', 'googletagmanager.com',
  'cdn.segment.com', 'hotjar.com', 'cloudflareinsights.com', 'bing.com', 'snapchat.com',
  'twitter.com', 't.co', 'optimizely.com', 'newrelic.com', 'adservice.google.com'
];

const observer = new MutationObserver(() => {
  document.querySelectorAll('script[src], iframe[src]').forEach(el => {
    if (blockedDomains.some(domain => el.src.includes(domain))) {
      console.warn('[🔒 Blocked tracker]:', el.src);
      el.remove();
    }
  });
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// 🕵️ Canvas fingerprint spoof
const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function () {
  const ctx = this.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, this.width, this.height);
  return origToDataURL.call(this);
};

// 🧠 WebGL fingerprint spoof
const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function (param) {
  if (param === 37445 || param === 37446) return 'PrivacySpoofer 9000';
  return originalGetParameter.call(this, param);
};

// 🧠 WebGL2 support spoof too
if (typeof WebGL2RenderingContext !== 'undefined') {
  const originalGetParameter2 = WebGL2RenderingContext.prototype.getParameter;
  WebGL2RenderingContext.prototype.getParameter = function (param) {
    if (param === 37445 || param === 37446) return 'PrivacySpoofer 9000';
    return originalGetParameter2.call(this, param);
  };
}

// 🔊 Audio fingerprint spoof (OfflineAudioContext method)
const AudioContext = window.AudioContext || window.webkitAudioContext;
if (AudioContext) {
  const originalCreateAnalyser = AudioContext.prototype.createAnalyser;
  AudioContext.prototype.createAnalyser = function () {
    const analyser = originalCreateAnalyser.call(this);
    analyser.getFloatFrequencyData = function (array) {
      for (let i = 0; i < array.length; i++) array[i] = -100;
    };
    return analyser;
  };
}

// 📅 Timezone spoofing
Intl.DateTimeFormat.prototype.resolvedOptions = function () {
  return { timeZone: 'UTC' };
};

// 📜 Navigator property spoofing
Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
Object.defineProperty(navigator, 'language', { get: () => 'en-US' });
Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
Object.defineProperty(navigator, 'userAgent', {
  get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
});
Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 4 });
Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });
Object.defineProperty(navigator, 'webdriver', { get: () => false });
Object.defineProperty(navigator, 'plugins', { get: () => [] });
Object.defineProperty(navigator, 'mimeTypes', { get: () => [] });

// 🧱 Block fingerprint2, FingerprintJS, and other sniffers
if (window.requestIdleCallback) {
  window.requestIdleCallback = () => {};
}
if (window.FingerprintJS) {
  window.FingerprintJS = undefined;
}
if (window.Fingerprint2) {
  window.Fingerprint2 = undefined;
}

// 🕳️ Remove common fingerprint canvas elements post-load
window.addEventListener('load', () => {
  document.querySelectorAll('canvas').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  });
});
