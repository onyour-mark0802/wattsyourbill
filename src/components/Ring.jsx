// 270-degree gauge, like the Figma cards
export default function Ring({ label, frac, text, color }) {
  const r = 30, c = 2 * Math.PI * r, arc = c * 0.75;
  const f = Math.max(0, Math.min(1, frac || 0));
  return (
    <div className="wcard">
      <div className="wlabel">{label}</div>
      <svg width="92" height="92" viewBox="0 0 80 80" role="img" aria-label={`${label} ${text}`}>
        <g transform="rotate(135 40 40)" fill="none" strokeWidth="6" strokeLinecap="round">
          <circle cx="40" cy="40" r={r} stroke="#cfcfcf" strokeDasharray={`${arc} ${c}`} />
          {f > 0 && <circle cx="40" cy="40" r={r} stroke={color} strokeDasharray={`${arc * f} ${c}`} />}
        </g>
        <text x="40" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1f1f1f">{text}</text>
      </svg>
    </div>
  );
}