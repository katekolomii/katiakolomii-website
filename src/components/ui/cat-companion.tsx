'use client';
import { useEffect, useRef, useState } from 'react';

type Mode = 'walk' | 'idle' | 'sleep';

// Drop the Pusheen PNGs into /public/cats/ with these names.
const AWAKE_IMGS = ['/cats/happy.png', '/cats/letter.png', '/cats/laptop.png', '/cats/rest.png'];
const SLEEP_IMG = '/cats/sleep.png';

// Per-pose scale so different image framing renders at a consistent visual size.
const IMG_SCALE: Record<string, number> = {
  '/cats/happy.png': 1.4,
  '/cats/sleep.png': 1.15,
};

const STYLE_ID = 'cat-companion-keyframes';
function injectKeyframes() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes catBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
    @keyframes catZ { 0%{opacity:0;transform:translate(0,0) scale(.5)} 25%{opacity:1} 100%{opacity:0;transform:translate(14px,-26px) scale(1.1)} }
  `;
  document.head.appendChild(s);
}

export const CatCompanion = ({ speed = 40, size = 52, anchorSelector = '#copyright' }: { speed?: number; size?: number; anchorSelector?: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<Mode>('idle');
  const [facing, setFacing] = useState(1);
  const [awakeSrc, setAwakeSrc] = useState(AWAKE_IMGS[0]);
  const brokenRef = useRef<Set<string>>(new Set());
  const [, forceRender] = useState(0);
  const markBroken = (src: string) => {
    brokenRef.current.add(src);
    forceRender(n => n + 1);
  };

  useEffect(() => {
    injectKeyframes();
    const wrap = wrapRef.current;
    if (!wrap) return;

    let cancelled = false;
    let timer: number | undefined;
    const schedule = (fn: () => void, ms: number) => { timer = window.setTimeout(fn, ms); };

    // The cat lives on the "shelf" of the copyright text: it walks left↔right
    // along the line and sleeps there. Falls back to a bottom-left strip.
    const getZone = () => {
      const el = document.querySelector(anchorSelector);
      if (el) {
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, y: r.bottom - 14 };
      }
      const w = window.innerWidth, h = window.innerHeight;
      return { left: w * 0.025, right: w * 0.025 + 280, y: h - 24 };
    };

    const z0 = getZone();
    const start = { x: (z0.left + z0.right) / 2, y: z0.y };
    posRef.current = start;
    wrap.style.transform = `translate(${start.x}px, ${start.y}px)`;

    const moveTo = (tx: number, ty: number) => {
      const { x, y } = posRef.current;
      const dx = tx - x;
      const dist = Math.hypot(dx, ty - y);
      const dur = Math.max(700, (dist / speed) * 1000);
      setFacing(dx >= 0 ? 1 : -1);
      setAwakeSrc(AWAKE_IMGS[(Math.random() * AWAKE_IMGS.length) | 0]);
      setMode('walk');
      wrap.style.transition = `transform ${dur}ms linear`;
      wrap.style.transform = `translate(${tx}px, ${ty}px)`;
      posRef.current = { x: tx, y: ty };
      return dur;
    };

    const wander = () => {
      if (cancelled) return;
      const z = getZone();
      const tx = z.left + Math.random() * (z.right - z.left);
      const dur = moveTo(tx, z.y);
      schedule(arrive, dur);
    };

    let firstArrive = true;
    const arrive = () => {
      if (cancelled) return;
      setMode('idle');
      const willSleep = firstArrive || Math.random() < 0.45;
      firstArrive = false;
      if (willSleep) {
        schedule(() => {
          setMode('sleep');
          schedule(() => { setMode('idle'); schedule(wander, 700); }, 5000 + Math.random() * 5000);
        }, 500);
      } else {
        schedule(wander, 1000 + Math.random() * 1800);
      }
    };

    schedule(wander, 1200);
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, [speed]);

  const sleeping = mode === 'sleep';
  const broken = brokenRef.current;
  // Pick a source that actually loaded; fall back to emoji only if none exist.
  let src: string | null;
  if (sleeping) {
    src = broken.has(SLEEP_IMG) ? null : SLEEP_IMG;
  } else {
    const available = AWAKE_IMGS.filter(s => !broken.has(s));
    src = broken.has(awakeSrc) ? (available[0] ?? null) : awakeSrc;
  }

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 6, willChange: 'transform' }}
    >
      <div style={{ transform: `translate(-50%, -100%) scaleX(${facing})`, transformOrigin: 'center bottom', position: 'relative' }}>
        {src ? (
          <img
            src={src}
            alt=""
            draggable={false}
            onError={() => markBroken(src!)}
            style={{
              width: size * (IMG_SCALE[src] ?? 1),
              height: 'auto',
              display: 'block',
              userSelect: 'none',
              transformOrigin: 'center bottom',
              animation: mode === 'walk' ? 'catBob 0.45s ease-in-out infinite' : 'none',
            }}
          />
        ) : (
          <div
            style={{
              fontSize: size * 0.8,
              lineHeight: 1,
              userSelect: 'none',
              animation: mode === 'walk' ? 'catBob 0.45s ease-in-out infinite' : 'none',
            }}
          >
            {sleeping ? '😴' : '🐱'}
          </div>
        )}
        {sleeping && (
          <div style={{ position: 'absolute', top: -2, right: -6, transform: `scaleX(${facing})` }}>
            {['z', 'z', 'z'].map((z, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9 + i * 2,
                  color: '#c4687e',
                  animation: `catZ 2.4s ease-out ${i * 0.6}s infinite`,
                }}
              >
                z
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatCompanion;
