import { createClient } from '@supabase/supabase-js'
import { user } from '../store/store'

//supabase client anon key
export const supabase = createClient(
  'https://nqentpigleqsnyxdnmov.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZW50cGlnbGVxc255eGRubW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjkyNjEsImV4cCI6MjA3NTM0NTI2MX0.FbQZgE8IwRYD-tGIDOhCgcZe2BeQlJ0109KKF410KxQ',
  { auth: { autoRefreshToken: true, persistSession: true } },
)

// check session storage for user
export const userSessionCheck = async () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      // Session found (either after login or from persistence)
      console.log('Auth State Change: Logged in.', event)
      user.value = session.user
      console.log(user.value)
    } else {
      // Session expired, logged out, or no session found
      console.log('Auth State Change: Logged out.', event)
      user.value = null
    }
  })
}

export const checkSession = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) console.log(error)

  console.log(data)
}
