import { Quote, Star } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import { DEFAULT_DATA } from '../lib/content'
import { getPublicUrl } from '../lib/supabase'

export default function Testimonials() {
  const ref = useReveal()
  const { data } = useSite()
  const testimonials =
    data?.testimonials && data.testimonials.length
      ? data.testimonials
      : DEFAULT_DATA.testimonials

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-white to-brand-50/50 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-widest text-brand-600 uppercase">
            เสียงจากลูกค้า
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            ความสำเร็จของลูกค้าคือความสำเร็จของเรา
          </h2>
        </div>

        <div className="reveal mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-600/10"
            >
              <Quote className="h-8 w-8 text-brand-200" />
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4.5 w-4.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-6">
                {t.avatar_url ? (
                  <img
                    src={getPublicUrl(t.avatar_url)}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-lg font-bold text-white`}
                  >
                    {t.initials}
                  </span>
                )}
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}