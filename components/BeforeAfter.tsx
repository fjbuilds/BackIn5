"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconPhoneMissed, IconArrowRight, IconCheck } from "./icons";

const BEFORE_ITEMS = [
  { kind: "phone", text: "Missed calls turning into lost jobs", top: "6%", left: "3%", rot: -4 },
  { kind: "ruled", tag: "Notebook · page 3", text: "Customers going elsewhere whilst waiting for replies", top: "26%", left: "21%", rot: 3 },
  { kind: "channels", text: "WhatsApp, Facebook, website and calls all over the place", top: "9%", left: "30%", rot: -2 },
  { kind: "docket", tag: "URGENT", text: "Evenings spent chasing callbacks and quotes", top: "48%", left: "4%", rot: -3 },
  { kind: "clip", tag: "Job sheet", text: "Poor enquiries mixed in with genuine work", top: "32%", left: "40%", rot: 3, strike: true },
  { kind: "ruled", tag: "Back of an invoice", text: "New jobs forgotten once the day gets busy", top: "64%", left: "24%", rot: 5 },
];

const AFTER_ITEMS = [
  "Every enquiry responded to instantly, 24/7",
  "Customers kept engaged whilst you're on-site or off the clock",
  "Calls, messages and quote requests organised in one place",
  "Customers can self-book callbacks and site visits",
  "Photos, postcodes and job details collected upfront",
  "More qualified jobs reaching you with less admin",
];

export default function BeforeAfter() {
  const [reveal, setReveal] = useState(70);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hasInteracted = useRef(false);
  const wiggleRaf = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const setFromClientX = (clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const pct = Math.max(6, Math.min(94, ((clientX - rect.left) / rect.width) * 100));
    setReveal(pct);
  };

  const stopWiggle = () => {
    hasInteracted.current = true;
    if (wiggleRaf.current) cancelAnimationFrame(wiggleRaf.current);
  };

  const onMove = (e: PointerEvent) => { if (dragging.current) setFromClientX(e.clientX); };
  const onUp = () => { dragging.current = false; document.body.style.userSelect = ""; };
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    stopWiggle();
    document.body.style.userSelect = "none";
    setFromClientX(e.clientX);
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  });

  useEffect(() => {
    let cancelled = false;
    const lerp = (from: number, to: number, duration: number) =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const tick = (now: number) => {
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
    const interval = setInterval(cycle, 7500);
    return () => {
      cancelled = true;
      if (wiggleRaf.current) cancelAnimationFrame(wiggleRaf.current);
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".beforeafter-sec-head", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".beforeafter-sec-head", start: "top 85%", once: true },
      });
      gsap.from(".beforeafter-lead", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".beforeafter-lead", start: "top 88%", once: true },
      });
      gsap.from(".reveal-stage", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".reveal-stage", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="canvas-dark band" id="real-cost" ref={sectionRef}>
      <div className="container">
        <div className="sec-head center beforeafter-sec-head" style={{ alignItems: "center" }}>
          <span className="eyebrow on-dark">Before vs after</span>
          <h2 className="display" style={{ color: "#fff" }}>
            What missed enquiries are really costing your business.
          </h2>
          <div className="beforeafter-lead">
            <div className="ba-problem">
              <p className="ba-text">Most busy trades either handle admin themselves once the day slows down, or pay someone full-time to keep up with calls, messages and bookings.</p>
              <p className="ba-text">The problem is, most don&apos;t realise how many decent jobs get missed, forgotten or go elsewhere once the day gets busy.</p>
            </div>
            <p className="ba-promise">BackIn5 helps businesses respond faster, stay organised, and stop work slipping through the cracks — without adding more to the owner&apos;s plate.</p>
          </div>
        </div>

        <div
          ref={stageRef}
          className="reveal-stage"
          style={{ "--reveal": reveal + "%" } as React.CSSProperties}
          onPointerDown={onDown}
        >
          <div className="reveal-scene before">
            <div className="scene-label scene-label-before">
              <span className="dot" /> Before BackIn5
            </div>
            {BEFORE_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`paper paper-${item.kind}${item.strike ? " is-strike" : ""}`}
                style={{ top: item.top, left: item.left, "--rot": item.rot + "deg", animationDelay: `${i * 90}ms` } as React.CSSProperties}
              >
                {item.kind === "phone" ? (
                  <>
                    <div className="paper-statbar"><span>9:41</span><span><IconPhoneMissed size={11} stroke={2} /></span></div>
                    <div className="paper-missed-count">11 missed</div>
                    <div className="paper-text">{item.text}</div>
                  </>
                ) : item.kind === "channels" ? (
                  <>
                    <div className="paper-channels">
                      <span className="ch wa">WA</span><span className="ch fb">FB</span>
                      <span className="ch web">WEB</span><span className="ch call">CALL</span>
                    </div>
                    <div className="paper-text">{item.text}</div>
                  </>
                ) : (
                  <>
                    {item.kind === "clip" && <div className="clip-bar" />}
                    {item.tag && <div className="paper-tag">{item.tag}</div>}
                    <div className="paper-text">{item.text}</div>
                  </>
                )}
              </div>
            ))}
          </div>

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
                <div key={i} className="clean-row" style={{ animationDelay: `${240 + i * 90}ms` }}>
                  <span className="check"><IconCheck size={13} stroke={2.4} /></span>
                  <span className="clean-text">{text}</span>
                </div>
              ))}
            </div>
          </div>

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
    </section>
  );
}
