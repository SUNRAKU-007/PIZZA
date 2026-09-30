'use client'

import { Music, Play } from 'lucide-react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export const SONG = {
  src: '/music/i-love-you-so.mp3',
  title: 'I Love You So (Acoustic)',
  artist: 'The Walters',
}

export type MusicPlayerHandle = { play: () => void }

export const MusicPlayer = forwardRef<MusicPlayerHandle>(function MusicPlayer(_, ref) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  const play = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.6
    audio.play().catch(() => setPlaying(false))
  }

  useImperativeHandle(ref, () => ({ play }))

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) play()
    else audio.pause()
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={SONG.src}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />
      {available && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${SONG.title}` : `Play ${SONG.title}`}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-card/70 py-2 pl-2 pr-4 text-left shadow-lg shadow-primary/20 backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          <span
            className={cn(
              'flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground',
              playing && 'animate-[spin_6s_linear_infinite]',
            )}
          >
            {playing ? <Music className="size-4" aria-hidden /> : <Play className="size-4" fill="currentColor" aria-hidden />}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-foreground">{SONG.title}</span>
            <span className="text-xs text-muted-foreground">{SONG.artist}</span>
          </span>
          <span className="flex h-4 items-end gap-0.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn('w-1 rounded-full bg-accent', playing ? 'animate-pulse' : 'h-1')}
                style={playing ? { height: `${[60, 100, 40, 80][i]}%`, animationDelay: `${i * 150}ms` } : undefined}
              />
            ))}
          </span>
        </button>
      )}
    </>
  )
})
