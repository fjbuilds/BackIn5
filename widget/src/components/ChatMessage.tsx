import type { ChatMessage as ChatMessageType } from '../types'

interface Props {
  message: ChatMessageType
  primaryColour: string
  isLast?: boolean
}

export function ChatMessage({ message, primaryColour, isLast }: Props) {
  const isBot = message.role === 'bot'

  return (
    <div
      className={`bi5-flex bi5-mb-3 ${isBot ? 'bi5-justify-start' : 'bi5-justify-end'} ${isLast ? 'bi5-animate-fadein' : ''}`}
    >
      <div
        className="bi5-msg-bubble"
        style={
          isBot
            ? { background: '#eef1fb', color: '#111827', maxWidth: '82%' }
            : { background: primaryColour, color: '#ffffff', maxWidth: '82%' }
        }
      >
        {message.text}
      </div>
    </div>
  )
}
