import {
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  TrendingUp,
  BarChart3,
  ShieldCheck,
} from 'lucide-react'

const perks = ['ไม่มีค่าใช้จ่ายแฝง', 'เริ่มได้ใน 7 วัน', 'ยกเลิกได้ตลอด']

const highlights = [
  { icon: BarChart3, label: 'รายได้เพิ่มขึ้น', value: '+38%' },
  { icon: ShieldCheck, label: 'ความพึงพอใจลูกค้า', value: '96%' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-300/30 blur-3xl animate-float-delayed" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-600" />
            เปิดตัวโซลูชันใหม่ล่าสุดปี 2026
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            ขับเคลื่อนธุรกิจของคุณให้{' '}
            <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
              เติบโตอย่างก้าวกระโดด
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Brightly รวบรวมเครื่องมือและทีมผู้เชี่ยวชาญไว้ในที่เดียว ช่วยให้คุณ
            โฟกัสกับสิ่งที่ทำได้ดีที่สุด เราจัดการส่วนที่เหลือให้ทั้งหมด
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-600/40"
            >
              ขอคำปรึกษาฟรี
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-brand-300 hover:text-brand-700"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
                <Play className="h-4 w-4 fill-current" />
              </span>
              ดูตัวอย่างผลงาน
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-sm font-medium text-slate-600"
              >
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: floating cards mock */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 p-2 shadow-2xl shadow-brand-600/30">
            <div className="rounded-[1.4rem] bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  ภาพรวมผลลัพธ์รายเดือน
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +38%
                </span>
              </div>

              <div className="mt-6 flex items-end gap-2">
                {[40, 55, 48, 70, 62, 85, 78, 96, 88, 100, 92, 110].map(
                  (h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`w-full max-w-6 flex-1 rounded-t-lg ${
                        i === 11
                          ? 'bg-gradient-to-t from-brand-600 to-violet-400'
                          : 'bg-brand-100'
                      }`}
                    />
                  )
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <item.icon className="h-5 w-5 text-brand-600" />
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {item.value}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -left-6 -top-6 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">ปลอดภัย 100%</p>
              <p className="text-xs text-slate-500">ข้อมูลของคุณไม่รั่วไหล</p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100">
            <div className="flex -space-x-2">
              {['จาก amber-400', 'จาก violet-400', 'จาก brand-500'].map(
                (c) => (
                  <span
                    key={c}
                    className={`h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br ${c}`}
                  />
                )
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">ลูกค้า 1,200+</p>
              <p className="text-xs text-slate-500">
                ให้ความไว้วางใจกับเรา
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}