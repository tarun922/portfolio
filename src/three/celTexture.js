import * as THREE from "three";

const W = 512, H = 704;

function paintLabel(g, name, color) {
  const fade = g.createLinearGradient(0, H - 220, 0, H);
  fade.addColorStop(0, "#15122b00");
  fade.addColorStop(1, "#15122bf2");
  g.fillStyle = fade;
  g.fillRect(0, H - 220, W, 220);
  g.strokeStyle = color;
  g.lineWidth = 12;
  g.strokeRect(6, 6, W - 12, H - 12);
  g.fillStyle = color;
  g.font = "700 60px Unbounded, system-ui, sans-serif";
  g.textBaseline = "bottom";
  g.fillText(name, 36, H - 40);
}

function paintBase(g, name, color) {
  g.fillStyle = "#1f1b3d";
  g.fillRect(0, 0, W, H);
  g.globalAlpha = 0.35;
  g.fillStyle = color;
  g.fillRect(0, 0, W, H);
  g.globalAlpha = 1;
  paintLabel(g, name, color);
}

// Cel texture: the project's screenshot (cover-fit) with its name on top.
// Falls back to a plain colored panel if the screenshot is missing.
export function makeCelTexture(name, color, imageSrc) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext("2d");
  paintBase(g, name, color);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const img = new Image();
  img.onload = () => {
    const r = Math.max(W / img.width, H / img.height);
    const w = img.width * r, h = img.height * r;
    g.drawImage(img, (W - w) / 2, 0, w, h);
    paintLabel(g, name, color);
    tex.needsUpdate = true;
  };
  if (imageSrc) img.src = imageSrc;

  document.fonts?.ready.then(() => {
    if (!img.complete || !img.naturalWidth) paintBase(g, name, color);
    tex.needsUpdate = true;
  });
  return tex;
}
