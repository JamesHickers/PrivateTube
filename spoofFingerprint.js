// spoofFingerprint.js

// Canvas spoof
HTMLCanvasElement.prototype.toDataURL = function () {
  const context = this.getContext('2d');
  context.fillStyle = 'rgba(0,0,0,0)';
  context.fillRect(0, 0, this.width, this.height);
  return "data:image/png;base64,R0lGODlhAQABAIAAAAUEBA=="; // Transparent 1x1 pixel
};

// WebGL spoof
const getParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function (param) {
  // Return garbage for fingerprinting-related params
  if (param === 37445 || param === 37446) {
    return "NVIDIA Spoofed";
  }
  return getParameter.call(this, param);
};
