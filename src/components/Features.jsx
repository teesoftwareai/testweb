import { Rocket, Users, ShieldCheck, Zap } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const features = [
  {
    icon: Zap,
    title: 'รวดเร็ว ทันใจ',
    desc: 'เริ่มใช้งานได้อย่างรวดเร็วภายในไม่กี่นาที โดยไม่ต้องมีความรู้ด้านเทคนิคขั้นสูง',
  },
  {
    icon: ShieldCheck,
    title: 'ปลอดภัยระดับองค์กร',
    desc: 'ระบบรักษาความปลอดภัยหลายชั้น ข้อมูลของคุณถูกเข้ารหัสและสำรองข้อมูลอัตโนมัติ',
  },
  {
    icon: Users,
    title: 'ทีมดูแลใกล้ชิด',
    desc: 'ทีมผู้เชี่ยวชาญพร้อมให้การสนับสนุนตลอด 24 ชั่วโมงผ่านทุกช่องทาง',
  },
  {
    icon: Rocket,
    title: 'เติบโตไม่มีสะดุด',
    desc: 'ระบบออกแบบมาเพื่อรองรับการขยายตัวของธุรกิจคุณอย่างไม่จำกัด',
  },
]

export default function Features() {
  const ref = useReveal()

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-widest text-brand-600 uppercase">
            ทำไมต้อง <span className="text-violet-600">Brightly</span>
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            ออกแบบมาให้ธุรกิจของคุณ
            <br className="hidden sm:block" /> วุ่นวายน้อยลง สำเร็จมากขึ้น
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            เรารวมทุกอย่างที่ธุรกิจต้องใช้เข้าไว้ด้วยกัน เพื่อให้คุณโฟกัสกับเป้าหมายหลัก
            แทนที่จะจมอยู่กับงานประจำที่ซ้ำซ้อน
          </p>
        </div>

        <div className="reveal mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-600 transition-colors group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-violet-600 group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}