// privacyHelper.js

// Block known tracker scripts & iframes dynamically
const blockedDomains = ['google-analytics.com', 'doubleclick.net', 'facebook.net', 'googletagmanager.com'];
const observer = new MutationObserver(() => {
  document.querySelectorAll('script[src], iframe[src]').forEach(el => {
    if (blockedDomains.some(domain => el.src.includes(domain))) {
      console.warn('Blocked tracker:', el.src);
      el.remove();
    }
  });
});
observer.observe(document.documentElement, { childList: true, subtree: true });

// Spoof canvas fingerprint
const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function () {
  const ctx = this.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, this.width, this.height);
  return origToDataURL.call(this);
};

// Spoof WebGL renderer strings
const getParameterOrig = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(param) {
  if (param === 37445 || param === 37446) return 'Mozilla Spoof GPU';
  return getParameterOrig.call(this, param);
};

// Spoof navigator properties
Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
Object.defineProperty(navigator, 'webdriver', { get: () => false });
