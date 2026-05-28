/* eslint-disable */
// Contact - compact single-row layout.
// Calendly tile opens an inline popup widget over the site
// (loaded via window.Calendly from the script in index.html).

const CALENDLY_URL = "https://calendly.com/backin5/intro";

function Contact() {
  const tiles = [
    {
      Ic: IconPhone,
      label: "Call or text",
      value: "07948 091506",
      href: "tel:+447948091506",
    },
    {
      Ic: IconMail,
      label: "Email",
      value: "fj@backin5.org",
      href: "mailto:fj@backin5.org",
    },
    {
      Ic: IconCalendar,
      label: "Book a chat",
      value: "15-min intro",
      href: CALENDLY_URL,
      calendly: true,
      featured: true,
    },
  ];

  const openCalendly = (e) => {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      e.preventDefault();
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return false;
    }
    // Fallback (script not yet loaded): let the link follow through to Calendly
  };

  return (
    <section className="canvas-light band-tight" id="contact">
      <div className="container narrow">
        <div className="contact-compact">
          <div className="contact-compact-head">
            <span className="eyebrow">Get in touch</span>
            <h2 className="h2" style={{ marginTop: 10 }}>
              See how it could work for your business.
            </h2>
            <p className="contact-compact-lead">
              Call, email or book a quick chat - whatever's easiest.
            </p>
          </div>

          <div className="contact-tiles">
            {tiles.map(({ Ic, label, value, href, calendly, featured }, i) => (
              <a
                key={i}
                href={href}
                onClick={calendly ? openCalendly : undefined}
                target={calendly ? "_blank" : undefined}
                rel={calendly ? "noopener noreferrer" : undefined}
                className={"contact-tile" + (featured ? " is-featured" : "")}
              >
                <div className="contact-tile-ic">
                  <Ic size={18} />
                </div>
                <div className="contact-tile-body">
                  <div className="contact-tile-label">{label}</div>
                  <div className="contact-tile-value">{value}</div>
                </div>
                <div className="contact-tile-arrow">
                  <IconArrowUpRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Contact });
