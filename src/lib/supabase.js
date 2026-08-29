import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cbfbckrnhllgjpxtanvs.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mKWA9wgVtswNbp_qnqNyeA_KxT6dWIf'

export const STORAGE_BUCKET = 'images'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getPublicUrl = (path) =>
  path
    ? `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`
    : null
