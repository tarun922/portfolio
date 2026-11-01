import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { makeCelTexture } from "./celTexture.js";

// One project "cel" standing in the corridor. Even index = right side, odd = left.
export default function CelPlane({ project, index }) {
  const group = useRef();
  const small = useThree((s) => s.size.width < 700);
  const side = index % 2 === 0 ? 1 : -1;
  const map = useMemo(() => makeCelTexture(project.name, project.accent, `${import.meta.env.BASE_URL}${project.image}`), [project]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y = -side * 0.45 + Math.sin(t * 0.6 + index) * 0.12;
    group.current.position.y = Math.sin(t * 0.8 + index) * 0.18;
  });

  return (
    <group ref={group} position={[side * (small ? 1.5 : 2.8), 0, -index * 5.5]} scale={small ? 0.7 : 1}>
      <mesh>
        <boxGeometry args={[2.4, 3.3, 0.1]} />
        <meshBasicMaterial map={map} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <planeGeometry args={[2.9, 3.8]} />
        <meshBasicMaterial color={project.accent} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}
