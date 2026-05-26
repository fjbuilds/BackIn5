"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowRight } from "./icons";

export default function CtaBand() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".cta-watermark", {
        scale: 1.3,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".cta-inner > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-inner", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-band" ref={sectionRef}>
      <div className="cta-grid-bg" />
      <div className="cta-watermark" aria-hidden="true">5</div>
      <div className="container cta-inner" style={{ position: "relative" }}>
        <span className="eyebrow on-dark">Less hassle. Fewer missed jobs.</span>
        <h2 className="display" style={{ fontSize: "40px", maxWidth: "700px" }}>
          Just Because You&apos;ve Always Done Admin Yourself,<br />
          <em>Doesn&apos;t Mean You Still Should</em>
        </h2>
        <p className="lead cta-lead" style={{ textAlign: "center" }}>
          <span className="cta-lead-block">
            Most trades businesses aren&apos;t short on work. They&apos;re short on time.
            Calls get missed, quotes get delayed and decent jobs slip through the cracks whilst trying to stay on top of messages, follow-ups and work on-site.
          </span>
          <span className="cta-lead-block">
            <span className="cta-lead-brand">BackIn5</span> keeps customers engaged, enquiries organised and jobs moving whilst you focus on the work.
          </span>
          <span className="cta-lead-fine">
            No complicated software. No office staff. No evenings spent catching up on admin.
          </span>
        </p>
        <div className="hero-cta-row" style={{ justifyContent: "center", marginTop: 8 }}>
          <a href="#contact" className="btn btn-primary btn-lg btn-arrow">
            Get Started <IconArrowRight size={16} />
          </a>
          <a href="#how" className="btn btn-ghost-dark btn-lg">See how it works</a>
        </div>
      </div>
    </section>
  );
}
