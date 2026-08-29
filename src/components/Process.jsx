import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import { iconMap, DEFAULT_DATA } from '../lib/content'

export default function Process() {
  const ref = useReveal()
  const { data } = useSite()
  const steps = (data?.process_steps && data.process_steps.length
    ? data.process_steps
    : DEFAULT_DATA.process_steps
  ).map((s) => ({ ...s, Icon: iconMap[s.icon] || null }))

  return (
    <section className="bg-white py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-widest text-brand-600 uppercase">
            วิธีทำงาน
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            กระบวนการของเรา ง่าย และโปร่งใส
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            ทำตามบทบาทที่ชัดเจนในแต่ละขั้นตอน เพื่อให้คุณมั่นใจได้ทุกก้าวของการทำงาน
          </p>
        </div>

        <div className="reveal relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-10 right-[12%] left-[12%] hidden border-t-2 border-dashed border-brand-200 lg:block" />
          {steps.map((item) => (
            <div key={item.id || item.step_number}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-lg shadow-brand-600/10 ring-1 ring-brand-100">
                {item.Icon && <item.Icon className="h-9 w-9 text-brand-600" />}
              </div>
              <span className="mt-5 block text-sm font-extrabold tracking-widest text-brand-400">
                STEP {String(item.step_number).padStart(2, '0')}
              </span>
              <h3 className="mt-1.5 text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}