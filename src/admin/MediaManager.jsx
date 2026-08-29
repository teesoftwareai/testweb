import { useEffect, useState } from 'react'
import { Upload, Trash2, ExternalLink, Copy, RefreshCw } from 'lucide-react'
import { supabase, getPublicUrl, STORAGE_BUCKET } from '../lib/supabase'
import { Flash, TableCard } from './adminUtils'

export default function MediaManager() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [flash, setFlash] = useState(null)

  const loadFiles = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list()
      if (error) throw error
      setFiles(data || [])
      setFlash(null)
    } catch (err) {
      setFlash({ text: err.message || 'โหลดรูปภาพไม่สำเร็จ', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const handleUpload = async (e) => {
    const fileList = e.target.files
    if (!fileList || fileList.length === 0) return
    setUploading(true)
    setFlash(null)
    try {
      for (const file of fileList) {
        const ext = file.name.split('.').pop()
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const { error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, file, { upsert: true })
        if (error) throw error
      }
      setFlash({ text: 'อัปโหลดรูปภาพเรียบร้อย' })
      loadFiles()
    } catch (err) {
      setFlash({ text: err.message || 'อัปโหลดไม่สำเร็จ', type: 'error' })
    } finally {
      setUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  const handleDelete = async (path) => {
    if (!window.confirm('ต้องการลบรูปภาพนี้?')) return
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path])
    if (error) {
      setFlash({ text: error.message, type: 'error' })
    } else {
      setFlash({ text: 'ลบรูปภาพเรียบร้อย' })
      loadFiles()
    }
  }

  const copyUrl = async (path) => {
    const url = getPublicUrl(path)
    try {
      await navigator.clipboard.writeText(url)
      setFlash({ text: 'คัดลอก URL แล้ว' })
    } catch {
      setFlash({ text: url, type: 'success' })
    }
  }

  return (
    <div>
      <Flash message={flash && flash.text} type={flash && flash.type} />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          จัดการรูปภาพใน Storage bucket <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{STORAGE_BUCKET}</code>
        </p>
        <div className="flex gap-2">
          <label className={`${'rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700'} inline-flex cursor-pointer items-center`}>
            <Upload className="mr-1.5 inline h-4 w-4" />
            อัปโหลดรูป
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={loadFiles}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700"
          >
            <RefreshCw className={`mr-1.5 inline h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            โหลดใหม่
          </button>
        </div>
      </div>

      <TableCard title="คลังรูปภาพ" description={`${files.length} ไฟล์ในคลัง`}>
        {loading ? (
          <p className="px-6 py-12 text-center text-slate-500">กำลังโหลด...</p>
        ) : files.length === 0 ? (
          <p className="px-6 py-12 text-center text-slate-400">
            ยังไม่มีรูปภาพ อัปโหลดด้วยปุ่มด้านบน
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-4">
            {files.map((f) => {
              const url = getPublicUrl(f.name)
              return (
                <div
                  key={f.name}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                  <div className="relative aspect-square bg-slate-100">
                    <img
                      src={url}
                      alt={f.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-xs font-medium text-slate-600">
                      {f.name}
                    </p>
                    <div className="mt-2 flex gap-1">
                      <button
                        onClick={() => copyUrl(f.name)}
                        title="คัดลอก URL"
                        className="flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50"
                      >
                        <Copy className="mr-1 inline h-3 w-3" />
                        URL
                      </button>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        title="เปิดรูป"
                        className="flex-1 rounded-lg px-2 py-1.5 text-center text-xs font-semibold text-slate-600 hover:bg-slate-100"
                      >
                        <ExternalLink className="mr-1 inline h-3 w-3" />
                        เปิด
                      </a>
                      <button
                        onClick={() => handleDelete(f.name)}
                        title="ลบ"
                        className="rounded-lg px-2 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </TableCard>
      {uploading && (
        <p className="mt-3 text-sm font-medium text-brand-600">กำลังอัปโหลด...</p>
      )}
    </div>
  )
}
