import { useState } from 'react'

interface Props {
  primaryColour: string
  onSelect: (datetime: string) => void
  onSkip: () => void
  disabled: boolean
}

const TIME_SLOTS = ['9:00am', '10:00am', '11:00am', '1:00pm', '2:00pm', '3:00pm', '4:00pm']

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  // 0=Sun, adjust to Mon-first
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

export function CalendarView({ primaryColour, onSelect, onSkip, disabled }: Props) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
    setSelectedDay(null); setSelectedTime(null)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
    setSelectedDay(null); setSelectedTime(null)
  }

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0,0,0,0)
    const t = new Date(); t.setHours(0,0,0,0)
    return d < t
  }

  function isWeekend(day: number) {
    const dow = new Date(viewYear, viewMonth, day).getDay()
    return dow === 0 || dow === 6
  }

  function handleConfirm() {
    if (!selectedDay || !selectedTime) return
    const monthStr = String(viewMonth + 1).padStart(2, '0')
    const dayStr = String(selectedDay).padStart(2, '0')
    onSelect(`${viewYear}-${monthStr}-${dayStr} at ${selectedTime}`)
  }

  const cells: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="bi5-calendar">
      {/* Month navigation */}
      <div className="bi5-cal-header">
        <button className="bi5-cal-nav" onClick={prevMonth} disabled={disabled}>‹</button>
        <span className="bi5-cal-month">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="bi5-cal-nav" onClick={nextMonth} disabled={disabled}>›</button>
      </div>

      {/* Day labels */}
      <div className="bi5-cal-grid">
        {DAYS.map(d => (
          <div key={d} className="bi5-cal-day-label">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const past = isPast(day)
          const weekend = isWeekend(day)
          const unavailable = past || weekend
          const selected = selectedDay === day
          return (
            <button
              key={day}
              className={`bi5-cal-day ${unavailable ? 'bi5-cal-day--off' : ''} ${selected ? 'bi5-cal-day--selected' : ''}`}
              style={selected ? { background: primaryColour, color: '#fff', borderColor: primaryColour } : {}}
              disabled={unavailable || disabled}
              onClick={() => { setSelectedDay(day); setSelectedTime(null) }}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      {selectedDay && (
        <div className="bi5-cal-times">
          <p className="bi5-cal-times-label">Choose a time:</p>
          <div className="bi5-cal-slots">
            {TIME_SLOTS.map(t => (
              <button
                key={t}
                className={`bi5-cal-slot ${selectedTime === t ? 'bi5-cal-slot--selected' : ''}`}
                style={selectedTime === t ? { background: primaryColour, color: '#fff', borderColor: primaryColour } : {}}
                disabled={disabled}
                onClick={() => setSelectedTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bi5-cal-actions">
        {selectedDay && selectedTime && (
          <button
            className="bi5-send-btn bi5-w-full"
            style={{ background: primaryColour }}
            disabled={disabled}
            onClick={handleConfirm}
          >
            Confirm - {String(selectedDay).padStart(2,'0')}/{String(viewMonth+1).padStart(2,'0')} at {selectedTime}
          </button>
        )}
        <button className="bi5-skip-btn" disabled={disabled} onClick={onSkip}>
          Skip for now - team will be in touch to arrange
        </button>
      </div>
    </div>
  )
}
