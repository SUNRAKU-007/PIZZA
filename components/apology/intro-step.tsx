import { Moon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'

export function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <section className="flex flex-col items-center gap-2 text-center">
      <div className="relative w-full max-w-sm animate-bob sm:max-w-md">
        <Image
          src="/images/moon-cat.png"
          alt="A little grey kitten in a purple scarf asleep on a glowing crescent moon"
          width={1408}
          height={768}
          priority
          className="soft-edges aspect-[16/10] h-auto w-full object-cover"
        />
      </div>

      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">a message from the moon</p>
      <h1 className="text-balance font-hand text-6xl font-bold leading-none text-foreground sm:text-7xl">
        Hey <span className="text-primary drop-shadow-[0_0_18px_rgba(183,148,246,0.6)]">{config.herName}</span>,
      </h1>
      <p className="mt-2 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
        {"The moon told me someone very special is upset with me tonight. So it lent me its sky, its stars and its sleepiest cat to say something."}
      </p>

      <Button size="lg" onClick={onNext} className="mt-6 h-12 gap-2 rounded-full px-8 text-base shadow-lg shadow-primary/30">
        <Moon className="size-5" />
        Look up at the sky
      </Button>
      <p className="mt-3 text-sm text-muted-foreground">
        from a very sorry <span className="font-medium text-foreground">{config.yourName}</span>
      </p>
    </section>
  )
}
