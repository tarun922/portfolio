import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { sceneStore } from "./sceneStore.js";
import { makePetalTexture } from "./sakuraTextures.js";

const COUNT = 140;

// Falling sakura petals. Scrolling fast makes the wind stronger.
export default function Petals() {
  const ref = useRef();
  const petal = useMemo(() => makePetalTexture(), []);
  useEffect(() => () => petal.dispose(), [petal]);

  const { pos, speed } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const speed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      speed[i] = 0.2 + Math.random() * 0.4;
    }
    return { pos, speed };
  }, []);

  useFrame((state, dt) => {
    const attr = ref.current.geometry.attributes.position;
    const a = attr.array;
    const t = state.clock.elapsedTime;
    const wind = 0.12 + sceneStore.velocity * 0.9;
    for (let i = 0; i < COUNT; i++) {
      let y = a[i * 3 + 1] - speed[i] * (1 + sceneStore.velocity) * dt;
      let x = a[i * 3] - wind * speed[i] * dt + Math.sin(t + i) * 0.003;
      if (y < -5) { y = 5; x = (Math.random() - 0.5) * 20; }
      if (x < -10) x = 10;
      a[i * 3 + 1] = y;
      a[i * 3] = x;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial map={petal} size={0.2} transparent alphaTest={0.05} opacity={0.9} depthWrite={false} />
    </points>
  );
}
