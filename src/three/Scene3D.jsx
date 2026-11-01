import { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { bindSceneStore } from "./sceneStore.js";
import { RING_RADIUS } from "./ringItems.js";
import CameraRig from "./CameraRig.jsx";
import ImageRing from "./ImageRing.jsx";
import Petals from "./Petals.jsx";
import Branch from "./Branch.jsx";
import { SCENE } from "./sceneConfig.js";

// Loaded only if enabled, so the VRM library is not downloaded otherwise.
const Dancer = lazy(() => import("./Dancer.jsx"));
import SceneBoundary from "./SceneBoundary.jsx";
import "./Scene3D.css";

export default function Scene3D() {
  const [enabled] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => bindSceneStore(), []);
  if (!enabled) return null;

  return (
    <div className="scene" aria-hidden="true">
      <SceneBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ fov: 50, position: [0, 0.5, RING_RADIUS + 4.4] }}
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <CameraRig />
          <ImageRing />
          <Branch />
          {SCENE.dancer && (
            <>
              <ambientLight intensity={1.2} />
              <directionalLight position={[2, 4, 6]} intensity={2.2} />
              <pointLight position={[-3, 1, 3]} color="#ff5fa2" intensity={30} />
              {/* own boundary: if the model fails to load, the rest of the scene still works */}
              <SceneBoundary>
                <Suspense fallback={null}><Dancer /></Suspense>
              </SceneBoundary>
            </>
          )}
          <Petals />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
