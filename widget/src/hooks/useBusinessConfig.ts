import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { BusinessConfig, CustomQuestion } from '../types'

type State =
  | { status: 'loading' }
  | { status: 'unavailable' }
  | { status: 'ready'; config: BusinessConfig }
  | { status: 'error'; message: string }

export function useBusinessConfig(businessId: string): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    if (!businessId) {
      setState({ status: 'unavailable' })
      return
    }

    let cancelled = false

    async function load() {
      const [bizRes, settingsRes, servicesRes, questionsRes] = await Promise.all([
        supabase.from('businesses').select('*').eq('id', businessId).single(),
        supabase.from('widget_settings').select('*').eq('business_id', businessId).single(),
        supabase.from('services').select('*').eq('business_id', businessId).eq('active', true).order('sort_order'),
        supabase.from('custom_questions').select('*').eq('business_id', businessId).eq('active', true).order('sort_order'),
      ])

      if (cancelled) return

      if (bizRes.error || !bizRes.data || !bizRes.data.active) {
        setState({ status: 'unavailable' })
        return
      }

      if (settingsRes.error || !settingsRes.data) {
        setState({ status: 'unavailable' })
        return
      }

      // Normalise the jsonb options field from Supabase (comes back as parsed JS already)
      const questions: CustomQuestion[] = (questionsRes.data ?? []).map((q) => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : null,
      }))

      setState({
        status: 'ready',
        config: {
          business: bizRes.data,
          settings: settingsRes.data,
          services: servicesRes.data ?? [],
          customQuestions: questions,
        },
      })
    }

    load().catch(() => {
      if (!cancelled) setState({ status: 'error', message: 'Failed to load widget config' })
    })

    return () => { cancelled = true }
  }, [businessId])

  return state
}
