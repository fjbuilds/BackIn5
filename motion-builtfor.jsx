/* eslint-disable */
// Motion graphic for the "Built For" section.
// Chaos → BackIn5 core → organised output. Loops indefinitely.

const CHAOS_CHIPS = [
  { Icon: window.IconPhoneMissed, label: "Missed call",   top: "12%", left: "6%",  delay: "0s",   color: "#B83A3A" },
  { Icon: window.IconMessage,     label: "WhatsApp",      top: "32%", left: "22%", delay: "0.4s", color: "#22944F" },
  { Icon: window.IconMail,        label: "Email enquiry", top: "60%", left: "8%",  delay: "0.8s", color: "#3450b3" },
  { Icon: window.IconStar,        label: "Checkatrade",   top: "78%", left: "24%", delay: "1.2s", color: "#C9802B" },
  { Icon: window.IconMessage,     label: "Facebook DM",   top: "18%", left: "38%", delay: "0.6s", color: "#1B3380" },
  { Icon: window.IconPhone,       label: "Quote request", top: "50%", left: "40%", delay: "1.0s", color: "#0E1116" },
];

const ORDERED_ROWS = [
  { text: "Sarah K. - Leak repair · BS6",         tag: "Qualified", delay: "0s" },
  { text: "Mark D. - Boiler service · BS3",       tag: "Booked",    delay: "1.6s" },
  { text: "J. Patel - Bathroom refit · BS7",      tag: "Qualified", delay: "3.2s" },
  { text: "Tom R. - Drain unblock · BS4",         tag: "Booked",    delay: "4.8s" },
];

const ORBIT_TOOLS = [
  { Icon: window.IconWrench,  angle:   0 },
  { Icon: window.IconBoltAlt, angle:  60 },
  { Icon: window.IconBrick,   angle: 120 },
  { Icon: window.IconHome,    angle: 180 },
  { Icon: window.IconLeaf,    angle: 240 },
  { Icon: window.IconBoiler,  angle: 300 },
];

function BuiltForMotion({ activeTrade }) {
  const ToolIcon = activeTrade && activeTrade.Icon ? activeTrade.Icon : window.IconWrench;
  const toolName = activeTrade && activeTrade.name ? activeTrade.name : "Trades";

  // Pool of qualified jobs across 5 trades, cycled in trios for variability
  const JOB_POOL = [
    { trade: "Plumbers",     text: "Leak repair · BS6 5HE",         meta: "1 photo attached · urgent" },
    { trade: "Roofers",      text: "Slipped tiles · BS5 7QN",       meta: "2 photos · ladder access OK" },
    { trade: "Electricians", text: "Fuseboard upgrade · BS9 3BG",   meta: "Part P notifiable" },
    { trade: "Builders",     text: "Single-storey extension · BS3", meta: "Plans uploaded · ready to quote" },
    { trade: "Landscapers",  text: "Patio quote · BS8 1TH",         meta: "30m² · side-access 1.2m" },
    { trade: "Plumbers",     text: "Boiler service · BS3 4AA",      meta: "Worcester 2018 · photo attached" },
    { trade: "Roofers",      text: "Storm leak · BS7 9NY",          meta: "1 photo · today if possible" },
    { trade: "Electricians", text: "EV charger install · BS4 2EE",  meta: "Driveway · 22kW" },
    { trade: "Builders",     text: "Loft conversion · BS2 8DJ",     meta: "Pre-planning · budget set" },
    { trade: "Landscapers",  text: "Lawn turfing · BS5 0LE",        meta: "60m² · ready next week" },
    { trade: "Plumbers",     text: "Bathroom refit quote · BS6",    meta: "3 photos · mid-March start" },
    { trade: "Electricians", text: "Outdoor lighting · BS8 4PE",    meta: "Garden + driveway" },
  ];

  const [batchIdx, setBatchIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setBatchIdx((i) => (i + 3) % JOB_POOL.length), 3200);
    return () => clearInterval(id);
  }, []);
  const visibleJobs = [0, 1, 2].map((n) => JOB_POOL[(batchIdx + n) % JOB_POOL.length]);

  // All inbound channel chips, organised into a tidy 2-row grid
  const CHAOS_CHIPS = [
    { Icon: window.IconPhoneMissed, label: "Missed call",  color: "#B83A3A" },
    { Icon: window.IconMessage,     label: "WhatsApp",     color: "#22944F" },
    { Icon: window.IconMessage,     label: "Facebook",     color: "#1B3380" },
    { Icon: window.IconMail,        label: "Email",        color: "#3450b3" },
    { Icon: window.IconChat,        label: "Web chat",     color: "#0E1116" },
    { Icon: window.IconStar,        label: "Checkatrade",  color: "#C9802B" },
  ];

  return (
    <div className="bf-motion" aria-hidden="true">
      <div className="bf-motion-bg" />
      <div className="bf-motion-grid" />

      <div className="bf-zone-label bf-zone-label-top">Inbound enquiries</div>
      <div className="bf-zone-label bf-zone-label-bottom">Qualified work</div>

      <svg className="bf-connectors" viewBox="0 0 360 540" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bf-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(35,65,168,0)" />
            <stop offset="50%"  stopColor="rgba(35,65,168,0.55)" />
            <stop offset="100%" stopColor="rgba(35,65,168,0)" />
          </linearGradient>
          <linearGradient id="bf-line-out" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(35,65,168,0.55)" />
            <stop offset="100%" stopColor="rgba(35,65,168,0)" />
          </linearGradient>
        </defs>
        {/* 6 chips → core */}
        <path d="M 60 80   C 60 150,  180 200, 180 260" className="bf-path" style={{ animationDelay: "0s"   }} />
        <path d="M 180 70  C 180 140, 180 200, 180 260" className="bf-path" style={{ animationDelay: "0.3s" }} />
        <path d="M 300 80  C 300 150, 180 200, 180 260" className="bf-path" style={{ animationDelay: "0.6s" }} />
        <path d="M 60 180  C 60 220,  180 240, 180 260" className="bf-path" style={{ animationDelay: "0.9s" }} />
        <path d="M 180 180 C 180 220, 180 240, 180 260" className="bf-path" style={{ animationDelay: "1.2s" }} />
        <path d="M 300 180 C 300 220, 180 240, 180 260" className="bf-path" style={{ animationDelay: "1.5s" }} />

        {/* core → organised rows */}
        <path d="M 180 340 C 180 400, 80  440, 80  470" className="bf-path-out" style={{ animationDelay: "0s"   }} />
        <path d="M 180 340 C 180 400, 180 440, 180 470" className="bf-path-out" style={{ animationDelay: "0.4s" }} />
        <path d="M 180 340 C 180 400, 280 440, 280 470" className="bf-path-out" style={{ animationDelay: "0.8s" }} />
      </svg>

      <div className="bf-chaos">
        {CHAOS_CHIPS.map((c, i) => (
          <div
            key={i}
            className="bf-chip"
            style={{ animationDelay: (i * 0.18) + "s" }}
          >
            <span className="bf-chip-ic" style={{ color: c.color }}>
              <c.Icon size={12} stroke={2} />
            </span>
            <span className="bf-chip-label">{c.label}</span>
          </div>
        ))}
      </div>

      <div className="bf-core">
        <div className="bf-core-ring bf-core-ring-1" />
        <div className="bf-core-ring bf-core-ring-2" />
        <div className="bf-core-ring bf-core-ring-3" />
        <div className="bf-core-disc" key={activeTrade ? activeTrade.key : "none"}>
          <ToolIcon size={36} stroke={1.6} />
        </div>
        <div className="bf-core-caption">{toolName}</div>
      </div>

      <div className="bf-order">
        <div className="bf-order-head">
          <span>Today · qualified</span>
          <span className="bf-order-count">{JOB_POOL.length} ready</span>
        </div>
        <div className="bf-order-list" key={batchIdx}>
          {visibleJobs.map((j, i) => (
            <div className="bf-order-row" key={i} style={{ animationDelay: (i * 0.12) + "s" }}>
              <span className="bf-order-check"><IconCheck size={11} stroke={2.4} /></span>
              <div className="bf-order-body">
                <div className="bf-order-text">{j.text}</div>
                <div className="bf-order-meta">
                  <span className="bf-order-trade">{j.trade}</span>
                  <span className="bf-order-dot">·</span>
                  <span>{j.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BuiltForMotion });
