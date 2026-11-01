import { projects } from "../data/projects.js";
import { imagesFor } from "../data/gallery.js";

export const PANEL_W = 3.2;
export const PANEL_H = 2;
const MIN = 8;   // fewest panels in the ring
const MAX = 14;  // most panels (keeps weak GPUs happy)

// Round-robin across projects so neighbours in the ring come from different projects.
function build() {
  const lists = projects.map((p) => {
    const imgs = imagesFor(p.id);
    return imgs.length ? imgs.map((src) => ({ src, project: p })) : [{ src: null, project: p }];
  });
  const items = [];
  for (let round = 0; items.length < MAX && lists.some((l) => round < l.length); round++) {
    for (const l of lists) if (round < l.length && items.length < MAX) items.push(l[round]);
  }
  for (let i = 0; items.length < MIN; i++) items.push(items[i % items.length]);
  return items;
}

export const RING_ITEMS = build();
export const RING_RADIUS = (RING_ITEMS.length * PANEL_W * 1.06) / (2 * Math.PI);
