interface Props {
  bubbleText: string
  primaryColour: string
  onClick: () => void
}

export function ChatBubble({ bubbleText, primaryColour, onClick }: Props) {
  return (
    <button
      className="bi5-bubble"
      style={{ background: primaryColour }}
      onClick={onClick}
      aria-label={bubbleText}
      title={bubbleText}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className="bi5-bubble-tooltip">{bubbleText}</span>
    </button>
  )
}
