import { createClient } from '@supabase/supabase-js'

export const dashboardSupabase = createClient(
  'https://vhslczshkcjjkzzfccge.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoc2xjenNoa2Nqamt6emZjY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjM4NjgsImV4cCI6MjA5NTk5OTg2OH0.SUgdUGSjotxvGYHr4ECTVwwVz4tdRmt9DA9rojuYzIQ',
)
