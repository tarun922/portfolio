import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { sceneStore } from "./sceneStore.js";
import { RING_RADIUS } from "./ringItems.js";

// Camera sits outside the ring. Scroll dollies it in a little; the pointer nudges it. Also measures scroll speed.
export default function CameraRig() {
  const lastY = useRef(0);
  useFrame((state, dt) => {
    const cam = state.camera;
    const k = 1 - Math.exp(-dt * 4);
    const targetZ = RING_RADIUS + 4.4 - sceneStore.progress * 1.2;
    cam.position.z += (targetZ - cam.position.z) * k;
    cam.position.x += (sceneStore.px * 0.6 - cam.position.x) * k;
    cam.position.y += (0.5 - sceneStore.py * 0.4 - cam.position.y) * k;
    cam.lookAt(0, 0, 0);

    // scroll speed (about 1 = a screen per second), used by petals and the branch as "wind"
    const speed = Math.abs(sceneStore.scrollY - lastY.current) / Math.max(dt, 0.001) / 1000;
    lastY.current = sceneStore.scrollY;
    sceneStore.velocity += (Math.min(speed, 3) - sceneStore.velocity) * (1 - Math.exp(-dt * 5));
  });
  return null;
}
