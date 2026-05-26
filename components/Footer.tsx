"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="nav-brand">
              <Image
                src="/assets/backin5-logo-v4.png"
                alt="BackIn5"
                width={120}
                height={28}
                className="brand-logo brand-logo-footer"
              />
            </a>
            <p className="footer-tag">
              24/7 enquiry handling for busy trades firms.
              Less hassle. Fewer missed jobs. More organised enquiries.
            </p>
            <address className="footer-address">
              BackIn5 Ltd<br />
              Twickenham, TW2<br />
              United Kingdom
            </address>
          </div>
          <div className="footer-col">
            <div className="footer-col-ttl">Explore</div>
            <ul>
              <li><a href="#built-for">Built for</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#compare">Comparison</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faqs">FAQs</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 BackIn5 Ltd · Registered in England · Made for trades.</span>
          <span>hello@backin5.com</span>
        </div>
      </div>
    </footer>
  );
}
