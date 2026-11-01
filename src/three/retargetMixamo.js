import * as THREE from "three";
import { MIXAMO_TO_VRM } from "./mixamoMap.js";

const q = new THREE.Quaternion();
const restInv = new THREE.Quaternion();
const parentRest = new THREE.Quaternion();
const v = new THREE.Vector3();

// Converts a Mixamo animation (loaded as glTF) into a clip for a VRM character.
// Rotations are re-expressed relative to each bone's rest pose; hip height is scaled to the VRM's legs.
export function retargetMixamoClip(dance, vrm) {
  const asset = dance.scene;
  asset.updateMatrixWorld(true);
  const source = dance.animations[0];
  const hipsRig = asset.getObjectByName("mixamorigHips");
  const vrmHips = vrm.humanoid.getNormalizedBoneNode("hips");

  const vrmHipsHeight = Math.abs(
    vrmHips.getWorldPosition(new THREE.Vector3()).y - vrm.scene.getWorldPosition(new THREE.Vector3()).y
  );
  const motionHipsHeight = hipsRig.getWorldPosition(new THREE.Vector3()).y;
  const ratio = motionHipsHeight > 0 ? vrmHipsHeight / motionHipsHeight : 1;
  const flip = vrm.meta?.metaVersion === "0"; // VRM 0.x faces the other way

  const tracks = [];
  source.tracks.forEach((track) => {
    const [rigName, prop] = track.name.split(".");
    const vrmBone = MIXAMO_TO_VRM[rigName];
    const node = vrmBone && vrm.humanoid.getNormalizedBoneNode(vrmBone);
    const rig = asset.getObjectByName(rigName);
    if (!node || !rig) return;

    if (track instanceof THREE.QuaternionKeyframeTrack) {
      rig.getWorldQuaternion(restInv).invert();
      rig.parent.getWorldQuaternion(parentRest);
      const values = track.values.slice();
      for (let i = 0; i < values.length; i += 4) {
        q.fromArray(values, i).premultiply(parentRest).multiply(restInv).toArray(values, i);
        if (flip) { values[i] = -values[i]; values[i + 2] = -values[i + 2]; }
      }
      tracks.push(new THREE.QuaternionKeyframeTrack(`${node.name}.quaternion`, track.times, values));
    } else if (prop === "position" && rigName === "mixamorigHips") {
      // Keep the vertical bounce, drop sideways drift so the loop never jumps.
      const m = rig.parent.matrixWorld;
      const values = new Float32Array(track.values.length);
      for (let i = 0; i < values.length; i += 3) {
        v.fromArray(track.values, i).applyMatrix4(m);
        values[i] = vrmHips.position.x;
        values[i + 1] = v.y * ratio;
        values[i + 2] = vrmHips.position.z;
      }
      tracks.push(new THREE.VectorKeyframeTrack(`${node.name}.position`, track.times, values));
    }
  });
  return new THREE.AnimationClip("danceVRM", source.duration, tracks);
}
