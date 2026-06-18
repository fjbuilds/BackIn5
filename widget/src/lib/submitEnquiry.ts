import type { EnquiryPayload } from '../types'
import { dashboardSupabase } from './dashboardSupabase'

const INSERT_TIMEOUT_MS = 12_000
const MAX_ATTEMPTS = 3
const RETRY_BACKOFF_MS = 800

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ enquiry_id: string }> {
  if (!payload.dashboard_trade_id) {
    throw new Error('Submission misconfigured: missing dashboard_trade_id on business')
  }
  if (!payload.customer_name && !payload.phone) {
    throw new Error('Submission missing both customer name and phone')
  }

  const status = payload.appointment_datetime ? 'Booked' : 'Needs Action'

  const row: Record<string, unknown> = {
    trade_id: payload.dashboard_trade_id,
    source: 'Website Widget',
    status,
  }

  if (payload.customer_name)        row.customer_name = payload.customer_name
  if (payload.phone)                row.phone = payload.phone
  if (payload.email)                row.email = payload.email
  if (payload.postcode)             row.postcode = payload.postcode
  if (payload.service_requested)    row.service_requested = payload.service_requested
  if (payload.action_tag)           row.action_tag = payload.action_tag
  if (payload.appointment_datetime) row.appointment_datetime = payload.appointment_datetime
  if (payload.town)                 row.town = payload.town
  if (payload.urgency)              row.urgency = payload.urgency
  if (payload.preferred_contact_time)  row.preferred_contact_time = payload.preferred_contact_time
  if (payload.enquiry_intent)       row.enquiry_intent = payload.enquiry_intent
  if (payload.booking_requested !== undefined) row.booking_requested = payload.booking_requested
  if (payload.booking_type)         row.booking_type = payload.booking_type
  if (payload.job_description)      row.job_description = payload.job_description
  if (payload.media_url)            row.media_url = payload.media_url
  if (payload.custom_answers && payload.custom_answers.length > 0) {
    row.custom_answers = payload.custom_answers
  }

  row.raw_payload = payload

  const insertedId = await insertWithRetry(row)
  return { enquiry_id: insertedId }
}

async function insertWithRetry(row: Record<string, unknown>): Promise<string> {
  let lastError: unknown = null

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const id = await insertOnce(row)
      if (attempt > 1) console.info(`[BackIn5] Enquiry submitted on retry ${attempt}`)
      return id
    } catch (err) {
      lastError = err
      const isTransient = isTransientError(err)
      console.warn(`[BackIn5] Submit attempt ${attempt} failed`, { transient: isTransient, err })
      if (!isTransient || attempt === MAX_ATTEMPTS) break
      await wait(RETRY_BACKOFF_MS * attempt)
    }
  }

  console.error('[BackIn5] Enquiry submit failed after retries', lastError)
  throw lastError instanceof Error ? lastError : new Error('Submission failed')
}

async function insertOnce(row: Record<string, unknown>): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), INSERT_TIMEOUT_MS)
  try {
    const { data, error } = await dashboardSupabase
      .from('enquiries')
      .insert(row)
      .select('id')
      .single()
      .abortSignal(controller.signal)
    if (error) throw error
    if (!data?.id) throw new Error('Insert returned no id')
    return String(data.id)
  } finally {
    clearTimeout(timer)
  }
}

function isTransientError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false
  const e = err as { name?: string; message?: string; code?: string; status?: number }
  if (e.name === 'AbortError') return true
  if (typeof e.status === 'number' && e.status >= 500) return true
  if (typeof e.message === 'string') {
    const m = e.message.toLowerCase()
    if (m.includes('network') || m.includes('failed to fetch') || m.includes('timeout')) return true
  }
  // PostgREST codes: 42501 = RLS denial (NOT transient), 23505 = unique violation (NOT transient)
  return false
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
