/* eslint-disable */
// Bottom sections: Comparison, Pricing, CTA band, FAQs, Footer

const { useState: useStateB } = React;

// ----------------- Comparison -----------------
function Comparison() {
  // BackIn5 vs Human Receptionist vs Owner Answering
  const rows = [
  { feat: "Responds instantly to new enquiries", val: ["no", "no", "yes"] },
  { feat: "Handles enquiries whilst you're busy on-site", val: ["no", "partial", "yes"] },
  { feat: "Handles enquiries outside working hours", val: ["partial", "no", "yes"] },
  { feat: "Collects quote-ready information", val: ["partial", "yes", "yes"] },
  { feat: "Books callbacks & site visits", val: ["partial", "yes", "yes"] },
  { feat: "Keeps enquiries organised", val: ["no", "yes", "yes"] },
  { feat: "Follows up every enquiry consistently", val: ["no", "partial", "yes"] },
  { feat: "Reduces evening / weekend admin catch-up", val: ["no", "partial", "yes"] },
  { feat: "Helps stop decent jobs slipping through cracks", val: ["no", "partial", "yes"] },
  { feat: "Live enquiry dashboard - every lead, one place", val: ["no", "no", "yes"] },
  { feat: "Additional salary cost (£20K-£30K)", val: ["no", "yes", "no"] }];


  const cell = (kind, isBrand) => {
    if (kind === "yes") return <span className="yes" title="Yes"><IconCheck size={16} /></span>;
    if (kind === "no") return <span className="no" title="No"><IconX size={16} /></span>;
    return <span className="partial" title="Partial"><IconMinus size={16} /></span>;
  };

  return (
    <section className="canvas-light band" id="compare">
      <div className="container">
        <div className="sec-head center" style={{ alignItems: "center" }}>
          <span className="eyebrow">WHY TRADES SWITCH</span>
          <h2 className="display" style={{ width: "800px" }}>
            You Do The Work.<br />
            <span style={{ color: "var(--accent)" }}>BackIn5 Handles Everything Else.</span>
          </h2>
          <p className="lead">Website & Trade-site leads, missed calls, quote requests and customer messages - All handled automatically and delivered to you on one dashboard.</p>
        </div>

        <div className="compare-scroll-wrap">
          <div className="compare">
          <div className="compare-row">
            <div className="compare-cell head">Day-to-Day Reality</div>
            <div className="compare-cell head"><span className="col-full">Doing it Yourself</span><span className="col-short">Doing it Yourself</span></div>
            <div className="compare-cell head"><span className="col-full">Human Receptionist</span><span className="col-short">Receptionist</span></div>
            <div className="compare-cell head brand">BackIn5</div>
          </div>
          {rows.map((r, i) =>
          <div key={i} className="compare-row">
              <div className="compare-cell"><span className="feature" style={{ fontSize: "13px" }}>{r.feat}</span></div>
              <div className="compare-cell">{cell(r.val[0])}</div>
              <div className="compare-cell">{cell(r.val[1])}</div>
              <div className="compare-cell brand-col">{cell(r.val[2], true)}</div>
            </div>
          )}
          </div>
        </div>

        <div style={{ marginTop: 48, display: "none" }} className="compare-callouts">
        </div>
      </div>
    </section>);

}

// ----------------- Pricing -----------------
function Pricing() {
  const [selectedTier, setSelectedTier] = useStateB(null);
  const revealRef = React.useRef(null);

  const tiers = [
  {
    id: "smart",
    name: "Smart Enquiry Handling",
    tagline: "For trades who miss calls & messages while working and need every enquiry answered, captured and organised.",
    price: 199,
    foot: "Monthly rolling · Cancel with 30 days' notice after your first month",
    bottomLine: "Best for smaller trade businesses that need faster replies and better enquiry organisation, without full quote or booking automation.",
    feats: [
      "Instant replies to new enquiries",
      "Missed-call text reply",
      "Customer name, number, postcode and job details captured",
      "Enquiries from your website, trade sites and via phone organised in one place",
      "Receive leads via text, email and on your live enquiry dashboard",
      "Helps stop jobs being missed while you're on-site",
      "Simple setup - no app, no office staff, no new software to learn",
    ],
    featured: false
  },
  {
    id: "full",
    name: "Full Inbound Desk",
    tagline: "A complete inbound enquiry and booking system. Without office staff.",
    price: 349,
    foot: "Monthly rolling · Cancel with 30 days' notice after your first month",
    bottomLine: "Best for busy firms that want enquiries handled properly from first message through to callback, quote or booked visit. Without lifting a finger.",
    feats: [
      "Everything in Smart Enquiry Handling",
      "Website quote assistant built around your trade",
      "Smart job qualification questions",
      "Photo and video collection",
      "Live enquiry dashboard - every lead, job detail and next action",
      "Missed-call quote taker",
      "Quote, callback or site-visit booking",
    ],
    featured: true
  }];

  const handleSelect = (tier) => {
    setSelectedTier(tier);
    setTimeout(() => {
      if (revealRef.current) {
        revealRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 80);
  };

  return (
    <section className="canvas-soft band" id="pricing">
      <div className="container">
        <div className="sec-head center" style={{ alignItems: "center" }}>
          <span className="eyebrow">Pricing</span>
          <h2 className="display">
            Try it free for 7 days.<br />Pay only if it works.
          </h2>
          <p className="lead" style={{ textAlign: "center" }}>No setup fee · No commitment · Includes your live enquiry dashboard</p>
        </div>

        <div className="trial-flow-strip">
          <div className="trial-flow-step">
            <div className="trial-flow-num">1</div>
            <div>
              <div className="trial-flow-label">Book a call</div>
              <div className="trial-flow-sub">10 mins with our team</div>
            </div>
          </div>
          <div className="trial-flow-arrow">→</div>
          <div className="trial-flow-step">
            <div className="trial-flow-num">2</div>
            <div>
              <div className="trial-flow-label">7-day free trial</div>
              <div className="trial-flow-sub">Full system, live in your business</div>
            </div>
          </div>
          <div className="trial-flow-arrow">→</div>
          <div className="trial-flow-step">
            <div className="trial-flow-num">3</div>
            <div>
              <div className="trial-flow-label">Continue if it works</div>
              <div className="trial-flow-sub">Setup fee waived · No obligation</div>
            </div>
          </div>
        </div>

        <div className="pricing-grid">
          {tiers.map((t) =>
          <div key={t.name} className={"price-card " + (t.featured ? "featured" : "") + (selectedTier && selectedTier.id === t.id ? " price-card-selected" : "")}>
              {t.featured && <span className="badge-popular">Most picked</span>}
              <div className="tier">{t.name}</div>
              <div className="tagline">{t.tagline}</div>
              <div className="price-num">£{t.price}<span className="per">/ month</span></div>
              <div className="price-feats">
                {t.feats.map((f, i) =>
              <div key={i} className="price-feat">
                    <IconCheck size={16} />
                    <span>{f}</span>
                  </div>
              )}
              </div>
              {t.bottomLine && (
                <div className="price-bottom-line">{t.bottomLine}</div>
              )}
              <button
                onClick={() => handleSelect(t)}
                className={"btn " + (t.featured ? "btn-light" : "btn-dark") + " btn-arrow"}
                style={{ width: "100%", justifyContent: "center" }}>
                Start Free Trial <IconArrowRight size={16} />
              </button>
              <div className="price-foot" style={{ textAlign: "center" }}>{t.foot}</div>
            </div>
          )}
        </div>

        {selectedTier && (
          <div className="sts-pkg-reveal" key={selectedTier.id} ref={revealRef}>
            <div className="sts-pkg-reveal-inner">
              <div className="sts-pkg-reveal-head">
                <div className="sts-pkg-reveal-eyebrow">
                  <span className="sts-status-dot" style={{ background: '#4ADE80', width: '8px', height: '8px' }} />
                  {selectedTier.name} — free trial
                </div>
                <h3 className="sts-pkg-reveal-title">How would you like to start your trial?</h3>
                <p className="sts-pkg-reveal-sub">7 days live, no setup fee, no commitment. Both options below get you running fast.</p>
              </div>
              <div className="sts-pkg-reveal-choices">
                <button
                  className="sts-pkg-choice"
                  onClick={() => window.Calendly && window.Calendly.initPopupWidget({ url: 'https://calendly.com/backin5/30min?primary_color=164d9c' })}
                  style={{ background: 'none', border: '1px solid var(--hairline-dark)', cursor: 'pointer', textAlign: 'left', width: '100%', padding: '20px' }}>
                  <div className="sts-pkg-choice-icon">📅</div>
                  <div className="sts-pkg-choice-body">
                    <div className="sts-pkg-choice-title">Book a Call</div>
                    <div className="sts-pkg-choice-desc">10 mins — we walk you through it and get your trial live same day</div>
                  </div>
                  <IconArrowRight size={20} />
                </button>
                <a href={"setup.html?plan=" + selectedTier.id} className="sts-pkg-choice">
                  <div className="sts-pkg-choice-icon">⚡</div>
                  <div className="sts-pkg-choice-body">
                    <div className="sts-pkg-choice-title">Fill in the Form</div>
                    <div className="sts-pkg-choice-desc">3-min form — we handle everything and get your trial live within 48 hrs</div>
                  </div>
                  <IconArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

}

// ----------------- Trial Nudge (floating pill) -----------------
function TrialNudge() {
  const [show, setShow] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (dismissed) return;
    const onScroll = () => { if (window.scrollY > 500) setShow(true); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (!show || dismissed) return null;

  return (
    <div className="trial-nudge" role="complementary" aria-label="Free trial offer">
      <span className="trial-nudge-dot" />
      <span><strong style={{ color: '#fff' }}>7-day free trial</strong> — no setup fee, no commitment</span>
      <a href="#contact" className="trial-nudge-cta">
        Book a call <IconArrowRight size={13} />
      </a>
      <button
        className="trial-nudge-dismiss"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss trial nudge"
      >×</button>
    </div>
  );
}

// ----------------- CTA Band -----------------
function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-grid-bg" />
      <div className="cta-watermark" aria-hidden="true">5</div>
      <div className="container cta-inner" style={{ position: "relative" }}>
        <span className="eyebrow on-dark">Less hassle. Fewer missed jobs.</span>
        <h2 className="display" style={{ fontSize: "40px", maxWidth: "700px" }}>
          Stop Doing Admin.<br />
          <em>Start Winning More Jobs.</em>
        </h2>
        <p className="lead cta-lead" style={{ textAlign: "center" }}>
          <span className="cta-lead-block">
            Most trades businesses aren't short on work. They're short on time.
            Calls get missed, quotes get delayed and decent jobs slip through the cracks whilst trying to stay on top of messages, follow-ups and work on-site.
          </span>
          <span className="cta-lead-block">
            <span className="cta-lead-brand">BackIn5</span> keeps customers engaged, enquiries organised and jobs moving whilst you focus on the work. Every customer gets their own live dashboard - a real-time view of every open job, quote and callback, updated automatically in real time.
          </span>
          <span className="cta-lead-fine">
            No complicated software. No office staff. No evenings spent catching up on admin.
          </span>
        </p>
        <div className="hero-cta-row" style={{ justifyContent: "center", marginTop: 8 }}>
          <a href="#contact" className="btn btn-primary btn-lg btn-arrow">
            Get Started <IconArrowRight size={16} />
          </a>
          <a href="see-the-system.html" className="btn btn-ghost-dark btn-lg">See how it works</a>
        </div>
      </div>
    </section>);}
// ----------------- FAQs -----------------
const GENERAL_FAQS = [
  {
    q: "What actually is BackIn5?",
    a: "BackIn5 handles missed calls, website enquiries, messages, follow-ups and bookings automatically, helping keep jobs moving whilst you work."
  },
  {
    q: "Will this replace how we already handle enquiries?",
    a: "No. BackIn5 supports your existing process by handling missed calls, messages, follow-ups and customer replies in the background."
  },
  {
    q: "What happens if we miss a call whilst busy?",
    a: "The customer receives an instant response, can explain the job, upload photos and even book a callback or site visit whilst you're still on-site."
  },
  {
    q: "Will this actually reduce admin, or create more work?",
    a: "The goal is the opposite. BackIn5 keeps enquiries organised, collects the right information upfront and cuts down chasing messages and callbacks."
  },
  {
    q: "Will it start giving customers prices or quotes automatically?",
    a: "No. BackIn5 helps qualify and organise enquiries properly, but you stay in control of pricing. We've found this is a preference for trades."
  },
  {
    q: "How long does it take to get set up?",
    a: "Most businesses are up and running within 24-48 hours, depending on the type of enquiries you handle and how tailored you want the workflow to be."
  },
];
const MAIN_TRADE_FAQS = [
  {
    key: "roofers",
    name: "Roofers",
    Icon: window.IconHome,
    items: [
      { q: "Can it ask if there's an active leak?", a: "Yes. BackIn5 can ask whether water is coming in now, where the issue is, and request photos before you call back." },
      { q: "Can it separate repairs from full reroof enquiries?", a: "Yes. It can qualify the job type so you can prioritise bigger or more urgent work." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "What if the customer only says \"roof problem\"?", a: "BackIn5 asks follow-up questions to get useful detail instead of sending you a vague message." },
      { q: "Can it book roof surveys?", a: "Yes. Customers can self-book a callback or survey slot based on your availability." },
    ],
  },
  {
    key: "builders",
    name: "Builders",
    Icon: window.IconBrick,
    items: [
      { q: "Can it handle vague extension or renovation enquiries?", a: "Yes. BackIn5 asks what work is needed, property type, stage of planning and timescale." },
      { q: "Can it filter out jobs that are too small?", a: "Yes. You set what type of work you want, and the system qualifies against that." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it collect plans or photos?", a: "Yes. Customers can upload photos, drawings or basic project details." },
      { q: "Can it stop enquiries getting lost between projects?", a: "Yes. Everything comes through organised instead of scattered across calls, texts and emails." },
    ],
  },
  {
    key: "plumbers",
    name: "Plumbers",
    Icon: window.IconWrench,
    items: [
      { q: "Can it spot urgent leaks or no-heating jobs?", a: "Yes. BackIn5 can prioritise urgent issues and collect key details straight away." },
      { q: "Can it ask what type of plumbing issue it is?", a: "Yes. Leaks, bathrooms, taps, toilets, heating, cylinders and more can be routed differently." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Will it collect photos?", a: "Yes. Customers can upload photos so you know what you're dealing with before calling." },
      { q: "Can it stop me chasing vague enquiries?", a: "Yes. It collects the basics upfront so only clearer enquiries reach you." },
    ],
  },
  {
    key: "electricians",
    name: "Electricians",
    Icon: window.IconBoltAlt,
    items: [
      { q: "Can it filter small jobs from bigger works?", a: "Yes. BackIn5 can ask whether it's fault finding, lighting, rewires, consumer units, EV chargers or inspections." },
      { q: "Can it ask if power is off or if it's urgent?", a: "Yes. Urgency can be captured so emergency jobs are prioritised." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it deal with people asking for \"rough prices\"?", a: "Yes. It can collect enough detail first so you're not guessing blind." },
      { q: "Can it book appointments?", a: "Yes. Customers can choose a callback or visit time without back-and-forth messages." },
    ],
  },
  {
    key: "landscapers",
    name: "Landscapers & Driveway Companies",
    Icon: window.IconLeaf,
    items: [
      { q: "Can it handle seasonal quote demand?", a: "Yes. BackIn5 keeps enquiries organised when spring and summer enquiries pick up." },
      { q: "Can it ask what type of work is needed?", a: "Yes. Patios, fencing, turf, driveways, drainage, maintenance or full garden projects can be separated." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it collect photos of the space?", a: "Yes. Customers can send photos before you call back." },
      { q: "Can it filter poor-fit jobs?", a: "Yes. Location, job type, timescale and budget fit can be checked early." },
    ],
  },
];

const MORE_TRADE_FAQS = [
  {
    key: "hvac",
    name: "HVAC & Boiler Engineers",
    Icon: window.IconBoiler,
    items: [
      { q: "Can it prioritise no-heating calls?", a: "Yes. BackIn5 can identify urgent breakdowns and keep the customer engaged immediately." },
      { q: "Can it ask what boiler system they have?", a: "Yes. It can collect boiler type, make, issue, error codes and photos." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it handle seasonal spikes?", a: "Yes. It keeps enquiries moving when winter breakdowns or summer AC demand picks up." },
      { q: "Can customers book servicing or repair slots?", a: "Yes. They can self-book suitable callbacks or visits." },
    ],
  },
  {
    key: "kitchen-bath",
    name: "Kitchen & Bathroom Fitters",
    Icon: window.IconWrench,
    items: [
      { q: "Can it qualify full installs from small repairs?", a: "Yes. BackIn5 can separate full projects from minor jobs before they reach you." },
      { q: "Can it ask about budget and timescale?", a: "Yes. You can choose the questions that matter before spending time on the enquiry." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can customers upload photos of the room?", a: "Yes. Photos, measurements and requirements can be collected upfront." },
      { q: "Can it organise quote requests properly?", a: "Yes. Each enquiry arrives structured and easier to review." },
    ],
  },
  {
    key: "windows-doors",
    name: "Window & Door Installers",
    Icon: window.IconDoor,
    items: [
      { q: "Can it ask what product the customer wants?", a: "Yes. Windows, composite doors, bifolds, repairs, glazing and full replacements can be separated." },
      { q: "Can it collect measurements or photos?", a: "Yes. Customers can upload photos and basic details before you call." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it book surveys?", a: "Yes. Customers can self-book survey or callback slots." },
      { q: "Can it stop quote requests going cold?", a: "Yes. BackIn5 can follow up automatically if customers don't reply." },
    ],
  },
  {
    key: "drainage",
    name: "Drainage Companies",
    Icon: window.IconWrench,
    items: [
      { q: "Can it prioritise blocked drains?", a: "Yes. Urgent blockages can be flagged and responded to immediately." },
      { q: "Can it ask if it's internal or external?", a: "Yes. BackIn5 can collect key details before dispatch or callback." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it capture postcode and access details?", a: "Yes. Location, access and urgency can be confirmed upfront." },
      { q: "Can it reduce wasted callouts?", a: "Yes. Better detail helps you decide whether the job is worth attending." },
    ],
  },
  {
    key: "pest",
    name: "Pest Control",
    Icon: window.IconBug,
    items: [
      { q: "Can it ask what pest issue they have?", a: "Yes. Rats, mice, wasps, bed bugs, fleas and other issues can be separated." },
      { q: "Can it ask where the problem is?", a: "Yes. BackIn5 can collect property type, room/location and urgency." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it handle urgent enquiries quickly?", a: "Yes. Customers get an instant response instead of waiting for a callback." },
      { q: "Can it book treatment visits?", a: "Yes. Customers can book suitable callback or visit times." },
    ],
  },
  {
    key: "painters",
    name: "Painters & Decorators",
    Icon: window.IconBrush,
    items: [
      { q: "Can it separate small rooms from bigger jobs?", a: "Yes. BackIn5 can ask room count, interior/exterior, property type and timescale." },
      { q: "Can it collect photos?", a: "Yes. Customers can upload room photos before you quote or call." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it ask whether materials are included?", a: "Yes. Your quoting questions can be tailored to how you price jobs." },
      { q: "Can it keep enquiries organised during busy periods?", a: "Yes. Quote requests stay captured instead of sitting in messages." },
    ],
  },
  {
    key: "tree",
    name: "Tree Surgeons",
    Icon: window.IconLeaf,
    items: [
      { q: "Can it ask what tree work is needed?", a: "Yes. Reductions, removals, pruning, stump grinding and emergency work can be separated." },
      { q: "Can it collect photos of the tree?", a: "Yes. Photos and access details can be requested upfront." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it ask about access and location?", a: "Yes. BackIn5 can capture garden access, nearby buildings and postcode." },
      { q: "Can it prioritise urgent or unsafe work?", a: "Yes. Dangerous trees or urgent jobs can be flagged quickly." },
    ],
  },
  {
    key: "locksmiths",
    name: "Locksmiths",
    Icon: window.IconKey,
    items: [
      { q: "Can it handle emergency lockouts?", a: "Yes. BackIn5 can respond instantly and capture location, lock type and urgency." },
      { q: "Can it tell the difference between emergency and non-urgent work?", a: "Yes. Lockouts, replacements, repairs and upgrades can be separated." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it collect postcode quickly?", a: "Yes. Location can be captured straight away so you know if it's worth attending." },
      { q: "Can it keep customers from ringing someone else?", a: "Yes. Fast replies keep the enquiry warm before they move on." },
    ],
  },
  {
    key: "property-maint",
    name: "Property Maintenance Companies",
    Icon: window.IconHome,
    items: [
      { q: "Can it handle mixed job types?", a: "Yes. Plumbing, electrical, repairs, decorating and general maintenance can be categorised." },
      { q: "Can it collect photos before sending someone out?", a: "Yes. Customers can upload photos and explain the issue upfront." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it organise landlord or tenant requests?", a: "Yes. Enquiries can be structured so you know who raised it and what needs doing." },
      { q: "Can it reduce admin across lots of small jobs?", a: "Yes. BackIn5 keeps requests organised instead of scattered across messages." },
    ],
  },
  {
    key: "cleaning",
    name: "Cleaning & Exterior Cleaning Companies",
    Icon: window.IconSpray,
    items: [
      { q: "Can it ask what type of clean is needed?", a: "Yes. One-off cleans, regular cleans, end-of-tenancy, gutters, roofs, windows or pressure washing can be separated." },
      { q: "Can it collect property size and access details?", a: "Yes. BackIn5 can ask the questions needed to price properly." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it handle quote requests outside working hours?", a: "Yes. Customers get a response even when you're not available." },
      { q: "Can it stop enquiries getting lost during busy weeks?", a: "Yes. Everything is captured, organised and ready to follow up." },
    ],
  },
];

const ALL_TRADE_FAQS = [...MAIN_TRADE_FAQS, ...MORE_TRADE_FAQS];

function FaqAccordion({ items, group = "", initialOpen = -1 }) {
  const [openIdx, setOpenIdx] = useStateB(initialOpen);
  React.useEffect(() => {setOpenIdx(initialOpen);}, [group]);
  return (
    <div className="faq-list" key={group}>
      {items.map((it, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className="faq-item">
            <button
              className="faq-q"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? -1 : i)}>
              
              <span>{it.q}</span>
              <span className="faq-icon"><IconPlus size={16} /></span>
            </button>
            {open && <div className="faq-a">{it.a}</div>}
          </div>);

      })}
    </div>);
}

function Faqs() {
  const [activeTrade, setActiveTrade] = useStateB(MAIN_TRADE_FAQS[0].key);
  const [dropdownOpen, setDropdownOpen] = useStateB(false);
  const dropdownRef = React.useRef(null);
  const tradePanelRef = React.useRef(null);
  const active = ALL_TRADE_FAQS.find((t) => t.key === activeTrade) || MAIN_TRADE_FAQS[0];
  const activeInMore = MORE_TRADE_FAQS.find((t) => t.key === activeTrade);

  // On mobile, scroll to the questions panel when a trade is tapped.
  // Skip the very first render so visitors don't get yanked down to the
  // FAQs section the moment the homepage loads.
  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (tradePanelRef.current && window.innerWidth < 900) {
      setTimeout(() => {
        var el = tradePanelRef.current;
        if (!el) return;
        var top = (window.pageYOffset || document.documentElement.scrollTop)
                  + el.getBoundingClientRect().top - 80;
        window.scrollTo(0, top);
      }, 150);
    }
  }, [activeTrade]);

  // Close the dropdown when clicking outside, or pressing Escape
  React.useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const onEsc = (e) => {if (e.key === 'Escape') setDropdownOpen(false);};
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [dropdownOpen]);

  return (
    <section className="canvas-light band" id="faqs">
      <div className="container narrow">
        <div className="sec-head">
          <span className="eyebrow">FAQs</span>
          <h2 className="display">Straight answers.</h2>
          <p className="lead">Common Questions We Get Asked

          </p>
        </div>

        {/* GENERAL FAQS - always visible, open on the page */}
        <div className="faq-block faq-general-block">
          <div className="faq-block-head">
            <div className="faq-block-eyebrow">General</div>
            <div className="faq-block-title">Questions every trades business asks</div>
          </div>
          <FaqAccordion items={GENERAL_FAQS} group="general" />
        </div>

        {/* TRADE-SPECIFIC FAQS - wrapped in an elevated tinted card for clear separation */}
        <div className="faq-block faq-trade-block">
          <div className="faq-trade-card">
            <div className="faq-trade-head">
              <div className="faq-block-eyebrow accent">Tailored to your trade</div>
              <h3 className="faq-trade-title">Pick your trade for specific answers.</h3>
              <p className="faq-trade-sub">
                Each trade gets four questions we hear most often during onboarding.
              </p>
            </div>

            <div className="trade-pills" role="tablist" aria-label="Select your trade">
              {MAIN_TRADE_FAQS.map((t) => {
                const isActive = t.key === activeTrade;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={isActive}
                    className={"trade-pill " + (isActive ? "active" : "")}
                    onClick={() => {setActiveTrade(t.key);setDropdownOpen(false);}}>
                    
                    <t.Icon size={15} />
                    <span>{t.name}</span>
                  </button>);

              })}

              {/* "More trades ▾" dropdown trigger - last pill */}
              <div className="trade-pill-more" ref={dropdownRef}>
                <button
                  className={"trade-pill trade-pill-trigger " + (activeInMore ? "active" : "")}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="listbox"
                  onClick={() => setDropdownOpen((o) => !o)}>
                  
                  <IconPlus size={15} />
                  <span>{activeInMore ? activeInMore.name : "More trades"}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 2, transition: 'transform 180ms ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {dropdownOpen &&
                <div className="trade-dropdown" role="listbox">
                    <div className="trade-dropdown-label">More trades</div>
                    {MORE_TRADE_FAQS.map((t) => {
                    const isActive = t.key === activeTrade;
                    return (
                      <button
                        key={t.key}
                        role="option"
                        aria-selected={isActive}
                        className={"trade-dropdown-item " + (isActive ? "active" : "")}
                        onClick={() => {setActiveTrade(t.key);setDropdownOpen(false);}}>
                        
                          <t.Icon size={15} />
                          <span>{t.name}</span>
                          {isActive && <IconCheck size={14} />}
                        </button>);

                  })}
                  </div>
                }
              </div>
            </div>

            <div className="faq-trade-panel" key={activeTrade} ref={tradePanelRef}>
              <FaqAccordion items={active.items} group={activeTrade} initialOpen={0} />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ----------------- Footer -----------------
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="nav-brand">
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
              <li><a href="#built-for">Built for</a></li>
              <li><a href="see-the-system.html">How it works</a></li>
              <li><a href="#compare">Comparison</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faqs">FAQs</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 BackIn5 Ltd · Registered in England · Made for trades.</span>
          <span><a href="terms.html" target="_blank" rel="noopener" className="footer-terms-link">Terms</a> · hello@backin5.org</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Comparison, Pricing, TrialNudge, CtaBand, Faqs, Footer });