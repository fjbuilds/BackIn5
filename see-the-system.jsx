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
          <a className="nav-link" href="index.html#contact">Contact</a>
        </div>
        <div className="nav-cta">
          <a href="index.html#contact" className="btn btn-primary btn-sm nav-cta-btn">Get Started</a>
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
          <a className="nav-drawer-link" href="index.html#contact" onClick={() => setOpen(false)}>Contact</a>
          <a href="index.html#contact" className="btn btn-primary btn-lg nav-drawer-cta" onClick={() => setOpen(false)}>
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
              <li><a href="index.html#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 BackIn5 Ltd · Registered in England · Made for trades.</span>
          <span><a href="/terms" className="footer-terms-link">Terms</a> · hello@backin5.com</span>
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
    key: 'checkatrade',
    title: 'Checkatrade Lead',
    sub: 'New lead drops into your queue',
    icon: 'star',
    steps: [
      'New Checkatrade lead arrives in your queue',
      'BackIn5 qualifies it before any other firm responds',
      'Customer receives an instant tailored response',
      'Photos, availability, and job details collected',
      'Enquiry arrives in your dashboard, ready to quote',
    ],
    note: 'Filter by area, job type, urgency, and budget.',
  },
  {
    key: 'out-of-hours',
    title: 'Out-of-Hours Enquiry',
    sub: 'Evening, weekend, or bank holiday',
    icon: 'clock',
    steps: [
      'Customer enquires outside your working hours',
      'Instant response sent - 24/7, no delay',
      'Enquiry details collected automatically',
      'Customer books a callback at a suitable time',
      'Enquiry arrives in your dashboard, ready to quote',
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
            From missed calls to Checkatrade leads - BackIn5 captures, qualifies and organises
            every enquiry while your team is busy on-site.
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
              <div className="sts-qa-strip-desc">Evenings, weekends, bank holidays — never misses an enquiry</div>
            </div>
            <div className="sts-qa-strip-item">
              <div className="sts-qa-strip-label">Your questions</div>
              <div className="sts-qa-strip-desc">You set what gets asked — every lead arrives with the detail you need to quote</div>
            </div>
            <div className="sts-qa-strip-item">
              <div className="sts-qa-strip-label">We set it up</div>
              <div className="sts-qa-strip-desc">Embedded on your site within 48 hours — no technical effort required from you</div>
            </div>
          </div>
        </div>

        <div ref={laptopRef} className="sts-reveal sts-reveal-d1 sts-laptop-wrap">
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
                  <div className="sts-fake-url">premiertrades.co.uk</div>
                </div>
                <div className="sts-fake-site">
                  {/* Site nav */}
                  <div className="sts-fake-site-nav">
                    <div className="sts-fake-logo-wrap">
                      <div className="sts-fake-logo-mark">PT</div>
                      <span className="sts-fake-logo">Premier Trades Co.</span>
                    </div>
                    <div className="sts-fake-nav-links">Home · Services · Gallery · Contact</div>
                  </div>
                  {/* Hero */}
                  <div className="sts-fake-site-hero">
                    <div className="sts-fake-hero-badge">⭐ Trusted across London &amp; the South East</div>
                    <div className="sts-fake-hero-text">Your Local Trades Experts</div>
                    <div className="sts-fake-hero-sub">Boilers · Roofing · Electrical · Extensions</div>
                    <div className="sts-fake-hero-btns">
                      <div className="sts-fake-hero-cta">Get a Free Quote</div>
                      <div className="sts-fake-hero-cta sts-hero-cta-ghost">Call Us</div>
                    </div>
                  </div>
                  {/* Services strip */}
                  <div className="sts-fake-services">
                    <div className="sts-fake-service"><span>🔧</span> Plumbing</div>
                    <div className="sts-fake-service"><span>⚡</span> Electrical</div>
                    <div className="sts-fake-service"><span>🏠</span> Roofing</div>
                    <div className="sts-fake-service"><span>🧱</span> Building</div>
                  </div>
                  {/* Body content */}
                  <div className="sts-fake-site-body">
                    <div className="sts-fake-review">
                      <span className="sts-fake-stars">★★★★★</span>
                      <span>"Brilliant service, very professional and tidy" - James, SE22</span>
                    </div>
                    <div className="sts-fake-content-row">
                      <div className="sts-fake-block" />
                      <div className="sts-fake-block sts-fb-wide" />
                    </div>
                  </div>
                  {/* Embedded BackIn5 widget */}
                  <div className="sts-widget">
                    <div className="sts-widget-header">
                      <div className="sts-widget-avatar">
                        <span className="sts-b5-mark">5</span>
                      </div>
                      <div className="sts-widget-meta">
                        <div className="sts-widget-name">Get a Quote</div>
                        <div className="sts-widget-online"><span className="sts-status-dot" />Online 24/7</div>
                      </div>
                    </div>
                    <div className="sts-widget-body">
                      <div className="sts-wm sts-wm-bot">Hi - what type of job do you need a quote for?</div>
                      <div className="sts-widget-presets sts-presets-used">
                        <span className="sts-preset-btn">Boiler repair</span>
                        <span className="sts-preset-btn">Roof repair</span>
                        <span className="sts-preset-btn">Rewire</span>
                        <span className="sts-preset-btn">Extension</span>
                      </div>
                      <div className="sts-wm sts-wm-user">Boiler repair</div>
                      <div className="sts-wm sts-wm-bot">Whereabouts are you based?</div>
                      <div className="sts-wm sts-wm-user">Sheffield, S10</div>
                      <div className="sts-wm sts-wm-bot">How old is the boiler?</div>
                      <div className="sts-wm sts-wm-user">About 12 yrs, Worcester</div>
                      <div className="sts-wm sts-wm-done">Got it - we will be back in touch within 5 mins ✅</div>
                    </div>
                    <div className="sts-widget-inputbar">
                      <span className="sts-widget-input-placeholder">Type a message…</span>
                      <div className="sts-widget-send">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 5h8M6 2l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

            {/* Mobile - overlapping bottom-right of laptop */}
            <div className="sts-mobile-badge">
            <div className="sts-mobile-phone">
              <div className="sts-mobile-notch" />
              <div className="sts-mobile-content">
                <div className="sts-mobile-widget-header">
                  <div className="sts-widget-avatar" style={{ width: '28px', height: '28px', flexShrink: 0 }}>
                    <span className="sts-b5-mark">5</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>Get a Quote</div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="sts-status-dot" style={{ width: '6px', height: '6px' }} />Online 24/7
                    </div>
                  </div>
                </div>
                <div className="sts-mobile-chat">
                  <div className="sts-wm sts-wm-bot" style={{ fontSize: '9px' }}>Hi - what type of job?</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '3px 0' }}>
                    <span className="sts-preset-btn" style={{ fontSize: '8px' }}>Boiler repair</span>
                    <span className="sts-preset-btn" style={{ fontSize: '8px' }}>Roof repair</span>
                    <span className="sts-preset-btn" style={{ fontSize: '8px' }}>Rewire</span>
                  </div>
                  <div className="sts-wm sts-wm-user" style={{ fontSize: '9px' }}>Boiler repair</div>
                  <div className="sts-wm sts-wm-bot" style={{ fontSize: '9px' }}>Where are you based?</div>
                  <div className="sts-wm sts-wm-user" style={{ fontSize: '9px' }}>Sheffield, S10</div>
                  <div className="sts-wm sts-wm-bot" style={{ fontSize: '9px' }}>How old is the boiler?</div>
                  <div className="sts-wm sts-wm-user" style={{ fontSize: '9px' }}>12 yrs, Worcester</div>
                  <div className="sts-wm sts-wm-done" style={{ fontSize: '8px' }}>Got it - back in 5 mins ✅</div>
                </div>
                <div className="sts-mobile-inputbar">
                  <span style={{ fontSize: '9px', color: '#8b94a7', flex: 1 }}>Type a message…</span>
                  <div className="sts-widget-send" style={{ width: '20px', height: '20px' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 5h8M6 2l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="sts-mobile-label">Mobile view</div>
          </div>
          </div>{/* end .sts-laptop */}

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

          {/* Result */}
          <div className="sts-channels-result">
            <div className="sts-result-card">
              <div className="sts-result-header">
                <span className="sts-status-dot" style={{ background: 'var(--ok)' }} />
                <span className="sts-result-title">New Quote - Dashboard</span>
                <span className="sts-result-time">Just now</span>
              </div>
              <div className="sts-result-body">
                <div className="sts-result-row"><strong>Customer:</strong> Mike T, SE London</div>
                <div className="sts-result-row"><strong>Job:</strong> Flat roof replacement, 6x4m garage</div>
                <div className="sts-result-row"><strong>Contact:</strong> 07XXX XXX XXX</div>
                <div className="sts-result-row"><strong>Source:</strong> Website enquiry</div>
              </div>
              <div className="sts-result-actions">
                <span className="btn btn-primary btn-sm">View Quote</span>
                <span className="btn btn-ghost-light btn-sm">Call Back</span>
              </div>
            </div>
            <div className="sts-result-note">
              <IconCheck size={14} />
              <span>If a customer does not know an answer, they can skip - you will not lose the enquiry</span>
            </div>
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
  const headRef = useReveal();
  return (
    <section className="canvas-dark band" id="sts-enquiry-board">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal">
          <span className="eyebrow on-dark">Your Live Dashboard</span>
          <h2 className="display">Every job, in one place</h2>
          <p className="lead">
            Every customer gets a bespoke live dashboard - a real-time view of every enquiry, where it stands, and what needs action next. Built around your business, updated automatically.
          </p>
        </div>
        <div className="sts-board-grid">
          {BOARD_COLS.map((col, i) => <BoardCol key={col.id} col={col} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Full Detail View
// ============================================================
function StsEnquiryDetail() {
  const headRef = useReveal(), cardRef = useReveal();
  return (
    <section className="canvas-light band" id="sts-enquiry-card">
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
                <a href="index.html#contact" className="btn btn-ghost-light btn-sm">📞 Call Back</a>
                <a href="index.html#contact" className="btn btn-ghost-light btn-sm">✉️ Send Quote</a>
                <a href="index.html#contact" className="btn btn-primary btn-sm">✓ Mark as Quoted</a>
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
    title: 'Go live within 48 hours',
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
          <h2 className="display">Up and running in 48 hours</h2>
          <p className="lead">Three steps. We handle everything. You just confirm a few details and continue to work as normal.</p>
        </div>
        <div className="sts-setup-grid-new">
          {SETUP_STEPS.map((s, i) => <SetupStep key={s.num} step={s} delay={i * 0.12} />)}
        </div>
        <div ref={copyRef} className="sts-reveal sts-setup-footer" style={{ transitionDelay: '0.4s' }}>
          <div className="sts-setup-cta-wrap">
            <a href="index.html#contact" className="btn btn-primary btn-lg btn-arrow">
              Start Setup <IconArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// SECTION: Packages (selectable + popup)
// ============================================================
const PACKAGES = [
  {
    id: 'smart',
    name: 'Smart Enquiry Handling',
    tagline: 'For trades who miss calls & messages while working and need every enquiry answered, captured and organised.',
    price: '£199',
    note: 'per month · £99 setup fee',
    features: [
      'Instant replies to new enquiries',
      'Missed calls and messages followed up automatically',
      'Customer name, number, postcode and job details captured',
      'Enquiries from your website, trade sites and via phone organised in one place',
      'Receive leads via text, email and on your live enquiry dashboard',
      'Helps stop jobs being missed while you\'re on-site',
      'Simple setup - no app, no office staff, no new software to learn',
    ],
    extra: [
      'Best for smaller trade businesses that need faster replies and better enquiry organisation, but do not need full quote or booking automation yet.',
    ],
    bottomLine: 'Best for smaller trade businesses that need faster replies and better enquiry organisation, but do not need full quote or booking automation yet.',
  },
  {
    id: 'full',
    name: 'Full Inbound Desk',
    tagline: 'A complete inbound enquiry and booking system. Without office staff.',
    price: '£349',
    note: 'per month · £149 setup fee',
    featured: true,
    badge: 'Most popular',
    features: [
      'Everything in Smart Enquiry Handling',
      'Website quote assistant built around your trade',
      'Smart job qualification questions',
      'Photo and video collection',
      'Live enquiry dashboard - every lead, job detail and next action',
      '24/7 missed-call text backs',
      'Automated customer follow-ups',
      'Quote, callback or site-visit booking',
    ],
    extra: [
      'Best for busy firms that want enquiries handled properly from first message through to callback, quote or booked visit. Without lifting a finger.',
    ],
    bottomLine: 'Best for busy firms that want enquiries handled properly from first message through to callback, quote or booked visit. Without lifting a finger.',
  },
];

function PkgCard({ pkg, delay, isSelected, onSelect }) {
  const revealRef = useReveal();
  const [open, setOpen] = useStateSTS(false);
  return (
    <div ref={revealRef} className="sts-reveal" style={{ transitionDelay: delay + 's' }}>
    <div
      className={'sts-pkg-card-new' + (isSelected ? ' sts-pkg-selected' : '')}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(pkg)}
    >
      {pkg.badge && <span className="sts-pkg-badge">{pkg.badge}</span>}
      {isSelected && (
        <div className="sts-pkg-check"><IconCheck size={14} /></div>
      )}
      <div className="sts-pkg-name-new">{pkg.name}</div>
      <div className="sts-pkg-tagline">{pkg.tagline}</div>
      <div className="sts-pkg-price-new">{pkg.price}</div>
      <div className="sts-pkg-note-new">{pkg.note}</div>
      <ul className="sts-pkg-features-new">
        {pkg.features.map((f, i) => (
          <li key={i}><IconCheck size={14} />{f}</li>
        ))}
      </ul>
      <button
        className="sts-pkg-toggle"
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        aria-expanded={open}
      >
        {open ? 'Hide' : 'Who is this best for?'}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="sts-pkg-extra" onClick={e => e.stopPropagation()}>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'var(--muted)' }}>{pkg.bottomLine}</p>
        </div>
      )}
    </div>
    </div>
  );
}

function StsPackages() {
  const headRef = useReveal();
  const [selectedPkg, setSelectedPkg] = useStateSTS(null);

  return (
    <section className="canvas-light band" id="sts-packages">
      <div className="container">
        <div ref={headRef} className="sec-head center sts-reveal">
          <span className="eyebrow">What is Included</span>
          <h2 className="display">Pick what fits your business</h2>
          <p className="lead">
            Two plans. Both run on the same system - the difference is how much we handle for you.
            Click a plan to get started.
          </p>
        </div>
        <div className="sts-pkg-grid-new">
          {PACKAGES.map((p, i) => (
            <PkgCard
              key={p.id}
              pkg={p}
              delay={i * 0.12}
              isSelected={selectedPkg && selectedPkg.id === p.id}
              onSelect={setSelectedPkg}
            />
          ))}
        </div>

        {selectedPkg && (
          <div className="sts-pkg-reveal" key={selectedPkg.id}>
            <div className="sts-pkg-reveal-inner">
              <div className="sts-pkg-reveal-head">
                <div className="sts-pkg-reveal-eyebrow">
                  <span className="sts-status-dot" style={{ background: 'var(--accent)', width: '8px', height: '8px' }} />
                  {selectedPkg.name} selected
                </div>
                <h3 className="sts-pkg-reveal-title">How would you like to get started?</h3>
                <p className="sts-pkg-reveal-sub">Both options get you live within 48 hours.</p>
              </div>
              <div className="sts-pkg-reveal-choices">
                <a href="index.html#contact" className="sts-pkg-choice">
                  <div className="sts-pkg-choice-icon">📅</div>
                  <div className="sts-pkg-choice-body">
                    <div className="sts-pkg-choice-title">Book a Call</div>
                    <div className="sts-pkg-choice-desc">10 mins with our team - questions answered, setup started same day</div>
                  </div>
                  <IconArrowRight size={20} />
                </a>
                <a href="index.html#contact" className="sts-pkg-choice">
                  <div className="sts-pkg-choice-icon">⚡</div>
                  <div className="sts-pkg-choice-body">
                    <div className="sts-pkg-choice-title">Self Setup</div>
                    <div className="sts-pkg-choice-desc">Fill a 3-min form - we handle the rest and get you live within 48 hrs</div>
                  </div>
                  <IconArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


// ============================================================
// StsPage - root component rendered by see-the-system.html
// ============================================================
function StsPage() {
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
