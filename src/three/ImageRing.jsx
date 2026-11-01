import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { sceneStore } from "./sceneStore.js";
import { RING_ITEMS, RING_RADIUS, PANEL_W, PANEL_H } from "./ringItems.js";
import { makePanelTexture } from "./panelTexture.js";

// A rotating ring of project screenshots. Spins on its own; scrolling spins it further.
export default function ImageRing() {
  const group = useRef();
  const small = useThree((s) => s.size.width < 700);
  const textures = useMemo(() => RING_ITEMS.map(makePanelTexture), []);
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = sceneStore.progress;
    const g = group.current;
    g.rotation.y = t * 0.12 + p * Math.PI * 1.6;
    g.position.x = small ? 0 : (1 - Math.min(1, p * 3)) * 1.6; // starts right of the hero card, drifts to center
    g.position.y = Math.sin(t * 0.5) * 0.1;
  });

  const n = RING_ITEMS.length;
  return (
    <group ref={group} scale={small ? 0.8 : 1}>
      {RING_ITEMS.map((_, i) => {
        const a = (i / n) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * RING_RADIUS, 0, Math.cos(a) * RING_RADIUS]} rotation={[0, a, 0]}>
            <planeGeometry args={[PANEL_W, PANEL_H]} />
            {/* slightly dimmed; the dark-tinted glass keeps text readable on top */}
            <meshBasicMaterial map={textures[i]} color="#c4c0dc" />
          </mesh>
        );
      })}
    </group>
  );
}
