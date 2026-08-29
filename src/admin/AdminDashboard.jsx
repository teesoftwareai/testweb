import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Home,
  Star,
  List,
  Layers,
  BarChart3,
  MessageSquare,
  LogOut,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from './adminUtils'
import SettingsEditor from './SettingsEditor'
import ListEditor from './ListEditor'
import Messages from './Messages'
import MediaManager from './MediaManager'
import { ICON_OPTIONS } from './ListEditor'

const FEATURE_COLUMNS = [
  { key: 'icon', label: 'ไอคอน', type: 'select', options: ICON_OPTIONS },
  { key: 'title', label: 'หัวข้อ' },
  { key: 'description', label: 'คำอธิบาย', type: 'textarea' },
  { key: 'sort_order', label: 'ลำดับ' },
]

const SERVICE_COLUMNS = [
  { key: 'icon', label: 'ไอคอน', type: 'select', options: ICON_OPTIONS },
  { key: 'title', label: 'หัวข้อ' },
  { key: 'description', label: 'คำอธิบาย', type: 'textarea' },
  { key: 'tag', label: 'ป้าย (tag)' },
]

const PROCESS_COLUMNS = [
  { key: 'step_number', label: 'ขั้นที่' },
  { key: 'icon', label: 'ไอคอน', type: 'select', options: ICON_OPTIONS },
  { key: 'title', label: 'หัวข้อ' },
  { key: 'description', label: 'คำอธิบาย', type: 'textarea' },
]

const STAT_COLUMNS = [
  { key: 'value', label: 'ตัวเลข' },
  { key: 'label', label: 'ป้ายกำกับ' },
]

const TESTIMONIAL_COLUMNS = [
  { key: 'quote', label: 'ข้อความรีวิว', type: 'textarea', rows: 4 },
  { key: 'name', label: 'ชื่อ' },
  { key: 'role', label: 'ตำแหน่ง/บริษัท' },
  { key: 'avatar_url', label: 'รูปโปรไฟล์', type: 'image' },
  { key: 'initials', label: 'อักษรย่อ' },
  { key: 'color', label: 'สีพื้นหลัง (gradient)' },
]

const LOGO_COLUMNS = [{ key: 'name', label: 'ชื่อแบรนด์' }]

const sections = [
  { id: 'settings', label: 'ตั้งค่าหน้าเว็บ', icon: Home, component: 'settings' },
  { id: 'features', label: 'เหตุผลที่เลือกเรา', icon: Star, component: 'list' },
  { id: 'services', label: 'บริการของเรา', icon: Layers, component: 'list' },
  { id: 'process', label: 'วิธีทำงาน', icon: List, component: 'list' },
  { id: 'stats', label: 'สถิติ', icon: BarChart3, component: 'list' },
  { id: 'testimonials', label: 'รีวิวลูกค้า', icon: Star, component: 'list' },
  { id: 'logos', label: 'โลโก้แบรนด์', icon: LayoutDashboard, component: 'list' },
  { id: 'media', label: 'รูปภาพ (Media)', icon: ImageIcon, component: 'media' },
  { id: 'messages', label: 'ข้อความติดต่อ', icon: MessageSquare, component: 'messages', badge: true },
]

const LIST_CONFIG = {
  features: { title: 'เหตุผลที่เลือกเรา', description: 'จัดการหัวข้อ "ทำไมต้องเรา"', columns: FEATURE_COLUMNS, iconColumn: 'icon' },
  services: { title: 'บริการของเรา', description: 'จัดการบริการทั้งหมด', columns: SERVICE_COLUMNS, iconColumn: 'icon' },
  process: { title: 'วิธีทำงาน (Process)', description: 'จัดการขั้นตอนการทำงาน', columns: PROCESS_COLUMNS, iconColumn: 'icon', table: 'process_steps' },
  stats: { title: 'สถิติ', description: 'จัดการตัวเลขสถิติ', columns: STAT_COLUMNS, iconColumn: null },
  testimonials: { title: 'รีวิวลูกค้า', description: 'จัดการความประทับใจของลูกค้า', columns: TESTIMONIAL_COLUMNS, iconColumn: null },
  logos: { title: 'โลโก้แบรนด์ลูกค้า', description: 'จัดการแบรนด์ในแถบโลโก้', columns: LOGO_COLUMNS, iconColumn: null },
}

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const [active, setActive] = useState('settings')
  const [settings, setSettings] = useState(null)
  const [unread, setUnread] = useState(0)
  const navigate = useNavigate()

  const loadSettings = async () => {
    const { data, error } = await supabase.from('settings').select('*')
    if (error) return
    const out = {}
    for (const row of data || []) {
      const v =
        typeof row.value === 'string' ? JSON.parse(row.value) : row.value
      out[row.key] = v || {}
    }
    setSettings(out)
  }

  const loadUnread = async () => {
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
    setUnread(count || 0)
  }

  useEffect(() => {
    if (!loading && user) {
      loadSettings()
      loadUnread()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/admin', { replace: true })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">กำลังโหลด...</p>
      </div>
    )
  }

  const renderSection = () => {
    if (active === 'settings') {
      return <SettingsEditor settings={settings} reload={loadSettings} />
    }
    if (active === 'media') {
      return <MediaManager />
    }
    if (active === 'messages') {
      return <Messages onChanged={loadUnread} />
    }
    const conf = LIST_CONFIG[active]
    return (
      <ListEditor
        key={active}
        table={conf.table || active}
        title={conf.title}
        description={conf.description}
        columns={conf.columns}
        iconColumn={conf.iconColumn}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="flex">
        <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-slate-950 text-slate-300">
          <div className="flex items-center gap-2.5 px-6 py-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-lg font-bold text-white">
              B
            </span>
            <div>
              <p className="text-sm font-bold text-white">Brightly</p>
              <p className="text-xs text-slate-400">ระบบจัดการหลังบ้าน</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActive(sec.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === sec.id
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <sec.icon className="h-4.5 w-4.5" />
                <span className="flex-1 text-left">{sec.label}</span>
                {sec.badge && unread > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/20 text-xs font-bold text-brand-300 uppercase">
                {(user?.email || 'A')[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.email}
                </p>
                <p className="text-xs text-slate-500">ผู้ดูแลระบบ</p>
              </div>
              <button
                onClick={logout}
                title="ออกจากระบบ"
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </aside>

        <main className="ml-64 flex-1 px-8 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {sections.find((s) => s.id === active)?.label}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                จัดการเนื้อหาเว็บไซต์แบบเรียลไทม์
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              ดูหน้าเว็บ ↗
            </a>
          </div>
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
