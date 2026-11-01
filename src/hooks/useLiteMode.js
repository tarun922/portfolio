import { useEffect, useState } from "react";

const KEY = "portfolio-lite";

// Lite mode turns off backdrop blur (the expensive part of glass) on slow GPUs.
export default function useLiteMode() {
  const [lite, setLite] = useState(() => {
    try { return localStorage.getItem(KEY) === "1"; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.toggleAttribute("data-lite", lite);
    try { localStorage.setItem(KEY, lite ? "1" : "0"); } catch { /* storage unavailable */ }
  }, [lite]);
  return [lite, () => setLite((v) => !v)];
}
