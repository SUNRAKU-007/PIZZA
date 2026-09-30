'use client'

import { Flame, RotateCcw, Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'

const LANTERNS = [
  { left: 6, size: 34, delay: 0, duration: 11, sway: 30 },
  { left: 16, size: 24, delay: 1.6, duration: 13, sway: -20 },
  { left: 27, size: 40, delay: 0.6, duration: 10, sway: 24 },
  { left: 38, size: 22, delay: 2.8, duration: 14, sway: -30 },
  { left: 48, size: 46, delay: 0.2, duration: 12, sway: 18 },
  { left: 58, size: 26, delay: 2.2, duration: 13, sway: -16 },
  { left: 67, size: 36, delay: 1, duration: 11, sway: 28 },
  { left: 77, size: 20, delay: 3.4, duration: 15, sway: -24 },
  { left: 86, size: 32, delay: 1.3, duration: 12, sway: 20 },
  { left: 94, size: 24, delay: 2.5, duration: 14, sway: -18 },
  { left: 22, size: 18, delay: 4.2, duration: 16, sway: 14 },
  { left: 72, size: 42, delay: 4.8, duration: 12, sway: -26 },
]

const CAT_OUTLINE = '50,122 40,82 46,28 78,58 122,58 154,28 160,82 150,122 100,142 50,122'
const CAT_STARS = [
  [50, 122], [40, 82], [46, 28], [78, 58], [122, 58], [154, 28], [160, 82], [150, 122], [100, 142],
  [80, 92], [120, 92], [100, 110],
] as const

const PERKS = [
  'A midnight date, just us',
  '1 large Peppy Paneer, extra sauce',
  '1 chilled Coke, extra ice',
  'Unlimited forehead kisses',
  'A very well-behaved Nolla',
]

const HOLD_MS = 1400

export function FinaleStep({ onRestart }: { onRestart: () => void }) {
  const [progress, setProgress] = useState(0)
  const [lit, setLit] = useState(false)
  const holdStart = useRef<number | null>(null)
  const frame = useRef<number | null>(null)

  const stopHold = () => {
    holdStart.current = null
    if (frame.current) cancelAnimationFrame(frame.current)
    if (!lit) setProgress(0)
  }

  const tick = () => {
    if (holdStart.current === null) return
    const p = Math.min((performance.now() - holdStart.current) / HOLD_MS, 1)
    setProgress(p)
    if (p >= 1) {
      holdStart.current = null
      setLit(true)
      return
    }
    frame.current = requestAnimationFrame(tick)
  }

  const startHold = () => {
    if (lit || holdStart.current !== null) return
    holdStart.current = performance.now()
    frame.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current)
  }, [])

  return (
    <section className="flex w-full flex-col items-center gap-5 text-center">
      {lit && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
          {LANTERNS.map((l, i) => (
            <span
              key={i}
              data-keep-motion
              className="absolute -bottom-20 block animate-rise"
              style={
                {
                  left: `${l.left}%`,
                  animationDelay: `${l.delay}s`,
                  animationDuration: `${l.duration}s`,
                  '--sway': `${l.sway}px`,
                } as React.CSSProperties
              }
            >
              <span
                className="block rounded-t-[45%] rounded-b-md bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 shadow-[0_0_30px_8px_rgba(252,211,77,0.45)]"
                style={{ width: l.size, height: l.size * 1.25 }}
              />
            </span>
          ))}
        </div>
      )}

      <Image
        src="/images/lantern-kitty.png"
        alt="A happy grey kitten releasing a glowing paper sky lantern with a heart on it"
        width={1408}
        height={768}
        className="soft-edges aspect-[16/10] h-auto w-full max-w-lg object-cover"
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-balance font-hand text-6xl font-bold text-foreground">Best. Girlfriend. Ever.</h2>
        <p className="text-pretty text-muted-foreground">
          {lit
            ? `Look up, ${config.herName}. The whole sky is saying thank you.`
            : 'One last thing. Light a lantern with me: press and hold the button until it glows.'}
        </p>
      </div>

      {!lit && (
        <button
          type="button"
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          onPointerCancel={stopHold}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && startHold()}
          onKeyUp={stopHold}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="Press and hold to light the lantern"
          className="relative flex h-14 w-64 cursor-pointer touch-none select-none items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-accent/60 bg-card/70 text-base font-medium text-foreground backdrop-blur focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400/70 to-orange-400/80"
            style={{ width: `${progress * 100}%` }}
          />
          <Flame aria-hidden="true" className="relative size-5 text-accent" />
          <span className="relative">{progress > 0 ? 'Keep holding...' : 'Hold to light it'}</span>
        </button>
      )}

      {lit && (
        <div className="flex w-full flex-col items-center gap-6 animate-in fade-in duration-1000">
          <figure className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 200 160" role="img" aria-label="A cat face drawn in stars" className="h-40 w-auto">
              <polyline
                points={CAT_OUTLINE}
                pathLength={1}
                fill="none"
                stroke="#c4b5fd"
                strokeWidth={1.2}
                strokeDasharray={1}
                strokeDashoffset={1}
                strokeLinejoin="round"
                className="animate-draw"
                opacity={0.8}
              />
              {CAT_STARS.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i > 8 ? 3 : 2.4}
                  fill="#fcd34d"
                  className="animate-twinkle"
                  style={{ animationDuration: `${2 + (i % 4)}s`, transformOrigin: `${x}px ${y}px` }}
                />
              ))}
            </svg>
            <figcaption className="font-hand text-2xl text-primary">I asked the stars to draw you a cat.</figcaption>
          </figure>

          <div className="w-full max-w-md rounded-3xl border-2 border-dashed border-accent/60 bg-card/70 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Official coupon</p>
            <p className="mt-1 font-hand text-4xl text-accent">Moonlight Date, On Me</p>
            <ul className="mt-4 flex flex-col gap-2 text-left">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <Star aria-hidden="true" className="size-4 shrink-0 text-accent" fill="currentColor" strokeWidth={0} />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              {'Valid forever. No pineapple, ever. Redeem by screenshotting this and sending it to '}
              {config.yourName}.
            </p>
          </div>

          <p className="text-balance font-hand text-3xl text-foreground">
            {`Thank you, ${config.herName}. I love you more than the moon loves the night.`}
          </p>

          <Button variant="ghost" onClick={onRestart} className="gap-2 rounded-full text-muted-foreground">
            <RotateCcw className="size-4" />
            Watch it again
          </Button>
        </div>
      )}
    </section>
  )
}
