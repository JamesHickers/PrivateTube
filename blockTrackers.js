// blockTrackers.js
const trackerDomains = ['google-analytics.com', 'doubleclick.net', 'facebook.net'];

const observer = new MutationObserver(() => {
  document.querySelectorAll('script[src], iframe[src]').forEach(el => {
    if (trackerDomains.some(d => el.src.includes(d))) {
      console.warn('Blocked tracker:', el.src);
      el.remove();
    }
  });
});

observer.observe(document.documentElement, { childList: true, subtree: true });
