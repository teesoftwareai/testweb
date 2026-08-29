import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import { DEFAULT_DATA } from '../lib/content'

export default function LogoBar() {
  const ref = useReveal()
  const { data } = useSite()
  const logos = data?.logos && data.logos.length ? data.logos : DEFAULT_DATA.logos

  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="reveal text-center text-sm font-medium tracking-wide text-slate-500">
          เชื่อถือโดยทีมชั้นนำมากกว่า 1,200 บริษัททั่วไทย
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <span
              key={logo.id || logo.name}
              className="text-xl font-bold tracking-tight text-slate-300 transition-colors hover:text-brand-400"
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}