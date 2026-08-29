import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Flash, inputClass, labelClass, btnPrimary, btnSecondary } from './adminUtils'

function Field({ label, value, onChange, textarea, className }) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  )
}

function LinesEditor({ label, value, onChange }) {
  const lines = value || ['']
  const update = (i, v) => {
    const next = [...lines]
    next[i] = v
    onChange(next)
  }
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
      <label className={labelClass}>{label}</label>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={line}
              onChange={(e) => update(i, e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => {
                onChange(lines.filter((_, idx) => idx !== i))
              }}
              className="shrink-0 rounded-xl bg-red-50 px-3 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...lines, ''])}
        className="mt-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        + เพิ่มบรรทัด
      </button>
    </div>
  )
}

function FooterColumnsEditor({ value, onChange }) {
  const cols = value || []
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
      <label className={labelClass}>คอลัมน์ท้ายเว็บ (Footer)</label>
      <div className="space-y-3">
        {cols.map((col, ci) => (
          <div key={ci} className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={col.title}
                placeholder="ชื่อคอลัมน์"
                onChange={(e) => {
                  const next = [...cols]
                  next[ci] = { ...col, title: e.target.value }
                  onChange(next)
                }}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => onChange(cols.filter((_, idx) => idx !== ci))}
                className="shrink-0 rounded-xl bg-red-50 px-3 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                ลบ
              </button>
            </div>
            <div className="mt-2 space-y-1.5">
              {col.links.map((link, li) => (
                <div key={li} className="flex gap-2">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => {
                      const nextCols = [...cols]
                      const links = [...col.links]
                      links[li] = e.target.value
                      nextCols[ci] = { ...col, links }
                      onChange(nextCols)
                    }}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const nextCols = [...cols]
                      const links = col.links.filter((_, idx) => idx !== li)
                      nextCols[ci] = { ...col, links }
                      onChange(nextCols)
                    }}
                    className="shrink-0 rounded-xl bg-red-50 px-3 text-sm font-semibold text-red-600 hover:bg-red-100"
                  >
                    ลบ
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const nextCols = [...cols]
                  nextCols[ci] = { ...col, links: [...col.links, ''] }
                  onChange(nextCols)
                }}
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                + เพิ่มลิงก์
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...cols, { title: '', links: [''] }])}
        className="mt-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        + เพิ่มคอลัมน์
      </button>
    </div>
  )
}

const SITE_FIELDS = [
  { key: 'name', label: 'ชื่อแบรนด์', section: 'general' },
  { key: 'logoLetter', label: 'ตัวอักษรโลโก้', section: 'general' },
  { key: 'badge', label: 'ข้อความ Badge (บน Hero)', section: 'hero' },
  { key: 'heroTitle1', label: 'หัวเรื่อง Hero (ส่วนแรก)', section: 'hero' },
  { key: 'heroTitleHighlight', label: 'หัวเรื่อง Hero (ส่วนเน้น)', section: 'hero' },
  { key: 'heroSubtitle', label: 'คำอธิบาย Hero', section: 'hero', textarea: true },
  { key: 'heroHighlight1Label', label: 'ไฮไลต์ 1 (ป้าย)', section: 'hero' },
  { key: 'heroHighlight1Value', label: 'ไฮไลต์ 1 (ตัวเลข)', section: 'hero' },
  { key: 'heroHighlight2Label', label: 'ไฮไลต์ 2 (ป้าย)', section: 'hero' },
  { key: 'heroHighlight2Value', label: 'ไฮไลต์ 2 (ตัวเลข)', section: 'hero' },
  { key: 'heroCustomers', label: 'ข้อความจำนวนลูกค้า', section: 'hero' },
]

export default function SettingsEditor({ settings, reload }) {
  const [site, setSite] = useState({})
  const [contact, setContact] = useState({})
  const [cta, setCta] = useState({})
  const [flash, setFlash] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) {
      setSite(settings.site || {})
      setContact(settings.contact || {})
      setCta(settings.cta || {})
    }
  }, [settings])

  const saveSetting = async (key, value) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ key, value }, { onConflict: 'key' })
    if (error) throw error
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFlash(null)
    try {
      await Promise.all([
        saveSetting('site', site),
        saveSetting('contact', contact),
        saveSetting('cta', cta),
      ])
      setFlash({ text: 'บันทึกการตั้งค่าเรียบร้อยแล้ว' })
      if (reload) reload()
    } catch (err) {
      setFlash({ text: err.message || 'บันทึกไม่สำเร็จ', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave}>
      <Flash message={flash && flash.text} type={flash && flash.type} />
      <div className="grid gap-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            ข้อมูลทั่วไปและหน้าแรก (Hero)
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {SITE_FIELDS.map((f) => (
              <Field
                key={f.key}
                label={f.label}
                textarea={f.textarea}
                value={site[f.key]}
                onChange={(v) => setSite({ ...site, [f.key]: v })}
                className={f.section === 'hero' && !f.textarea ? 'sm:col-span-1' : undefined}
              />
            ))}
          </div>

          <div className="mt-4">
            <label className={labelClass}>จุดเด่น Hero (perks)</label>
            <LinesEditor
              value={site.heroPerks}
              onChange={(v) => setSite({ ...site, heroPerks: v })}
            />
          </div>
          <Field
            label="คำอธิบาย Hero"
            textarea
            className="mt-4"
            value={site.heroSubtitle}
            onChange={(v) => setSite({ ...site, heroSubtitle: v })}
          />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            ข้อมูลติดต่อและท้ายเว็บ
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="หัวข้อส่วนติดต่อ" value={contact.contactHeadline} onChange={(v) => setContact({ ...contact, contactHeadline: v })} />
            <Field label="อีเมลหลัก" value={(contact.emailLines || [])[0] || ''} onChange={(v) => setContact({ ...contact, emailLines: [v, (contact.emailLines || [])[1] || ''] })} />
          </div>
          <Field label="คำอธิบายส่วนติดต่อ" textarea className="mt-4" value={contact.contactIntro} onChange={(v) => setContact({ ...contact, contactIntro: v })} />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <LinesEditor label="ที่อยู่สำนักงาน" value={contact.addressLines} onChange={(v) => setContact({ ...contact, addressLines: v })} />
            <LinesEditor label="เบอร์โทร" value={contact.phoneLines} onChange={(v) => setContact({ ...contact, phoneLines: v })} />
            <LinesEditor label="อีเมล" value={contact.emailLines} onChange={(v) => setContact({ ...contact, emailLines: v })} />
            <LinesEditor label="เวลาทำการ" value={contact.hoursLines} onChange={(v) => setContact({ ...contact, hoursLines: v })} />
          </div>
          <Field label="ข้อความท้ายเว็บ (Footer)" textarea className="mt-4" value={contact.footerText} onChange={(v) => setContact({ ...contact, footerText: v })} />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            ส่วนกระตุ้นการตัดสินใจ (CTA)
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="ข้อความสั้น (Eyebrow)" value={cta.eyebrow} onChange={(v) => setCta({ ...cta, eyebrow: v })} />
            <Field label="หัวเรื่อง" value={cta.title} onChange={(v) => setCta({ ...cta, title: v })} />
            <Field label="คำอธิบาย" value={cta.subtitle} onChange={(v) => setCta({ ...cta, subtitle: v })} />
            <Field label="ปุ่มหลัก" value={cta.primaryLabel} onChange={(v) => setCta({ ...cta, primaryLabel: v })} />
            <Field label="ปุ่มรอง" value={cta.secondaryLabel} onChange={(v) => setCta({ ...cta, secondaryLabel: v })} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">คอลัมน์ท้ายเว็บ (Footer)</h3>
          <div className="mt-5">
            <FooterColumnsEditor
              value={contact.footerColumns}
              onChange={(v) => setContact({ ...contact, footerColumns: v })}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button type="button" onClick={() => { setSite({}); setContact({}); setCta({}) }} className={btnSecondary}>
            รีเซ็ตแบบฟอร์ม
          </button>
          <button type="submit" disabled={saving} className={btnPrimary}>
            <Save className="mr-1.5 inline h-4 w-4" />
            {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
          </button>
        </div>
      </div>
    </form>
  )
}
