// Pulsing rings and chat bubbles: a live companion.
export default function BuddyArt() {
  return (
    <g>
      <circle cx="400" cy="225" r="170" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="3" />
      <circle cx="400" cy="225" r="115" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="3" />
      <circle cx="400" cy="225" r="62" fill="currentColor" />
      <circle cx="380" cy="215" r="9" fill="#15122b" />
      <circle cx="420" cy="215" r="9" fill="#15122b" />
      <path d="M378 243 Q400 262 422 243" stroke="#15122b" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="90" y="90" width="230" height="70" rx="30" fill="#f6f3ff" fillOpacity=".92" />
      <rect x="480" y="300" width="230" height="70" rx="30" fill="currentColor" />
      <circle cx="560" cy="120" r="8" fill="currentColor" /><circle cx="590" cy="120" r="8" fill="currentColor" fillOpacity=".6" />
    </g>
  );
}
