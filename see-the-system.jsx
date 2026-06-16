/* eslint-disable */
// See The System - self-contained page (nav + sections + footer inline)
// Only external dependency: icons.jsx (small shared file)

const { useEffect: useEffectSTS, useRef: useRefSTS, useState: useStateSTS } = React;

function useReveal() {
  const ref = useRefSTS(null);
  useEffectSTS(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('sts-visible'); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('sts-visible'); obs.unobserve(el); }
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}


// ============================================================
// StsNav
// ============================================================
function StsNav() {
  const [open, setOpen] = useStateSTS(false);
  useEffectSTS(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav className="nav" style={{ backgroundColor: 'rgb(27,33,43)' }}>
      <div className="container nav-inner">
        <a href="index.html" className="nav-brand">
          <img src="assets/backin5-logo-v4.png" alt="BackIn5" className="brand-logo" style={{ width: '106px', height: '24px' }} />
        </a>
        <div className="nav-links">
          <a className="nav-link" href="index.html#built-for">Who is this for?</a>
          <a className="nav-link sts-nav-active" href="see-the-system.html">How does it work?</a>
          <a className="nav-link" href="index.html#pricing">Pricing</a>
          <a className="nav-link" href="index.html#faqs">FAQs</a>
          <a className="nav-link" href="index.html#pricing">Contact</a>
        </div>
        <div className="nav-cta">
          <a href="index.html#pricing" className="btn btn-primary btn-sm nav-cta-btn">Get Started</a>
          <button
            className={'nav-burger ' + (open ? 'is-open' : '')}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={'nav-drawer ' + (open ? 'is-open' : '')} aria-hidden={!open}>
        <div className="nav-drawer-scrim" onClick={() => setOpen(false)} />
        <div className="nav-drawer-panel" role="dialog" aria-label="Site navigation">
          <a className="nav-drawer-link" href="index.html#built-for" onClick={() => setOpen(false)}>Who is this for?</a>
          <a className="nav-drawer-link" href="see-the-system.html" onClick={() => setOpen(false)}>How does it work?</a>
          <a className="nav-drawer-link" href="index.html#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a className="nav-drawer-link" href="index.html#faqs" onClick={() => setOpen(false)}>FAQs</a>
          <a className="nav-drawer-link" href="index.html#pricing" onClick={() => setOpen(false)}>Contact</a>
          <a href="index.html#pricing" className="btn btn-primary btn-lg nav-drawer-cta" onClick={() => setOpen(false)}>
            Get Started <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}


// ============================================================
// StsFooter
// ============================================================
function StsFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="index.html" className="nav-brand">
              <img src="assets/backin5-logo-v4.png" alt="BackIn5" className="brand-logo brand-logo-footer" />
            </a>
            <p className="footer-tag">
              24/7 enquiry handling for busy trades firms.
              Less hassle. Fewer missed jobs. More organised enquiries.
            </p>
            <address className="footer-address">
              BackIn5 Ltd<br />
              Twickenham, TW2<br />
              United Kingdom
            </address>
          </div>
          <div className="footer-col">
            <div className="footer-col-ttl">Explore</div>
            <ul>
              <li><a href="index.html#built-for">Built for</a></li>
              <li><a href="see-the-system.html">How it works</a></li>
              <li><a href="index.html#compare">Comparison</a></li>
              <li><a href="index.html#pricing">Pricing</a></li>
              <li><a href="index.html#faqs">FAQs</a></li>
              <li><a href="index.html#pricing">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 BackIn5 Ltd · Registered in England · Made for trades.</span>
          <span><a href="terms.html" target="_blank" rel="noopener" className="footer-terms-link">Terms</a> · hello@backin5.org</span>
        </div>
      </div>
    </footer>
  );
}


// ============================================================
// SECTION: Hero
// ============================================================
function StsHero() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  return (
    <section className="canvas-dark sts-hero" id="sts-top">
      <div className="container sts-hero-inner">
        <div ref={r1} className="sts-reveal">
          <span className="eyebrow on-dark">How BackIn5 Works</span>
        </div>
        <h1 ref={r2} className="display-hero sts-reveal sts-reveal-d1">
          Here's exactly what happens<br />
          when a customer{' '}
          <span style={{ color: 'var(--accent)' }}>contacts&nbsp;you</span>
        </h1>
        <div className="sts-hero-scroll">
          <span className="caption" style={{ color: 'rgba(234,236,241,0.45)', letterSpacing: '0.06em' }}>
            Scroll to explore
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 10 13 14 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: How It Works (adapted from main site HowItWorks)
// ============================================================
const STS_SCENARIOS = [
  {
    key: 'missed-call',
    title: 'Missed Call',
    sub: 'Caller did not get through',
    icon: 'phone',
    steps: [
      'Missed call comes in while you are on-site',
      'Instant text reply sent within seconds',
      'Job details and photos collected automatically',
      'Callback or site visit booked at a convenient time',
      'Enquiry arrives in your dashboard, ready to quote',
    ],
  },
  {
    key: 'website',
    title: 'Website Enquiry',
    sub: 'Visitor uses your Quote Assistant',
    icon: 'chat',
    steps: [
      'Customer visits your site and opens the Quote Assistant',
      'BackIn5 asks tailored quoting questions for your trade',
      'Photos, postcode, and availability collected upfront',
      'Customer gets an instant holding response - no silence',
      'Enquiry arrives in your dashboard, ready to quote',
    ],
    note: 'Questions are tailored to your trade and how you quote jobs.',
  },
  {
    key: 'whatsapp',
    title: 'WhatsApp Enquiry',
    sub: 'Message drops on your WhatsApp',
    icon: 'message',
    steps: [
      'Customer messages your WhatsApp business number',
      'Instant reply sent, keeping them engaged before they move on',
      'Job details, photos and postcode collected automatically',
      'Customer books a callback or confirms availability',
      'Enquiry arrives in your dashboard, ready to quote',
    ],
  },
  {
    key: 'email',
    title: 'Email Enquiry',
    sub: 'Customer emails in a job request',
    icon: 'chat',
    steps: [
      'Customer sends an email enquiry',
      'Instant acknowledgement sent, no waiting around',
      'BackIn5 follows up to collect job details and photos',
      'Customer confirms availability and next steps',
      'Enquiry arrives in your dashboard, organised and ready to quote',
    ],
  },
  {
    key: 'quote-followup',
    title: 'Quote Follow-Up',
    sub: 'Quote sent - customer gone quiet',
    icon: 'refresh',
    steps: [
      'Quote sent to customer with no response received',
      'BackIn5 follows up automatically after agreed time',
      'Customer re-engages with a gentle, timely nudge',
      'Updated details or decision collected automatically',
      'Enquiry stays active in your dashboard, not forgotten',
    ],
  },
];

function StsScenarioIcon({ icon }) {
  if (icon === 'phone')   return <IconPhoneMissed size={18} />;
  if (icon === 'chat')    return <IconChat size={18} />;
  if (icon === 'message') return <IconMessage size={18} />;
  if (icon === 'star')    return <IconStar size={18} />;
  if (icon === 'clock')   return <IconClock size={18} />;
  if (icon === 'refresh') return <IconRefresh size={18} />;
  return null;
}

function StsHowItWorks() {
  const [activeKey, setActiveKey] = useStateSTS(STS_SCENARIOS[0].key);
  const headRef = useReveal();
  const active = STS_SCENARIOS.find(s => s.key === activeKey) || STS_SCENARIOS[0];

  return (
    <section className="canvas-soft band" id="sts-how">
      <div className="container">
        <div ref={headRef} className="sts-reveal sec-head">
          <span className="eyebrow">How BackIn5 Works</span>
          <h2 className="display">
Every enquiry type, handled.
          </h2>
          <p className="lead">
            Calls, WhatsApp, email, Facebook and website enquiries all covered. BackIn5 captures,
            qualifies and organises every enquiry while your team is busy on-site.
          </p>
        </div>

        <div className="how-split">
          <div className="how-list" role="tablist">
            {STS_SCENARIOS.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={s.key === activeKey}
                className={"how-row " + (s.key === activeKey ? 'active' : '')}
                onClick={() => setActiveKey(s.key)}
              >
                <div className="how-row-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="how-row-icon"><StsScenarioIcon icon={s.icon} /></div>
                <div className="how-row-body">
                  <div className="how-row-title">{s.title}</div>
                  <div className="how-row-sub">{s.sub}</div>
                </div>
                <div className="how-row-arrow"><IconArrowRight size={16} /></div>
              </button>
            ))}
          </div>

          <div className="how-flow" key={activeKey} role="tabpanel">
            <div className="how-flow-head">
              <div>
                <div className="how-flow-tag">What happens</div>
                <div className="how-flow-title">{active.title}</div>
              </div>
              <div className="how-flow-pill">
                <span className="dot" />
                5 steps
              </div>
            </div>

            <div className="flow-steps">
              {active.steps.map((step, i) => {
                const isFinal = i === active.steps.length - 1;
                return (
                  <div
                    key={i}
                    className={"flow-step" + (isFinal ? ' final' : '')}
                    style={{ animationDelay: (80 + i * 160) + 'ms' }}
                  >
                    <div className="flow-rail">
                      <div className="flow-circle">
                        {isFinal ? <IconCheck size={16} /> : String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flow-text">
                      {step}
                      {isFinal && (
                        <span className="sts-dashboard-badge">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="1" width="4" height="4" rx="0.5" fill="var(--accent)" />
                            <rect x="7" y="1" width="4" height="4" rx="0.5" fill="var(--accent)" opacity="0.5" />
                            <rect x="1" y="7" width="4" height="4" rx="0.5" fill="var(--accent)" opacity="0.5" />
                            <rect x="7" y="7" width="4" height="4" rx="0.5" fill="var(--accent)" opacity="0.3" />
                          </svg>
                          Dashboard
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {active.note && (
              <div className="flow-note">
                <span className="flow-note-icon"><IconStar size={14} /></span>
                {active.note}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Quote Assistant - laptop + mobile mockup
// ============================================================
function StsQuoteAssistant() {
  const copyRef = useReveal(), laptopRef = useReveal();
  return (
    <section className="canvas-dark band" id="sts-quote-assistant">
      <div className="container">

        <div className="sts-qa-head sts-reveal" ref={copyRef}>
          <div className="sts-qa-label">
            <span className="sts-feature-tag">Quote Assistant</span>
            <span className="sts-feature-tag-sub">Embedded on your website</span>
          </div>
          <h2 className="sts-qa-title">
            Captures quotes for you.<br />
            <span style={{ color: 'var(--accent)' }}>Around the clock.</span>
          </h2>
          <div className="sts-qa-strip">
            <div className="sts-qa-strip-item">
              <div className="sts-qa-strip-label">Always on</div>
              <div className="sts-qa-strip-desc">Evenings, weekends, bank holidays - never misses an enquiry</div>
            </div>
            <div className="sts-qa-strip-item">
              <div className="sts-qa-strip-label">Your questions</div>
              <div className="sts-qa-strip-desc">You set what gets asked - every lead arrives with the detail you need to quote</div>
            </div>
            <div className="sts-qa-strip-item">
              <div className="sts-qa-strip-label">We set it up</div>
              <div className="sts-qa-strip-desc">Embedded on your site within 24 hours - no technical effort required from you</div>
            </div>
          </div>
        </div>

        <div ref={laptopRef} className="sts-reveal sts-reveal-d1 sts-laptop-wrap">
         <div className="sts-devices">
          {/* Laptop mockup */}
          <div className="sts-laptop">
            <div className="sts-laptop-screen">
              <div className="sts-fake-browser">
                <div className="sts-fake-browser-bar">
                  <div className="sts-mac-dots">
                    <span style={{ background: '#FF5F57' }} />
                    <span style={{ background: '#FEBC2E' }} />
                    <span style={{ background: '#28C840' }} />
                  </div>
                  <div className="sts-fake-url">yourlocaltrades.co.uk</div>
                </div>
                <div className="sts-fake-site">
                  {/* Top utility bar */}
                  <div className="sts-fake-topbar">
                    <span>Mon-Fri: 8am - 6pm</span>
                    <span className="sts-fake-topbar-phone">Call: 0800 000 0000</span>
                  </div>
                  {/* Site nav */}
                  <div className="sts-fake-site-nav">
                    <div className="sts-fake-logo-wrap">
                      <div className="sts-fake-logo-mark">YT</div>
                      <span className="sts-fake-logo">Your Local Trades Ltd</span>
                    </div>
                    <div className="sts-fake-nav-links">
                      <span className="sts-fake-nav-link sts-fake-nav-active">Home</span>
                      <span className="sts-fake-nav-link">Services</span>
                      <span className="sts-fake-nav-link">Gallery</span>
                      <span className="sts-fake-nav-link">Contact</span>
                    </div>
                  </div>
                  {/* Photo hero */}
                  <div className="sts-fake-photohero">
                    <div className="sts-fake-photohero-overlay" />
                    <div className="sts-fake-photohero-content">
                      <div className="sts-fake-member">Proud member of <strong>Checkatrade</strong></div>
                      <div className="sts-fake-hero-text">RELIABLE LOCAL TRADESPEOPLE<br/>YOU CAN TRUST</div>
                      <div className="sts-fake-hero-sub">Building · Plumbing · Electrical · Repairs &amp; Maintenance</div>
                      <div className="sts-fake-phonebox">
                        Call <strong>0800 000 0000</strong> for a free no-obligation quote
                      </div>
                    </div>
                    <div className="sts-fake-experience-badge">
                      <span className="sts-fake-exp-num">25</span>
                      <span className="sts-fake-exp-label">YEARS</span>
                    </div>
                  </div>
                  {/* Trust badge strip */}
                  <div className="sts-fake-trustbar">
                    <span className="sts-fake-trust-item">City &amp; Guilds</span>
                    <span className="sts-fake-trust-item">Google ★★★★★</span>
                    <span className="sts-fake-trust-item">Trustpilot</span>
                    <span className="sts-fake-trust-item">MyBuilder</span>
                  </div>
                  {/* Embedded BackIn5 widget — mirrors the live widget at backin5.org/demo.html */}
                  <div className="sts-widget">
                    <div className="sts-widget-header">
                      <div className="sts-widget-headleft">
                        <span className="sts-widget-dot" />
                        <span className="sts-widget-name">Get a Quote</span>
                      </div>
                      <span className="sts-widget-close" aria-hidden="true">×</span>
                    </div>
                    <div className="sts-widget-body">
                      <div className="sts-wm sts-wm-bot">Hi, thanks for getting in touch with Tradesman Ltd. I'll ask a few quick questions so we can get the right details over to the team.</div>
                      <div className="sts-wm sts-wm-bot">What do you need help with?</div>
                      <div className="sts-wm sts-wm-user">General repair</div>
                      <div className="sts-wm sts-wm-bot">What is the postcode for the job?</div>
                      <div className="sts-wm sts-wm-user">SW1A 1AA</div>
                      <div className="sts-wm sts-wm-bot">How urgent is it?</div>
                      <div className="sts-wm sts-wm-user">As soon as possible</div>
                      <div className="sts-wm sts-wm-bot">What would you like to happen next?</div>
                      <div className="sts-widget-presets sts-presets-used">
                        <span className="sts-preset-btn">Call me back</span>
                        <span className="sts-preset-btn">Get a quote</span>
                        <span className="sts-preset-btn">Request a visit</span>
                        <span className="sts-preset-btn sts-preset-active">Book directly</span>
                      </div>
                    </div>
                    <div className="sts-widget-inputbar">
                      <span className="sts-widget-input-placeholder">Type here…</span>
                      <div className="sts-widget-send">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sts-laptop-base">
              <div className="sts-laptop-hinge" />
              <div className="sts-laptop-foot" />
            </div>
          </div>{/* end .sts-laptop */}

            {/* Phone — calendar booking step, the moment a customer reserves a slot */}
            <div className="sts-mobile-badge">
            <div className="sts-mobile-phone">
              <div className="sts-mobile-notch" />
              <div className="sts-mobile-content">
                <div className="sts-mobile-widget-header">
                  <span className="sts-widget-dot" />
                  <div className="sts-mobile-widget-title">Get a Quote</div>
                  <span className="sts-widget-close" aria-hidden="true">×</span>
                </div>

                <div className="sts-mobile-chat sts-mobile-chat-cal">
                  <div className="sts-wm sts-wm-bot">Great - please choose an available time below.</div>

                  <div className="sts-mini-cal">
                    <div className="sts-mini-cal-head">
                      <span className="sts-mini-cal-nav">‹</span>
                      <span className="sts-mini-cal-month">June 2026</span>
                      <span className="sts-mini-cal-nav">›</span>
                    </div>
                    <div className="sts-mini-cal-grid">
                      {['M','T','W','T','F','S','S'].map((d, i) => (
                        <span key={'h'+i} className="sts-mini-cal-dh">{d}</span>
                      ))}
                      {/* June 2026 starts on Monday — no padding cells */}
                      {Array.from({length: 30}, (_, i) => {
                        const day = i + 1
                        const dow = i % 7 // 0=Mon
                        const isPast = day < 22
                        const isWeekend = dow >= 5
                        const isSelected = day === 23
                        let cls = 'sts-mini-cal-day'
                        if (isSelected) cls += ' sel'
                        else if (isPast || isWeekend) cls += ' off'
                        return <span key={day} className={cls}>{day}</span>
                      })}
                    </div>
                  </div>

                  <div className="sts-mini-cal-times-label">Choose a time:</div>
                  <div className="sts-mini-cal-slots">
                    <span className="sts-mini-cal-slot">9:00am</span>
                    <span className="sts-mini-cal-slot">10:00am</span>
                    <span className="sts-mini-cal-slot sel">11:00am</span>
                    <span className="sts-mini-cal-slot">1:00pm</span>
                    <span className="sts-mini-cal-slot">2:00pm</span>
                    <span className="sts-mini-cal-slot">3:00pm</span>
                  </div>

                  <div className="sts-mini-cal-confirm">Confirm - 23/06 at 11:00am</div>
                  <div className="sts-mini-cal-skip">Skip for now - team will arrange</div>
                </div>
              </div>
            </div>
            <div className="sts-mobile-label">Calendar booking</div>
          </div>
         </div>{/* end .sts-devices */}

          <p className="sts-phone-caption">
            Your customers see this on your website - desktop and mobile. You set the questions.
          </p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Every Channel Covered (replaces "Your alert, your call")
// ============================================================
function StsChannels() {
  const headRef = useReveal(), vizRef = useReveal(), copyRef = useReveal();
  return (
    <section className="canvas-light band" id="sts-alerts">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal">
          <span className="eyebrow">Fully Customisable</span>
          <h2 className="display">Every channel, one place</h2>
          <p className="lead">
            Whether a customer enquires via your website or calls your number - every enquiry ends
            up as a full quote in your dashboard. You stay in control of how it gets there.
          </p>
        </div>

        <div ref={vizRef} className="sts-reveal sts-channels-wrap">
          {/* Channel sources */}
          <div className="sts-channels-row">
            <div className="sts-channel-card">
              <div className="sts-channel-icon sts-ch-web">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 8h18" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="6" r="1" fill="currentColor"/>
                  <circle cx="8" cy="6" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div className="sts-channel-label">Website Enquiry</div>
              <div className="sts-channel-desc">Quote Assistant on your site takes the full job details and replies instantly</div>
            </div>

            <div className="sts-channel-card">
              <div className="sts-channel-icon sts-ch-phone">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M6 2h10a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="11" cy="17" r="1.2" fill="currentColor"/>
                </svg>
              </div>
              <div className="sts-channel-label">Phone Call</div>
              <div className="sts-channel-desc">If someone calls, we auto-text them a quote link - so no job is ever lost to voicemail</div>
            </div>

            <div className="sts-channel-card">
              <div className="sts-channel-icon sts-ch-msg">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 4h14a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 3V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="sts-channel-label">Message / DM</div>
              <div className="sts-channel-desc">Facebook, WhatsApp, or any other channel - all handled and funnelled to one place</div>
            </div>
          </div>

          {/* Funnel arrow */}
          <div className="sts-channels-funnel">
            <div className="sts-funnel-line" />
            <div className="sts-funnel-label">BackIn5 handles it</div>
            <div className="sts-funnel-line" />
          </div>

        </div>

        <p ref={copyRef} className="sts-reveal sts-alerts-copy" style={{ transitionDelay: '0.2s' }}>
          One system. All channels. <strong>Every enquiry organised with full quote details.</strong>
        </p>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Enquiry Board (Kanban)
// ============================================================
const BOARD_COLS = [
  {
    id: 'new', label: 'New', count: 3, accent: 'var(--accent)',
    cards: [
      {
        name: 'Mike Thompson', location: 'SE London', type: 'Flat roof replacement',
        sub: 'Garage approx 6x4m', time: '14 mins ago', tag: 'Urgent', cls: 'sts-tag-urgent',
        source: 'Website', budget: 'Open',
      },
      {
        name: 'Sandra K', location: 'Bristol', type: 'Bathroom refit',
        sub: 'Full suite replacement', time: '41 mins ago', tag: 'Residential', cls: 'sts-tag-res',
        source: 'Phone (auto-text)', budget: 'TBC',
      },
      {
        name: 'R. Patel', location: 'Manchester', type: 'Office boiler service',
        sub: 'Annual maintenance contract', time: '1 hr ago', tag: 'Commercial', cls: 'sts-tag-comm',
        source: 'Checkatrade', budget: '£500-1k',
      },
    ],
  },
  {
    id: 'wip', label: 'In Progress', count: 2, accent: 'var(--warn)',
    cards: [
      {
        name: 'Dave H', location: 'Leeds', type: 'Loft conversion quote',
        sub: 'Full planning required', time: '3 hrs ago', tag: 'Residential', cls: 'sts-tag-res',
        source: 'Facebook DM', budget: '£30-50k',
      },
      {
        name: 'Claire M', location: 'Norwich', type: 'Blocked drain',
        sub: 'Outside rear of property', time: '5 hrs ago', tag: 'Urgent', cls: 'sts-tag-urgent',
        source: 'Website', budget: 'Under £500',
      },
    ],
  },
  {
    id: 'quoted', label: 'Quoted', count: 3, accent: 'var(--ok)',
    cards: [
      {
        name: 'Tom B', location: 'Birmingham', type: 'Car park resurfacing',
        sub: '2,000 sqft area', time: 'Yesterday', tag: 'Commercial', cls: 'sts-tag-comm',
        source: 'Website', budget: '£8-12k', dim: true,
      },
      {
        name: 'Priya S', location: 'London', type: 'Kitchen rewire',
        sub: 'Full ring main update', time: '2 days ago', tag: 'Residential', cls: 'sts-tag-res',
        source: 'Website', budget: '£2-3k', dim: true,
      },
      {
        name: 'G. Watkins', location: 'Cardiff', type: 'Roof repair',
        sub: 'Storm damage, 3 tiles', time: '2 days ago', tag: 'Residential', cls: 'sts-tag-res',
        source: 'Phone (auto-text)', budget: 'Under £500', dim: true,
      },
    ],
  },
];

function JobCard({ card }) {
  return (
    <div className={'sts-job-card' + (card.dim ? ' sts-job-dim' : '')}>
      <div className="sts-job-top">
        <div className="sts-job-name">{card.name}</div>
        <span className={'sts-tag ' + card.cls}>{card.tag}</span>
      </div>
      <div className="sts-job-type">{card.type}</div>
      <div className="sts-job-sub">{card.sub}</div>
      <div className="sts-job-meta">
        <span className="sts-job-location">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginRight: '3px' }}>
            <circle cx="5" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5 9C5 9 2 6.5 2 4a3 3 0 016 0C8 6.5 5 9 5 9z" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          {card.location}
        </span>
        <span className="sts-job-source">{card.source}</span>
      </div>
      <div className="sts-job-bottom">
        <span className="sts-job-budget">{card.budget}</span>
        <span className="sts-job-time">{card.time}</span>
      </div>
    </div>
  );
}

function BoardCol({ col, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="sts-reveal sts-board-col"
      style={{ transitionDelay: delay + 's', borderTopColor: col.accent }}>
      <div className="sts-board-col-header">
        <span className="sts-board-col-label" style={{ color: col.accent }}>{col.label}</span>
        <span className="sts-board-col-count">{col.count}</span>
      </div>
      {col.cards.map((c, i) => <JobCard key={i} card={c} />)}
    </div>
  );
}

function StsBoard() {
  const headRef = useReveal(), ph1Ref = useReveal(), ph2Ref = useReveal(), ctaRef = useReveal();
  return (
    <section className="canvas-dark band" id="sts-enquiry-board">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal">
          <span className="eyebrow on-dark">Your Live Dashboard</span>
          <h2 className="display">Every job, in one place</h2>
          <p className="lead">
            A real-time view of every enquiry - colour-coded by what needs doing next, and ready to act on with one tap.
          </p>
        </div>

        <div className="sts-shots-grid sts-shots-grid-2">
          <div ref={ph1Ref} className="sts-shot-card sts-reveal">
            <div className="sts-phone-frame">
              <img src="assets/dashboard/01-main-overview.png" alt="BackIn5 dashboard - enquiry list grouped by action tag" loading="lazy" />
            </div>
            <div className="sts-shot-copy">
              <h3 className="sts-shot-title">Every enquiry, already sorted</h3>
              <p className="sts-shot-sub">Grouped by what needs doing - calls back, quotes, visits, booked jobs. Urgency badge top-right of every card.</p>
            </div>
          </div>

          <div ref={ph2Ref} className="sts-shot-card sts-reveal sts-reveal-d1">
            <div className="sts-phone-frame">
              <img src="assets/dashboard/04-map-view.png" alt="BackIn5 dashboard - map view with colour-coded job pins" loading="lazy" />
            </div>
            <div className="sts-shot-copy">
              <h3 className="sts-shot-title">Plan your day by area</h3>
              <p className="sts-shot-sub">Every job pinned on the map. Cluster jobs in the same area into one efficient run. Less driving, more billable hours.</p>
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="sts-demo-cta sts-reveal">
          <a href="https://fjbuilds.github.io/backin5-pwa/?demo" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-arrow">
            See the dashboard yourself <IconArrowRight size={16} />
          </a>
          <span className="sts-demo-note">Live demo. No signup. Have a click around.</span>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Full Detail View
// ============================================================
function StsEnquiryDetail() {
  const headRef = useReveal(), ph1Ref = useReveal(), ph2Ref = useReveal();
  return (
    <section className="canvas-light band" id="sts-enquiry-card">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal">
          <span className="eyebrow">One-tap Actions</span>
          <h2 className="display">Everything you need - one tap from action</h2>
          <p className="lead">
            Tap any enquiry to open it inline. Call, message, book and chase straight from the card. Auto follow-ups make sure nothing slips.
          </p>
        </div>

        <div className="sts-shots-grid sts-shots-grid-2">
          <div ref={ph1Ref} className="sts-shot-card sts-reveal">
            <div className="sts-phone-frame">
              <img src="assets/dashboard/02-expanded-card.png" alt="Expanded enquiry card with call, SMS, WhatsApp, voice note buttons" loading="lazy" />
            </div>
            <div className="sts-shot-copy">
              <h3 className="sts-shot-title">Call, message, book - inline</h3>
              <p className="sts-shot-sub">No screen jumping. Open the enquiry, see the whole picture, act on it - all from the same place.</p>
            </div>
          </div>

          <div ref={ph2Ref} className="sts-shot-card sts-reveal sts-reveal-d1">
            <div className="sts-phone-frame">
              <img src="assets/dashboard/03-followups.png" alt="Follow-ups tab with overdue and today reminders" loading="lazy" />
            </div>
            <div className="sts-shot-copy">
              <h3 className="sts-shot-title">Stop losing jobs to silence</h3>
              <p className="sts-shot-sub">The dashboard chases for you. Quotes to follow up. Bookings to confirm. Customers to ask for a review.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// OLD: fake detail-card mockup — kept for easy revert if preferred
// (no longer rendered)
// ============================================================
function StsEnquiryDetailLegacy() {
  const headRef = useReveal(), cardRef = useReveal();
  return (
    <section className="canvas-light band" id="sts-enquiry-card-legacy">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal">
          <span className="eyebrow">Full Detail View</span>
          <h2 className="display">Everything a tradie needs to know</h2>
          <p className="lead">
            Click any job card to see the full picture - contact, location, scope, notes, and source. Ready to call back or quote.
          </p>
        </div>
        <div ref={cardRef} className="sts-reveal sts-detail-wrap">
          <div className="sts-detail-card">
            <div className="sts-detail-topbar">
              <div className="sts-detail-badge">
                <span className="sts-status-dot" style={{ background: 'var(--ok)' }} />
                New Enquiry - Website
              </div>
              <div className="sts-detail-time">Today, 09:15 · 14 mins ago</div>
            </div>
            <div className="sts-detail-body">
              <div className="sts-detail-row2">
                <div className="sts-detail-field">
                  <div className="sts-detail-label">Customer Name</div>
                  <div className="sts-detail-value sts-detail-large">Mike Thompson</div>
                </div>
                <div className="sts-detail-field">
                  <div className="sts-detail-label">Contact Number</div>
                  <div className="sts-detail-value sts-detail-mono">07XXX XXX XXX</div>
                </div>
              </div>
              <div className="sts-detail-row2">
                <div className="sts-detail-field">
                  <div className="sts-detail-label">Location</div>
                  <div className="sts-detail-value">Southeast London, SE1</div>
                </div>
                <div className="sts-detail-field">
                  <div className="sts-detail-label">Preferred Contact Time</div>
                  <div className="sts-detail-value">Mornings - before 10am</div>
                </div>
              </div>
              <div className="sts-detail-field">
                <div className="sts-detail-label">Job Type</div>
                <div className="sts-detail-value">Flat roof replacement - GRP or felt, open to recommendation</div>
              </div>
              <div className="sts-detail-row2">
                <div className="sts-detail-field">
                  <div className="sts-detail-label">Estimated Scope</div>
                  <div className="sts-detail-value">Garage, approx 6x4m</div>
                </div>
                <div className="sts-detail-field">
                  <div className="sts-detail-label">Budget Range</div>
                  <div className="sts-detail-value">Open - wants best value for longevity</div>
                </div>
              </div>
              <div className="sts-detail-field">
                <div className="sts-detail-label">Customer Notes</div>
                <div className="sts-detail-notes">
                  "Current roof is about 12 years old and has started bubbling. Patched twice - time for a full replacement.
                  Happy to go with whichever material you recommend. Flexible on timing, preferably next few weeks."
                </div>
              </div>
              <div className="sts-detail-field">
                <div className="sts-detail-label">Photos</div>
                <div className="sts-detail-photos">
                  <div className="sts-photo-thumb">IMG_001.jpg</div>
                  <div className="sts-photo-thumb">IMG_002.jpg</div>
                  <div className="sts-photo-thumb sts-photo-more">+2 more</div>
                </div>
              </div>
              <div className="sts-detail-divider" />
              <div className="sts-detail-actions">
                <a href="index.html#pricing" className="btn btn-ghost-light btn-sm">📞 Call Back</a>
                <a href="index.html#pricing" className="btn btn-ghost-light btn-sm">✉️ Send Quote</a>
                <a href="index.html#pricing" className="btn btn-primary btn-sm">✓ Mark as Quoted</a>
              </div>
            </div>
          </div>
          <p className="sts-phone-caption" style={{ marginTop: '24px' }}>
            <strong>Nothing falls through the cracks.</strong> Every enquiry captured and organised automatically.
          </p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Getting Started
// ============================================================
const SETUP_STEPS = [
  {
    num: '01',
    title: 'Tell us about your business',
    desc: 'Fill in a quick setup form - your trade, typical jobs, and how you like to quote. Takes about 3 minutes.',
    visual: 'form',
  },
  {
    num: '02',
    title: 'We configure everything for you',
    desc: 'We build your Quote Assistant, set up your Enquiry Board, and connect your SMS and email alerts. You confirm a few details.',
    visual: 'config',
  },
  {
    num: '03',
    title: 'Go live within 24 hours',
    desc: 'We embed the enquiry system into your website and provide you with your live dashboard. First enquiry lands - you will see exactly how it works.',
    visual: 'live',
  },
];

function SetupStep({ step, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="sts-reveal sts-setup-step-new" style={{ transitionDelay: delay + 's' }}>
      <div className="sts-setup-visual">
        {step.visual === 'form' && (
          <div className="sts-setup-art sts-art-form">
            <div className="sts-art-line" /><div className="sts-art-line sts-art-short" />
            <div className="sts-art-field" /><div className="sts-art-field sts-art-field-wide" />
            <div className="sts-art-btn" />
          </div>
        )}
        {step.visual === 'config' && (
          <div className="sts-setup-art sts-art-config">
            <div className="sts-art-dot sts-art-dot-1" />
            <div className="sts-art-dot sts-art-dot-2" />
            <div className="sts-art-dot sts-art-dot-3" />
            <div className="sts-art-arc" />
          </div>
        )}
        {step.visual === 'live' && (
          <div className="sts-setup-art sts-art-live">
            <div className="sts-art-pulse" />
            <div className="sts-art-card-mini">
              <div className="sts-art-mini-line" />
              <div className="sts-art-mini-line sts-art-short" />
            </div>
          </div>
        )}
      </div>
      <div className="sts-setup-num-new">{step.num}</div>
      <div className="sts-setup-title-new">{step.title}</div>
      <div className="sts-setup-desc-new">{step.desc}</div>
    </div>
  );
}

function StsSetup() {
  const headRef = useReveal(), copyRef = useReveal();
  return (
    <section className="canvas-dark band" id="sts-setup">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal">
          <span className="eyebrow on-dark">Getting Started</span>
          <h2 className="display">Up and running in 24 hours</h2>
          <p className="lead">Three steps. We handle everything. You just confirm a few details and continue to work as normal.</p>
        </div>
        <div className="sts-setup-grid-new">
          {SETUP_STEPS.map((s, i) => <SetupStep key={s.num} step={s} delay={i * 0.12} />)}
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Packages (selectable + popup)
// ============================================================
function StsPackages() {
  const headRef = useReveal();
  const blockRef = useReveal();
  const choicesRef = useReveal();

  return (
    <section className="canvas-light band" id="sts-packages">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal sts-trial-head">
          <span className="eyebrow">Try BackIn5 Free</span>
          <h2 className="sts-trial-title">7 days, fully live. No card. No commitment.</h2>
          <p className="sts-trial-sub">We set it up, switch it on, and you watch real enquiries land for a week. Continue if it works. Walk away if it doesn't.</p>
        </div>

        <div ref={blockRef} className="sts-reveal sts-trial-block">
          <div className="sts-trial-art" aria-hidden="true">
            {/* Big stylised brand "5" with morphing channel icon inside */}
            <span className="sts-art-five">5</span>
            <div className="sts-art-ring" />
            <div className="sts-art-channel-stack">
              {/* Phone */}
              <span className="sts-art-channel sts-art-ch-1">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M5 4a2 2 0 012-2h2l2 4-2 1a10 10 0 005 5l1-2 4 2v2a2 2 0 01-2 2A14 14 0 015 6V4z"
                        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {/* SMS / Message bubble */}
              <span className="sts-art-channel sts-art-ch-2">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1h-9l-5 4v-4H4a1 1 0 01-1-1V6a1 1 0 011-1z"
                        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <circle cx="8.5" cy="11" r="1" fill="currentColor"/>
                  <circle cx="12" cy="11" r="1" fill="currentColor"/>
                  <circle cx="15.5" cy="11" r="1" fill="currentColor"/>
                </svg>
              </span>
              {/* WhatsApp */}
              <span className="sts-art-channel sts-art-ch-3">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3z"
                        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  <path d="M8.5 9c0-.6.5-1 1-1h1l1 2-1 .7a4.5 4.5 0 002.8 2.8l.7-1 2 1v1c0 .5-.4 1-1 1A7.5 7.5 0 018.5 9z"
                        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </span>
              {/* Email */}
              <span className="sts-art-channel sts-art-ch-4">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                </svg>
              </span>
              {/* Website chat */}
              <span className="sts-art-channel sts-art-ch-5">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 8h18" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M7 13h6M7 15.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </span>
            </div>
            {/* Floating orbit dots */}
            <span className="sts-art-orbit-dot sts-art-orbit-dot-1" />
            <span className="sts-art-orbit-dot sts-art-orbit-dot-2" />
            <span className="sts-art-orbit-dot sts-art-orbit-dot-3" />
          </div>

          <div className="sts-trial-copy">
            <ul className="sts-trial-points">
              <li>
                <strong>Live in 24 hours.</strong>
                <span>Fully built around your trade. Not a demo.</span>
              </li>
              <li>
                <strong>Real enquiries, real jobs.</strong>
                <span>Watch the system work in your business for a week.</span>
              </li>
              <li>
                <strong>No setup fee, no card.</strong>
                <span>Continue after the trial and the setup fee stays waived.</span>
              </li>
            </ul>
          </div>
        </div>

        <div ref={choicesRef} className="sts-reveal sts-trial-choices-wrap">
          <h3 className="sts-trial-choices-title">How do you want to start?</h3>
          <div className="sts-trial-choices">
            <a href="trial.html" className="sts-trial-choice sts-trial-choice-primary">
              <div className="sts-trial-choice-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" fill="currentColor"/>
                </svg>
              </div>
              <div className="sts-trial-choice-body">
                <div className="sts-trial-choice-title">Start straight away</div>
                <div className="sts-trial-choice-desc">3-min form. Live in 24 hours.</div>
              </div>
              <span className="sts-trial-choice-arrow"><IconArrowRight size={18} /></span>
            </a>
            <button
              className="sts-trial-choice sts-trial-choice-secondary"
              onClick={() => window.Calendly && window.Calendly.initPopupWidget({ url: 'https://calendly.com/backin5/30min?primary_color=164d9c' })}
              type="button"
            >
              <div className="sts-trial-choice-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="sts-trial-choice-body">
                <div className="sts-trial-choice-title">Book a quick chat</div>
                <div className="sts-trial-choice-desc">10 mins. Trial live same day.</div>
              </div>
              <span className="sts-trial-choice-arrow"><IconArrowRight size={18} /></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// StsPage - root component rendered by see-the-system.html
// ============================================================
function StsPage() {
  useEffectSTS(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const tryScroll = (attempts) => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts > 0) {
        setTimeout(() => tryScroll(attempts - 1), 150);
      }
    };
    setTimeout(() => tryScroll(6), 100);
  }, []);

  return (
    <React.Fragment>
      <StsNav />
      <main>
        <StsHero />
        <StsHowItWorks />
        <StsQuoteAssistant />
        <StsChannels />
        <StsBoard />
        <StsEnquiryDetail />
        <StsSetup />
        <StsPackages />
      </main>
      <StsFooter />
    </React.Fragment>
  );
}
