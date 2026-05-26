"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCheck, IconX, IconMinus } from "./icons";

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
  { feat: "Additional salary cost (£20K–£30K)", val: ["no", "yes", "no"] },
];

function Cell({ kind }: { kind: string }) {
  if (kind === "yes") return <span className="yes" title="Yes"><IconCheck size={16} /></span>;
  if (kind === "no") return <span className="no" title="No"><IconX size={16} /></span>;
  return <span className="partial" title="Partial"><IconMinus size={16} /></span>;
}

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".compare-sec-head", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".compare-sec-head", start: "top 85%", once: true },
      });
      gsap.from(".compare-row", {
        opacity: 0, y: 12, duration: 0.45, stagger: 0.04, ease: "power2.out",
        scrollTrigger: { trigger: ".compare", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="canvas-light band" id="compare" ref={sectionRef}>
      <div className="container">
        <div className="sec-head center compare-sec-head" style={{ alignItems: "center" }}>
          <span className="eyebrow">WHY TRADES SWITCH</span>
          <h2 className="display" style={{ maxWidth: "800px" }}>
            You Do The Work.<br />
            <span style={{ color: "var(--accent)" }}>BackIn5 Handles Admin.</span>
          </h2>
          <p className="lead">
            Website &amp; Trade-site leads, missed calls, quote requests and customer messages — all handled automatically in the background as you work.
          </p>
        </div>

        <div className="compare">
          <div className="compare-row">
            <div className="compare-cell head">Day-to-Day Reality</div>
            <div className="compare-cell head">Doing it Yourself</div>
            <div className="compare-cell head">Human receptionist</div>
            <div className="compare-cell head brand">BackIn5</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="compare-row">
              <div className="compare-cell"><span className="feature" style={{ fontSize: "13px" }}>{r.feat}</span></div>
              <div className="compare-cell"><Cell kind={r.val[0]} /></div>
              <div className="compare-cell"><Cell kind={r.val[1]} /></div>
              <div className="compare-cell brand-col"><Cell kind={r.val[2]} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
