'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'

const NO_LINES = [
  'No',
  'Are you sure?',
  'Really really sure?',
  'The kitty is crying...',
  'But... peppy paneer?',
  'The moon is watching',
  'Please?',
  'Okay the button is tired',
]

export function QuestionStep({ onNext }: { onNext: () => void }) {
  const [attempts, setAttempts] = useState(0)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const areaRef = useRef<HTMLDivElement>(null)
  const lastDodge = useRef(0)

  const dodge = () => {
    const now = Date.now()
    if (now - lastDodge.current < 350) return
    lastDodge.current = now
    const area = areaRef.current
    const maxX = area ? area.clientWidth / 2 - 60 : 100
    setOffset({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * 70,
    })
    setAttempts((a) => a + 1)
  }

  const yesScale = 1 + Math.min(attempts, 8) * 0.12
  const noGone = attempts >= NO_LINES.length

  return (
    <section className="flex w-full flex-col items-center gap-4 text-center">
      <Image
        src="/images/hopeful-kitty.png"
        alt="A hopeful grey kitten with a purple bow holding up a glowing paper heart"
        width={1408}
        height={768}
        className="soft-edges aspect-[16/10] h-auto w-full max-w-lg object-cover"
      />

      <h2 className="text-balance font-hand text-5xl font-bold text-foreground sm:text-6xl">
        {config.herName}, will you forgive me?
      </h2>

      <div ref={areaRef} className="relative flex min-h-40 w-full items-center justify-center gap-4">
        <Button
          size="lg"
          onClick={onNext}
          style={{ transform: `scale(${yesScale})` }}
          className="h-12 rounded-full px-10 text-base shadow-lg shadow-primary/40 transition-transform duration-300"
        >
          Yes
        </Button>

        {!noGone && (
          <Button
            size="lg"
            variant="outline"
            onPointerEnter={(e) => e.pointerType === 'mouse' && dodge()}
            onClick={dodge}
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className="h-12 rounded-full border-2 border-white/20 bg-card/70 px-6 text-base backdrop-blur transition-transform duration-300"
          >
            {NO_LINES[attempts]}
          </Button>
        )}
      </div>

      {noGone && (
        <p className="font-hand text-3xl text-primary animate-in fade-in">
          {'The "No" button has left the chat. Only one option remains.'}
        </p>
      )}
    </section>
  )
}
