import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneStore } from "./sceneStore.js";
import { RING_RADIUS } from "./ringItems.js";
import { makeFlowerTexture } from "./sakuraTextures.js";

// Branch shape in local units (the whole branch is about 1.5 units long). Edit the points to reshape it.
const CURVES = [
  { r: 0.014, n: 46, pts: [[0.2, 0.12], [-0.3, -0.02], [-0.7, -0.12], [-1.05, -0.4], [-1.45, -0.52]] },
  { r: 0.009, n: 24, pts: [[-0.45, -0.06], [-0.58, 0.12], [-0.82, 0.24], [-1.0, 0.26]] },
  { r: 0.009, n: 24, pts: [[-0.8, -0.2], [-0.92, -0.55], [-1.05, -0.8], [-1.12, -0.92]] },
];

// A cherry-blossom branch hanging from the top-right corner of the screen.
// Scrolling the first screen makes the buds bloom; wind (scroll speed) makes it sway.
export default function Branch() {
  const group = useRef();
  const mat = useRef();
  const small = useThree((s) => s.size.width < 700);

  const { tubes, positions, flower } = useMemo(() => {
    const tubes = [];
    const pos = [];
    CURVES.forEach(({ r, n, pts }) => {
      const curve = new THREE.CatmullRomCurve3(pts.map(([x, y]) => new THREE.Vector3(x, y, 0)));
      tubes.push(new THREE.TubeGeometry(curve, 48, r, 6));
      for (let i = 0; i < n; i++) {
        const p = curve.getPoint(0.1 + 0.9 * (i / (n - 1)));
        pos.push(p.x + (Math.random() - 0.5) * 0.14, p.y + (Math.random() - 0.5) * 0.14, (Math.random() - 0.5) * 0.1);
      }
    });
    return { tubes, positions: new Float32Array(pos), flower: makeFlowerTexture() };
  }, []);
  useEffect(() => () => { tubes.forEach((t) => t.dispose()); flower.dispose(); }, [tubes, flower]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cam = state.camera;
    const z = RING_RADIUS + 1.5;
    const vh = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * Math.abs(cam.position.z - z);
    const vw = vh * cam.aspect;
    const g = group.current;
    // screen-anchored to the top-right corner, sized to the window
    g.position.set(cam.position.x + vw * 0.5, cam.position.y + vh * 0.5, z);
    g.scale.setScalar(Math.min(vh * 0.5, vw * 0.62));
    g.rotation.z = Math.sin(t * 0.7) * 0.025 + sceneStore.velocity * 0.02;
    const bloom = 0.4 + 0.6 * Math.min(1, sceneStore.hero * 1.2);
    mat.current.size = vh * 0.05 * bloom * (small ? 1.2 : 1);
  });

  return (
    <group ref={group}>
      {tubes.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial color="#7a4560" />
        </mesh>
      ))}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={mat} map={flower} transparent alphaTest={0.05} depthWrite={false} />
      </points>
    </group>
  );
}
