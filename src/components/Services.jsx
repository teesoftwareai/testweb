import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import { iconMap, DEFAULT_DATA } from '../lib/content'

export default function Services() {
  const ref = useReveal()
  const { data } = useSite()
  const services = (data?.services && data.services.length
    ? data.services
    : DEFAULT_DATA.services
  ).map((s) => ({ ...s, Icon: iconMap[s.icon] || null }))

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-bold tracking-widest text-brand-600 uppercase">
              บริการของเรา
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ครบจบในที่เดียว
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              ตั้งแต่กลยุทธ์ สู่ผลลัพธ์ เราครอบคลุมทุกขั้นตอนของการเติบโต
              ให้คุณเลือกใช้บริการได้ตามที่ธุรกิจต้องการ
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
          >
            ดูบริการทั้งหมด
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id || service.title}
              className="group relative rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-600/10"
            >
              {service.tag && (
                <span className="absolute top-6 right-6 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                  {service.tag}
                </span>
              )}
              <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 p-3 text-white shadow-lg shadow-brand-600/25 transition-transform group-hover:scale-110">
                {service.Icon && <service.Icon className="h-6.5 w-6.5" />}
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}