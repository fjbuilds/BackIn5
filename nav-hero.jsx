/* eslint-disable */
// Nav + Hero with 4 variants — exposed on window for app.jsx to consume.

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
          <a className="nav-link" href="#built-for">Who if this for?</a>
          <a className="nav-link" href="#how">How does it work?</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#faqs">FAQs</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
        <div className="nav-cta">
          <a href="#contact" className="btn btn-primary btn-sm nav-cta-btn">Get Started</a>
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
          <a className="nav-drawer-link" href="#how" onClick={close}>How does it work?</a>
          <a className="nav-drawer-link" href="#pricing" onClick={close}>Pricing</a>
          <a className="nav-drawer-link" href="#faqs" onClick={close}>FAQs</a>
          <a className="nav-drawer-link" href="#contact" onClick={close}>Contact</a>
          <a href="#contact" className="btn btn-primary btn-lg nav-drawer-cta" onClick={close}>
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
  const pad2 = (n) => String(n).padStart(2, "0");
  return (
    <div className="panel-carousel">
      <div className="panel-head">
        <div className="panel-mark-row">
          <span className="panel-mark-label">
</span>
        </div>
        <div className="panel-counter">
          <span className="now">{pad2(idx + 1)}</span>
          <span className="sep"> / </span>
          <span className="total">{pad2(HERO_PANELS.length)}</span>
        </div>
      </div>
      <div className="panel-stage">
        {HERO_PANELS.map((p, i) => <div key={i} className={"panel " + (i === idx ? "active" : i < idx ? "past" : "future")}>
            <div className="panel-bignum">{pad2(i + 1)}</div>
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
            <div className="msg">Caller rang while you were on the job — voicemail not left.</div>
          </div>
        </div>

        <div className="tline system" style={{ animationDelay: "120ms" }}>
          <div className="ts">14:02</div>
          <div className="body-cell">
            <span className="tag">BackIn5 · Text-back</span>
            <div className="msg">
              "Hi Sarah — sorry I missed your call, I'm on a job. I can get back to you within 5 minutes.
              Quick question: what do you need help with?"
            </div>
          </div>
        </div>

        <div className="tline customer" style={{ animationDelay: "240ms" }}>
          <div className="ts">14:03</div>
          <div className="body-cell">
            <span className="tag">Sarah</span>
            <div className="msg">Kitchen tap is leaking under the sink. Bit urgent — got a dinner party Friday.</div>
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
        <p className="hero-lead" style={{ marginTop: 18, fontSize: 16, color: "rgba(234,236,241,0.5)" }}>Built to Save Time and Stop Customers Shopping Around.

        </p>
        <div style={{ height: 32 }} />
        <div className="hero-cta-row">
          <a href="#how" className="btn btn-primary btn-lg btn-arrow">
            How does it work? <IconArrowRight size={16} />
          </a>
          <a href="#pricing" className="btn btn-ghost-dark btn-lg">How much does it cost?</a>
          <span className="hero-cta-note"></span>
        </div>
      </div>
      <PanelCarousel />
    </div>);

}

function HeroV2({ headline, lead }) {
  // Editorial — centered massive type
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
        <a href="#how" className="btn btn-ghost-dark btn-lg">See how it works</a>
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
          <a href="#pricing" className="btn btn-primary btn-lg btn-arrow">
            Start free trial <IconArrowRight size={16} />
          </a>
          <a href="#how" className="btn btn-ghost-dark btn-lg">See how it works</a>
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
          <a href="#pricing" className="btn btn-primary btn-lg btn-arrow">
            Start free trial <IconArrowRight size={16} />
          </a>
          <a href="#how" className="btn btn-ghost-dark btn-lg">See how it works</a>
        </div>
      </div>
      <PhoneFeed />
    </div>);

}

function Hero({ variant }) {
  const headline =
  <React.Fragment>
      The Modern Way For Trades Businesses to <br />
      <em style={{ color: "rgb(52, 80, 179)", fontSize: "60px" }}>Handle Admin</em>.
    </React.Fragment>;

  const lead =
  <React.Fragment>
      24/7 Customer Handling | Automatic Text and Callbacks<br />
      Website, Social Media and Trade-site Enquiries Handled
    </React.Fragment>;

  return (
    <section className="hero" id="top">
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
          <span className="item" style={{ color: "rgb(255, 255, 255)" }}>ENQUIRIES HANDLED 24/7</span>
          <span className="item">NO CHASING. NO ADMIN.</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Nav, Hero, TranscriptCard, MiniDashboard, PhoneFeed, PanelCarousel });