// Stacked animation frames and a timeline with keyframes.
export default function AnimArt() {
  return (
    <g>
      {[3, 2, 1, 0].map((i) => (
        <rect key={i} x={170 + i * 36} y={60 + i * 24} width="320" height="190" rx="16"
          fill="#15122b" fillOpacity={0.35 + (3 - i) * 0.15} stroke="currentColor" strokeWidth="4" />
      ))}
      <path d="M260 250 Q330 130 400 210 T520 140" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="90" y="340" width="620" height="14" rx="7" fill="#f6f3ff" fillOpacity=".25" />
      {[150, 270, 390, 520, 640].map((x) => (
        <rect key={x} x={x} y="335" width="24" height="24" rx="4" fill="currentColor" transform={`rotate(45 ${x + 12} 347)`} />
      ))}
    </g>
  );
}
