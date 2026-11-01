import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import * as THREE from "three";
import { sceneStore } from "./sceneStore.js";
import { DANCER } from "./dancerConfig.js";
import { RING_RADIUS } from "./ringItems.js";
import { retargetMixamoClip } from "./retargetMixamo.js";

const lerp = THREE.MathUtils.lerp;

// An anime VRM character whose dance is scrubbed by scroll. She is anchored to the SCREEN
// (not the world), so she stays fully visible and well placed on any window size.
export default function Dancer() {
  const [gltf, dance] = useLoader(GLTFLoader, [DANCER.url, DANCER.danceUrl], (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser));
  });
  const size = useThree((s) => s.size);
  const small = size.width < 700;
  const group = useRef();
  const cur = useRef(0);

  const rig = useMemo(() => {
    const vrm = gltf.userData.vrm;
    VRMUtils.rotateVRM0(vrm);
    try { VRMUtils.removeUnnecessaryVertices(vrm.scene); VRMUtils.combineSkeletons?.(vrm.scene); } catch { /* optional optimisations */ }
    vrm.scene.traverse((o) => { o.frustumCulled = false; });

    const box = new THREE.Box3().setFromObject(vrm.scene);
    const height = box.max.y - box.min.y || 1.6;
    const center = box.getCenter(new THREE.Vector3());
    vrm.scene.position.set(-center.x, -box.min.y, -center.z); // feet on the floor, centered

    const clip = retargetMixamoClip(dance, vrm);
    const mixer = new THREE.AnimationMixer(vrm.scene);
    mixer.clipAction(clip).play();
    vrm.expressionManager?.setValue("happy", 0.6);
    return { vrm, mixer, height, duration: clip.duration };
  }, [gltf, dance]);

  useEffect(() => () => VRMUtils.deepDispose(rig.vrm.scene), [rig]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);

    // Scroll -> clip time, softly followed and speed-limited so she never dances frantically.
    const target = (sceneStore.scrollY / 1000) * rig.duration * DANCER.cyclesPer1000px;
    const step = (target - cur.current) * (1 - Math.exp(-dt * DANCER.smoothing));
    const limit = DANCER.maxSpeed * dt;
    cur.current += Math.max(-limit, Math.min(limit, step));
    rig.mixer.setTime(((cur.current % rig.duration) + rig.duration) % rig.duration);

    // Screen-anchored placement: big on the right of the hero, then a smaller dancer in the corner.
    const cam = state.camera;
    const z = RING_RADIUS + 1.5;
    const dist = Math.abs(cam.position.z - z);
    const vh = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * dist;
    const vw = vh * cam.aspect;
    const t = sceneStore.hero;
    const [h0, h1] = small ? DANCER.heightMobile : DANCER.heightDesktop;
    const [x0, x1] = small ? DANCER.xMobile : DANCER.xDesktop;
    const g = group.current;
    g.position.set(cam.position.x + (lerp(x0, x1, t) - 0.5) * vw, cam.position.y + (0.5 - DANCER.feetY) * vh, z);
    g.scale.setScalar((lerp(h0, h1, t) * vh) / rig.height);
    g.rotation.y = -0.25 + sceneStore.px * 0.2; // turns slightly toward the pointer

    // Blink every few seconds, then let spring bones (hair, skirt) settle.
    rig.vrm.expressionManager?.setValue("blink", state.clock.elapsedTime % 4.5 < 0.14 ? 1 : 0);
    rig.vrm.update(dt);
  });

  return (
    <group ref={group}>
      <primitive object={rig.vrm.scene} />
    </group>
  );
}
