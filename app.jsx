/* eslint-disable */
// App root — composes the page and wires Tweaks.

const { useState: useStateApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "transcript",
  "density": "comfortable",
  "tradeFocus": "multi",
  "trade": "plumbers"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [focusTrade, setFocusTrade] = useStateApp(t.trade || "plumbers");

  // Keep document-level density attribute in sync with tweak
  React.useEffect(() => {
    document.documentElement.setAttribute("data-density", t.density || "comfortable");
  }, [t.density]);

  // When trade tweak changes, sync the local focus state
  React.useEffect(() => { setFocusTrade(t.trade); }, [t.trade]);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero variant={t.hero} />
        <BuiltFor
          singleTradeMode={t.tradeFocus === "single"}
          focusTradeKey={focusTrade}
          setFocus={(k) => { setFocusTrade(k); setTweak('trade', k); }}
        />
        <BeforeAfter />
        <Comparison />
        <Pricing />
        <CtaBand />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <ChatBubble />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakSelect
          label="Variant"
          value={t.hero}
          options={[
            { value: "transcript", label: "Transcript card" },
            { value: "editorial",  label: "Editorial (centered)" },
            { value: "dashboard",  label: "Dashboard mockup" },
            { value: "phone",      label: "Phone feed" },
          ]}
          onChange={(v) => setTweak('hero', v)}
        />

        <TweakSection label="Built for" />
        <TweakRadio
          label="Focus"
          value={t.tradeFocus}
          options={[
            { value: "multi",  label: "All trades" },
            { value: "single", label: "Single trade" },
          ]}
          onChange={(v) => setTweak('tradeFocus', v)}
        />
        {t.tradeFocus === "single" && (
          <TweakSelect
            label="Trade"
            value={t.trade}
            options={(window.TRADES || []).map(tr => ({ value: tr.key, label: tr.name }))}
            onChange={(v) => setTweak('trade', v)}
          />
        )}

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={[
            { value: "comfortable", label: "Spacious" },
            { value: "compact",     label: "Compact" },
          ]}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
