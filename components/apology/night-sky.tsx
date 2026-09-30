function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = seeded(20)

const STARS = Array.from({ length: 110 }, () => ({
  x: Math.round(rand() * 1000) / 10,
  y: Math.round(rand() * 700) / 10,
  size: Math.round((rand() * 2 + 1) * 10) / 10,
  delay: Math.round(rand() * 40) / 10,
  duration: Math.round((2 + rand() * 3) * 10) / 10,
}))

type Building = { x: number; w: number; h: number; windows: { x: number; y: number; lit: boolean }[] }

const BUILDINGS: Building[] = (() => {
  const list: Building[] = []
  let x = -10
  while (x < 1210) {
    const w = Math.round(50 + rand() * 70)
    const h = Math.round(60 + rand() * 120)
    const windows: Building['windows'] = []
    for (let wy = 200 - h + 14; wy < 190; wy += 18) {
      for (let wx = x + 10; wx < x + w - 12; wx += 16) {
        windows.push({ x: wx, y: wy, lit: rand() > 0.62 })
      }
    }
    list.push({ x, w, h, windows })
    x += w + Math.round(rand() * 6)
  }
  return list
})()

const SHOOTING = [
  { top: '8%', left: '10%', duration: '9s', delay: '2s' },
  { top: '18%', left: '45%', duration: '13s', delay: '6s' },
  { top: '4%', left: '62%', duration: '17s', delay: '11s' },
]

export function NightSky() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2b1a5e_0%,#150b33_45%,#0b0520_100%)]" />
      <div className="absolute -left-40 top-1/3 size-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-32 top-10 size-[28rem] rounded-full bg-fuchsia-500/10 blur-3xl" />

      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {SHOOTING.map((s, i) => (
        <span
          key={i}
          className="absolute animate-streak"
          style={{ top: s.top, left: s.left, animationDuration: s.duration, animationDelay: s.delay }}
        >
          <span className="absolute right-0 top-0 block h-px w-28 origin-right rotate-[30deg] bg-gradient-to-r from-transparent to-white" />
        </span>
      ))}

      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-24 w-full opacity-90 sm:h-32"
      >
        <defs>
          <linearGradient id="city" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1245" />
            <stop offset="100%" stopColor="#0b0520" />
          </linearGradient>
        </defs>
        {BUILDINGS.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={200 - b.h} width={b.w} height={b.h} fill="url(#city)" />
            {b.windows.map((w, j) =>
              w.lit ? <rect key={j} x={w.x} y={w.y} width={6} height={8} rx={1} fill="#fcd34d" opacity={0.7} /> : null,
            )}
          </g>
        ))}
        <g transform={`translate(${BUILDINGS[4].x + BUILDINGS[4].w / 2 - 10} ${200 - BUILDINGS[4].h})`} fill="#0b0520">
          <ellipse cx={10} cy={-8} rx={9} ry={8} />
          <circle cx={10} cy={-19} r={6} />
          <path d="M5 -23 L6 -30 L9 -24 Z M15 -23 L14 -30 L11 -24 Z" />
          <path d="M18 -4 q12 0 10 -14" stroke="#0b0520" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}
