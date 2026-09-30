'use client'

import { Sparkles, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'
import { cn } from '@/lib/utils'

type FlyingStar = { id: number; left: number; top: number; dx: number; dy: number }

const LIFETIME = 3600
const SPAWN_EVERY = 1100
const MAX_ON_SCREEN = 3

export function StarCatchStep({ onNext }: { onNext: () => void }) {
  const [stars, setStars] = useState<FlyingStar[]>([])
  const [caught, setCaught] = useState(0)
  const skyRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)

  const total = config.wishes.length
  const done = caught >= total

  useEffect(() => {
    if (done) {
      setStars([])
      return
    }
    const spawn = () => {
      const sky = skyRef.current
      if (!sky) return
      const w = sky.clientWidth
      const h = sky.clientHeight
      const id = nextId.current++
      const travel = w * (0.35 + Math.random() * 0.2)
      const star: FlyingStar = {
        id,
        left: Math.random() * w * 0.55 + 20,
        top: Math.random() * h * 0.35 + 20,
        dx: travel,
        dy: travel * 0.58,
      }
      setStars((s) => (s.length >= MAX_ON_SCREEN ? s : [...s, star]))
      setTimeout(() => setStars((s) => s.filter((x) => x.id !== id)), LIFETIME)
    }
    spawn()
    const interval = setInterval(spawn, SPAWN_EVERY)
    return () => clearInterval(interval)
  }, [done])

  const catchStar = (id: number) => {
    setStars((s) => s.filter((x) => x.id !== id))
    setCaught((c) => Math.min(c + 1, total))
  }

  return (
    <section className="flex w-full flex-col items-center gap-5 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-balance font-hand text-5xl font-bold text-foreground">Catch the shooting stars</h2>
        <p className="text-pretty text-muted-foreground">
          {`I wrote a sorry on every one of them. Tap ${total} to read what I couldn't say properly.`}
        </p>
      </div>

      <div
        ref={skyRef}
        className="relative h-[46vh] min-h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-primary/10 via-white/[0.03] to-transparent"
      >
        {stars.map((s) => (
          <button
            key={s.id}
            type="button"
            data-keep-motion
            onClick={() => catchStar(s.id)}
            aria-label="Catch this shooting star"
            className="absolute flex size-14 -translate-x-1/2 -translate-y-1/2 animate-catch-streak cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            style={{ left: s.left, top: s.top, '--dx': `${s.dx}px`, '--dy': `${s.dy}px` } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className="absolute right-1/2 top-1/2 h-0.5 w-28 origin-right -translate-y-1/2 rotate-[30deg] rounded-full bg-gradient-to-r from-transparent via-amber-200/50 to-amber-100"
            />
            <Star
              aria-hidden="true"
              className="relative size-7 text-accent drop-shadow-[0_0_10px_rgba(252,211,77,1)]"
              fill="currentColor"
              strokeWidth={0}
            />
          </button>
        ))}

        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 animate-in fade-in zoom-in-95 duration-700">
            <Sparkles aria-hidden="true" className="size-10 text-accent" />
            <p className="text-balance font-hand text-4xl text-foreground">You caught every single one.</p>
            <p className="text-muted-foreground">{'(You always do. Even the ones I mess up.)'}</p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2" aria-hidden="true">
          {config.wishes.map((_, i) => (
            <Star
              key={i}
              className={cn('size-5 transition-all duration-500', i < caught ? 'scale-110 text-accent' : 'text-white/15')}
              fill="currentColor"
              strokeWidth={0}
            />
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {`${caught} of ${total} stars caught`}
      </p>

      {caught > 0 && (
        <ul className="flex w-full flex-col gap-2">
          {config.wishes.slice(0, caught).map((wish) => (
            <li
              key={wish}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card/60 px-4 py-3 text-left backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <Star aria-hidden="true" className="size-4 shrink-0 text-accent" fill="currentColor" strokeWidth={0} />
              <span className="font-hand text-2xl leading-tight text-foreground">{wish}</span>
            </li>
          ))}
        </ul>
      )}

      {done && (
        <Button size="lg" onClick={onNext} className="h-12 rounded-full px-8 text-base animate-in fade-in">
          {"There's a letter too"}
        </Button>
      )}
    </section>
  )
}
