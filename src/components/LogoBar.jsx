import { useReveal } from '../hooks/useReveal'

const logos = [
  'NovaTech',
  'Skyline Co.',
  '라온그룹',
  'Peak Digital',
  'Orbit Studio',
  'Harmony',
  'Vertex',
]

export default function LogoBar() {
  const ref = useReveal()

  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="reveal text-center text-sm font-medium tracking-wide text-slate-500">
          เชื่อถือโดยทีมชั้นนำมากกว่า 1,200 บริษัททั่วไทย
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-xl font-bold tracking-tight text-slate-300 transition-colors hover:text-brand-400"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}