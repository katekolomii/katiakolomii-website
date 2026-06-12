import { RadialOrbitalTimelineDemo } from "./components/demo-radial-orbital-timeline"
import { AuroraBackground } from "./components/ui/aurora-background"
import { SparkleCursor } from "./components/ui/sparkle-cursor"
import { CatCompanion } from "./components/ui/cat-companion"

function App() {
  return (
    <AuroraBackground
      className="bg-[#f7f5f2]"
      showRadialGradient={true}
      style={{ margin: 0, padding: 0, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <RadialOrbitalTimelineDemo />
      </div>
      <SparkleCursor />
      <CatCompanion />
      <div style={{ position: "absolute", top: 28, left: "2.5%", zIndex: 10 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#1a1a1a", letterSpacing: "0.06em", pointerEvents: "none", lineHeight: 1 }}>Kateryna Kolomiichenko</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
          <a href="https://www.linkedin.com/in/katia-kolomiichenko" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontSize: "11px" }}>linkedin</a>
          <span style={{ color: "rgba(0,0,0,0.25)", fontSize: "10px" }}>·</span>
          <a href="https://github.com/katekolomii" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontSize: "11px" }}>github</a>
          <span style={{ color: "rgba(0,0,0,0.25)", fontSize: "10px" }}>·</span>
          <a href="mailto:kate.kolomiychenko@gmail.com" className="contact-link" style={{ fontSize: "11px" }}>email</a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 20, left: "2.5%", zIndex: 10, fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.06em", pointerEvents: "none", whiteSpace: "nowrap" }}>© Copyright 2026 Kateryna Kolomiichenko</div>
    </AuroraBackground>
  )
}

export default App
