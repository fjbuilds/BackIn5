"use client";
import { useState, useEffect } from "react";

const HERO_PANELS = [
  { title: "Never lose a decent job to a missed enquiry.", sub: "Calls, forms and messages handled instantly whilst you're busy." },
  { title: "Customers get replies whilst competitors don't.", sub: "Most people contact multiple trades. Fast responses win more work." },
  { title: "Stop wasting hours on poor enquiries.", sub: "Collect photos, job details and postcodes upfront before you even call." },
  { title: "No more enquiry chaos.", sub: "Everything organised, tracked and ready to quote in one place." },
  { title: "Whilst you're on the tools, the business still runs.", sub: "BackIn5 keeps enquiries moving without adding more to the owner's plate." },
];

export default function PanelCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_PANELS.length), 3900);
    return () => clearInterval(id);
  }, []);
  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="panel-carousel">
      <div className="panel-head">
        <div className="panel-mark-row">
          <span className="panel-mark-label" />
        </div>
        <div className="panel-counter">
          <span className="now">{pad2(idx + 1)}</span>
          <span className="sep"> / </span>
          <span className="total">{pad2(HERO_PANELS.length)}</span>
        </div>
      </div>
      <div className="panel-stage">
        {HERO_PANELS.map((p, i) => (
          <div
            key={i}
            className={"panel " + (i === idx ? "active" : i < idx ? "past" : "future")}
          >
            <div className="panel-bignum">{pad2(i + 1)}</div>
            <div className="panel-title">{p.title}</div>
            <div className="panel-sub">{p.sub}</div>
          </div>
        ))}
      </div>
      <div className="panel-foot">
        <div className="panel-progress">
          <div className="panel-progress-bar" key={idx} />
        </div>
        <div className="panel-dots">
          {HERO_PANELS.map((_, i) => (
            <button
              key={i}
              className={"panel-dot " + (i === idx ? "active" : "")}
              onClick={() => setIdx(i)}
              aria-label={`Show panel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
