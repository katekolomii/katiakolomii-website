import { RadialOrbitalTimelineDemo } from "./components/demo-radial-orbital-timeline"
import { AuroraBackground } from "./components/ui/aurora-background"

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
      <div style={{ position: "absolute", top: 28, left: 36, zIndex: 10, pointerEvents: "none" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#1a1a1a", letterSpacing: "0.06em" }}>Kateryna Kolomiichenko</div>
      </div>
    </AuroraBackground>
  )
}

export default App
