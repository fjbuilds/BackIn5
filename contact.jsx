/* eslint-disable */
// Contact section

// Calendly popup overlay
function CalendlyPopup({ onClose }) {
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  // Match the iframe height to the available viewport on small phones
  const [iframeH, setIframeH] = React.useState(580);
  React.useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    const resize = () => {
      const vh = window.innerHeight;
      // Reserve room for close button + safe areas; iframe fills the rest
      setIframeH(Math.max(420, Math.min(vh - 110, 720)));
    };
    resize();
    window.addEventListener('keydown', fn);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('keydown', fn);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <div className="hiw-popup-backdrop" onClick={handleBackdrop} style={{ zIndex: 9999, padding: 0 }}>
      <div
        className="hiw-popup-card calendly-card"
        style={{ maxWidth: 700, width: '100%', padding: '20px 14px 14px', position: 'relative', borderRadius: 16 }}
      >
        <button className="hiw-popup-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <iframe
          src="https://calendly.com/backin5/intro?embed_domain=&embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1&primary_color=3450b3"
          title="Book a chat with BackIn5"
          frameBorder="0"
          allow="camera; microphone; autoplay; encrypted-media; fullscreen"
          style={{ width: '100%', height: iframeH, border: 0, borderRadius: 8 }}>
        </iframe>
      </div>
    </div>
  );
}

// How it works auto-popup (fires after 30s if not yet dismissed)
function HowItWorksPopup({ onClose }) {
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
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
          <div className="hiw-popup-point"><span>→</span> Pick the right plan and get set up in 24 hrs</div>
        </div>
        <a
          href="see-the-system.html"
          className="btn btn-primary btn-arrow hiw-popup-cta"
          onClick={(e) => {
            // Stop bubbling to the backdrop so its click handler can't
            // intercept on iOS Safari, and force-navigate as a safety net
            // (anchor tags sometimes fail to fire inside fixed overlays
            // with backdrop-filter on older iOS versions).
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              setTimeout(() => { window.location.href = 'see-the-system.html'; }, 0);
            }
          }}
        >
          See the full walkthrough <IconArrowRight size={16} />
        </a>
        <button onClick={onClose} className="hiw-popup-dismiss">No thanks, I'll look later</button>
      </div>
    </div>
  );
}

function Contact() {
  const [showCalendly, setShowCalendly] = React.useState(false);
  const [showHiw, setShowHiw] = React.useState(false);

  // Auto-popup after 30s, once per browser session (resets on page reload)
  React.useEffect(() => {
    if (sessionStorage.getItem('hiw_shown')) return;
    const t = setTimeout(() => {
      setShowHiw(true);
      sessionStorage.setItem('hiw_shown', '1');
    }, 30000);
    return () => clearTimeout(t);
  }, []);

  const dismissHiw = () => {
    setShowHiw(false);
  };

  return (
    <section className="canvas-light band" id="contact">
      <div className="container">
        <div className="sec-head center" style={{ alignItems: "center" }}>
          <span className="eyebrow">Get in touch</span>
          <p className="lead" style={{ maxWidth: '48ch', margin: '0 auto' }}>Call, email, book a quick chat, or see how it works for yourself.</p>
        </div>

        <div className="contact-row">
          <a href="tel:+447000000000" className="contact-pill">
            <IconPhone size={18} />
            <span>Call or text</span>
          </a>
          <a
            href="mailto:hello@backin5.org?subject=Hi%20BackIn5&body=Hi%20BackIn5%2C%0A%0A"
            target="_blank"
            rel="noopener"
            className="contact-pill"
          >
            <IconMail size={18} />
            <span>Email us</span>
          </a>
          <button className="contact-pill" onClick={() => window.Calendly && window.Calendly.initPopupWidget({url: 'https://calendly.com/backin5/30min?primary_color=164d9c'})}>
            <IconCalendar size={18} />
            <span>Book a chat</span>
          </button>
          <a href="see-the-system.html" className="contact-pill contact-pill-ghost">
            <IconArrowRight size={18} />
            <span>How it works</span>
          </a>
        </div>
      </div>

      {showCalendly && <CalendlyPopup onClose={() => setShowCalendly(false)} />}
      {showHiw && <HowItWorksPopup onClose={dismissHiw} />}
    </section>
  );
}

Object.assign(window, { Contact });
