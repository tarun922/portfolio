import * as THREE from "three";

function canvasTexture(draw) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  draw(c.getContext("2d"));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Five-petal cherry blossom with a yellow centre.
export const makeFlowerTexture = () => canvasTexture((g) => {
  g.translate(32, 32);
  for (let i = 0; i < 5; i++) {
    g.save();
    g.rotate((i * Math.PI * 2) / 5);
    const grad = g.createRadialGradient(0, -14, 1, 0, -14, 15);
    grad.addColorStop(0, "#ffe3ef");
    grad.addColorStop(1, "#ff8fbf");
    g.fillStyle = grad;
    g.beginPath();
    g.ellipse(0, -14, 9, 15, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  g.fillStyle = "#ffcf5e";
  g.beginPath();
  g.arc(0, 0, 4, 0, Math.PI * 2);
  g.fill();
});

// A single falling petal with a small notch at the tip.
export const makePetalTexture = () => canvasTexture((g) => {
  g.translate(32, 32);
  g.rotate(0.6);
  const grad = g.createLinearGradient(0, -22, 0, 22);
  grad.addColorStop(0, "#ffd9ea");
  grad.addColorStop(1, "#ff7db4");
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(0, -22);
  g.bezierCurveTo(16, -14, 14, 14, 0, 22);
  g.bezierCurveTo(-14, 14, -16, -14, 0, -22);
  g.fill();
  g.globalCompositeOperation = "destination-out";
  g.beginPath();
  g.moveTo(-3, 22); g.lineTo(0, 16); g.lineTo(3, 22);
  g.fill();
});
