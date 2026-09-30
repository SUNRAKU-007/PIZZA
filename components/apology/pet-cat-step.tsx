'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PATS_NEEDED = 7

const MOODS = [
  'This kitty is very sad. He knows he messed up.',
  'Oh? A little pat... he looks up at you.',
  'His ears are coming back up!',
  'Is that... a tiny purr?',
  'He is leaning into your hand now.',
  'Full purr mode unlocked.',
  'One more and he might melt...',
  'He feels a little better. Just like me when you smile.',
]

type Pop = { id: number; x: number; y: number }

export function PetCatStep({ onNext }: { onNext: () => void }) {
  const [pats, setPats] = useState(0)
  const [pops, setPops] = useState<Pop[]>([])
  const [wiggling, setWiggling] = useState(false)
  const popId = useRef(0)

  const done = pats >= PATS_NEEDED

  const pet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2
    const id = popId.current++
    setPops((p) => [...p, { id, x, y }])
    setTimeout(() => setPops((p) => p.filter((pop) => pop.id !== id)), 900)
    setPats((p) => Math.min(p + 1, PATS_NEEDED))
    setWiggling(false)
    requestAnimationFrame(() => setWiggling(true))
  }

  return (
    <section className="flex w-full flex-col items-center gap-5 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-balance font-hand text-5xl font-bold text-foreground">Meet Sorry Kitty</h2>
        <p className="text-muted-foreground">{"He's been waiting for you all night. Tap him to give him pats."}</p>
      </div>

      <button
        type="button"
        onClick={pet}
        aria-label={`Pet the kitty (${pats} of ${PATS_NEEDED} pats)`}
        className="relative w-full max-w-lg cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
      >
        <Image
          src="/images/sorry-kitty.png"
          alt="A sad grey kitten with teary eyes holding a paper sign that says sorry"
          width={1408}
          height={768}
          priority
          onAnimationEnd={() => setWiggling(false)}
          className={cn('soft-edges aspect-[16/10] h-auto w-full select-none object-cover', wiggling && 'animate-wiggle')}
          draggable={false}
        />
        {pops.map((pop) => (
          <Heart
            key={pop.id}
            aria-hidden="true"
            className="pointer-events-none absolute size-8 animate-heart-pop text-primary drop-shadow-[0_0_8px_rgba(183,148,246,0.8)]"
            style={{ left: pop.x, top: pop.y }}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </button>

      <div className="flex w-full max-w-md flex-col gap-3">
        <p aria-live="polite" className="min-h-16 text-balance font-hand text-3xl text-primary">
          {MOODS[pats]}
        </p>
        <div
          role="progressbar"
          aria-label="Kitty happiness"
          aria-valuemin={0}
          aria-valuemax={PATS_NEEDED}
          aria-valuenow={pats}
          className="h-3 w-full overflow-hidden rounded-full bg-white/10"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${(pats / PATS_NEEDED) * 100}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">Kitty happiness meter</p>
      </div>

      <Button size="lg" onClick={onNext} disabled={!done} className="h-12 rounded-full px-8 text-base">
        {done ? 'Look, shooting stars!' : `${PATS_NEEDED - pats} more pats needed`}
      </Button>
    </section>
  )
}
