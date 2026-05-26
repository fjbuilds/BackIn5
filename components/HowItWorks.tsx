"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconPhoneMissed, IconChat, IconMessage, IconStar, IconClock, IconRefresh,
  IconArrowRight, IconCheck,
} from "./icons";

const HOW_SCENARIOS = [
  {
    key: "missed-call", title: "Missed Call", sub: "Caller didn't get through", Icon: IconPhoneMissed,
    steps: ["Missed call comes in", "Instant text reply sent", "Job details taken (including photo/video evidence)", "Callback or site visit booked", "Enquiry arrives ready to quote"],
  },
  {
    key: "live-chat", title: "Website Live Chat", sub: "Visitor starts a chat on your site", Icon: IconChat,
    steps: ["Customer starts live chat on your website", "BackIn5 asks tailored quoting questions specific to your business", "Photos + job details collected", "Postcode and availability confirmed", "Quote is booked into your calendar automatically"],
    note: "Tailored to your business and how you quote jobs.",
  },
  {
    key: "facebook", title: "Facebook Message", sub: "DM lands on your business page", Icon: IconMessage,
    steps: ["Customer messages your business page", "Instant reply sent automatically", "Job details and photos collected", "Customer books callback or site visit", "Everything arrives organised in one place"],
  },
  {
    key: "checkatrade", title: "Checkatrade Lead", sub: "New lead drops in your queue", Icon: IconStar,
    steps: ["New Checkatrade lead comes through", "BackIn5 qualifies the enquiry before any other firm", "Customer receives an instant tailored response", "Photos, availability and job details collected", "Qualified enquiry arrives ready to quote"],
    note: "Filter enquiries by service area, job type, urgency, budget and more.",
  },
  {
    key: "out-of-hours", title: "Out-of-Hours Enquiry", sub: "Evening / weekend / bank holiday", Icon: IconClock,
    steps: ["Customer enquires after hours", "Instant response sent 24/7", "Enquiry details collected automatically", "Customer books suitable callback / site visit time", "You wake up to new jobs — no enquiries left waiting until morning"],
  },
  {
    key: "quote-followup", title: "Quote Follow-Up", sub: "Quote went quiet", Icon: IconRefresh,
    steps: ["Quote sent to customer", "Customer doesn't respond", "BackIn5 follows up automatically", "Customer re-engages with the enquiry", "Potential job stays active for longer"],
  },
];

export default function HowItWorks() {
  const [activeKey, setActiveKey] = useState(HOW_SCENARIOS[0].key);
  const sectionRef = useRef<HTMLElement>(null);
  const active = HOW_SCENARIOS.find((s) => s.key === activeKey) || HOW_SCENARIOS[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".how-sec-head", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".how-sec-head", start: "top 85%", once: true },
      });
      gsap.from(".how-list .how-row", {
        x: -30, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: ".how-list", start: "top 85%", once: true },
      });
      gsap.from(".how-flow", {
        x: 40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".how-flow", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="canvas-soft band" id="how" ref={sectionRef}>
      <div className="container">
        <div className="sec-head how-sec-head">
          <span className="eyebrow" style={{ fontSize: "18px" }}>HOW BACKIN5 WORKS</span>
          <h2 className="display">See how different enquiries are handled from start to finish</h2>
          <p className="lead" style={{ color: "rgb(14,17,22)", fontSize: "18px", fontFamily: "Inter" }}>
            From missed calls to Checkatrade leads, BackIn5 captures, qualifies and organises enquiries whilst your team&apos;s busy.
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
                  onClick={() => setActiveKey(s.key)}
                >
                  <div className="how-row-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="how-row-icon"><s.Icon size={18} /></div>
                  <div className="how-row-body">
                    <div className="how-row-title">{s.title}</div>
                    <div className="how-row-sub">{s.sub}</div>
                  </div>
                  <div className="how-row-arrow"><IconArrowRight size={16} /></div>
                </button>
              );
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
              {active.steps.map((step, i) => (
                <div
                  key={i}
                  className={"flow-step " + (i === active.steps.length - 1 ? "final" : "")}
                  style={{ animationDelay: `${80 + i * 160}ms` }}
                >
                  <div className="flow-rail">
                    <div className="flow-circle">
                      {i === active.steps.length - 1 ? <IconCheck size={16} /> : String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flow-text">{step}</div>
                </div>
              ))}
            </div>

            {active.note && (
              <div className="flow-note">
                <span className="flow-note-icon"><IconStar size={14} /></span>
                {active.note}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 56, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#pricing" className="btn btn-dark btn-arrow">Get Started <IconArrowRight size={16} /></a>
          <a href="#faqs" className="btn btn-ghost-light">Read FAQs</a>
        </div>
      </div>
    </section>
  );
}
