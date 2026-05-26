"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconPlus, IconCheck, IconWrench, IconBoltAlt, IconBrick, IconHome, IconLeaf, IconBoiler } from "./icons";

const GENERAL_FAQS = [
  { q: "What actually is BackIn5?", a: "BackIn5 handles missed calls, website enquiries, messages, follow-ups and bookings automatically, helping keep jobs moving whilst you work." },
  { q: "Will this replace how we already handle enquiries?", a: "No. BackIn5 supports your existing process by handling missed calls, messages, follow-ups and customer replies in the background." },
  { q: "What happens if we miss a call whilst busy?", a: "The customer receives an instant response, can explain the job, upload photos and even book a callback or site visit whilst you're still on-site." },
  { q: "Will this actually reduce admin, or create more work?", a: "The goal is the opposite. BackIn5 keeps enquiries organised, collects the right information upfront and cuts down chasing messages and callbacks." },
  { q: "Will it start giving customers prices or quotes automatically?", a: "No. BackIn5 helps qualify and organise enquiries properly, but you stay in control of pricing. We've found this is a preference for trades." },
  { q: "How long does it take to get set up?", a: "Most businesses are up and running within 24–48 hours, depending on the type of enquiries you handle and how tailored you want the workflow to be." },
];

const MAIN_TRADE_FAQS = [
  {
    key: "roofers", name: "Roofers", Icon: IconHome,
    items: [
      { q: "Can it ask if there's an active leak?", a: "Yes. BackIn5 can ask whether water is coming in now, where the issue is, and request photos before you call back." },
      { q: "Can it separate repairs from full reroof enquiries?", a: "Yes. It can qualify the job type so you can prioritise bigger or more urgent work." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day. BackIn5 is tailored around how your business already handles enquiries, quotes and bookings." },
      { q: "Can it book roof surveys?", a: "Yes. Customers can self-book a callback or survey slot based on your availability." },
    ],
  },
  {
    key: "builders", name: "Builders", Icon: IconBrick,
    items: [
      { q: "Can it handle vague extension or renovation enquiries?", a: "Yes. BackIn5 asks what work is needed, property type, stage of planning and timescale." },
      { q: "Can it filter out jobs that are too small?", a: "Yes. You set what type of work you want, and the system qualifies against that." },
      { q: "How long does it take to get set up?", a: "Most businesses are up and running within a day." },
      { q: "Can it collect plans or photos?", a: "Yes. Customers can upload photos, drawings or basic project details." },
    ],
  },
  {
    key: "plumbers", name: "Plumbers", Icon: IconWrench,
    items: [
      { q: "Can it spot urgent leaks or no-heating jobs?", a: "Yes. BackIn5 can prioritise urgent issues and collect key details straight away." },
      { q: "Can it ask what type of plumbing issue it is?", a: "Yes. Leaks, bathrooms, taps, toilets, heating, cylinders and more can be routed differently." },
      { q: "Will it collect photos?", a: "Yes. Customers can upload photos so you know what you're dealing with before calling." },
      { q: "Can it stop me chasing vague enquiries?", a: "Yes. It collects the basics upfront so only clearer enquiries reach you." },
    ],
  },
  {
    key: "electricians", name: "Electricians", Icon: IconBoltAlt,
    items: [
      { q: "Can it filter small jobs from bigger works?", a: "Yes. BackIn5 can ask whether it's fault finding, lighting, rewires, consumer units, EV chargers or inspections." },
      { q: "Can it ask if power is off or if it's urgent?", a: "Yes. Urgency can be captured so emergency jobs are prioritised." },
      { q: "Can it deal with people asking for 'rough prices'?", a: "Yes. It can collect enough detail first so you're not guessing blind." },
      { q: "Can it book appointments?", a: "Yes. Customers can choose a callback or visit time without back-and-forth messages." },
    ],
  },
  {
    key: "landscapers", name: "Landscapers", Icon: IconLeaf,
    items: [
      { q: "Can it handle seasonal quote demand?", a: "Yes. BackIn5 keeps enquiries organised when spring and summer enquiries pick up." },
      { q: "Can it ask what type of work is needed?", a: "Yes. Patios, fencing, turf, driveways, drainage, maintenance or full garden projects can be separated." },
      { q: "Can it collect photos of the space?", a: "Yes. Customers can send photos before you call back." },
      { q: "Can it filter poor-fit jobs?", a: "Yes. Location, job type, timescale and budget fit can be checked early." },
    ],
  },
];

const MORE_TRADE_FAQS = [
  {
    key: "hvac", name: "HVAC & Boiler Engineers", Icon: IconBoiler,
    items: [
      { q: "Can it prioritise no-heating calls?", a: "Yes. BackIn5 can identify urgent breakdowns and keep the customer engaged immediately." },
      { q: "Can it ask what boiler system they have?", a: "Yes. It can collect boiler type, make, issue, error codes and photos." },
      { q: "Can it handle seasonal spikes?", a: "Yes. It keeps enquiries moving when winter breakdowns or summer AC demand picks up." },
      { q: "Can customers book servicing or repair slots?", a: "Yes. They can self-book suitable callbacks or visits." },
    ],
  },
];

function FaqAccordion({ items, dark }: { items: { q: string; a: string }[]; dark?: boolean }) {
  const [openIdx, setOpenIdx] = useState(-1);
  return (
    <div className="faq-list">
      {items.map((it, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className="faq-item">
            <button
              className="faq-q"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? -1 : i)}
            >
              <span>{it.q}</span>
              <span className="faq-icon"><IconPlus size={16} /></span>
            </button>
            {open && <div className="faq-a">{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function Faqs() {
  const [activeTrade, setActiveTrade] = useState(MAIN_TRADE_FAQS[0].key);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const active = [...MAIN_TRADE_FAQS, ...MORE_TRADE_FAQS].find((t) => t.key === activeTrade) || MAIN_TRADE_FAQS[0];
  const activeInMore = MORE_TRADE_FAQS.find((t) => t.key === activeTrade);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setDropdownOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onDocClick); document.removeEventListener("keydown", onEsc); };
  }, [dropdownOpen]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".faqs-sec-head", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".faqs-sec-head", start: "top 85%", once: true },
      });
      gsap.from(".faq-general-block", {
        y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".faq-general-block", start: "top 85%", once: true },
      });
      gsap.from(".faq-trade-block", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".faq-trade-block", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="canvas-light band" id="faqs" ref={sectionRef}>
      <div className="container narrow">
        <div className="sec-head faqs-sec-head">
          <span className="eyebrow">FAQs</span>
          <h2 className="display">Straight answers.</h2>
          <p className="lead">Common Questions We Get Asked</p>
        </div>

        <div className="faq-block faq-general-block">
          <div className="faq-block-head">
            <div className="faq-block-eyebrow">General</div>
            <div className="faq-block-title">Questions every trades business asks</div>
          </div>
          <FaqAccordion items={GENERAL_FAQS} />
        </div>

        <div className="faq-block faq-trade-block">
          <div className="faq-trade-card">
            <div className="faq-trade-head">
              <div className="faq-block-eyebrow accent">Tailored to your trade</div>
              <h3 className="faq-trade-title">Pick your trade for specific answers.</h3>
              <p className="faq-trade-sub">Each trade gets four questions we hear most often during onboarding.</p>
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
                    onClick={() => { setActiveTrade(t.key); setDropdownOpen(false); }}
                  >
                    <t.Icon size={15} />
                    <span>{t.name}</span>
                  </button>
                );
              })}

              <div className="trade-pill-more" ref={dropdownRef}>
                <button
                  className={"trade-pill trade-pill-trigger " + (activeInMore ? "active" : "")}
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((o) => !o)}
                >
                  <IconPlus size={15} />
                  <span>{activeInMore ? activeInMore.name : "More trades"}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 2, transition: "transform 180ms ease", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {dropdownOpen && (
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
                          onClick={() => { setActiveTrade(t.key); setDropdownOpen(false); }}
                        >
                          <t.Icon size={15} />
                          <span>{t.name}</span>
                          {isActive && <IconCheck size={14} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="faq-trade-panel" key={activeTrade}>
              <FaqAccordion items={active.items} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
