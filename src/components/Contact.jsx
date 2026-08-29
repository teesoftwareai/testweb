import { useState } from 'react'
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
} from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { DEFAULT_SETTINGS } from '../lib/content'
import { supabase } from '../lib/supabase'

const contactFields = [
  { key: 'address', title: 'ที่ตั้งสำนักงาน', icon: MapPin },
  { key: 'phone', title: 'โทรศัพท์', icon: Phone },
  { key: 'email', title: 'อีเมล', icon: Mail },
  { key: 'hours', title: 'เวลาทำการ', icon: Clock },
]

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const { settings } = useSite()
  const c = { ...DEFAULT_SETTINGS.contact, ...(settings?.contact || {}) }

  const contactInfo = [
    { ...contactFields[0], lines: c.addressLines || [] },
    { ...contactFields[1], lines: c.phoneLines || [] },
    { ...contactFields[2], lines: c.emailLines || [] },
    { ...contactFields[3], lines: c.hoursLines || [] },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const { error: dbError } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      })
      if (dbError) throw dbError
      setSent(true)
    } catch (err) {
      console.error(err)
      setError('ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-sm font-bold tracking-widest text-brand-600 uppercase">
              ติดต่อเรา
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {c.contactHeadline}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600">
              {c.contactIntro}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {item.title}
                    </p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-sm text-slate-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  ขอบคุณสำหรับข้อความ!
                </h3>
                <p className="mt-2 max-w-xs text-slate-600">
                  เราได้รับข้อมูลของคุณแล้ว ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setError(null)
                    setForm({ name: '', email: '', phone: '', message: '' })
                  }}
                  className="mt-8 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  ส่งข้อความใหม่
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    ชื่อของคุณ
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="เช่น สมชาย วงศ์ไพศาล"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    อีเมล
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="คุณ@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    เบอร์โทร (ไม่บังคับ)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="เช่น 08x-xxx-xxxx"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    ข้อความ
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="เล่าให้เราฟังเกี่ยวกับโปรเจกต์หรือคำถามของคุณ..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                {error && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                  <Send className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}