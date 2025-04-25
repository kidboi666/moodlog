import 'react-native-url-polyfill/auto'
import { supabaseConfig } from '@/configs'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  supabaseConfig,
)

AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
