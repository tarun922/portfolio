// Shared scroll and pointer values. Plain object (not React state) so scrolling never re-renders React.
export const sceneStore = { progress: 0, scrollY: 0, hero: 0, velocity: 0, px: 0, py: 0 };

export function bindSceneStore() {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    sceneStore.progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    sceneStore.scrollY = window.scrollY;
    sceneStore.hero = Math.min(1, window.scrollY / window.innerHeight); // 0 at top, 1 after one screen
  };
  const onMove = (e) => {
    sceneStore.px = (e.clientX / window.innerWidth - 0.5) * 2;
    sceneStore.py = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("pointermove", onMove);
  };
}
