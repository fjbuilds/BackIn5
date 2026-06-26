import { useCallback, useRef, useState } from 'react'
import type { BusinessConfig, ChatMessage, FlowAnswers, FlowStepId } from '../types'
import { validateEmail, validatePhone, validateRequired } from '../lib/validation'
import { submitEnquiry } from '../lib/submitEnquiry'
import { dashboardSupabase } from '../lib/dashboardSupabase'

let msgCounter = 0
function makeId() { return `m-${++msgCounter}` }
function botMsg(text: string): ChatMessage { return { id: makeId(), role: 'bot', text } }
function userMsg(text: string): ChatMessage { return { id: makeId(), role: 'user', text } }

const URGENCY_OPTIONS = ['Urgent / emergency', 'As soon as possible', 'This week', 'Flexible']

const FOLLOW_UP_CALLBACK = '📞 Callback'
const FOLLOW_UP_BOOK = '📅 Book a site visit'
const FOLLOW_UP_OPTIONS = [FOLLOW_UP_CALLBACK, FOLLOW_UP_BOOK]

const CALLBACK_TIME_OPTIONS = [
  'Morning (9am–12pm)',
  'Afternoon (12pm–5pm)',
  'Evening (5pm–8pm)',
  'ASAP / Anytime',
]

export type InputMode =
  | { type: 'text'; placeholder: string; optional?: boolean }
  | { type: 'options'; options: string[] }
  | { type: 'yes_no' }
  | { type: 'multi_choice'; options: string[]; selected: string[] }
  | { type: 'dropdown'; options: string[] }
  | { type: 'continue' }
  | { type: 'photo_choice' }
  | { type: 'file_upload' }
  | { type: 'name_split' }
  | { type: 'calendar' }
  | { type: 'none' }

export function useChat(config: BusinessConfig) {
  const { business, settings, services, customQuestions } = config
  const primaryColour = settings.primary_colour ?? business.primary_colour

  const answersRef = useRef<FlowAnswers>({ custom_answers: [] })
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [step, setStep] = useState<FlowStepId>('service')
  const [isTyping, setIsTyping] = useState(false)
  const [inputError, setInputError] = useState<string | null>(null)
  const [multiSelected, setMultiSelected] = useState<string[]>([])
  const initialised = useRef(false)

  const serviceOptions = [...services.map(s => s.service_name), 'Other / Not sure']

  function buildInputMode(s: FlowStepId): InputMode {
    if (s === 'service')          return { type: 'options', options: serviceOptions }
    if (s === 'service_other')    return { type: 'text', placeholder: 'A line or two is fine...' }
    if (s === 'job_description')  return { type: 'text', placeholder: 'A line or two is fine...' }
    if (s === 'postcode')         return { type: 'text', placeholder: 'e.g. SW1A 1AA' }
    if (s === 'urgency')          return { type: 'options', options: URGENCY_OPTIONS }
    if (s === 'photo')            return { type: 'photo_choice' }
    if (s === 'photo_upload')     return { type: 'file_upload' }
    if (s.startsWith('custom_')) {
      const idx = parseInt(s.split('_')[1], 10)
      const q = customQuestions[idx]
      if (!q) return { type: 'text', placeholder: 'Type your answer...' }
      if (q.question_type === 'yes_no')        return { type: 'yes_no' }
      if (q.question_type === 'single_choice') return { type: 'options', options: q.options ?? [] }
      if (q.question_type === 'multi_choice')  return { type: 'multi_choice', options: q.options ?? [], selected: multiSelected }
      if (q.question_type === 'dropdown')      return { type: 'dropdown', options: q.options ?? [] }
      return { type: 'text', placeholder: 'Type your answer...' }
    }
    if (s === 'name')  return { type: 'name_split' }
    if (s === 'phone') return { type: 'text', placeholder: 'e.g. 07700 900000' }
    if (s === 'email') return { type: 'text', placeholder: 'e.g. you@example.com', optional: true }
    if (s === 'enquiry_intent') return { type: 'options', options: FOLLOW_UP_OPTIONS }
    if (s === 'preferred_contact_time') return { type: 'options', options: CALLBACK_TIME_OPTIONS }
    // TODO: real per-trade calendar integration (Google / Outlook). Static slots for now.
    if (s === 'calendar')       return { type: 'calendar' }
    return { type: 'none' }
  }

  const inputMode = buildInputMode(step)

  function appendMessage(msg: ChatMessage) {
    setMessages(prev => [...prev, msg])
  }

  function queueBotMessage(text: string, afterMs = 400): Promise<void> {
    return new Promise(resolve => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        appendMessage(botMsg(text))
        resolve()
      }, afterMs)
    })
  }

  function botQuestion(s: FlowStepId): string {
    if (s === 'service')          return 'What do you need help with?'
    if (s === 'service_other')    return "What's the job?"
    if (s === 'job_description')  return 'Tell us a bit about the job.'
    if (s === 'postcode')         return "What's the postcode?"
    if (s === 'urgency')          return 'How soon do you need it?'
    if (s === 'photo')            return 'Any photos or videos that would help?'
    if (s === 'photo_upload')     return 'Pick a photo or video to upload.'
    if (s.startsWith('custom_')) {
      const idx = parseInt(s.split('_')[1], 10)
      return customQuestions[idx]?.question_text ?? ''
    }
    if (s === 'name')  return "What's your name?"
    if (s === 'phone') return 'Best number to reach you on?'
    if (s === 'email') return 'And your email? (optional)'
    if (s === 'enquiry_intent') return 'How would you like us to follow up?'
    if (s === 'preferred_contact_time') return 'When suits you best for a call?'
    if (s === 'calendar')       return 'Pick a time that suits you — these are live available slots.'
    return ''
  }

  function firstCustomStep(): FlowStepId {
    return customQuestions.length > 0 ? 'custom_0' : 'photo'
  }

  function nextStep(current: FlowStepId): FlowStepId {
    if (current === 'service')        return 'job_description'
    if (current === 'service_other')  return 'job_description'
    if (current === 'job_description') return firstCustomStep()
    if (current.startsWith('custom_')) {
      const idx = parseInt(current.split('_')[1], 10)
      const next = idx + 1
      return next < customQuestions.length ? `custom_${next}` as FlowStepId : 'photo'
    }
    if (current === 'photo')          return 'postcode'
    if (current === 'photo_upload')   return 'postcode'
    if (current === 'postcode')       return 'urgency'
    if (current === 'urgency')        return 'name'
    if (current === 'name')           return 'phone'
    if (current === 'phone')          return 'email'
    if (current === 'email')          return 'enquiry_intent'
    if (current === 'calendar')       return 'submitting'
    return 'done'
  }

  async function advanceTo(next: FlowStepId) {
    if (next === 'submitting') { setStep('submitting'); await doSubmit(); return }
    const question = botQuestion(next)
    if (question) await queueBotMessage(question)
    setStep(next)
    setMultiSelected([])
  }

  async function doSubmit() {
    await queueBotMessage('Sending this over...', 300)
    const a = answersRef.current
    const fullName = [a.first_name, a.last_name].filter(Boolean).join(' ')
    try {
      await submitEnquiry({
        business_id: business.id,
        dashboard_trade_id: business.dashboard_trade_id,
        customer_name: fullName,
        phone: a.phone ?? '',
        email: a.email,
        postcode: a.postcode ?? '',
        town: a.town,
        service_requested: a.service_requested ?? '',
        urgency: a.urgency,
        enquiry_intent: a.enquiry_intent,
        action_tag: a.action_tag,
        booking_requested: a.booking_requested,
        booking_type: a.booking_type,
        appointment_datetime: a.appointment_datetime,
        job_description: a.job_description,
        preferred_contact_time: a.preferred_contact_time,
        media_url: a.media_url,
        custom_answers: a.custom_answers,
      })
      await queueBotMessage(
        settings.confirmation_message ?? "Thanks, that's all sent across. The team will be in touch shortly.",
        600,
      )
      setStep('done')
    } catch {
      await queueBotMessage('Something went wrong. Please try again or call us directly.', 400)
      setStep('error')
    }
  }

  const start = useCallback(async () => {
    if (initialised.current) return
    initialised.current = true
    const welcome = settings.welcome_message
      ?? `Hi, thanks for getting in touch with ${business.business_name}. Just a few quick questions so the team has what they need.`
    await queueBotMessage(welcome, 600)
    await advanceTo('service')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validateStep(s: FlowStepId, value: string): string | null {
    if (s === 'phone')             return validatePhone(value)
    if (s === 'email')             return value.trim() ? validateEmail(value) : null
    if (s === 'service_other')     return validateRequired(value, 'description')
    if (s === 'job_description')   return validateRequired(value, 'description')
    if (s === 'postcode')          return validateRequired(value, 'postcode')
    return null
  }

  async function submitAnswer(rawValue: string, displayLabel?: string) {
    setInputError(null)
    const label = displayLabel ?? rawValue
    const a = answersRef.current

    const isOptional = step === 'email'
    if (isOptional && !rawValue.trim()) {
      appendMessage(userMsg('Skip'))
      await advanceTo(nextStep(step))
      return
    }

    const err = validateStep(step, rawValue)
    if (err) { setInputError(err); return }

    appendMessage(userMsg(label))

    if (step === 'service') {
      if (rawValue === 'Other / Not sure') {
        a.service_requested = 'Other / Not sure'
        await advanceTo('service_other')
        return
      }
      a.service_requested = rawValue
    } else if (step === 'service_other') {
      a.service_requested = rawValue
    } else if (step === 'job_description') {
      a.job_description = rawValue
    } else if (step === 'postcode') {
      a.postcode = rawValue
    } else if (step === 'urgency') {
      a.urgency = rawValue
    } else if (step.startsWith('custom_')) {
      const idx = parseInt(step.split('_')[1], 10)
      const q = customQuestions[idx]
      a.custom_answers.push({ question_text: q.question_text, answer: rawValue, question_type: q.question_type })
    } else if (step === 'phone') {
      a.phone = rawValue
    } else if (step === 'email') {
      a.email = rawValue
    } else if (step === 'enquiry_intent') {
      if (rawValue === FOLLOW_UP_CALLBACK) {
        a.enquiry_intent = 'Callback'
        a.action_tag = 'Call Back'
        a.booking_requested = false
        await advanceTo('preferred_contact_time')
        return
      }
      if (rawValue === FOLLOW_UP_BOOK) {
        a.enquiry_intent = 'Book site visit'
        a.action_tag = 'Visit Booked'
        a.booking_type = 'Site visit'
        a.booking_requested = true
        await advanceTo('calendar')
        return
      }
    } else if (step === 'preferred_contact_time') {
      a.preferred_contact_time = rawValue
      await advanceTo('submitting')
      return
    }

    await advanceTo(nextStep(step))
  }

  async function submitNameSplit(firstName: string, lastName: string) {
    setInputError(null)
    if (!firstName.trim()) { setInputError('Please enter your first name'); return }
    if (!lastName.trim())  { setInputError('Please enter your last name'); return }
    answersRef.current.first_name = firstName.trim()
    answersRef.current.last_name = lastName.trim()
    appendMessage(userMsg(`${firstName.trim()} ${lastName.trim()}`))
    await advanceTo(nextStep('name'))
  }

  async function submitCalendar(datetime: string) {
    answersRef.current.appointment_datetime = datetime
    answersRef.current.booking_requested = true
    appendMessage(userMsg(`Requested: ${datetime}`))
    await advanceTo('submitting')
  }

  async function skipCalendar() {
    // User changed their mind about picking a time — downgrade to "Visit Required"
    // so the dashboard knows they wanted a visit but didn't commit to a slot.
    const a = answersRef.current
    a.appointment_datetime = undefined
    a.booking_requested = false
    a.action_tag = 'Visit Required'
    appendMessage(userMsg('Skip picking a time'))
    await advanceTo('submitting')
  }

  async function choosePhoto(yes: boolean) {
    if (yes) {
      appendMessage(userMsg('Yes, I have photos to share'))
      await advanceTo('photo_upload')
    } else {
      appendMessage(userMsg("No photos right now"))
      await advanceTo(nextStep('photo'))
    }
  }

  async function uploadPhoto(file: File) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `enquiries/${Date.now()}.${ext}`
    const { data, error } = await dashboardSupabase.storage
      .from('enquiry-media')
      .upload(path, file)

    if (error) {
      console.error('Photo upload failed:', error)
      appendMessage(userMsg("Could not upload, continuing without photo"))
    } else {
      const publicUrl = `https://vhslczshkcjjkzzfccge.supabase.co/storage/v1/object/public/enquiry-media/${data.path}`
      answersRef.current.media_url = publicUrl
      appendMessage(userMsg('Photo uploaded'))
    }
    await advanceTo(nextStep('photo_upload'))
  }

  async function skipPhotoUpload() {
    appendMessage(userMsg('Skip'))
    await advanceTo(nextStep('photo_upload'))
  }

  async function submitMultiChoice() {
    setInputError(null)
    const idx = parseInt(step.split('_')[1], 10)
    const q = customQuestions[idx]
    if (multiSelected.length === 0) { setInputError('Please select at least one option'); return }
    const answer = multiSelected.join(', ')
    appendMessage(userMsg(answer))
    answersRef.current.custom_answers.push({ question_text: q.question_text, answer, question_type: q.question_type })
    setMultiSelected([])
    await advanceTo(nextStep(step))
  }

  function toggleMulti(option: string) {
    setMultiSelected(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    )
  }

  async function retry() { setStep('submitting'); await doSubmit() }

  return {
    messages,
    step,
    isTyping,
    inputError,
    inputMode: step.startsWith('custom_') && (inputMode as { type: string; selected?: string[] }).type === 'multi_choice'
      ? { ...inputMode, selected: multiSelected } as InputMode
      : inputMode,
    primaryColour,
    start,
    submitAnswer,
    submitNameSplit,
    submitCalendar,
    skipCalendar,
    choosePhoto,
    uploadPhoto,
    skipPhotoUpload,
    submitMultiChoice,
    toggleMulti,
    retry,
    services,
    multiSelected,
  }
}
