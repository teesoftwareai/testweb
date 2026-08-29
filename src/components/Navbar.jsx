import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useSite } from '../context/SiteContext'
import { DEFAULT_SETTINGS } from '../lib/content'

const links = [
  { label: 'หน้าแรก', href: '#home' },
  { label: 'เกี่ยวกับเรา', href: '#about' },
  { label: 'บริการ', href: '#services' },
  { label: 'ผลงาน', href: '#testimonials' },
  { label: 'ติดต่อเรา', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { settings } = useSite()
  const site = { ...DEFAULT_SETTINGS.site, ...(settings?.site || {}) }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/85 shadow-lg shadow-slate-900/5 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-brand-500/30">
            {site.logoLetter || 'B'}
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            {site.name || 'Brightly'}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            เข้าสู่ระบบ
          </a>
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/40"
          >
            เริ่มใช้งานฟรี
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-label="เมนู"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-600/30"
            >
              เริ่มใช้งานฟรี
            </a>
          </div>
        </div>
      )}
    </header>
  )
}