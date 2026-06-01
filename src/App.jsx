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
    </AuroraBackground>
  )
}

export default App
