import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const ref = useReveal()

  return (
    <section className="bg-brand-50/50 py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-violet-700 px-8 py-16 text-center shadow-2xl shadow-brand-700/40 sm:px-16 lg:py-20">
          <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl" />

          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-brand-50 backdrop-blur">
            พร้อมเริ่มต้นหรือยัง?
          </span>
          <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            พร้อมพาธุรกิจของคุณไปอีกขั้นแล้วหรือยัง?
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
            ทดลองใช้ฟรี ไม่มีบัตรเครดิต ไม่มีข้อผูกมัด
            ทีมงานพร้อมตอบทุกคำถามของคุณ
          </p>
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              เริ่มต้นใช้งานฟรี
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              พูดคุยกับทีมงาน
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}