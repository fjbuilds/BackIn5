import type { EnquiryPayload } from '../types'
import { dashboardSupabase } from './dashboardSupabase'

const functionUrl = process.env.VITE_SUPABASE_FUNCTION_URL ?? ''
const anonKey = process.env.VITE_SUPABASE_ANON_KEY ?? ''

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ enquiry_id: string }> {
  // Step 1 — save to widget Supabase via Edge Function
  const res = await fetch(`${functionUrl}/submit-enquiry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    // Edge Function errors are non-fatal — dashboard insert is the primary target
    console.warn('Edge Function error:', res.status)
  }

  // Step 2 — save directly to dashboard Supabase
  await saveToDashboard(payload)

  return { enquiry_id: 'submitted' }
}

async function saveToDashboard(payload: EnquiryPayload): Promise<void> {
  if (!payload.dashboard_trade_id) return

  const row: Record<string, unknown> = {
    trade_id: payload.dashboard_trade_id,
    source: 'Website Widget',
    status: 'Needs Action',
  }

  if (payload.customer_name)       row.customer_name = payload.customer_name
  if (payload.phone)               row.phone = payload.phone
  if (payload.email)               row.email = payload.email
  if (payload.postcode)            row.postcode = payload.postcode
  if (payload.town)                row.area = payload.town
  if (payload.service_requested)   row.service_requested = payload.service_requested
  if (payload.action_tag)          row.action_tag = payload.action_tag
  if (payload.preferred_contact_time) row.next_action = payload.preferred_contact_time
  if (payload.media_url)           row.media_url = payload.media_url
  if (payload.appointment_datetime) row.appointment_datetime = payload.appointment_datetime

  const parts: string[] = []
  if (payload.urgency)         parts.push(`Urgency: ${payload.urgency}`)
  if (payload.booking_type)    parts.push(`Booking type: ${payload.booking_type}`)
  if (payload.appointment_datetime) parts.push(`Requested appointment: ${payload.appointment_datetime}`)
  if (payload.job_description) parts.push(payload.job_description)
  if (payload.custom_answers && payload.custom_answers.length > 0) {
    payload.custom_answers.forEach(a => parts.push(`${a.question_text}: ${a.answer}`))
  }
  if (parts.length > 0) row.job_description = parts.join('\n')

  // Store full payload for reference
  row.raw_payload = payload

  const { error } = await dashboardSupabase.from('enquiries').insert(row)

  if (error) {
    console.error('Dashboard Supabase insert failed:', error)
  }
}
