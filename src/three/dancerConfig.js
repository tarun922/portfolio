// Settings for the dancing anime character.
export const DANCER = {
  url: `${import.meta.env.BASE_URL}models/dancer.vrm`,   // any VRM model works
  danceUrl: `${import.meta.env.BASE_URL}models/dance.glb`, // Mixamo-skeleton animation
  cyclesPer1000px: 0.3, // dance cycles per 1000px of scroll. Lower = slower dance
  maxSpeed: 1,          // never dances faster than this many clip-seconds per second
  smoothing: 3,         // how softly she follows the scroll position
  feetY: 0.97,          // where her feet sit on screen (0 = top, 1 = bottom)
  // [at page top, after scrolling past the first screen]
  heightDesktop: [0.84, 0.42],  // her height as a fraction of the screen
  xDesktop: [0.8, 0.9],         // horizontal position (0 = left edge, 1 = right edge)
  heightMobile: [0.5, 0.3],
  xMobile: [0.78, 0.86],
};
