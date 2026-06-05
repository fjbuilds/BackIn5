import { useCallback, useRef, useState } from 'react'
import type { BusinessConfig, ChatMessage, CustomAnswer, FlowAnswers, FlowStepId } from '../types'
import { validateEmail, validatePhone, validatePostcode, validateRequired } from '../lib/validation'
import { submitEnquiry } from '../lib/submitEnquiry'
import { dashboardSupabase } from '../lib/dashboardSupabase'

let msgCounter = 0
function makeId() { return `m-${++msgCounter}` }
function botMsg(text: string): ChatMessage { return { id: makeId(), role: 'bot', text } }
function userMsg(text: string): ChatMessage { return { id: makeId(), role: 'user', text } }

const URGENCY_OPTIONS = ['Urgent / emergency', 'As soon as possible', 'This week', 'Flexible / just looking']

const INTENT_OPTIONS = [
  "I'd like someone to call me back",
  "I'd like a quote",
  "I'd like to request a visit / survey",
  "I'd like to book directly if available",
  "I'm not sure yet",
]

const CONTACT_TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Anytime']

function intentToActionTag(intent: string): string {
  if (intent === "I'd like someone to call me back") return 'Call Back'
  if (intent === "I'd like a quote") return 'Quote Required'
  if (intent === "I'd like to request a visit / survey") return 'Visit Required'
  if (intent === "I'd like to book directly if available") return 'Booking Requested'
  return 'Review Details'
}

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
    if (s === 'service')       return { type: 'options', options: serviceOptions }
    if (s === 'service_other') return { type: 'text', placeholder: 'Briefly describe what you need...' }
    if (s === 'postcode')      return { type: 'text', placeholder: 'e.g. SW1A 1AA' }
    if (s === 'town')          return { type: 'text', placeholder: 'e.g. Manchester' }
    if (s === 'urgency')       return { type: 'options', options: URGENCY_OPTIONS }
    if (s === 'enquiry_intent') return { type: 'options', options: INTENT_OPTIONS }
    if (s === 'booking_type')  return { type: 'options', options: ['Quote', 'Site visit', 'Callback'] }
    if (s === 'calendar')      return { type: 'calendar' }
    if (s === 'photo')         return { type: 'photo_choice' }
    if (s === 'photo_upload')  return { type: 'file_upload' }
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
    if (s === 'name')                   return { type: 'name_split' }
    if (s === 'phone')                  return { type: 'text', placeholder: 'e.g. 07700 900000' }
    if (s === 'email')                  return { type: 'text', placeholder: 'e.g. you@example.com', optional: true }
    if (s === 'preferred_contact_time') return { type: 'options', options: CONTACT_TIME_OPTIONS }
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
    if (s === 'service')        return `What do you need help with?`
    if (s === 'service_other')  return 'Please briefly describe what you need help with.'
    if (s === 'postcode')       return 'What is the postcode for the job?'
    if (s === 'town')           return 'What town or city is the job in?'
    if (s === 'urgency')        return 'How urgent is it?'
    if (s === 'enquiry_intent') return 'What would you like to happen next?'
    if (s === 'booking_type')    return 'What would you like to book?'
    if (s === 'calendar')       return 'Great - please choose an available time below.'
    if (s === 'photo')          return 'Would you like to upload any photos or videos?'
    if (s === 'photo_upload')   return 'Please select a photo or video to upload.'
    if (s.startsWith('custom_')) {
      const idx = parseInt(s.split('_')[1], 10)
      return customQuestions[idx]?.question_text ?? ''
    }
    if (s === 'name')                   return 'What is your name?'
    if (s === 'phone')                  return 'What is the best phone number for you?'
    if (s === 'email')                  return 'What is your email address? (optional)'
    if (s === 'preferred_contact_time') return 'When is the best time to contact you?'
    return ''
  }

  function firstCustomStep(): FlowStepId {
    return customQuestions.length > 0 ? 'custom_0' : 'name'
  }

  function nextStep(current: FlowStepId): FlowStepId {
    if (current === 'service')        return 'postcode'
    if (current === 'service_other')  return 'postcode'
    if (current === 'postcode')       return 'town'
    if (current === 'town')           return 'urgency'
    if (current === 'urgency')        return 'enquiry_intent'
    if (current === 'enquiry_intent') {
      return answersRef.current.booking_requested ? 'booking_type' : 'photo'
    }
    if (current === 'booking_type')   return 'calendar'
    if (current === 'calendar')       return 'photo'
    if (current === 'photo')          return firstCustomStep()
    if (current === 'photo_upload')   return firstCustomStep()
    if (current.startsWith('custom_')) {
      const idx = parseInt(current.split('_')[1], 10)
      const next = idx + 1
      return next < customQuestions.length ? `custom_${next}` as FlowStepId : 'name'
    }
    if (current === 'name')                   return 'phone'
    if (current === 'phone')                  return 'email'
    if (current === 'email')                  return 'preferred_contact_time'
    if (current === 'preferred_contact_time') return 'submitting'
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
    await queueBotMessage('Sending your enquiry…', 300)
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
        preferred_contact_time: a.preferred_contact_time,
        media_url: a.media_url,
        custom_answers: a.custom_answers,
      })
      await queueBotMessage(
        settings.confirmation_message ?? 'Thanks - your enquiry has been sent. The team will be in touch shortly.',
        600,
      )
      setStep('done')
    } catch {
      await queueBotMessage('Something went wrong - please try again or call us directly.', 400)
      setStep('error')
    }
  }

  const start = useCallback(async () => {
    if (initialised.current) return
    initialised.current = true
    const welcome = settings.welcome_message
      ?? `Hi, thanks for getting in touch with ${business.business_name}. I'll ask a few quick questions so we can get the right details over to the team.`
    await queueBotMessage(welcome, 600)
    await advanceTo('service')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validateStep(s: FlowStepId, value: string): string | null {
    if (s === 'phone')        return validatePhone(value)
    if (s === 'email')        return value.trim() ? validateEmail(value) : null
    if (s === 'town')         return validateRequired(value, 'town or city')
    if (s === 'service_other') return validateRequired(value, 'description')
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
    } else if (step === 'postcode') {
      a.postcode = rawValue
    } else if (step === 'town') {
      a.town = rawValue
    } else if (step === 'urgency') {
      a.urgency = rawValue
    } else if (step === 'enquiry_intent') {
      a.enquiry_intent = rawValue
      a.action_tag = intentToActionTag(rawValue)
      a.booking_requested = rawValue === "I'd like to book directly if available"
    } else if (step === 'booking_type') {
      a.booking_type = rawValue
      if (rawValue === 'Quote')      a.action_tag = 'Quote Required'
      else if (rawValue === 'Site visit') a.action_tag = 'Visit Required'
      else if (rawValue === 'Callback')   a.action_tag = 'Call Back'
    } else if (step.startsWith('custom_')) {
      const idx = parseInt(step.split('_')[1], 10)
      const q = customQuestions[idx]
      a.custom_answers.push({ question_text: q.question_text, answer: rawValue, question_type: q.question_type })
    } else if (step === 'phone') {
      a.phone = rawValue
    } else if (step === 'email') {
      a.email = rawValue
    } else if (step === 'preferred_contact_time') {
      a.preferred_contact_time = rawValue
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
    await advanceTo('photo')
  }

  async function skipCalendar() {
    answersRef.current.booking_requested = true
    appendMessage(userMsg("I'll let the team arrange a time"))
    await advanceTo('photo')
  }

  async function choosePhoto(yes: boolean) {
    if (yes) {
      appendMessage(userMsg('Yes - I have photos to share'))
      await advanceTo('photo_upload')
    } else {
      appendMessage(userMsg("I don't have any right now"))
      await advanceTo(firstCustomStep())
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
      appendMessage(userMsg("Couldn't upload - continuing without photo"))
    } else {
      const publicUrl = `https://vhslczshkcjjkzzfccge.supabase.co/storage/v1/object/public/enquiry-media/${data.path}`
      answersRef.current.media_url = publicUrl
      console.log('Photo URL stored:', publicUrl)
      appendMessage(userMsg('Photo uploaded ✓'))
    }
    await advanceTo(firstCustomStep())
  }

  async function skipPhotoUpload() {
    appendMessage(userMsg('Skip'))
    await advanceTo(firstCustomStep())
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
