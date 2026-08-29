import { useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, X, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import {
  Flash,
  useSupabaseData,
  inputClass,
  labelClass,
  btnPrimary,
  btnSecondary,
  TableCard,
  tableHead,
} from './adminUtils'
import { iconMap } from '../lib/content'
import { getPublicUrl, STORAGE_BUCKET } from '../lib/supabase'

export const ICON_OPTIONS = Object.keys(iconMap)

function FieldRow({ label, children }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  )
}

function EditorForm({
  columns,
  initial,
  onSave,
  onCancel,
  title,
  saving,
}) {
  const [form, setForm] = useState(initial)
  const set = (key, v) => setForm((f) => ({ ...f, [key]: v }))

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button onClick={onCancel} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(form)
          }}
          className="mt-5 space-y-4"
        >
          {columns.map((col) => (
            <FieldRow key={col.key} label={col.label}>
              {col.type === 'textarea' ? (
                <textarea
                  rows={col.rows || 3}
                  value={form[col.key] || ''}
                  onChange={(e) => set(col.key, e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              ) : col.type === 'select' ? (
                <select
                  value={form[col.key] || ''}
                  onChange={(e) => set(col.key, e.target.value)}
                  className={inputClass}
                >
                  <option value="">(ไม่ระบุ)</option>
                  {col.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : col.type === 'image' ? (
                <ImageUploadEditor
                  value={form[col.key]}
                  onChange={(v) => set(col.key, v)}
                />
              ) : (
                <input
                  type="text"
                  value={form[col.key] ?? ''}
                  onChange={(e) => set(col.key, e.target.value)}
                  className={inputClass}
                />
              )}
            </FieldRow>
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className={btnSecondary}>
              ยกเลิก
            </button>
            <button type="submit" disabled={saving} className={btnPrimary}>
              <Save className="mr-1.5 inline h-4 w-4" />
              {saving ? 'กำลังบันทึก...' : 'บันทึก'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ImageUploadEditor({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setMessage(null)
    try {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { upsert: true })
      if (error) throw error
      onChange(path)
      setMessage({ text: 'อัปโหลดรูปภาพสำเร็จ', type: 'success' })
    } catch (err) {
      setMessage({ text: err.message || 'อัปโหลดไม่สำเร็จ', type: 'error' })
    } finally {
      setUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={getPublicUrl(value)}
            alt=""
            className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
            รูป
          </div>
        )}
        <div className="flex-1 space-y-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-700"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs font-semibold text-red-500 hover:text-red-600"
            >
              ลบรูปภาพ
            </button>
          )}
        </div>
      </div>
      {uploading && <p className="mt-2 text-xs text-slate-500">กำลังอัปโหลด...</p>}
      {message && (
        <p
          className={`mt-2 text-xs font-medium ${
            message.type === 'error' ? 'text-red-500' : 'text-emerald-600'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}

export default function ListEditor({ table, title, description, columns, iconColumn }) {
  const { rows, setRows, loading, reload } = useSupabaseData(table)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [flash, setFlash] = useState(null)

  const emptyRow = () => {
    const row = {}
    for (const col of columns) {
      if (col.key === 'sort_order' || col.key === 'step_number') {
        row[col.key] = rows.length + 1
      } else {
        row[col.key] = col.type === 'textarea' ? '' : col.defaultValue ?? ''
      }
    }
    return row
  }

  const handleSave = async (form) => {
    setSaving(true)
    setFlash(null)
    try {
      if (form.id) {
        const { id: _id, created_at: _ca, ...payload } = form
        const { error } = await supabase.from(table).update(payload).eq('id', form.id)
        if (error) throw error
        setFlash({ text: 'บันทึกการแก้ไขเรียบร้อย' })
      } else {
        const { id: _id, created_at: _ca, ...payload } = form
        const { error } = await supabase.from(table).insert(payload)
        if (error) throw error
        setFlash({ text: 'เพิ่มรายการเรียบร้อย' })
      }
      setEditing(null)
      reload()
    } catch (err) {
      setFlash({ text: err.message || 'บันทึกไม่สำเร็จ', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('ต้องการลบรายการนี้? (การกระทำนี้ไม่สามารถย้อนกลับได้)')) return
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) {
      setFlash({ text: error.message, type: 'error' })
    } else {
      setFlash({ text: 'ลบรายการเรียบร้อย' })
      reload()
    }
  }

  const move = async (index, dir) => {
    const target = index + dir
    if (target < 0 || target >= rows.length) return
    const next = [...rows]
    const a = next[index]
    const b = next[target]
    next[index] = { ...b, sort_order: a.sort_order }
    next[target] = { ...a, sort_order: b.sort_order }
    setRows(next)
    await supabase.from(table).update({ sort_order: a.sort_order }).eq('id', b.id)
    await supabase.from(table).update({ sort_order: b.sort_order }).eq('id', a.id)
  }

  if (loading) {
    return <p className="py-10 text-center text-slate-500">กำลังโหลด...</p>
  }

  return (
    <div>
      <Flash message={flash && flash.text} type={flash && flash.type} />
      <TableCard
        title={title}
        description={description}
        actions={
          <button
            onClick={() => setEditing(emptyRow())}
            className={btnPrimary}
          >
            <Plus className="mr-1.5 inline h-4 w-4" />
            เพิ่มรายการ
          </button>
        }
      >
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className={tableHead}>ลำดับ</th>
              {columns.map((col) => (
                <th key={col.key} className={tableHead}>
                  {col.label}
                </th>
              ))}
              <th className={`${tableHead} text-right`}>จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => (
              <tr key={row.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => move(idx, 1)}
                      disabled={idx === rows.length - 1}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.key === 'sort_order' || col.key === 'step_number' ? (
                      <span className="text-sm font-semibold text-slate-700">
                        {col.key === 'step_number' ? String(row[col.key] || '').padStart(2, '0') : row[col.key]}
                      </span>
                    ) : col.type === 'image' ? (
                      row[col.key] ? (
                        <img
                          src={getPublicUrl(row[col.key])}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200"
                        />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )
                    ) : iconColumn && col.key === iconColumn && row[col.key] ? (
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                        {(() => {
                          const Icon = iconMap[row[col.key]]
                          return Icon ? <Icon className="h-4.5 w-4.5" /> : null
                        })()}
                      </span>
                    ) : (
                      <span className="max-w-[280px] truncate text-sm text-slate-700">
                        {row[col.key] || <span className="text-slate-300">—</span>}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => setEditing(row)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-600"
                      title="แก้ไข"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      title="ลบ"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-10 text-center text-slate-400">
                  ยังไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableCard>

      {editing && (
        <EditorForm
          title={editing.id ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}
          columns={columns}
          initial={editing}
          saving={saving}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
