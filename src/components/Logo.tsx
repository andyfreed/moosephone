export default function Logo({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 200 180"
      width={size}
      height={size * 0.9}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="neonGlowPink" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="neonGlowCyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Left antler */}
      <path
        d="M100 55 Q85 35 70 20 Q60 10 50 15 Q55 25 60 30 Q50 20 40 18 Q45 30 50 35 Q40 28 30 28 Q38 38 48 42 Q35 38 25 40 Q35 48 50 50 Q65 52 80 55 L100 58"
        fill="none"
        stroke="#ff2d95"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#neonGlowPink)"
      />

      {/* Right antler (mirrored) */}
      <path
        d="M100 55 Q115 35 130 20 Q140 10 150 15 Q145 25 140 30 Q150 20 160 18 Q155 30 150 35 Q160 28 170 28 Q162 38 152 42 Q165 38 175 40 Q165 48 150 50 Q135 52 120 55 L100 58"
        fill="none"
        stroke="#ff2d95"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#neonGlowPink)"
      />

      {/* Head outline */}
      <path
        d="M72 65 Q70 75 72 90 Q74 105 82 115 Q88 125 95 135 Q98 140 100 142 Q102 140 105 135 Q112 125 118 115 Q126 105 128 90 Q130 75 128 65 Q120 55 100 53 Q80 55 72 65Z"
        fill="none"
        stroke="#ff2d95"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#neonGlowPink)"
      />

      {/* Shutter shades */}
      <g filter="url(#neonGlowCyan)">
        {/* Glasses frame */}
        <rect x="68" y="72" width="64" height="22" rx="3" fill="none" stroke="#00e5ff" strokeWidth="2.5" />
        {/* Bridge */}
        <line x1="95" y1="78" x2="105" y2="78" stroke="#00e5ff" strokeWidth="2.5" />
        {/* Left lens slats */}
        <line x1="70" y1="78" x2="93" y2="78" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="70" y1="82" x2="93" y2="82" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="70" y1="86" x2="93" y2="86" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="70" y1="90" x2="93" y2="90" stroke="#00e5ff" strokeWidth="1.5" />
        {/* Right lens slats */}
        <line x1="107" y1="78" x2="130" y2="78" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="107" y1="82" x2="130" y2="82" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="107" y1="86" x2="130" y2="86" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="107" y1="90" x2="130" y2="90" stroke="#00e5ff" strokeWidth="1.5" />
        {/* Temples */}
        <line x1="68" y1="78" x2="60" y2="75" stroke="#00e5ff" strokeWidth="2" />
        <line x1="132" y1="78" x2="140" y2="75" stroke="#00e5ff" strokeWidth="2" />
      </g>
    </svg>
  );
}
