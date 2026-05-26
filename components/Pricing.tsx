"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCheck, IconArrowRight } from "./icons";

const tiers = [
  {
    name: "Smart Enquiry Handling",
    tagline: "Small businesses that need faster replies & better organisation.",
    price: 199,
    foot: "£99 setup fee | Min 3-month term, rolling thereafter\nSetup fee waived on 6+ month agreements.",
    feats: [
      "Instant replies to new enquiries",
      "Stops jobs from being missed whilst on-site",
      "Enquiries organised and ready to quote",
      "Customer details collected automatically",
      "Works with website, Facebook & trade-sites (Checkatrade, Trust a Trader, MyJobQuote + more)",
      "Simple setup. No apps or office staff needed.",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Full Enquiry & Admin Desk",
    tagline: "A complete inbound enquiry & booking system without office staff.",
    price: 399,
    foot: "£149 setup fee | Min 3-month term, rolling thereafter\nSetup fee waived on 6+ month agreements.",
    feats: [
      "Everything in Smart Enquiry Handling",
      "24/7 missed call text backs",
      "Enquiry quality control — photo & video collection",
      "Automatic customer follow-ups",
      "Quote & site-visit booking — self-booked by customer, into your diary",
      "WhatsApp, text & email progression",
      "Website live quote assistant",
    ],
    cta: "Get Started",
    featured: true,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".pricing-sec-head", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".pricing-sec-head", start: "top 85%", once: true },
      });
      gsap.from(".price-card", {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".pricing-grid", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="canvas-soft band" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="sec-head center pricing-sec-head" style={{ alignItems: "center" }}>
          <span className="eyebrow">Pricing</span>
          <h2 className="display">
            Cheaper than hiring office staff.<br />Handles Enquiries 24/7.
          </h2>
          <p className="lead" style={{ textAlign: "center" }}>Fixed monthly pricing — Cancel anytime</p>
        </div>

        <div className="pricing-grid">
          {tiers.map((t) => (
            <div key={t.name} className={"price-card " + (t.featured ? "featured" : "")}>
              {t.featured && <span className="badge-popular">Most picked</span>}
              <div className="tier">{t.name}</div>
              <div className="tagline">{t.tagline}</div>
              <div className="price-num">£{t.price}<span className="per">/ month</span></div>
              <div className="price-feats">
                {t.feats.map((f, i) => (
                  <div key={i} className="price-feat">
                    <IconCheck size={16} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className={"btn " + (t.featured ? "btn-light" : "btn-dark") + " btn-arrow"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {t.cta} <IconArrowRight size={16} />
              </a>
              <div className="price-foot" style={{ textAlign: "center" }}>{t.foot}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
