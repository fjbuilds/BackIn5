/* eslint-disable */
// WhatsApp chat bubble - floating bottom-right.
// Opens a small in-page panel where the visitor types their message,
// then deep-links to wa.me with the message pre-filled. No backend.

const { useState: useStateCB, useEffect: useEffectCB, useRef: useRefCB } = React;

const WHATSAPP_NUMBER = "447948091506"; // international, no + or spaces
const DEFAULT_GREETING =
  "Hi - What can I help with? I'll usually reply within a few minutes during the day.";

function ChatBubble() {
  const [open, setOpen] = useStateCB(false);
  const [msg, setMsg] = useStateCB("");
  const [name, setName] = useStateCB("");
  const taRef = useRefCB(null);

  useEffectCB(() => {
    if (open) {
      // tiny delay to let the panel mount before focusing
      const id = setTimeout(() => taRef.current && taRef.current.focus(), 60);
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("keydown", onKey);
      return () => { clearTimeout(id); document.removeEventListener("keydown", onKey); };
    }
  }, [open]);

  const send = () => {
    const trimmed = msg.trim();
    if (!trimmed) {
      taRef.current && taRef.current.focus();
      return;
    }
    const prefix = name.trim() ? `Hi, it's ${name.trim()}. ` : "";
    const text = encodeURIComponent(prefix + trimmed);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className={"chatbub " + (open ? "is-open" : "")}>
      {/* Panel */}
      <div className="chatbub-panel" role="dialog" aria-label="Chat with BackIn5" aria-hidden={!open}>
        <div className="chatbub-panel-head">
          <div className="chatbub-avatar">
            <span className="chatbub-avatar-dot" />
            <span className="chatbub-avatar-mark">5</span>
          </div>
          <div className="chatbub-panel-titles">
            <div className="chatbub-panel-title">BackIn5</div>
            <div className="chatbub-panel-sub">Usually replies within minutes</div>
          </div>
          <button
            type="button"
            className="chatbub-close"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="chatbub-panel-body">
          <div className="chatbub-msg">
            <div className="chatbub-msg-bubble">{DEFAULT_GREETING}</div>
            <div className="chatbub-msg-time">just now</div>
          </div>
        </div>

        <div className="chatbub-panel-form">
          <input
            type="text"
            className="chatbub-input"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            ref={taRef}
            className="chatbub-textarea"
            placeholder="Type your message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={onKeyDown}
            rows={3}
          />
          <button
            type="button"
            className="chatbub-send"
            onClick={send}
            disabled={!msg.trim()}
          >
            <span>Send via WhatsApp</span>
            <IconWhatsApp size={16} />
          </button>
          <div className="chatbub-foot">
            Opens WhatsApp - we'll continue the chat there.
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        type="button"
        className="chatbub-fab"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="chatbub-fab-ic-open"><IconChat size={22} /></span>
        <span className="chatbub-fab-ic-close"><IconX size={20} /></span>
        <span className="chatbub-fab-label">Chat with us</span>
      </button>
    </div>
  );
}

// WhatsApp glyph - official outline mark. Used only on the send button.
const IconWhatsApp = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.11 4.91A9.86 9.86 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.44 1.32 4.94L2 22l5.31-1.39a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.85-7zM12.05 20.15h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.15.82.84-3.07-.19-.32a8.21 8.21 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.21 8.21 0 0 1 2.41 5.83c0 4.55-3.7 8.25-8.23 8.25zm4.52-6.18c-.25-.13-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.12-.11.25-.29.38-.43.12-.14.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.16 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.16 1.6.1.49-.07 1.51-.62 1.72-1.21.21-.59.21-1.1.15-1.21-.06-.11-.23-.18-.48-.31z" />
  </svg>
);

Object.assign(window, { ChatBubble });
