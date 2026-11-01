// Mixamo bone names (as sanitized by GLTFLoader) -> VRM humanoid bone names.
const fingers = {
  Thumb: ["Metacarpal", "Proximal", "Distal"],
  Index: ["Proximal", "Intermediate", "Distal"],
  Middle: ["Proximal", "Intermediate", "Distal"],
  Ring: ["Proximal", "Intermediate", "Distal"],
  Pinky: ["Proximal", "Intermediate", "Distal"],
};

export const MIXAMO_TO_VRM = {
  mixamorigHips: "hips",
  mixamorigSpine: "spine",
  mixamorigSpine1: "chest",
  mixamorigSpine2: "upperChest",
  mixamorigNeck: "neck",
  mixamorigHead: "head",
};

for (const [M, v] of [["Left", "left"], ["Right", "right"]]) {
  Object.assign(MIXAMO_TO_VRM, {
    [`mixamorig${M}Shoulder`]: `${v}Shoulder`,
    [`mixamorig${M}Arm`]: `${v}UpperArm`,
    [`mixamorig${M}ForeArm`]: `${v}LowerArm`,
    [`mixamorig${M}Hand`]: `${v}Hand`,
    [`mixamorig${M}UpLeg`]: `${v}UpperLeg`,
    [`mixamorig${M}Leg`]: `${v}LowerLeg`,
    [`mixamorig${M}Foot`]: `${v}Foot`,
    [`mixamorig${M}ToeBase`]: `${v}Toes`,
  });
  for (const [finger, parts] of Object.entries(fingers)) {
    parts.forEach((part, i) => { MIXAMO_TO_VRM[`mixamorig${M}Hand${finger}${i + 1}`] = `${v}${finger}${part}`; });
  }
}
