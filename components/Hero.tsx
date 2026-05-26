"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { IconArrowRight, IconCalendar, IconCheckCircle, IconClock, IconInbox, IconShield, IconPhoneMissed, IconMessage, IconBell } from "./icons";
import TranscriptCard from "./TranscriptCard";
import PanelCarousel from "./PanelCarousel";

function MiniDashboard() {
  return (
    <div className="mini-dash">
      <div className="mini-dash-head">
        <div className="dots"><span /><span /><span /></div>
        <div>Today · 12 new enquiries</div>
      </div>
      <div className="mini-dash-body">
        <div className="mini-dash-side">
          <div className="label">Inbox</div>
          <div className="item active"><IconInbox size={14} /> New</div>
          <div className="item"><IconCheckCircle size={14} /> Qualified</div>
          <div className="item"><IconCalendar size={14} /> Booked</div>
          <div className="label">Today</div>
          <div className="item"><IconClock size={14} /> Awaiting reply</div>
          <div className="item"><IconShield size={14} /> Followed up</div>
        </div>
        <div className="mini-dash-main">
          <div className="dash-stat-row">
            <div className="dash-stat"><div className="lbl">Captured</div><div className="val">12</div></div>
            <div className="dash-stat"><div className="lbl">Qualified</div><div className="val">9</div></div>
            <div className="dash-stat"><div className="lbl">Booked</div><div className="val">7</div></div>
          </div>
          <div className="dash-list">
            <div className="row"><div><div className="nm">Sarah Kelly</div><div className="sub">Leak repair · BS6 · 48h urgency</div></div><span className="pill new">New</span><span className="sub mono">14:04</span></div>
            <div className="row"><div><div className="nm">Mark Davies</div><div className="sub">Boiler service · BS3 · this week</div></div><span className="pill qual">Qualified</span><span className="sub mono">13:48</span></div>
            <div className="row"><div><div className="nm">J. Patel</div><div className="sub">Bathroom refit · BS7 · flexible</div></div><span className="pill bk">Booked</span><span className="sub mono">12:17</span></div>
            <div className="row"><div><div className="nm">Tom Reeves</div><div className="sub">Drain unblock · BS4 · urgent</div></div><span className="pill qual">Qualified</span><span className="sub mono">11:02</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneFeed() {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="phone-statbar"><span>9:41</span><span className="icons">●●●●● 100%</span></div>
        <div className="phone-notif" style={{ animationDelay: "0ms" }}><div className="ic miss"><IconPhoneMissed size={14} /></div><div><div className="h">Missed call · Sarah K.</div><div className="b">BackIn5 sent an instant text-back</div></div><div className="t">14:02</div></div>
        <div className="phone-notif" style={{ animationDelay: "150ms" }}><div className="ic"><IconMessage size={14} /></div><div><div className="h">Reply received</div><div className="b">&quot;Kitchen tap leaking, bit urgent...&quot;</div></div><div className="t">14:03</div></div>
        <div className="phone-notif" style={{ animationDelay: "300ms" }}><div className="ic"><IconCheckCircle size={14} /></div><div><div className="h">Lead qualified</div><div className="b">Leak repair · 48h urgency · BS6</div></div><div className="t">14:04</div></div>
        <div className="phone-notif" style={{ animationDelay: "450ms" }}><div className="ic good"><IconCalendar size={14} /></div><div><div className="h">Booked into diary</div><div className="b">Thursday 9:30 AM · confirmed by SMS</div></div><div className="t">14:04</div></div>
        <div className="phone-notif" style={{ animationDelay: "600ms" }}><div className="ic"><IconBell size={14} /></div><div><div className="h">3 more enquiries handled</div><div className="b">View today&apos;s brief in the app</div></div><div className="t">14:11</div></div>
      </div>
    </div>
  );
}

const headline = (
  <>
    The Modern Way For Trades Businesses to{" "}
    <br />
    <em style={{ color: "rgb(52, 80, 179)", fontSize: "60px" }}>Handle Admin</em>.
  </>
);
const lead = (
  <>
    24/7 Customer Handling | Automatic Text and Callbacks
    <br />
    Website, Social Media and Trade-site Messages Handled
  </>
);

function HeroV1() {
  return (
    <div className="hero-split">
      <div>
        <h1 className="display-hero" style={{ fontSize: "60px" }}>{headline}</h1>
        <div style={{ height: 28 }} />
        <p className="hero-lead">{lead}</p>
        <p className="hero-lead" style={{ marginTop: 18, fontSize: 16, color: "rgba(234,236,241,0.5)" }}>
          Built to Save Time and Stop Customers Shopping Around.
        </p>
        <div style={{ height: 32 }} />
        <div className="hero-cta-row">
          <a href="#how" className="btn btn-primary btn-lg btn-arrow">
            How does it work? <IconArrowRight size={16} />
          </a>
          <a href="#pricing" className="btn btn-ghost-dark btn-lg">How much does it cost?</a>
        </div>
      </div>
      <PanelCarousel />
    </div>
  );
}

function HeroV2() {
  return (
    <div className="hero-editorial">
      <span className="hero-eyebrow"><span className="pulse" />Built for busy trades firms</span>
      <h1 className="display-hero" style={{ fontSize: "clamp(56px,10vw,156px)", lineHeight: 0.94 }}>
        Voicemail<br />doesn&apos;t book jobs.<br /><em>BackIn5</em> does.
      </h1>
      <div style={{ height: 36 }} />
      <p className="hero-lead" style={{ fontSize: 21 }}>{lead}</p>
      <div style={{ height: 40 }} />
      <div className="hero-cta-row">
        <a href="#pricing" className="btn btn-primary btn-lg btn-arrow">Start free trial <IconArrowRight size={16} /></a>
        <a href="#how" className="btn btn-ghost-dark btn-lg">See how it works</a>
      </div>
    </div>
  );
}

function HeroV3() {
  return (
    <div className="hero-dash">
      <div>
        <span className="hero-eyebrow"><span className="pulse" />Every enquiry. In one place.</span>
        <h1 className="display-hero">{headline}</h1>
        <div style={{ height: 28 }} />
        <p className="hero-lead">{lead}</p>
        <div style={{ height: 32 }} />
        <div className="hero-cta-row">
          <a href="#pricing" className="btn btn-primary btn-lg btn-arrow">Start free trial <IconArrowRight size={16} /></a>
          <a href="#how" className="btn btn-ghost-dark btn-lg">See how it works</a>
        </div>
      </div>
      <MiniDashboard />
    </div>
  );
}

function HeroV4() {
  return (
    <div className="hero-phone-grid">
      <div>
        <span className="hero-eyebrow"><span className="pulse" />Notifications working on your behalf</span>
        <h1 className="display-hero">{headline}</h1>
        <div style={{ height: 28 }} />
        <p className="hero-lead">{lead}</p>
        <div style={{ height: 32 }} />
        <div className="hero-cta-row">
          <a href="#pricing" className="btn btn-primary btn-lg btn-arrow">Start free trial <IconArrowRight size={16} /></a>
          <a href="#how" className="btn btn-ghost-dark btn-lg">See how it works</a>
        </div>
      </div>
      <PhoneFeed />
    </div>
  );
}

export default function Hero({ variant = "transcript" }: { variant?: string }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".hero-split > div:first-child, .hero-editorial, .hero-dash > div:first-child, .hero-phone-grid > div:first-child", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
      .from(".hero-split > div:last-child, .hero-editorial + *, .hero-dash > div:last-child, .hero-phone-grid > div:last-child", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      }, "-=0.6")
      .from(".trust-row .item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, [variant]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="container hero-inner">
        {variant === "transcript" && <HeroV1 />}
        {variant === "editorial" && <HeroV2 />}
        {variant === "dashboard" && <HeroV3 />}
        {variant === "phone" && <HeroV4 />}
      </div>
      <div className="trust-strip">
        <div className="container trust-row">
          <span className="item">TRUSTED BY INDEPENDENTS AND FIRMS</span>
          <span className="item">BUILT FOR BUSY TRADES</span>
          <span className="item" style={{ color: "rgb(255,255,255)" }}>ENQUIRIES HANDLED 24/7</span>
          <span className="item">NO CHASING. NO ADMIN.</span>
        </div>
      </div>
    </section>
  );
}
