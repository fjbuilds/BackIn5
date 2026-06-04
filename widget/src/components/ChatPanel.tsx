import { useEffect, useRef } from 'react'
import type { ChatMessage as ChatMessageType } from '../types'
import { ChatMessage } from './ChatMessage'
import { TypingIndicator } from './TypingIndicator'
import { ChatInput } from './ChatInput'
import type { InputMode } from '../hooks/useChat'

interface Props {
  title: string
  messages: ChatMessageType[]
  isTyping: boolean
  inputMode: InputMode
  inputError: string | null
  primaryColour: string
  step: string
  multiSelected: string[]
  onClose: () => void
  onSubmit: (value: string, label?: string) => void
  onNameSplit: (first: string, last: string) => void
  onMultiToggle: (option: string) => void
  onMultiDone: () => void
  onSkip: () => void
  onRetry: () => void
  onChoosePhoto: (yes: boolean) => void
  onUploadPhoto: (file: File) => void
  onSkipPhotoUpload: () => void
  onCalendarSelect: (datetime: string) => void
  onCalendarSkip: () => void
  showBranding: boolean
}

export function ChatPanel({
  title,
  messages,
  isTyping,
  inputMode,
  inputError,
  primaryColour,
  step,
  multiSelected,
  onClose,
  onSubmit,
  onNameSplit,
  onMultiToggle,
  onMultiDone,
  onSkip,
  onRetry,
  onChoosePhoto,
  onUploadPhoto,
  onSkipPhotoUpload,
  onCalendarSelect,
  onCalendarSkip,
  showBranding,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const disabled = isTyping || step === 'submitting' || step === 'done'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="bi5-panel">
      {/* Header */}
      <div className="bi5-panel-header" style={{ background: primaryColour }}>
        <div className="bi5-header-left">
          <div className="bi5-header-dot" />
          <span className="bi5-header-title">{title}</span>
        </div>
        <button className="bi5-close-btn" onClick={onClose} aria-label="Close chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="bi5-messages">
        {messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            primaryColour={primaryColour}
            isLast={i === messages.length - 1}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="bi5-input-outer">
        <ChatInput
          inputMode={inputMode}
          inputError={inputError}
          primaryColour={primaryColour}
          disabled={disabled}
          onSubmit={onSubmit}
          onNameSplit={onNameSplit}
          onMultiToggle={onMultiToggle}
          onMultiDone={onMultiDone}
          onSkip={onSkip}
          onRetry={onRetry}
          onChoosePhoto={onChoosePhoto}
          onUploadPhoto={onUploadPhoto}
          onSkipPhotoUpload={onSkipPhotoUpload}
          onCalendarSelect={onCalendarSelect}
          onCalendarSkip={onCalendarSkip}
          step={step}
          multiSelected={multiSelected}
        />
      </div>

      {showBranding && (
        <div className="bi5-branding">
          Powered by <strong>BackIn5</strong>
        </div>
      )}
    </div>
  )
}
