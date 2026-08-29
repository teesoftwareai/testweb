import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const STORAGE_BUCKET = 'images'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getPublicUrl = (path) =>
  path
    ? `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`
    : null
