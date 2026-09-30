import { ApologyExperience } from '@/components/apology/apology-experience'
import { NightSky } from '@/components/apology/night-sky'

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <NightSky />
      <ApologyExperience />
    </main>
  )
}
