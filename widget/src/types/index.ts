export interface Business {
  id: string
  business_name: string
  trade_type: string
  website_domain: string | null
  primary_colour: string
  logo_url: string | null
  contact_email: string | null
  contact_phone: string | null
  notification_email: string | null
  notification_phone: string | null
  active: boolean
  created_at: string
  dashboard_trade_id: string | null
}

export interface WidgetSettings {
  id: string
  business_id: string
  welcome_message: string | null
  confirmation_message: string | null
  widget_title: string
  bubble_text: string
  show_branding: boolean
  primary_colour: string | null
  position: string
  active: boolean
}

export interface Service {
  id: string
  business_id: string
  service_name: string
  sort_order: number
  active: boolean
}

export type QuestionType = 'text' | 'single_choice' | 'multi_choice' | 'yes_no' | 'dropdown'

export interface CustomQuestion {
  id: string
  business_id: string
  question_text: string
  question_type: QuestionType
  options: string[] | null
  required: boolean
  sort_order: number
  active: boolean
}

export interface BusinessConfig {
  business: Business
  settings: WidgetSettings
  services: Service[]
  customQuestions: CustomQuestion[]
}

export interface CustomAnswer {
  question_text: string
  answer: string
  question_type: string
}

export interface EnquiryPayload {
  business_id: string
  dashboard_trade_id?: string | null
  customer_name: string
  phone: string
  email?: string
  postcode: string
  town?: string
  service_requested: string
  urgency?: string
  enquiry_intent?: string
  action_tag?: string
  booking_requested?: boolean
  booking_type?: string
  appointment_datetime?: string
  job_description?: string
  preferred_contact_time?: string
  media_url?: string
  custom_answers?: CustomAnswer[]
}

// ── Chat flow ──────────────────────────────────────────────────────────────────

export type MessageRole = 'bot' | 'user'

export interface ChatMessage {
  id: string
  role: MessageRole
  text: string
}

export type FlowStepId =
  | 'service'
  | 'service_other'
  | 'job_description'
  | 'postcode'
  | 'town'
  | 'urgency'
  | 'enquiry_intent'
  | 'booking_type'
  | 'calendar'
  | 'photo'
  | 'photo_upload'
  | `custom_${number}`
  | 'name'
  | 'phone'
  | 'email'
  | 'preferred_contact_time'
  | 'submitting'
  | 'done'
  | 'error'

export interface FlowAnswers {
  service_requested?: string
  postcode?: string
  town?: string
  urgency?: string
  enquiry_intent?: string
  action_tag?: string
  booking_requested?: boolean
  booking_type?: string
  appointment_datetime?: string
  first_name?: string
  last_name?: string
  phone?: string
  email?: string
  preferred_contact_time?: string
  job_description?: string
  media_url?: string
  custom_answers: CustomAnswer[]
}
