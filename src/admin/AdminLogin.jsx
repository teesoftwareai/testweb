import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { supabase } from '../lib/supabase'

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pl-11 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none'

export default function AdminLogin() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/adm', { replace: true })
    })
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      if (mode === 'signin') {
        const { data, error: authErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (authErr) throw authErr
        if (data.session) navigate('/adm', { replace: true })
      } else {
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
        })
        if (signUpErr) throw signUpErr
        if (data.session) {
          navigate('/adm', { replace: true })
        } else {
          setMessage(
            'สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีก่อนเข้าสู่ระบบ',
          )
          setMode('signin')
        }
      }
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-700 via-brand-600 to-violet-700 px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 flex items-center justify-center gap-2.5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-brand-700 shadow-lg">
            B
          </span>
          <span className="text-2xl font-bold text-white">Brightly Admin</span>
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-600">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
            {mode === 'signin' ? 'เข้าสู่ระบบหลังบ้าน' : 'สมัครบัญชีผู้ดูแล'}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {mode === 'signin'
              ? 'จัดการเนื้อหาเว็บไซต์ของคุณทั้งหมดจากที่นี่'
              : 'สร้างบัญชีเพื่อเริ่มจัดการเนื้อหาเว็บไซต์'}
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="อีเมลของคุณ"
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:text-slate-600"
                aria-label="แสดง/ซ่อนรหัสผ่าน"
              >
                {showPass ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {message && (
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {message}
              </p>
            )}
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'กำลังดำเนินการ...'
                : mode === 'signin'
                  ? 'เข้าสู่ระบบ'
                  : 'สมัครสมาชิก'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            {mode === 'signin' ? (
              <>
                ยังไม่มีบัญชี?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup')
                    setError(null)
                    setMessage(null)
                  }}
                  className="font-semibold text-brand-600 hover:text-brand-700"
                >
                  สมัครสมาชิกที่นี่
                </button>
              </>
            ) : (
              <>
                มีบัญชีแล้ว?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin')
                    setError(null)
                    setMessage(null)
                  }}
                  className="font-semibold text-brand-600 hover:text-brand-700"
                >
                  เข้าสู่ระบบ
                </button>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-brand-100">
          <Link to="/" className="hover:text-white">
            ← กลับไปหน้าเว็บไซต์
          </Link>
        </p>
      </div>
    </div>
  )
}
