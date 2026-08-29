import { useState } from 'react'
import { Mail, Phone, Trash2, Inbox } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Flash, useSupabaseData, TableCard } from './adminUtils'
import Swal from 'sweetalert2'

export default function Messages() {
  const { rows, setRows, loading, reload } = useSupabaseData('messages', 'created_at')
  const [flash, setFlash] = useState(null)

  const toggleRead = async (msg) => {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: !msg.is_read })
      .eq('id', msg.id)
    if (error) {
      setFlash({ text: error.message, type: 'error' })
    } else {
      setRows((r) =>
        r.map((m) => (m.id === msg.id ? { ...m, is_read: !msg.is_read } : m)),
      )
    }
  }

  const remove = async (id) => {
    const confirm = await Swal.fire({
      title: 'ต้องการลบข้อความนี้?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    })
    if (!confirm.isConfirmed) return
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) {
      setFlash({ text: error.message, type: 'error' })
    } else {
      setFlash({ text: 'ลบข้อความเรียบร้อย' })
      reload()
    }
  }

  if (loading) return <p className="py-10 text-center text-slate-500">กำลังโหลด...</p>

  const unread = rows.filter((m) => !m.is_read).length

  return (
    <div>
      <Flash message={flash && flash.text} type={flash && flash.type} />
      <TableCard
        title="ข้อความจากแบบฟอร์มติดต่อ"
        description={`ข้อความที่ยังไม่ได้อ่าน: ${unread} ฉบับ`}
      >
        <div className="divide-y divide-slate-100">
          {rows.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-start sm:justify-between ${
                !m.is_read ? 'bg-brand-50/40' : ''
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{m.name}</span>
                  {!m.is_read && (
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      ยังไม่อ่าน
                    </span>
                  )}
                  <span className="text-xs text-slate-400">
                    {new Date(m.created_at).toLocaleString('th-TH')}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> {m.email}
                  </span>
                  {m.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> {m.phone}
                    </span>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                  {m.message}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => toggleRead(m)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {m.is_read ? 'ทำเครื่องหมายยังไม่อ่าน' : 'ทำเครื่องหมายว่าอ่านแล้ว'}
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-6 py-14 text-slate-400">
              <Inbox className="h-8 w-8" />
              <p className="text-sm">ยังไม่มีข้อความ</p>
            </div>
          )}
        </div>
      </TableCard>
    </div>
  )
}
