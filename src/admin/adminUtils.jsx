import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      if (data.session) {
        setUser(data.session.user)
      } else {
        navigate('/admin', { replace: true })
      }
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      if (session) {
        setUser(session.user)
      } else if (!session) {
        navigate('/admin', { replace: true })
      }
      setLoading(false)
    })

    return () => {
      mounted = false
      sub?.subscription.unsubscribe()
    }
  }, [navigate])

  return { user, loading }
}

export const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none'

export const labelClass =
  'mb-1.5 block text-sm font-semibold text-slate-700'

export const btnPrimary =
  'rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60'

export const btnSecondary =
  'rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700'

export const btnDanger =
  'rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100'

export function useSupabaseData(table, orderBy = 'sort_order') {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(orderBy)
      if (error) throw error
      setRows(data || [])
      setError(null)
    } catch (err) {
      console.error(`Failed to load ${table}:`, err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  return { rows, setRows, loading, error, reload }
}

export function Flash({ message, type = 'success' }) {
  if (!message) return null
  const styles =
    type === 'error'
      ? 'bg-red-50 text-red-600 border-red-100'
      : 'bg-emerald-50 text-emerald-700 border-emerald-100'
  return (
    <div
      className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${styles}`}
    >
      {message}
    </div>
  )
}

export function TableCard({ title, description, actions, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && (
            <p className="mt-0.5 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {actions}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}

export const tableHead =
  'px-4 py-3 text-left text-xs font-bold tracking-wider text-slate-500 uppercase'
