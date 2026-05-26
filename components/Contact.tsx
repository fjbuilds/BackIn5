"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconPhone, IconCalendar, IconMail, IconArrowRight, IconMessage } from "./icons";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".contact-sec-head", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-sec-head", start: "top 85%", once: true },
      });
      gsap.from(".contact-card", {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="canvas-light band" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="sec-head center contact-sec-head" style={{ alignItems: "center" }}>
          <span className="eyebrow">Get in touch</span>
          <h2 className="display" style={{ color: "rgb(14,17,22)" }}>
            Want to see How Your Business Could Benefit From{" "}
            <span style={{ color: "#1e3a97" }}>BackIn5?</span>
          </h2>
          <p className="lead">Call, text, email or book a quick chat — whatever is easiest.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-head">
              <div className="contact-ic"><IconPhone /></div>
              <div>
                <div className="contact-card-title">Call or text</div>
                <div className="contact-card-sub">For quick questions or a straight answer.</div>
              </div>
            </div>
            <div className="contact-card-body">
              <a href="tel:+447000000000" className="btn btn-dark btn-arrow contact-btn">
                Call now <IconArrowRight size={16} />
              </a>
              <a href="sms:+447000000000" className="btn btn-ghost-light contact-btn">
                Text us <IconMessage size={16} />
              </a>
            </div>
            <div className="contact-card-foot">
              Mon–Fri, 8am–6pm. We answer fast or text you back.
            </div>
          </div>

          <div className="contact-card contact-card-featured">
            <div className="contact-card-head">
              <div className="contact-ic contact-ic-accent"><IconCalendar /></div>
              <div>
                <div className="contact-card-title">Book a quick chat</div>
                <div className="contact-card-sub">For a proper walkthrough of how it would work for your business.</div>
              </div>
            </div>
            <div className="calendly-wrap">
              <iframe
                src="https://calendly.com/backin5/intro?embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1&primary_color=3450b3"
                title="Book a chat with BackIn5"
                frameBorder={0}
                allow="camera; microphone; autoplay; encrypted-media; fullscreen"
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </div>
            <div className="contact-card-foot">15-minute intro · 100% no obligation.</div>
          </div>

          <div className="contact-card">
            <div className="contact-card-head">
              <div className="contact-ic"><IconMail /></div>
              <div>
                <div className="contact-card-title">Email</div>
                <div className="contact-card-sub">For questions, setup details or anything you want to send over.</div>
              </div>
            </div>
            <div className="contact-card-body">
              <a href="mailto:hello@backin5.com" className="btn btn-dark btn-arrow contact-btn">
                Email us <IconArrowRight size={16} />
              </a>
            </div>
            <div className="contact-card-foot">
              hello@backin5.com · we reply within one working day.
            </div>
          </div>
        </div>

        <div className="contact-reassure">
          <span className="contact-reassure-dot" />
          No hard sell. Just a quick chat to see if it makes sense for your business.
        </div>
      </div>
    </section>
  );
}
