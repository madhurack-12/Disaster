import { useState } from "react";

export default function Landing({ onStart }) {
  const [muted, setMuted] = useState(false);

  return (
    <main className="landing-page">

      <div className="landing-background">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="grid-overlay"></div>
      </div>

      <nav className="landing-nav">

        <div className="landing-brand">
          <div className="brand-symbol">✦</div>

          <div>
            <strong>DISASTER-X</strong>
            <span>Emergency Intelligence</span>
          </div>
        </div>

        <div className="landing-status">
          <span></span>
          SYSTEM READY
        </div>

      </nav>

      <section className="landing-content">

        <div className="landing-kicker">
          AUTOMATIC DISASTER NOTIFIER
        </div>

        <h1>
          Know the danger.
          <br />
          <span>Act before disaster.</span>
        </h1>

        <p>
          A unified disaster-awareness platform that helps
          you understand floods, cyclones, tsunamis,
          earthquakes, landslides, fires and droughts —
          all from one place.
        </p>

        <div className="landing-actions">

          <button
            className="lets-go-button"
            onClick={onStart}
          >
            LET'S GO
            <span>→</span>
          </button>

          <button
            className="sound-button"
            onClick={() => setMuted(!muted)}
          >
            {muted ? "🔇" : "🔊"}
            {muted ? " Sound Off" : " Sound Ready"}
          </button>

        </div>

        <div className="landing-features">

          <div>
            <strong>07</strong>
            <span>Hazards</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Awareness</span>
          </div>

          <div>
            <strong>01</strong>
            <span>Unified Map</span>
          </div>

        </div>

      </section>

      <div className="landing-bottom">

        <span>
          🌍 MULTI-HAZARD INTELLIGENCE PLATFORM
        </span>

        <span>
          Flood • Cyclone • Tsunami • Earthquake • Landslide • Fire • Drought
        </span>

      </div>

    </main>
  );
}