import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const SiteContext = createContext(null)

const TABLE_DEFAULT = {
  features: [],
  services: [],
  process_steps: [],
  stats: [],
  testimonials: [],
  logos: [],
}

const SETTING_DEFAULT = {
  site: {},
  contact: {},
  cta: {},
}

function normalizeSetting(rows) {
  const out = {}
  for (const row of rows || []) {
    const parsed =
      row && typeof row.value === 'string' ? JSON.parse(row.value) : row?.value
    out[row.key] = parsed || {}
  }
  return out
}

export function SiteProvider({ children }) {
  const [data, setData] = useState(TABLE_DEFAULT)
  const [settings, setSettings] = useState(SETTING_DEFAULT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const [
        features,
        services,
        process,
        stats,
        testimonials,
        logos,
        settingsRes,
      ] = await Promise.all([
        supabase.from('features').select('*').order('sort_order'),
        supabase.from('services').select('*').order('sort_order'),
        supabase
          .from('process_steps')
          .select('*')
          .order('sort_order'),
        supabase.from('stats').select('*').order('sort_order'),
        supabase
          .from('testimonials')
          .select('*')
          .order('sort_order'),
        supabase.from('logos').select('*').order('sort_order'),
        supabase.from('settings').select('*'),
      ])

      const isErr = (r) => r && r.error
      if (
        isErr(features) ||
        isErr(services) ||
        isErr(process) ||
        isErr(stats) ||
        isErr(testimonials) ||
        isErr(logos) ||
        isErr(settingsRes)
      ) {
        const firstErr =
          features.error ||
          services.error ||
          process.error ||
          stats.error ||
          testimonials.error ||
          logos.error ||
          settingsRes.error
        throw firstErr
      }

      setData({
        features: features.data || [],
        services: services.data || [],
        process_steps: process.data || [],
        stats: stats.data || [],
        testimonials: testimonials.data || [],
        logos: logos.data || [],
      })
      setSettings(normalizeSetting(settingsRes.data))
      setError(null)
    } catch (err) {
      console.error('Failed to load content:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const value = useMemo(
    () => ({ data, settings, settingsList: settings, loading, error, reload: load }),
    [data, settings, loading, error],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  return useContext(SiteContext)
}
