// lockdown.js

navigator.hardwareConcurrency = 4;
navigator.deviceMemory = 4;
navigator.languages = ['en-US'];
navigator.webdriver = false;

// Block battery API
Object.defineProperty(navigator, 'getBattery', {
  value: () => Promise.reject('Blocked'),
});
