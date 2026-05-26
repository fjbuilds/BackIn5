"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconWrench, IconBoltAlt, IconBrick, IconHome, IconLeaf, IconQuestion, IconArrowRight } from "./icons";
import BuiltForMotion from "./BuiltForMotion";

const TRADES = [
  { key: "plumbers", name: "Plumbers", Icon: IconWrench, desc: "Handle leak and no-heating callouts whilst you're on-site." },
  { key: "electricians", name: "Electricians", Icon: IconBoltAlt, desc: "Stop wasting evenings calling people back." },
  { key: "hvac", name: "Builders", Icon: IconBrick, desc: "Stop new enquiries getting buried between ongoing projects." },
  { key: "roofers", name: "Roofers", Icon: IconHome, desc: "Catch quote requests before they ring the next roofer." },
  { key: "landscapers", name: "Landscapers", Icon: IconLeaf, desc: "Keep up with Summer quote demand without losing decent jobs." },
  { key: "other", name: "Any Other Trade", Icon: IconQuestion, desc: "Built for busy trades where the phone never stops. And admin never ends." },
];

export default function BuiltFor() {
  const [activeIdx, setActiveIdx] = useState(0);
  const userPicked = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (!userPicked.current) setActiveIdx((i) => (i + 1) % TRADES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".built-for-head", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".built-for-head", start: "top 85%", once: true },
      });
      gsap.from(".trade-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ".trades-grid", start: "top 85%", once: true },
      });
      gsap.from(".bf-motion", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trades-split", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const activeTrade = TRADES[activeIdx];

  return (
    <section className="canvas-light band" id="built-for" ref={sectionRef}>
      <div className="container">
        <div className="sec-head center built-for-head">
          <span className="eyebrow">Built for</span>
          <h2 className="display" style={{ fontSize: "65px" }}>
            Built For Busy Trades Where Missed Enquiries Mean Lost Work
          </h2>
        </div>

        <div className="trades-split">
          <div className="trades-grid">
            {TRADES.map((t, i) => (
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
            ))}
          </div>
          <BuiltForMotion activeTrade={activeTrade} />
        </div>

        <div style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
          <a href="#how" className="btn btn-dark btn-lg btn-arrow">
            See How It Works... <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
