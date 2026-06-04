import { useEffect, useState } from 'react'
import { useBusinessConfig } from './hooks/useBusinessConfig'
import { useChat } from './hooks/useChat'
import { ChatBubble } from './components/ChatBubble'
import { ChatPanel } from './components/ChatPanel'

interface Props {
  businessId: string
}

export function App({ businessId }: Props) {
  const configState = useBusinessConfig(businessId)
  const [open, setOpen] = useState(false)

  if (configState.status === 'loading') {
    return null // render nothing until config loads
  }

  if (configState.status === 'unavailable' || configState.status === 'error') {
    return (
      <div className="bi5-root">
        <div className="bi5-unavailable">This chat is currently unavailable.</div>
      </div>
    )
  }

  return <WidgetInner config={configState.config} open={open} setOpen={setOpen} />
}

// Separated so useChat only runs after config is confirmed ready
function WidgetInner({
  config,
  open,
  setOpen,
}: {
  config: NonNullable<Extract<ReturnType<typeof useBusinessConfig>, { status: 'ready' }>['config']>
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const chat = useChat(config)

  // Start the chat flow the first time the panel opens
  useEffect(() => {
    if (open) chat.start()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const primaryColour =
    config.settings.primary_colour ?? config.business.primary_colour

  return (
    <div className="bi5-root">
      {open ? (
        <ChatPanel
          title={config.settings.widget_title}
          messages={chat.messages}
          isTyping={chat.isTyping}
          inputMode={chat.inputMode}
          inputError={chat.inputError}
          primaryColour={primaryColour}
          step={chat.step}
          multiSelected={chat.multiSelected}
          onClose={() => setOpen(false)}
          onSubmit={(val, lbl) => chat.submitAnswer(val, lbl)}
          onNameSplit={chat.submitNameSplit}
          onMultiToggle={chat.toggleMulti}
          onMultiDone={chat.submitMultiChoice}
          onSkip={() => chat.submitAnswer('')}
          onRetry={chat.retry}
          onChoosePhoto={chat.choosePhoto}
          onUploadPhoto={chat.uploadPhoto}
          onSkipPhotoUpload={chat.skipPhotoUpload}
          onCalendarSelect={chat.submitCalendar}
          onCalendarSkip={chat.skipCalendar}
          showBranding={config.settings.show_branding}
        />
      ) : (
        <ChatBubble
          bubbleText={config.settings.bubble_text}
          primaryColour={primaryColour}
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  )
}
