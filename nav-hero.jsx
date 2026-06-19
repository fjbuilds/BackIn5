/* eslint-disable */
// Nav + Hero with 4 variants - exposed on window for app.jsx to consume.

const { useState, useEffect } = React;

// ----------------- Nav -----------------
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) { document.body.style.overflow = ''; return; }
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav className="nav" style={{ backgroundColor: "rgb(27, 33, 43)" }}>
      <div className="container nav-inner">
        <a href="#top" className="nav-brand" onClick={close}>
          <img src="assets/backin5-logo-v4.png" alt="BackIn5" className="brand-logo" style={{ width: "106px", height: "24px" }} />
          <span className="nav-tagline">Built For Busy Trades</span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#built-for">Who is this for?</a>
          <a className="nav-link" href="see-the-system.html">How does it work?</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#faqs">FAQs</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
        <div className="nav-cta">
          <a href="#pricing" className="btn btn-primary btn-sm nav-cta-btn">Get Started</a>
          <button
            className={"nav-burger " + (menuOpen ? "is-open" : "")}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={"nav-drawer " + (menuOpen ? "is-open" : "")} aria-hidden={!menuOpen}>
        <div className="nav-drawer-scrim" onClick={close} />
        <div className="nav-drawer-panel" role="dialog" aria-label="Site navigation">
          <a className="nav-drawer-link" href="#built-for" onClick={close}>Who is this for?</a>
          <a className="nav-drawer-link" href="see-the-system.html" onClick={close}>How does it work?</a>
          <a className="nav-drawer-link" href="#pricing" onClick={close}>Pricing</a>
          <a className="nav-drawer-link" href="#faqs" onClick={close}>FAQs</a>
          <a className="nav-drawer-link" href="#contact" onClick={close}>Contact</a>
          <a href="#pricing" className="btn btn-primary btn-lg nav-drawer-cta" onClick={close}>
            Get Started <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>);

}

// ----------------- Panel Carousel (hero v1 imagery) -----------------
const HERO_PANELS = [
{
  title: "Never lose a decent job to a missed enquiry.",
  sub: "Calls, forms and messages handled instantly whilst you're busy."
},
{
  title: "Customers get replies whilst competitors don't.",
  sub: "Most people contact multiple trades. Fast responses win more work."
},
{
  title: "Stop wasting hours on poor enquiries.",
  sub: "Collect photos, job details and postcodes upfront before you even call."
},
{
  title: "No more enquiry chaos.",
  sub: "Everything organised, tracked and ready to quote in one place."
},
{
  title: "Whilst you're on the tools, the business still runs.",
  sub: "BackIn5 keeps enquiries moving without adding more to the owner's plate."
}];

function PanelCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_PANELS.length), 3900);
    return () => clearInterval(id);
  }, []);
  // single-digit step numbers to echo BackIn5's "5"
  return (
    <div className="panel-carousel">
      <div className="panel-head">
        <div className="panel-mark-row">
          <span className="panel-mark-label">
</span>
        </div>
        <div className="panel-counter">
          <span className="now">{idx + 1}</span>
          <span className="sep"> / </span>
          <span className="total">{HERO_PANELS.length}</span>
        </div>
      </div>
      <div className="panel-stage">
        {HERO_PANELS.map((p, i) => <div key={i} className={"panel " + (i === idx ? "active" : i < idx ? "past" : "future")}>
            <div className="panel-bignum">{i + 1}</div>
            <div className="panel-title">{p.title}</div>
            <div className="panel-sub">{p.sub}</div>
          </div>
        )}
      </div>
      <div className="panel-foot">
        <div className="panel-progress">
          <div className="panel-progress-bar" key={idx} />
        </div>
        <div className="panel-dots">
          {HERO_PANELS.map((_, i) =>
          <button
            key={i}
            className={"panel-dot " + (i === idx ? "active" : "")}
            onClick={() => setIdx(i)}
            aria-label={"Show panel " + (i + 1)} />

          )}
        </div>
      </div>
    </div>);

}

// ----------------- Transcript card (used in Hero v1 + others) -----------------
function TranscriptCard() {
  return (
    <div className="transcript">
      <div className="hero-sticker">Live · 00:42 ago</div>
      <div className="transcript-head">
        <div className="left">
          <div className="avatar">SK</div>
          <div>
            <div className="name">Sarah Kelly</div>
            <div className="sub">+44 7700 900 124 · Bristol</div>
          </div>
        </div>
        <div className="status">Qualified</div>
      </div>

      <div className="transcript-body">
        <div className="tline missed" style={{ animationDelay: "0ms" }}>
          <div className="ts">14:02</div>
          <div className="body-cell">
            <span className="tag">Missed call</span>
            <div className="msg">Caller rang while you were on the job - voicemail not left.</div>
          </div>
        </div>

        <div className="tline system" style={{ animationDelay: "120ms" }}>
          <div className="ts">14:02</div>
          <div className="body-cell">
            <span className="tag">BackIn5 · Text-back</span>
            <div className="msg">
              "Hi Sarah - sorry I missed your call, I'm on a job. I can get back to you within 5 minutes.
              Quick question: what do you need help with?"
            </div>
          </div>
        </div>

        <div className="tline customer" style={{ animationDelay: "240ms" }}>
          <div className="ts">14:03</div>
          <div className="body-cell">
            <span className="tag">Sarah</span>
            <div className="msg">Kitchen tap is leaking under the sink. Bit urgent - got a dinner party Friday.</div>
          </div>
        </div>

        <div className="tline system" style={{ animationDelay: "360ms" }}>
          <div className="ts">14:04</div>
          <div className="body-cell">
            <span className="tag">BackIn5 · Qualifying</span>
            <div className="msg">Got it. Captured job type, urgency and address. Holding Thursday 9:30am in your diary.</div>
            <div className="meta">
              <span><b>Job</b> Leak repair</span>
              <span><b>Urgency</b> 48h</span>
              <span><b>Postcode</b> BS6 5HE</span>
            </div>
          </div>
        </div>

        <div className="tline booked" style={{ animationDelay: "480ms" }}>
          <div className="ts">14:04</div>
          <div className="body-cell">
            <span className="tag">Booked</span>
            <div className="msg">Confirmation sent. Added to your morning brief.</div>
          </div>
        </div>
      </div>

      <div className="transcript-foot">
        <div className="stat"><b>3m 42s</b>start to booked</div>
        <div className="booked-pill">
          <IconCalendar size={14} />
          Thursday 09:30
        </div>
      </div>
    </div>);

}

// ----------------- Dashboard mockup (hero v3) -----------------
function MiniDashboard() {
  return (
    <div className="mini-dash">
      <div className="mini-dash-head">
        <div className="dots"><span /><span /><span /></div>
        <div>Today · 12 new enquiries</div>
      </div>
      <div className="mini-dash-body">
        <div className="mini-dash-side">
          <div className="label">Inbox</div>
          <div className="item active"><IconInbox /> New</div>
          <div className="item"><IconCheckCircle /> Qualified</div>
          <div className="item"><IconCalendar /> Booked</div>
          <div className="label">Today</div>
          <div className="item"><IconClock /> Awaiting reply</div>
          <div className="item"><IconShield /> Followed up</div>
        </div>
        <div className="mini-dash-main">
          <div className="dash-stat-row">
            <div className="dash-stat"><div className="lbl">Captured</div><div className="val">12</div></div>
            <div className="dash-stat"><div className="lbl">Qualified</div><div className="val">9</div></div>
            <div className="dash-stat"><div className="lbl">Booked</div><div className="val">7</div></div>
          </div>
          <div className="dash-list">
            <div className="row">
              <div><div className="nm">Sarah Kelly</div><div className="sub">Leak repair · BS6 · 48h urgency</div></div>
              <span className="pill new">New</span>
              <span className="sub mono">14:04</span>
            </div>
            <div className="row">
              <div><div className="nm">Mark Davies</div><div className="sub">Boiler service · BS3 · this week</div></div>
              <span className="pill qual">Qualified</span>
              <span className="sub mono">13:48</span>
            </div>
            <div className="row">
              <div><div className="nm">J. Patel</div><div className="sub">Bathroom refit · BS7 · flexible</div></div>
              <span className="pill bk">Booked</span>
              <span className="sub mono">12:17</span>
            </div>
            <div className="row">
              <div><div className="nm">Tom Reeves</div><div className="sub">Drain unblock · BS4 · urgent</div></div>
              <span className="pill qual">Qualified</span>
              <span className="sub mono">11:02</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// ----------------- Phone mockup (hero v4) -----------------
function PhoneFeed() {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="phone-statbar">
          <span>9:41</span>
          <span className="icons">●●●●●  100%</span>
        </div>

        <div className="phone-notif" style={{ animationDelay: "0ms" }}>
          <div className="ic miss"><IconPhoneMissed /></div>
          <div>
            <div className="h">Missed call · Sarah K.</div>
            <div className="b">BackIn5 sent an instant text-back</div>
          </div>
          <div className="t">14:02</div>
        </div>

        <div className="phone-notif" style={{ animationDelay: "150ms" }}>
          <div className="ic"><IconMessage /></div>
          <div>
            <div className="h">Reply received</div>
            <div className="b">"Kitchen tap leaking, bit urgent..."</div>
          </div>
          <div className="t">14:03</div>
        </div>

        <div className="phone-notif" style={{ animationDelay: "300ms" }}>
          <div className="ic"><IconCheckCircle /></div>
          <div>
            <div className="h">Lead qualified</div>
            <div className="b">Leak repair · 48h urgency · BS6</div>
          </div>
          <div className="t">14:04</div>
        </div>

        <div className="phone-notif" style={{ animationDelay: "450ms" }}>
          <div className="ic good"><IconCalendar /></div>
          <div>
            <div className="h">Booked into diary</div>
            <div className="b">Thursday 9:30 AM · confirmed by SMS</div>
          </div>
          <div className="t">14:04</div>
        </div>

        <div className="phone-notif" style={{ animationDelay: "600ms" }}>
          <div className="ic"><IconBell /></div>
          <div>
            <div className="h">3 more enquiries handled</div>
            <div className="b">View today's brief in the app</div>
          </div>
          <div className="t">14:11</div>
        </div>
      </div>
    </div>);

}

// ----------------- Hero variants -----------------
function HeroV1({ headline, lead }) {
  // Split with panel carousel (5 panels of value-prop copy)
  return (
    <div className="hero-split">
      <div>
        <h1 className="display-hero" style={{ fontSize: "60px" }}>{headline}</h1>
        <div style={{ height: 28 }} />
        <p className="hero-lead">{lead}</p>
        <div style={{ height: 32 }} />
        <div className="hero-cta-row">
          <a href="trial.html" className="btn btn-trial btn-lg btn-arrow">
            Start 7-day free trial <IconArrowRight size={16} />
          </a>
          <a href="see-the-system.html" className="btn btn-ghost-dark btn-lg">How does it work?</a>
        </div>
      </div>
      <PanelCarousel />
    </div>);

}

function HeroV2({ headline, lead }) {
  // Editorial - centered massive type
  return (
    <div className="hero-editorial">
      <span className="hero-eyebrow"><span className="pulse" />Built for busy trades firms</span>
      <h1 className="display-hero" style={{ fontSize: "clamp(56px, 10vw, 156px)", lineHeight: 0.94 }}>
        {headline}
      </h1>
      <div style={{ height: 36 }} />
      <p className="hero-lead" style={{ fontSize: 21 }}>{lead}</p>
      <div style={{ height: 40 }} />
      <div className="hero-cta-row">
        <a href="#pricing" className="btn btn-primary btn-lg btn-arrow">
          Start free trial <IconArrowRight size={16} />
        </a>
        <a href="see-the-system.html" className="btn btn-ghost-dark btn-lg">See how it works</a>
      </div>
    </div>);

}

function HeroV3({ headline, lead }) {
  // Split with dashboard mockup
  return (
    <div className="hero-dash">
      <div>
        <span className="hero-eyebrow"><span className="pulse" />Every enquiry. In one place.</span>
        <h1 className="display-hero">{headline}</h1>
        <div style={{ height: 28 }} />
        <p className="hero-lead">{lead}</p>
        <div style={{ height: 32 }} />
        <div className="hero-cta-row">
          <a href="trial.html" className="btn btn-primary btn-lg btn-arrow">
            Start free trial <IconArrowRight size={16} />
          </a>
          <a href="see-the-system.html" className="btn btn-ghost-dark btn-lg">See how it works</a>
        </div>
      </div>
      <MiniDashboard />
    </div>);

}

function HeroV4({ headline, lead }) {
  // Phone mockup
  return (
    <div className="hero-phone-grid">
      <div>
        <span className="hero-eyebrow"><span className="pulse" />Notifications working on your behalf</span>
        <h1 className="display-hero">{headline}</h1>
        <div style={{ height: 28 }} />
        <p className="hero-lead">{lead}</p>
        <div style={{ height: 32 }} />
        <div className="hero-cta-row">
          <a href="trial.html" className="btn btn-primary btn-lg btn-arrow">
            Start free trial <IconArrowRight size={16} />
          </a>
          <a href="see-the-system.html" className="btn btn-ghost-dark btn-lg">See how it works</a>
        </div>
      </div>
      <PhoneFeed />
    </div>);

}

// ----------------- Hero backdrop - 9 technical-drawing tool SVGs -----------------
// 1px strokes, butt caps, miter joins - workshop catalog plate style, not icon-library style.
const ToolSpanner = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M22 18 L30 10 A12 12 0 1 1 18 22 L10 30 L22 42 L66 86 A8 8 0 0 0 78 86 L86 78 A8 8 0 0 0 86 66 L42 22 Z" />
    <circle cx="22.5" cy="17.5" r="3" />
  </svg>
);
const ToolHammer = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M14 18 L46 18 L52 12 L70 12 L70 36 L52 36 L46 30 L14 30 Z" />
    <line x1="14" y1="24" x2="46" y2="24" />
    <path d="M14 22 L20 22 L20 18 M14 26 L20 26 L20 30" />
    <path d="M28 30 L34 30 L78 84 L72 90 Z" />
  </svg>
);
const ToolScrewdriver = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M10 88 L18 80 L34 64 L42 72 L26 88 L18 90 Z" />
    <line x1="34" y1="64" x2="62" y2="36" />
    <line x1="42" y1="72" x2="70" y2="44" />
    <path d="M58 32 L70 44 L66 48 L54 36 Z" />
    <path d="M62 28 L86 4 L94 12 L70 36 Z" />
    <line x1="68" y1="22" x2="80" y2="34" />
    <line x1="74" y1="16" x2="86" y2="28" />
  </svg>
);
const ToolPipe = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M10 40 L60 40 L60 90 L40 90 L40 60 L10 60 Z" />
    <path d="M14 44 L40 44 M14 56 L40 56" />
    <path d="M44 60 L44 86 M56 60 L56 86" />
    <circle cx="50" cy="50" r="6" />
  </svg>
);
const ToolPlane = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <rect x="6" y="42" width="88" height="16" />
    <circle cx="50" cy="50" r="5" />
    <line x1="45" y1="50" x2="55" y2="50" />
    <line x1="20" y1="42" x2="20" y2="58" />
    <line x1="80" y1="42" x2="80" y2="58" />
  </svg>
);
const ToolDrill = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M22 28 L62 28 L62 50 L22 50 Z" />
    <path d="M62 32 L72 32 L72 46 L62 46 Z" />
    <line x1="72" y1="39" x2="92" y2="39" />
    <path d="M86 36 L92 39 L86 42" />
    <path d="M32 50 L52 50 L48 84 L36 84 Z" />
    <path d="M40 54 L46 54 L46 60 L40 60 Z" />
  </svg>
);
const ToolBlueprint = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <rect x="10" y="14" width="80" height="60" />
    <path d="M18 22 L40 22 L40 38 L58 38 L58 22 L82 22" />
    <path d="M18 50 L82 50" />
    <path d="M18 60 L60 60" />
    <line x1="18" y1="68" x2="18" y2="72" />
    <line x1="82" y1="68" x2="82" y2="72" />
    <line x1="18" y1="70" x2="82" y2="70" />
  </svg>
);
const ToolTape = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M14 30 L70 30 A20 20 0 0 1 70 70 L34 70 A20 20 0 0 1 14 50 Z" />
    <circle cx="42" cy="50" r="14" />
    <circle cx="42" cy="50" r="4" />
    <path d="M70 46 L92 46 L92 54 L70 54" />
    <line x1="76" y1="46" x2="76" y2="54" />
    <line x1="82" y1="46" x2="82" y2="54" />
    <line x1="88" y1="46" x2="88" y2="54" />
  </svg>
);
const ToolSaw = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
       stroke="currentColor" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M10 56 L82 56 L82 64 L10 64 Z" />
    <path d="M10 64 L14 70 L18 64 L22 70 L26 64 L30 70 L34 64 L38 70 L42 64 L46 70 L50 64 L54 70 L58 64 L62 70 L66 64 L70 70 L74 64 L78 70 L82 64" />
    <path d="M82 50 L94 50 L94 74 L82 74 Z M82 60 Q88 56 92 60 M82 62 Q88 66 92 62" />
  </svg>
);

function HeroBackdrop() {
  const items = [
    { I: ToolSpanner,     top: "10%", left: "6%",  size: 130, rot: -18, op: 0.060 },
    { I: ToolPipe,        top: "70%", left: "5%",  size: 140, rot:  12, op: 0.050 },
    { I: ToolPlane,       top: "40%", left: "12%", size: 110, rot:  -4, op: 0.050 },
    { I: ToolBlueprint,   top: "8%",  left: "44%", size: 150, rot:  -3, op: 0.045 },
    { I: ToolHammer,      top: "86%", left: "32%", size: 120, rot:  22, op: 0.055 },
    { I: ToolScrewdriver, top: "12%", left: "82%", size: 130, rot:  26, op: 0.055 },
    { I: ToolTape,        top: "44%", left: "92%", size: 110, rot: -10, op: 0.050 },
    { I: ToolDrill,       top: "76%", left: "82%", size: 130, rot: -16, op: 0.055 },
    { I: ToolSaw,         top: "82%", left: "62%", size: 130, rot:   6, op: 0.050 },
  ];
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop-grid" />
      <div className="hero-backdrop-tics">
        <span className="tic tl" /><span className="tic tr" />
        <span className="tic bl" /><span className="tic br" />
      </div>
      {items.map(({ I, top, left, size, rot, op }, i) => (
        <span key={i} className="hero-backdrop-ic"
          style={{ top, left, transform: `translate(-50%,-50%) rotate(${rot}deg)`, opacity: op }}>
          <I size={size} />
        </span>
      ))}
    </div>
  );
}

function Hero({ variant }) {
  const headline =
  <React.Fragment>
      Missed enquiries are costing you <em style={{ color: "rgb(52, 80, 179)" }}>business.</em>
    </React.Fragment>;

  const lead =
  <React.Fragment>
      Catches the work you're missing. Replies before they walk. Yours to win.
    </React.Fragment>;

  return (
    <section className="hero" id="top">
      <HeroBackdrop />
      <div className="container hero-inner">
        {variant === "transcript" && <HeroV1 headline={headline} lead={lead} />}
        {variant === "editorial" && <HeroV2 headline={
        <React.Fragment>Voicemail<br />doesn't book jobs.<br /><em>BackIn5</em> does.</React.Fragment>
        } lead={lead} />}
        {variant === "dashboard" && <HeroV3 headline={headline} lead={lead} />}
        {variant === "phone" && <HeroV4 headline={headline} lead={lead} />}
      </div>

      <div className="trust-strip">
        <div className="container trust-row">
          <span className="item">TRUSTED BY INDEPENDENTS AND FIRMS</span>
          <span className="item">BUILT FOR BUSY TRADES</span>
          <span className="item" style={{ color: "rgb(255, 255, 255)" }}>NO CALL CENTRE, NO STAFF</span>
          <span className="item">LIVE DASHBOARD INCLUDED</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Nav, Hero, TranscriptCard, MiniDashboard, PhoneFeed, PanelCarousel });