"use client";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const ASCII_PORTRAIT = `                      ......
                   ..,,:::,.     .
                  ,.....:;;;;;....,.
                .:.  .:;=+****+==::,
                :. .:=***%%%*****+;.
               ,:.:=******%%%%***+=;
              .:+;=+***===+*%%***+=;..
              ,:*==+****=;+***+===;,.:
             ..:=;=***%%*****++=:;;.,:.
             ..:,;+***%%****+=***=::,::
             .,:.:****+*%****=***=::.,;
            ..:: ,=**%*==++=;=*+;:,..:;,
            ..:. :==+*%%*==;;+=:,....,:;
            ...  :=+=+****+;:,.,......,:,
          ......,:+*****+==:.,,....... .,.
       .:;;=;::;;;=***%%**+:,:...::;::,....
      ,=====;;=====****%*==;:.::;=****+=:..
      .:=========*+*****++**;.;+**%%%%*+=:
         ,;;====***********++;::;;==;;:.
            .,::;=+*******+===;:.
                   .........                  `;

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ComponentType<{ size?: number | string }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  color?: string;
  customContent?: ReactNode;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// Cubic-bezier(0.4, 0, 0.2, 1) approximation via cubic ease-in-out
const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

const RADIUS = 200;
const NODE_SIZE = 40;
// Angle 270° = top of circle (y = -radius)
const TOP_ANGLE = 270;

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const rotationRef = useRef(0); // source of truth for rAF
  const [autoRotate, setAutoRotate] = useState(true);

  const [centerHovered, setCenterHovered] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  // Animation / selection state
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [pulsingNodeId, setPulsingNodeId] = useState<number | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const originalAngleRef = useRef(0); // rotation angle at click time, for return
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // Keep rotationRef in sync during auto-rotation
  const updateAngle = (a: number) => {
    rotationRef.current = a;
    setRotationAngle(a);
  };

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      const next = Number(((rotationRef.current + 0.3) % 360).toFixed(3));
      updateAngle(next);
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  // Cancel any in-progress arc animation on unmount
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const animateAngle = (from: number, to: number, duration: number, onDone: () => void) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    // Shortest-path delta in [-180, 180]
    const delta = ((to - from) % 360 + 540) % 360 - 180;

    const frame = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const angle = from + delta * ease(t);
      updateAngle(Number(angle.toFixed(3)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        updateAngle(Number((from + delta).toFixed(3)));
        onDone();
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  };

  const handleNodeClick = (item: TimelineItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating || selectedNodeId !== null) return;

    setAutoRotate(false);
    setIsAnimating(true);
    originalAngleRef.current = rotationRef.current;

    const idx = timelineData.findIndex(d => d.id === item.id);
    const targetRotation = TOP_ANGLE - (idx / timelineData.length) * 360;

    animateAngle(rotationRef.current, targetRotation, 500, () => {
      setIsAnimating(false);
      setSelectedNodeId(item.id);
      setPulsingNodeId(item.id);
      setTimeout(() => {
        setPulsingNodeId(null);
        setCardVisible(true);
      }, 220);
    });
  };

  const handleClose = () => {
    setCardVisible(false);
    setSelectedNodeId(null);
    setIsAnimating(true);

    animateAngle(rotationRef.current, originalAngleRef.current, 500, () => {
      setIsAnimating(false);
      setAutoRotate(true);
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      selectedNodeId !== null &&
      (e.target === containerRef.current || e.target === orbitRef.current)
    ) handleClose();
  };

  const calculatePos = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const rad = (angle * Math.PI) / 180;
    const x = RADIUS * Math.cos(rad);
    const y = RADIUS * Math.sin(rad);
    const zIndex = Math.round(100 + 50 * Math.cos(rad));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const orbiting = selectedNodeId !== null || isAnimating;
  const selectedItem = timelineData.find(d => d.id === selectedNodeId) ?? null;

  // Card sits just below the top node — orbit center is at 50vh, top node at 50vh - RADIUS
  const cardTop = `calc(50vh - ${RADIUS - NODE_SIZE - 8}px)`;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
    >
      {/* ── Orbit anchor at exact viewport center ── */}
      <div ref={orbitRef} style={{ position: "absolute", top: "50%", left: "50%" }}>

        {/* Orbit ring */}
        <div style={{
          position: "absolute",
          width: RADIUS * 2, height: RADIUS * 2,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(26,26,26,0.35)",
          opacity: orbiting ? 0.2 : 1,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }} />

        {/* Center decorative rings + KK */}
        <div
          style={{
            position: "absolute",
            width: 182, height: 182,
            transform: "translate(-50%, -50%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "default", zIndex: 10,
            opacity: orbiting ? 0.2 : 1,
            transition: "opacity 0.4s ease",
          }}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
        >
          <pre style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "monospace", fontSize: "4.8px",
            lineHeight: "1.28", letterSpacing: "0.4px",
            color: "#1a1a1a", margin: 0, padding: 0,
            background: "none", border: "none",
            whiteSpace: "pre", userSelect: "none",
            opacity: centerHovered ? 1 : 0,
            transition: "opacity 0.7s ease", zIndex: 0,
          }}>{ASCII_PORTRAIT}</pre>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", width: 182, height: 182, borderRadius: "50%",
              border: "1px solid rgba(26,26,26,0.1)",
              borderTopColor: "rgba(26,26,26,0.5)", zIndex: 1,
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", width: 160, height: 160, borderRadius: "50%",
              border: "1px dashed rgba(26,26,26,0.18)", zIndex: 1,
            }}
          />
          <div style={{
            position: "relative",
            width: 48, height: 48, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#1a1a1a",
            border: "1px solid rgba(26,26,26,0.2)",
            zIndex: 2,
            transition: "opacity 0.7s ease",
            opacity: centerHovered ? 0.15 : 1,
          }}>
            <span style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 13, fontWeight: 300, letterSpacing: "0.12em", color: "#f7f5f2",
            }}>KK</span>
          </div>
        </div>

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const pos = calculatePos(index, timelineData.length);
          const isSelected = selectedNodeId === item.id;
          const isPulsing = pulsingNodeId === item.id;
          const isHovered = hoveredNodeId === item.id;
          const dimmed = orbiting && !isSelected;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                transform: `translate(${pos.x - NODE_SIZE / 2}px, ${pos.y - NODE_SIZE / 2}px)`,
                zIndex: isSelected ? 200 : pos.zIndex,
                opacity: dimmed ? 0.2 : pos.opacity,
                transition: "opacity 0.4s ease",
                pointerEvents: orbiting ? "none" : "auto",
                cursor: "pointer",
              }}
              onClick={e => handleNodeClick(item, e)}
              onMouseEnter={() => setHoveredNodeId(item.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <motion.div
                animate={isPulsing ? { scale: [1, 1.15, 1] } : { scale: isSelected ? 1.1 : 1 }}
                transition={isPulsing
                  ? { duration: 0.22, times: [0, 0.5, 1], ease: "easeInOut" }
                  : { duration: 0.2 }
                }
                style={{
                  width: NODE_SIZE, height: NODE_SIZE, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isSelected || isPulsing ? "#e86ca4" : isHovered ? "#e86ca4" : "#1a1a1a",
                  color: "#f7f5f2",
                  border: `2px solid ${isSelected || isPulsing || isHovered ? "#e86ca4" : "#1a1a1a"}`,
                  boxShadow: isSelected || isPulsing || isHovered
                    ? "0 0 16px rgba(232,108,164,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.12)",
                  transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <Icon size={16} />
              </motion.div>

              <div style={{
                position: "absolute",
                top: NODE_SIZE + 8,
                left: NODE_SIZE / 2,
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px", fontWeight: 400, letterSpacing: "0.06em",
                color: isSelected || isHovered ? "#e86ca4" : "#1a1a1a",
                transition: "color 0.2s",
              }}>{item.title}</div>
            </div>
          );
        })}
      </div>

      {/* ── Card — anchored below the top node ── */}
      {createPortal(
        <AnimatePresence>
          {cardVisible && selectedItem && (
            /* Overlay centers the card via flexbox — no transform conflict */
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
              style={{
                pointerEvents: "auto",
                background: "#f7f5f2",
                border: "0.5px solid #e0ddd8",
                boxShadow: "0 8px 48px rgba(0,0,0,0.10)",
                fontFamily: "'Courier New', Courier, monospace",
                width: "min(560px, 90vw)",
                maxHeight: "75vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{
                padding: "12px 16px 10px",
                background: "#1a1a1a",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'Anton', sans-serif",
                  color: "#f7f5f2", fontSize: "15px", letterSpacing: "0.12em",
                }}>{selectedItem.title.toUpperCase()}</span>
                <button
                  onClick={e => { e.stopPropagation(); handleClose(); }}
                  style={{
                    background: "none",
                    border: "1px solid rgba(247,245,242,0.25)",
                    color: "#f7f5f2", cursor: "pointer",
                    width: 18, height: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, padding: 0, flexShrink: 0,
                  }}
                >×</button>
              </div>

              {/* Body */}
              <div style={{ overflowY: "auto", flex: 1 }}>
                {selectedItem.customContent ?? (
                  <div style={{ margin: "14px 20px 16px", position: "relative", border: "1px solid #e8e4de" }}>
                    <div style={{ position: "absolute", top: -1, left: -1, width: 8, height: 8, borderTop: "1px solid rgba(0,0,0,0.2)", borderLeft: "1px solid rgba(0,0,0,0.2)" }} />
                    <div style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderTop: "1px solid rgba(0,0,0,0.2)", borderRight: "1px solid rgba(0,0,0,0.2)" }} />
                    <div style={{ position: "absolute", bottom: -1, left: -1, width: 8, height: 8, borderBottom: "1px solid rgba(0,0,0,0.2)", borderLeft: "1px solid rgba(0,0,0,0.2)" }} />
                    <div style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderBottom: "1px solid rgba(0,0,0,0.2)", borderRight: "1px solid rgba(0,0,0,0.2)" }} />
                    <div style={{ padding: "12px 12px 14px" }}>
                      <div style={{ marginBottom: 12 }}>
                        <span style={{
                          border: `1px solid ${selectedItem.status === "in-progress" ? "#c4846a" : "#ddd"}`,
                          color: selectedItem.status === "in-progress" ? "#c4846a" : "#bbb",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "10px", letterSpacing: "0.18em",
                          padding: "2px 8px", borderRadius: 999,
                        }}>
                          {selectedItem.status === "completed" ? "COMPLETED" : selectedItem.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                        </span>
                      </div>
                      <div style={{ color: "#bbb", fontFamily: "'DM Mono', monospace", fontSize: "11px" }}>
                        Coming soon.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
