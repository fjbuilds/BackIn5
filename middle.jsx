/* eslint-disable */
// Middle sections: Built For, Before/After (day-in-the-life), How It Works

// ----------------- Trade list -----------------
const TRADES = [
{ key: "plumbers", name: "Plumbers", Icon: window.IconWrench, desc: "Handle leak and no-heating callouts whilst your on-site." },
{ key: "electricians", name: "Electricians", Icon: window.IconBoltAlt, desc: "Stop wasting evenings calling people back." },
{ key: "hvac", name: "Builders", Icon: window.IconBrick, desc: "Stop new enquiries getting buried between ongoing projects." },
{ key: "roofers", name: "Roofers", Icon: window.IconHome, desc: "Catch quote requests before they ring the next roofer." },
{ key: "landscapers", name: "Landscapers", Icon: window.IconLeaf, desc: "Keep up with Summer quote demand without losing decent jobs." },
{ key: "painters", name: "Any Other Trade", Icon: window.IconQuestion, desc: "Built for busy trades where the phone never stops. And admin never ends." }];


function BuiltFor({ singleTradeMode, focusTradeKey, setFocus }) {
  const focus = TRADES.find((t) => t.key === focusTradeKey) || TRADES[0];
  const [activeIdx, setActiveIdx] = React.useState(0);
  const userPicked = React.useRef(false);
  // Auto-cycle the active trade until the user clicks one
  React.useEffect(() => {
    if (singleTradeMode) return;
    const id = setInterval(() => {
      if (!userPicked.current) setActiveIdx((i) => (i + 1) % TRADES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [singleTradeMode]);
  const activeTrade = TRADES[activeIdx] || TRADES[0];
  return (
    <section className="canvas-light band" id="built-for">
      <div className="container">
        <div className="sec-head center">
          <span className="eyebrow">Built for</span>
          <h2 className="display" style={{ fontSize: "65px" }}>
            Built For Busy Trades Where Missed Enquiries Mean Lost Work
          </h2>
          <p className="lead" style={{ marginTop: 8 }}>


          </p>
        </div>

        {singleTradeMode ?
        <React.Fragment>
            <div className="single-trade-grid">
              <div className="trade-feature">
                <div className="big-ic"><focus.Icon size={32} /></div>
                <h3 className="ttl">Built for {focus.name.toLowerCase()}</h3>
                <p className="desc">{focus.desc}</p>
                <p className="desc" style={{ marginTop: -8 }}>
                  We know your callers. They want a fast answer, a fair quote and a slot in the diary —
                  not a voicemail and a callback tomorrow.
                </p>
                <div className="stat-row">
                  <div className="stat"><div className="v">5 min</div><div className="l">avg response time</div></div>
                  <div className="stat"><div className="v">94%</div><div className="l">enquiries qualified</div></div>
                  <div className="stat"><div className="v">3.1×</div><div className="l">more booked jobs</div></div>
                </div>
              </div>

              <div className="trade-side">
                <div className="quote">
                  "We used to lose two or three jobs a week to voicemail.
                  Now my phone barely rings — I just walk in to a clean list of qualified jobs each morning."
                  <div className="qm">Dave, Bristol-based plumber · 14 yrs</div>
                </div>
                <div className="stats-tile">
                  <div className="stat"><div className="v">£4.2k</div><div className="l">avg monthly recovered revenue</div></div>
                  <div className="stat"><div className="v">12s</div><div className="l">first reply to caller</div></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div className="caption" style={{ marginBottom: 12 }}>Or browse by trade</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TRADES.map((t) =>
              <button
                key={t.key}
                onClick={() => setFocus(t.key)}
                className="btn btn-sm"
                style={{
                  background: t.key === focus.key ? "var(--ink)" : "#fff",
                  color: t.key === focus.key ? "#fff" : "var(--ink)",
                  border: "1px solid " + (t.key === focus.key ? "var(--ink)" : "var(--hairline-light)")
                }}>
                
                    <t.Icon size={14} />
                    {t.name}
                  </button>
              )}
              </div>
            </div>
          </React.Fragment> :

        <div className="trades-split">
          <div className="trades-grid">
            {TRADES.map((t, i) =>
              <button
                type="button"
                key={t.key}
                className={"trade-card " + (i === activeIdx ? "active" : "")}
                onClick={() => { userPicked.current = true; setActiveIdx(i); }}
                aria-pressed={i === activeIdx}
              >
                <div className="ic"><t.Icon /></div>
                <div className="ttl">{t.name}</div>
                <div className="desc">{t.desc}</div>
              </button>
            )}
          </div>
          <BuiltForMotion activeTrade={activeTrade} />
        </div>
        }

        <div style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
          <a href="#how" className="btn btn-dark btn-lg btn-arrow">
            See How It Works... <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>);

}

// ----------------- Before / After — reveal slider -----------------
const BEFORE_ITEMS = [
  { kind: "phone",  text: "Missed calls turning into lost jobs",                   top: "6%",  left: "3%",  rot: -4 },
  { kind: "ruled",  tag: "Notebook · page 3",  text: "Customers going elsewhere whilst waiting for replies",  top: "26%", left: "21%", rot:  3 },
  { kind: "channels", text: "WhatsApp, Facebook, website and calls all over the place", top: "9%",  left: "30%", rot: -2 },
  { kind: "docket", tag: "URGENT",         text: "Evenings spent chasing callbacks and quotes",     top: "48%", left: "4%",  rot: -3 },
  { kind: "clip",   tag: "Job sheet",      text: "Poor enquiries mixed in with genuine work",       top: "32%", left: "40%", rot:  3, strike: true },
  { kind: "ruled",  tag: "Back of an invoice", text: "New jobs forgotten once the day gets busy",   top: "64%", left: "24%", rot:  5 },
];

const AFTER_ITEMS = [
  "Every enquiry responded to instantly, 24/7",
  "Customers kept engaged whilst you're on-site or off the clock",
  "Calls, messages and quote requests organised in one place",
  "Customers can self-book callbacks and site visits",
  "Photos, postcodes and job details collected upfront",
  "More qualified jobs reaching you with less admin",
];

function BeforeAfter() {
  const [reveal, setReveal] = React.useState(70);
  const stageRef = React.useRef(null);
  const dragging = React.useRef(false);
  const hasInteracted = React.useRef(false);
  const wiggleRaf = React.useRef(null);
  const wiggleTimers = React.useRef([]);

  const setFromClientX = (clientX) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const pct = Math.max(6, Math.min(94, ((clientX - rect.left) / rect.width) * 100));
    setReveal(pct);
  };
  const stopWiggle = () => {
    hasInteracted.current = true;
    if (wiggleRaf.current) cancelAnimationFrame(wiggleRaf.current);
    wiggleTimers.current.forEach(clearTimeout);
    wiggleTimers.current = [];
  };
  const onMove = (e) => { if (dragging.current) setFromClientX(e.clientX); };
  const onUp   = () => { dragging.current = false; document.body.style.userSelect = ''; };
  const onDown = (e) => {
    dragging.current = true;
    stopWiggle();
    document.body.style.userSelect = 'none';
    setFromClientX(e.clientX);
    e.preventDefault();
  };

  React.useEffect(() => {
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  // Attention wiggle — JS-lerped so dragging always wins immediately
  React.useEffect(() => {
    let cancelled = false;

    const lerp = (from, to, duration) => new Promise((resolve) => {
      const start = performance.now();
      const tick = (now) => {
        if (cancelled || hasInteracted.current || dragging.current) return resolve();
        const t = Math.min(1, (now - start) / duration);
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        setReveal(from + (to - from) * e);
        if (t < 1) wiggleRaf.current = requestAnimationFrame(tick);
        else resolve();
      };
      wiggleRaf.current = requestAnimationFrame(tick);
    });

    const cycle = async () => {
      if (cancelled || hasInteracted.current) return;
      await lerp(70, 26, 650);
      if (cancelled || hasInteracted.current) return;
      await lerp(26, 86, 700);
      if (cancelled || hasInteracted.current) return;
      await lerp(86, 70, 500);
    };

    const initial = setTimeout(cycle, 1200);
    wiggleTimers.current.push(initial);
    const interval = setInterval(cycle, 7500);

    return () => {
      cancelled = true;
      if (wiggleRaf.current) cancelAnimationFrame(wiggleRaf.current);
      clearTimeout(initial);
      clearInterval(interval);
      wiggleTimers.current = [];
    };
  }, []);

  return (
    <section className="canvas-dark band" id="real-cost">
      <div className="container">
        <div className="sec-head center" style={{ alignItems: "center" }}>
          <span className="eyebrow on-dark">Before vs after</span>
          <h2 className="display" style={{ color: "#fff" }}>
            What missed enquiries are really costing your business.
          </h2>
          <div className="beforeafter-lead">
            <div className="ba-problem">
              <p className="ba-text">
                Most busy trades either handle admin themselves once the day slows down, or pay someone full-time to keep up with calls, messages and bookings.
              </p>
              <p className="ba-text">
                The problem is, most don’t realise how many decent jobs get missed, forgotten or go elsewhere once the day gets busy.
              </p>
            </div>
            <p className="ba-promise">
              BackIn5 helps businesses respond faster, stay organised, and stop work slipping through the cracks — without adding more to the owner’s plate.
            </p>
          </div>
        </div>

        <div
          ref={stageRef}
          className="reveal-stage"
          style={{ "--reveal": reveal + "%" }}
          onPointerDown={onDown}
        >
          {/* BEFORE scene */}
          <div className="reveal-scene before">
            <div className="scene-label scene-label-before">
              <span className="dot" /> Before BackIn5
            </div>
            {BEFORE_ITEMS.map((item, i) => (
              <div
                key={i}
                className={"paper paper-" + item.kind + (item.strike ? " is-strike" : "")}
                style={{
                  top: item.top,
                  left: item.left,
                  ['--rot']: item.rot + 'deg',
                  animationDelay: (i * 90) + 'ms',
                }}
              >
                {item.kind === "phone" ? (
                  <React.Fragment>
                    <div className="paper-statbar">
                      <span>9:41</span>
                      <span><IconPhoneMissed size={11} stroke={2} /></span>
                    </div>
                    <div className="paper-missed-count">11 missed</div>
                    <div className="paper-text">{item.text}</div>
                  </React.Fragment>
                ) : item.kind === "channels" ? (
                  <React.Fragment>
                    <div className="paper-channels">
                      <span className="ch wa">WA</span>
                      <span className="ch fb">FB</span>
                      <span className="ch web">WEB</span>
                      <span className="ch call">CALL</span>
                    </div>
                    <div className="paper-text">{item.text}</div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {item.kind === "clip" && <div className="clip-bar" />}
                    {item.tag && <div className="paper-tag">{item.tag}</div>}
                    <div className="paper-text">{item.text}</div>
                  </React.Fragment>
                )}
              </div>
            ))}
          </div>

          {/* AFTER scene */}
          <div className="reveal-scene after">
            <div className="scene-label scene-label-after">
              <span className="dot" /> After BackIn5
            </div>
            <div className="clean-stack">
              <div className="clean-stack-head">
                <span className="clean-stack-title">Organised enquiries</span>
                <span className="clean-stack-count">6 ready</span>
              </div>
              {AFTER_ITEMS.map((text, i) => (
                <div key={i} className="clean-row" style={{ animationDelay: (240 + i * 90) + 'ms' }}>
                  <span className="check"><IconCheck size={13} stroke={2.4} /></span>
                  <span className="clean-text">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Drag handle */}
          <div className="reveal-handle">
            <div className="reveal-handle-line" />
            <div className="reveal-handle-knob" onPointerDown={onDown} aria-label="Drag to compare">
              <span className="arrow-l"><IconArrowRight size={14} /></span>
              <span className="arrow-r"><IconArrowRight size={14} /></span>
            </div>
          </div>
        </div>

        <div className="reveal-foot">
          <span>← Drag to reveal the before</span>
          <span>Drag to reveal the after →</span>
        </div>
      </div>
    </section>);

}

// ----------------- How It Works (interactive split layout) -----------------
const HOW_SCENARIOS = [
{
  key: "missed-call",
  title: "Missed Call",
  sub: "Caller didn't get through",
  Icon: window.IconPhoneMissed,
  steps: [
  "Missed call comes in",
  "Instant text reply sent",
  "Job details taken (including photo/video evidence)",
  "Callback or site visit booked",
  "Enquiry arrives ready to quote"]

},
{
  key: "live-chat",
  title: "Website Live Chat",
  sub: "Visitor starts a chat on your site",
  Icon: window.IconChat,
  steps: [
  "Customer starts live chat on your website",
  "BackIn5 asks tailored quoting questions specific to your business",
  "Photos + job details collected",
  "Postcode and availability confirmed",
  "Quote is booked into your calendar automatically"],

  note: "Tailored to your business and how you quote jobs."
},
{
  key: "facebook",
  title: "Facebook Message",
  sub: "DM lands on your business page",
  Icon: window.IconMessage,
  steps: [
  "Customer messages your business page",
  "Instant reply sent automatically",
  "Job details and photos collected",
  "Customer books callback or site visit",
  "Everything arrives organised in one place"]

},
{
  key: "checkatrade",
  title: "Checkatrade Lead",
  sub: "New lead drops in your queue",
  Icon: window.IconStar,
  steps: [
  "New Checkatrade lead comes through",
  "BackIn5 qualifies the enquiry before any other firm",
  "Customer receives an instant tailored response",
  "Photos, availability and job details collected",
  "Qualified enquiry arrives ready to quote"],

  note: "Filter enquiries by service area, job type, urgency, budget and more."
},
{
  key: "out-of-hours",
  title: "Out-of-Hours Enquiry",
  sub: "Evening / weekend / bank holiday",
  Icon: window.IconClock,
  steps: [
  "Customer enquires after hours",
  "Instant response sent 24/7",
  "Enquiry details collected automatically",
  "Customer books suitable callback / site visit time",
  "You wake up to new jobs — no enquiries left waiting until morning"]

},
{
  key: "quote-followup",
  title: "Quote Follow-Up",
  sub: "Quote went quiet",
  Icon: window.IconRefresh,
  steps: [
  "Quote sent to customer",
  "Customer doesn't respond",
  "BackIn5 follows up automatically",
  "Customer re-engages with the enquiry",
  "Potential job stays active for longer"]

}];


function HowItWorks() {
  const [activeKey, setActiveKey] = React.useState(HOW_SCENARIOS[0].key);
  const active = HOW_SCENARIOS.find((s) => s.key === activeKey) || HOW_SCENARIOS[0];

  return (
    <section className="canvas-soft band" id="how">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow" style={{ fontSize: "18px" }}>HOW BACKIN5 WORKS</span>
          <h2 className="display">
            See how different enquiries are handled from start to finish
          </h2>
          <p className="lead" style={{ color: "rgb(14, 17, 22)", fontSize: "18px", fontFamily: "Inter" }}>From missed calls to Checkatrade leads, Backin5 captures, qualifies and organises enquiries whilst your team’s busy.


          </p>
        </div>

        <div className="how-split">
          <div className="how-list" role="tablist">
            {HOW_SCENARIOS.map((s, i) => {
              const isActive = s.key === activeKey;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={isActive}
                  className={"how-row " + (isActive ? "active" : "")}
                  onClick={() => setActiveKey(s.key)}>
                  
                  <div className="how-row-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="how-row-icon"><s.Icon size={18} /></div>
                  <div className="how-row-body">
                    <div className="how-row-title">{s.title}</div>
                    <div className="how-row-sub">{s.sub}</div>
                  </div>
                  <div className="how-row-arrow"><IconArrowRight size={16} /></div>
                </button>);

            })}
          </div>

          <div className="how-flow" key={activeKey} role="tabpanel">
            <div className="how-flow-head">
              <div>
                <div className="how-flow-tag">When it happens</div>
                <div className="how-flow-title">{active.title}</div>
              </div>
              <div className="how-flow-pill">
                <span className="dot" />
                {active.steps.length} steps
              </div>
            </div>

            <div className="flow-steps">
              {active.steps.map((step, i) =>
              <div
                key={i}
                className={"flow-step " + (i === active.steps.length - 1 ? "final" : "")}
                style={{ animationDelay: 80 + i * 160 + "ms" }}>
                
                  <div className="flow-rail">
                    <div className="flow-circle">
                      {i === active.steps.length - 1 ? <IconCheck size={16} /> : String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flow-text">{step}</div>
                </div>
              )}
            </div>

            {active.note &&
            <div className="flow-note">
                <span className="flow-note-icon"><IconStar size={14} /></span>
                {active.note}
              </div>
            }
          </div>
        </div>

        <div style={{ marginTop: 56, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#pricing" className="btn btn-dark btn-arrow">Get Started <IconArrowRight size={16} /></a>
          <a href="#faqs" className="btn btn-ghost-light">Read FAQs</a>
        </div>
      </div>
    </section>);

}

Object.assign(window, { BuiltFor, BeforeAfter, HowItWorks, TRADES });