import { Mail } from 'lucide-react'

const Facebook = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
    {...props}
  >
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
  </svg>
)

const Instagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
  </svg>
)

const XIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
    {...props}
  >
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
  </svg>
)

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
    {...props}
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const columns = [
  {
    title: 'บริการ',
    links: [
      'ที่ปรึกษาธุรกิจ',
      'ออกแบบแบรนด์',
      'พัฒนาเว็บไซต์',
      'การตลาดดิจิทัล',
      'วิเคราะห์ข้อมูล',
    ],
  },
  {
    title: 'บริษัท',
    links: ['เกี่ยวกับเรา', 'ทีมงาน', 'ผลงาน', 'บล็อก', 'ร่วมงานกับเรา'],
  },
  {
    title: 'สนับสนุน',
    links: ['ศูนย์ช่วยเหลือ', 'เอกสาร', 'นโยบายความเป็นส่วนตัว', 'ข้อกำหนดการใช้งาน'],
  },
]

const socials = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: XIcon, label: 'Twitter/X' },
  { icon: Linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-lg font-bold text-white">
                B
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                Brightly
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              โซลูชันครบวงจรสำหรับธุรกิจยุคใหม่
              ช่วยให้คุณเติบโตอย่างยั่งยืนด้วยทีมผู้เชี่ยวชาญและเทคโนโลยีที่ทันสมัย
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#home"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-all hover:bg-brand-600 hover:text-white"
                >
                  <social.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#home"
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} Brightly Co., Ltd. สงวนลิขสิทธิ์
          </p>
          <a
            href="mailto:hello@brightly.co.th"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4" />
            hello@brightly.co.th
          </a>
        </div>
      </div>
    </footer>
  )
}