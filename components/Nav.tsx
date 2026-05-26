"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IconArrowRight } from "./icons";
import gsap from "gsap";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className="nav"
      style={{
        backgroundColor: scrolled ? "rgba(14,17,22,0.98)" : "rgba(14,17,22,0.92)",
        transition: "background-color 300ms ease",
      }}
    >
      <div className="container nav-inner">
        <a href="#top" className="nav-brand" onClick={close}>
          <Image
            src="/assets/backin5-logo-v4.png"
            alt="BackIn5"
            width={106}
            height={24}
            className="brand-logo"
          />
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#built-for">Who is this for?</a>
          <a className="nav-link" href="#how">How does it work?</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#faqs">FAQs</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
        <div className="nav-cta">
          <a href="#contact" className="btn btn-primary btn-sm nav-cta-btn">
            Get Started
          </a>
          <button
            className={"nav-burger " + (menuOpen ? "is-open" : "")}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={"nav-drawer " + (menuOpen ? "is-open" : "")} aria-hidden={!menuOpen}>
        <div className="nav-drawer-scrim" onClick={close} />
        <div className="nav-drawer-panel" role="dialog" aria-label="Site navigation">
          <a className="nav-drawer-link" href="#built-for" onClick={close}>Who is this for?</a>
          <a className="nav-drawer-link" href="#how" onClick={close}>How does it work?</a>
          <a className="nav-drawer-link" href="#pricing" onClick={close}>Pricing</a>
          <a className="nav-drawer-link" href="#faqs" onClick={close}>FAQs</a>
          <a className="nav-drawer-link" href="#contact" onClick={close}>Contact</a>
          <a href="#contact" className="btn btn-primary btn-lg nav-drawer-cta" onClick={close}>
            Get Started <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
