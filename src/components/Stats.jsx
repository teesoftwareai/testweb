import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import { DEFAULT_DATA } from '../lib/content'

export default function Stats() {
  const ref = useReveal()
  const { data } = useSite()
  const stats = data?.stats && data.stats.length ? data.stats : DEFAULT_DATA.stats

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-700 via-brand-600 to-violet-600 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-brand-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}