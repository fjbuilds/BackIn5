/* eslint-disable */
// Contact section - 3-card layout with call/text, Calendly booking, email.

function HowItWorksPopup({ onClose }) {
  // Close on backdrop click
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  // Close on Escape
  React.useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);
  return (
    <div className="hiw-popup-backdrop" onClick={handleBackdrop}>
      <div className="hiw-popup-card">
        <button className="hiw-popup-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="hiw-popup-eyebrow">How it works</div>
        <h3 className="hiw-popup-title">See exactly what happens when a customer contacts you</h3>
        <p className="hiw-popup-body">
          A step-by-step walkthrough of every scenario - from website enquiries to missed calls - and how BackIn5 handles each one, round the clock.
        </p>
        <div className="hiw-popup-points">
          <div className="hiw-popup-point"><span>→</span> Live quote assistant on your website</div>
          <div className="hiw-popup-point"><span>→</span> Missed call auto-follow-up</div>
          <div className="hiw-popup-point"><span>→</span> Every enquiry lands in your live dashboard</div>
          <div className="hiw-popup-point"><span>→</span> Pick the right plan and get set up in 48 hrs</div>
        </div>
        <a href="see-the-system.html" className="btn btn-primary btn-arrow hiw-popup-cta">
          See the full walkthrough <IconArrowRight size={16} />
        </a>
        <button onClick={onClose} className="hiw-popup-dismiss">No thanks, I'll look later</button>
      </div>
    </div>
  );
}

function Contact() {
  const [showHiw, setShowHiw] = React.useState(false);
  return (
    <section className="canvas-light band" id="contact">
      <div className="container">
        <div className="sec-head center" style={{ alignItems: "center" }}>
          Get in touch to Talk to us.
          <h2 className="display" style={{ color: "rgb(14, 17, 22)" }}>
            Want to see How Your Business Could Benefit From <span style={{ color: "#1e3a97" }}>BackIn5?</span>
          </h2>
          <p className="lead">Call, email, book in a chat or see how it works for yourself.</p>
        </div>

        <div className="contact-row">
          <a href="tel:+447000000000" className="contact-pill">
            <IconPhone size={18} />
            <span>Call or text</span>
          </a>
          <a href="mailto:hello@backin5.com" className="contact-pill">
            <IconMail size={18} />
            <span>Email us</span>
          </a>
          <a href="https://calendly.com/backin5/intro" target="_blank" rel="noopener noreferrer" className="contact-pill">
            <IconCalendar size={18} />
            <span>Book a chat</span>
          </a>
          <button className="contact-pill contact-pill-ghost" onClick={() => setShowHiw(true)}>
            <IconArrowRight size={18} />
            <span>How it works</span>
          </button>
        </div>

        <div className="calendly-wrap" style={{ marginTop: 32 }}>
          <iframe
            src="https://calendly.com/backin5/intro?embed_domain=&embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1&primary_color=3450b3"
            title="Book a chat with BackIn5"
            frameBorder="0"
            allow="camera; microphone; autoplay; encrypted-media; fullscreen"
            style={{ width: "100%", height: "100%", border: 0 }}>
          </iframe>
        </div>
      </div>
      {showHiw && <HowItWorksPopup onClose={() => setShowHiw(false)} />}
    </section>);

}

Object.assign(window, { Contact });
