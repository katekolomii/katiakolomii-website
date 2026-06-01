import { RadialOrbitalTimelineDemo } from "./components/demo-radial-orbital-timeline"
import { FloatingPaths } from "./components/background"

function App() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden", background: "#000" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.3 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <RadialOrbitalTimelineDemo />
      </div>
    </div>
  )
}

export default App
