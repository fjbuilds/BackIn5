interface Props {
  options: string[]
  onSelect: (value: string, label: string) => void
  primaryColour: string
  disabled?: boolean
}

export function OptionButtons({ options, onSelect, primaryColour, disabled }: Props) {
  return (
    <div className="bi5-options-wrap">
      {options.map((opt, i) => {
        const label = `${i + 1}. ${opt}`
        return (
          <button
            key={opt}
            className="bi5-option-btn"
            disabled={disabled}
            onClick={() => onSelect(opt, label)}
            style={{ borderColor: primaryColour, color: primaryColour }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
