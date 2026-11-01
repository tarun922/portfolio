import * as THREE from "three";

const W = 640, H = 400;

function paintFallback(g, project) {
  g.fillStyle = "#1f1b3d";
  g.fillRect(0, 0, W, H);
  g.globalAlpha = 0.4;
  g.fillStyle = project.accent;
  g.fillRect(0, 0, W, H);
  g.globalAlpha = 1;
}

function paintLabel(g, project) {
  const fade = g.createLinearGradient(0, H - 120, 0, H);
  fade.addColorStop(0, "#15122b00");
  fade.addColorStop(1, "#15122bf0");
  g.fillStyle = fade;
  g.fillRect(0, H - 120, W, 120);
  g.strokeStyle = project.accent;
  g.lineWidth = 8;
  g.strokeRect(4, 4, W - 8, H - 8);
  g.fillStyle = project.accent;
  g.font = "700 44px Unbounded, system-ui, sans-serif";
  g.textBaseline = "bottom";
  g.fillText(project.name, 28, H - 24);
}

// One ring panel. Images are downscaled to 640x400 so GPU memory stays small
// no matter how large the original screenshot is.
export function makePanelTexture({ src, project }) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext("2d");
  paintFallback(g, project);
  paintLabel(g, project);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;

  if (src) {
    const img = new Image();
    img.onload = () => {
      const r = Math.max(W / img.width, H / img.height);
      const w = img.width * r, h = img.height * r;
      g.drawImage(img, (W - w) / 2, 0, w, h); // top-aligned crop
      paintLabel(g, project);
      tex.needsUpdate = true;
    };
    img.src = src;
  }
  // Redraw label once Unbounded has loaded (only matters for panels without an image).
  document.fonts?.ready.then(() => { if (!src) { paintFallback(g, project); paintLabel(g, project); tex.needsUpdate = true; } });
  return tex;
}
