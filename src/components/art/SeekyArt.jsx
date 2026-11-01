// Film frames with a play button: streaming.
export default function SeekyArt() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={90 + i * 220} y={70 + (i % 2) * 40} width="190" height="270" rx="18"
          fill="#15122b" fillOpacity=".55" stroke="currentColor" strokeWidth="4"
          transform={`rotate(${-6 + i * 6} ${185 + i * 220} 205)`} />
      ))}
      <circle cx="400" cy="215" r="76" fill="currentColor" />
      <path d="M377 178 L377 252 L443 215 Z" fill="#15122b" />
    </g>
  );
}
