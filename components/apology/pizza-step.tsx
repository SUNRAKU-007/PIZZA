'use client'

import { Check, Flame } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ItemId = 'sauce' | 'cheese' | 'paneer' | 'capsicum' | 'onion' | 'coke'

const ITEMS: { id: ItemId; name: string; promise: string; swatch: string }[] = [
  { id: 'sauce', name: 'Extra sauce', promise: 'Extra love, extra effort, always', swatch: '#dc2626' },
  { id: 'cheese', name: 'Extra cheese', promise: 'Unlimited cuddles, on demand', swatch: '#fde68a' },
  { id: 'paneer', name: 'Peppy paneer', promise: "I'll listen. Like, really listen", swatch: '#fb923c' },
  { id: 'capsicum', name: 'Capsicum', promise: "We'll never go to bed angry", swatch: '#16a34a' },
  { id: 'onion', name: 'Purple onion', promise: "I'll say sorry faster next time", swatch: '#9333ea' },
  { id: 'coke', name: 'Chilled Coke', promise: "And I'll never forget your Coke", swatch: '#3f1d0b' },
]

const POSITIONS: Record<Exclude<ItemId, 'coke'>, [number, number][]> = {
  sauce: [[76, 70], [128, 72], [100, 100], [62, 118], [140, 126], [96, 146], [118, 108], [80, 94]],
  cheese: [[78, 92], [120, 118], [102, 76], [72, 140], [138, 84], [110, 150]],
  paneer: [[70, 68], [132, 64], [100, 104], [58, 118], [144, 124], [98, 150], [118, 86]],
  capsicum: [[96, 56], [52, 94], [148, 98], [80, 132], [126, 146], [110, 124]],
  onion: [[118, 86], [74, 108], [116, 130], [86, 80], [156, 112], [66, 150]],
}

function ToppingShapes({ id }: { id: Exclude<ItemId, 'coke'> }) {
  return (
    <g className="animate-in zoom-in-50 fade-in duration-500">
      {POSITIONS[id].map(([x, y], i) => {
        switch (id) {
          case 'sauce':
            return <circle key={i} cx={x} cy={y} r={11 + (i % 3) * 2} fill="#dc2626" opacity={0.75} />
          case 'cheese':
            return <circle key={i} cx={x} cy={y} r={9} fill="#fef3c7" opacity={0.9} />
          case 'paneer':
            return (
              <g key={i} transform={`rotate(${(i * 37) % 90} ${x} ${y})`}>
                <rect x={x - 6} y={y - 6} width={12} height={12} rx={2} fill="#fff7ed" />
                <rect x={x - 6} y={y - 6} width={12} height={4} rx={2} fill="#fb923c" opacity={0.85} />
                <circle cx={x + 2} cy={y + 2} r={1} fill="#b91c1c" />
              </g>
            )
          case 'capsicum':
            return (
              <path
                key={i}
                d={`M${x - 8} ${y} q8 -7 16 0`}
                fill="none"
                stroke="#15803d"
                strokeWidth={3.5}
                strokeLinecap="round"
                transform={`rotate(${(i * 53) % 180} ${x} ${y})`}
              />
            )
          case 'onion':
            return (
              <path
                key={i}
                d={`M${x - 6} ${y + 2} a6 6 0 0 1 12 0`}
                fill="none"
                stroke="#a855f7"
                strokeWidth={2.5}
                strokeLinecap="round"
                transform={`rotate(${(i * 71) % 180} ${x} ${y})`}
              />
            )
        }
      })}
    </g>
  )
}

function CokeGlass() {
  return (
    <svg
      viewBox="0 0 80 140"
      role="img"
      aria-label="A chilled glass of Coke with a straw"
      className="h-40 w-auto drop-shadow-xl animate-in fade-in slide-in-from-right-6 duration-700 sm:h-48"
    >
      <rect x={44} y={0} width={6} height={60} rx={3} fill="#a855f7" transform="rotate(12 47 30)" />
      <path d="M10 30 L70 30 L62 134 L18 134 Z" fill="#e9d5ff" opacity={0.55} />
      <path d="M13 44 L67 44 L61 130 L19 130 Z" fill="#3f1d0b" />
      <path d="M13 44 L67 44 L66 52 L14 52 Z" fill="#a16207" opacity={0.7} />
      <rect x={22} y={56} width={14} height={12} rx={3} fill="#f5f3ff" opacity={0.7} transform="rotate(-10 29 62)" />
      <rect x={42} y={64} width={13} height={11} rx={3} fill="#f5f3ff" opacity={0.6} transform="rotate(14 48 70)" />
      {[
        [28, 100],
        [44, 90],
        [52, 112],
        [34, 118],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2} fill="#fef3c7" opacity={0.5} />
      ))}
      <path d="M16 36 L20 126" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.5} />
    </svg>
  )
}

export function PizzaStep({ onNext }: { onNext: () => void }) {
  const [added, setAdded] = useState<ItemId[]>([])
  const [baked, setBaked] = useState(false)
  const allAdded = added.length === ITEMS.length
  const remaining = ITEMS.length - added.length

  const toggle = (id: ItemId) => {
    if (baked) return
    setAdded((a) => (a.includes(id) ? a.filter((t) => t !== id) : [...a, id]))
  }

  const toppings = ITEMS.filter((t) => t.id !== 'coke' && added.includes(t.id)) as {
    id: Exclude<ItemId, 'coke'>
  }[]

  return (
    <section className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-balance font-hand text-5xl font-bold text-foreground">The Midnight Peppy Paneer</h2>
        <p className="text-pretty text-muted-foreground">
          Your favourite, made your way (extra sauce, obviously). Every topping is a promise. Add them all and we bake it.
        </p>
      </div>

      <div className="flex items-end justify-center gap-2 sm:gap-4">
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-label={`A peppy paneer pizza with ${toppings.length ? toppings.map((t) => t.id).join(', ') : 'no toppings yet'}`}
          className={cn(
            'size-60 drop-shadow-xl transition-all duration-1000 sm:size-72',
            baked && 'rotate-[360deg] drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]',
          )}
        >
          <circle cx={100} cy={100} r={94} fill="#d97706" />
          <circle cx={100} cy={100} r={86} fill="#f59e0b" />
          <circle cx={100} cy={100} r={78} fill="#dc2626" />
          <circle
            cx={100}
            cy={100}
            r={73}
            fill={baked ? '#fbbf24' : '#fcd34d'}
            className="transition-colors duration-1000"
          />
          {toppings.map((t) => (
            <ToppingShapes key={t.id} id={t.id} />
          ))}
          {baked &&
            [0, 60, 120].map((deg) => (
              <line
                key={deg}
                x1={100}
                y1={6}
                x2={100}
                y2={194}
                stroke="#b45309"
                strokeWidth={1.5}
                opacity={0.6}
                transform={`rotate(${deg} 100 100)`}
              />
            ))}
        </svg>
        {added.includes('coke') && <CokeGlass />}
      </div>

      {baked ? (
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-700">
          <p className="text-balance font-hand text-4xl text-primary">
            {'Hot, saucy peppy paneer + a cold Coke. Just how you like it.'}
          </p>
          <Button size="lg" onClick={onNext} className="h-12 rounded-full px-8 text-base">
            One question...
          </Button>
        </div>
      ) : (
        <>
          <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {ITEMS.map((t) => {
              const on = added.includes(t.id)
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => toggle(t.id)}
                    aria-pressed={on}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3 rounded-2xl border-2 bg-card/60 p-3 text-left backdrop-blur transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring',
                      on ? 'border-primary shadow-lg shadow-primary/25' : 'border-white/10',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="size-8 shrink-0 rounded-full ring-2 ring-white/30"
                      style={{ backgroundColor: t.swatch }}
                    />
                    <span className="flex flex-1 flex-col">
                      <span className="font-medium">{t.name}</span>
                      <span className="text-sm text-muted-foreground">{t.promise}</span>
                    </span>
                    <span
                      className={cn(
                        'flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                        on ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                      )}
                    >
                      {on && <Check className="size-4" />}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <Button
            size="lg"
            onClick={() => setBaked(true)}
            disabled={!allAdded}
            className="h-12 gap-2 rounded-full px-8 text-base"
          >
            <Flame className="size-5" />
            {allAdded ? 'Bake it!' : `${remaining} ${remaining === 1 ? 'promise' : 'promises'} to go`}
          </Button>
        </>
      )}
    </section>
  )
}
