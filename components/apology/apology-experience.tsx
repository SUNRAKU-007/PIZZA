'use client'

import { Star } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { FinaleStep } from './finale-step'
import { IntroStep } from './intro-step'
import { LetterStep } from './letter-step'
import { MusicPlayer, type MusicPlayerHandle } from './music-player'
import { PetCatStep } from './pet-cat-step'
import { PizzaStep } from './pizza-step'
import { QuestionStep } from './question-step'
import { StarCatchStep } from './star-catch-step'

const STEPS = ['Hello', 'Sorry Kitty', 'Shooting stars', 'Letter', 'Pizza', 'Question', 'Lanterns'] as const

export function ApologyExperience() {
  const [step, setStep] = useState(0)
  const music = useRef<MusicPlayerHandle>(null)
  const next = () => {
    if (step === 0) music.current?.play()
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const restart = () => {
    setStep(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-32 pt-6 sm:pb-40">
      <MusicPlayer ref={music} />
      {step > 0 && (
        <nav aria-label="Progress" className="mb-6 flex justify-center">
          <ol className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <li key={label}>
                <Star
                  aria-label={`${label}${i === step ? ' (current)' : i < step ? ' (done)' : ''}`}
                  className={cn(
                    'size-4 transition-all duration-500',
                    i < step && 'text-accent',
                    i === step && 'size-5 text-accent drop-shadow-[0_0_6px_rgba(252,211,77,0.9)]',
                    i > step && 'text-white/20',
                  )}
                  fill="currentColor"
                  strokeWidth={0}
                />
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div key={step} className="flex flex-1 flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {step === 0 && <IntroStep onNext={next} />}
        {step === 1 && <PetCatStep onNext={next} />}
        {step === 2 && <StarCatchStep onNext={next} />}
        {step === 3 && <LetterStep onNext={next} />}
        {step === 4 && <PizzaStep onNext={next} />}
        {step === 5 && <QuestionStep onNext={next} />}
        {step === 6 && <FinaleStep onRestart={restart} />}
      </div>
    </div>
  )
}
