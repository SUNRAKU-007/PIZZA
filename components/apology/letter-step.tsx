'use client'

import { Moon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'

export function LetterStep({ onNext }: { onNext: () => void }) {
  const [shown, setShown] = useState(1)
  const allShown = shown >= config.letter.length

  return (
    <section className="flex w-full flex-col items-center gap-6">
      <article className="relative w-full rounded-3xl border border-white/10 bg-card/70 p-6 shadow-2xl shadow-primary/10 backdrop-blur-md sm:p-10">
        <div className="absolute -top-6 left-1/2 flex size-12 -translate-x-1/2 animate-glow items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Moon aria-hidden="true" className="size-6" fill="currentColor" strokeWidth={0} />
        </div>
        <p className="mb-4 mt-2 font-hand text-4xl text-primary">Dear {config.herName},</p>
        <div className="flex flex-col gap-4 font-hand text-2xl leading-snug text-foreground/95 sm:text-[1.7rem]">
          {config.letter.slice(0, shown).map((para) => (
            <p key={para} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
              {para}
            </p>
          ))}
        </div>
        {allShown && (
          <p className="mt-6 text-right font-hand text-3xl text-primary animate-in fade-in duration-1000">
            {config.signOff},
            <br />
            {config.yourName}
          </p>
        )}
      </article>

      {allShown ? (
        <Button size="lg" onClick={onNext} className="h-12 rounded-full px-8 text-base">
          I made you something warm
        </Button>
      ) : (
        <Button
          size="lg"
          variant="secondary"
          onClick={() => setShown((s) => s + 1)}
          className="h-12 rounded-full px-8 text-base"
        >
          Keep reading
        </Button>
      )}
    </section>
  )
}
