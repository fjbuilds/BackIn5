import { useRef, useState } from 'react'
import type { InputMode } from '../hooks/useChat'
import { OptionButtons } from './OptionButtons'
import { CalendarView } from './CalendarView'

interface Props {
  inputMode: InputMode
  inputError: string | null
  primaryColour: string
  disabled: boolean
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
  step: string
  multiSelected: string[]
}

export function ChatInput({
  inputMode,
  inputError,
  primaryColour,
  disabled,
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
  step,
  multiSelected,
}: Props) {
  const [text, setText] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  if (inputMode.type === 'none') return null

  if (step === 'error') {
    return (
      <div className="bi5-input-area">
        <button className="bi5-send-btn bi5-w-full" style={{ background: primaryColour }} onClick={onRetry}>
          Retry
        </button>
      </div>
    )
  }

  if (inputMode.type === 'calendar') {
    return (
      <div className="bi5-input-area">
        <CalendarView
          primaryColour={primaryColour}
          onSelect={onCalendarSelect}
          onSkip={onCalendarSkip}
          disabled={disabled}
        />
      </div>
    )
  }

  if (inputMode.type === 'photo_choice') {
    return (
      <div className="bi5-input-area">
        <div className="bi5-yesno-wrap">
          <button
            className="bi5-yesno-btn"
            disabled={disabled}
            style={{ background: primaryColour, color: '#fff', borderColor: primaryColour }}
            onClick={() => onChoosePhoto(true)}
          >
            Yes, upload photos / videos
          </button>
          <button
            className="bi5-yesno-btn"
            disabled={disabled}
            style={{ borderColor: primaryColour, color: primaryColour }}
            onClick={() => onChoosePhoto(false)}
          >
            I don't have any right now
          </button>
        </div>
      </div>
    )
  }

  if (inputMode.type === 'file_upload') {
    return (
      <div className="bi5-input-area">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          className="bi5-file-input"
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onUploadPhoto(file)
          }}
        />
        <button
          className="bi5-send-btn bi5-w-full"
          style={{ background: primaryColour }}
          disabled={disabled}
          onClick={() => fileRef.current?.click()}
        >
          Choose file
        </button>
        <button className="bi5-skip-btn" disabled={disabled} onClick={onSkipPhotoUpload}>
          Skip
        </button>
      </div>
    )
  }

  if (inputMode.type === 'yes_no') {
    return (
      <div className="bi5-input-area">
        <div className="bi5-yesno-wrap">
          <button
            className="bi5-yesno-btn"
            disabled={disabled}
            style={{ background: primaryColour, color: '#fff', borderColor: primaryColour }}
            onClick={() => onSubmit('Yes')}
          >
            Yes
          </button>
          <button
            className="bi5-yesno-btn"
            disabled={disabled}
            style={{ borderColor: primaryColour, color: primaryColour }}
            onClick={() => onSubmit('No')}
          >
            No
          </button>
        </div>
      </div>
    )
  }

  if (inputMode.type === 'options') {
    return (
      <div className="bi5-input-area">
        <OptionButtons
          options={inputMode.options}
          onSelect={(val, lbl) => onSubmit(val, lbl)}
          primaryColour={primaryColour}
          disabled={disabled}
        />
        {inputError && <p className="bi5-error-msg">{inputError}</p>}
      </div>
    )
  }

  if (inputMode.type === 'multi_choice') {
    return (
      <div className="bi5-input-area">
        <div className="bi5-multi-wrap">
          {inputMode.options.map(opt => (
            <label key={opt} className="bi5-multi-label">
              <input
                type="checkbox"
                className="bi5-multi-check"
                checked={multiSelected.includes(opt)}
                disabled={disabled}
                onChange={() => onMultiToggle(opt)}
                style={{ accentColor: primaryColour }}
              />
              {opt}
            </label>
          ))}
        </div>
        <button
          className="bi5-send-btn bi5-w-full"
          style={{ background: primaryColour }}
          disabled={disabled || multiSelected.length === 0}
          onClick={onMultiDone}
        >
          Done
        </button>
        {inputError && <p className="bi5-error-msg">{inputError}</p>}
      </div>
    )
  }

  if (inputMode.type === 'dropdown') {
    return (
      <div className="bi5-input-area">
        <select
          className="bi5-select"
          disabled={disabled}
          defaultValue=""
          onChange={e => { if (e.target.value) onSubmit(e.target.value) }}
        >
          <option value="" disabled>Select an option…</option>
          {inputMode.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {inputError && <p className="bi5-error-msg">{inputError}</p>}
      </div>
    )
  }

  if (inputMode.type === 'name_split') {
    return (
      <div className="bi5-input-area">
        <div className="bi5-name-row">
          <input
            className="bi5-text-input"
            placeholder="First name"
            value={firstName}
            disabled={disabled}
            onChange={e => setFirstName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !disabled) onNameSplit(firstName, lastName) }}
          />
          <input
            className="bi5-text-input"
            placeholder="Last name"
            value={lastName}
            disabled={disabled}
            onChange={e => setLastName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !disabled) onNameSplit(firstName, lastName) }}
          />
        </div>
        <button
          className="bi5-send-btn bi5-w-full"
          style={{ background: primaryColour }}
          disabled={disabled || !firstName.trim() || !lastName.trim()}
          onClick={() => onNameSplit(firstName, lastName)}
        >
          Continue
        </button>
        {inputError && <p className="bi5-error-msg">{inputError}</p>}
      </div>
    )
  }

  if (inputMode.type === 'continue') {
    return (
      <div className="bi5-input-area">
        <button
          className="bi5-send-btn bi5-w-full"
          style={{ background: primaryColour }}
          disabled={disabled}
          onClick={() => onSubmit('')}
        >
          Continue
        </button>
      </div>
    )
  }

  // Default: text input
  const isOptional = inputMode.type === 'text' && inputMode.optional
  return (
    <div className="bi5-input-area">
      <div className="bi5-text-row">
        <input
          className="bi5-text-input"
          placeholder={inputMode.type === 'text' ? inputMode.placeholder : 'Type here…'}
          value={text}
          disabled={disabled}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !disabled) {
              onSubmit(text.trim())
              setText('')
            }
          }}
        />
        <button
          className="bi5-send-btn"
          style={{ background: primaryColour }}
          disabled={disabled || (!isOptional && !text.trim())}
          onClick={() => { onSubmit(text.trim()); setText('') }}
        >
          <SendIcon />
        </button>
      </div>
      {isOptional && (
        <button className="bi5-skip-btn" disabled={disabled} onClick={onSkip}>
          Skip
        </button>
      )}
      {inputError && <p className="bi5-error-msg">{inputError}</p>}
    </div>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
