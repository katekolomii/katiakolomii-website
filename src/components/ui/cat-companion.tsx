'use client';
import { useEffect, useRef, useState } from 'react';

type Mode = 'walk' | 'idle' | 'sleep';

const BODY = '#4a4a4a';
const DARK = '#3a3a3a';
const PINK = '#ff9bb8';
const NOSE = '#ff7aa2';

function WalkCat() {
  // side profile, facing right
  return (
    <svg width="58" height="42" viewBox="0 0 64 44" style={{ display: 'block', overflow: 'visible' }}>
      <path d="M8 30 C 1 25, 3 13, 10 16" fill="none" stroke={DARK} strokeWidth="4.5" strokeLinecap="round" />
      <rect x="18" y="35" width="4" height="8" rx="2" fill={DARK} />
      <rect x="26" y="35" width="4" height="8" rx="2" fill={DARK} />
      <rect x="36" y="35" width="4" height="8" rx="2" fill={DARK} />
      <rect x="44" y="35" width="4" height="8" rx="2" fill={DARK} />
      <ellipse cx="30" cy="29" rx="20" ry="11" fill={BODY} />
      <circle cx="49" cy="21" r="11" fill={BODY} />
      <path d="M40 13 L41 5 L48 11 Z" fill={BODY} />
      <path d="M51 11 L57 5 L58 14 Z" fill={BODY} />
      <path d="M42 9 L43 12 L46 12 Z" fill={PINK} />
      <path d="M53 9 L54 12 L56 12 Z" fill={PINK} />
      <circle cx="51" cy="20" r="1.7" fill="#1a1a1a" />
      <circle cx="59" cy="23" r="1.5" fill={NOSE} />
    </svg>
  );
}

function SleepCat() {
  // curled up, head resting left
  return (
    <svg width="58" height="38" viewBox="0 0 64 40" style={{ display: 'block', overflow: 'visible' }}>
      <ellipse cx="33" cy="27" rx="22" ry="11" fill={BODY} />
      <path d="M52 25 C 59 29, 51 38, 42 34" fill="none" stroke={DARK} strokeWidth="5" strokeLinecap="round" />
      <circle cx="16" cy="25" r="9" fill={BODY} />
      <path d="M9 18 L9 11 L15 16 Z" fill={BODY} />
      <path d="M18 16 L23 11 L23 18 Z" fill={BODY} />
      <path d="M10 14 L11 16 L13 15 Z" fill={PINK} />
      <path d="M12 25 q 3 2 6 0" stroke="#1a1a1a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="9" cy="27" r="1.3" fill={NOSE} />
    </svg>
  );
}

const STYLE_ID = 'cat-companion-keyframes';
function injectKeyframes() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes catBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2.5px)} }
    @keyframes catZ { 0%{opacity:0;transform:translate(0,0) scale(.5)} 25%{opacity:1} 100%{opacity:0;transform:translate(14px,-26px) scale(1.1)} }
  `;
  document.head.appendChild(s);
}

export const CatCompanion = ({ speed = 60 }: { speed?: number }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<Mode>('idle');
  const [facing, setFacing] = useState(1);

  useEffect(() => {
    injectKeyframes();
    const wrap = wrapRef.current;
    if (!wrap) return;

    let cancelled = false;
    let timer: number | undefined;
    const schedule = (fn: () => void, ms: number) => { timer = window.setTimeout(fn, ms); };

    const start = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.82 };
    posRef.current = start;
    wrap.style.transform = `translate(${start.x}px, ${start.y}px)`;

    const moveTo = (tx: number, ty: number) => {
      const { x, y } = posRef.current;
      const dx = tx - x;
      const dist = Math.hypot(dx, ty - y);
      const dur = Math.max(700, (dist / speed) * 1000);
      setFacing(dx >= 0 ? 1 : -1);
      setMode('walk');
      wrap.style.transition = `transform ${dur}ms linear`;
      wrap.style.transform = `translate(${tx}px, ${ty}px)`;
      posRef.current = { x: tx, y: ty };
      return dur;
    };

    const wander = () => {
      if (cancelled) return;
      const w = window.innerWidth, h = window.innerHeight, m = 70;
      let tx: number, ty: number;
      if (Math.random() < 0.4) {
        // visit the orbit area in the middle of the screen
        tx = w / 2 + (Math.random() - 0.5) * w * 0.28;
        ty = h / 2 + (Math.random() - 0.5) * h * 0.28;
      } else {
        tx = m + Math.random() * (w - 2 * m);
        ty = m + Math.random() * (h - 2 * m);
      }
      const dur = moveTo(tx, ty);
      schedule(arrive, dur);
    };

    const arrive = () => {
      if (cancelled) return;
      setMode('idle');
      if (Math.random() < 0.4) {
        schedule(() => {
          setMode('sleep');
          schedule(() => { setMode('idle'); schedule(wander, 700); }, 4500 + Math.random() * 4500);
        }, 500);
      } else {
        schedule(wander, 900 + Math.random() * 1600);
      }
    };

    schedule(wander, 1200);
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, [speed]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 6, willChange: 'transform' }}
    >
      <div style={{ transform: `translate(-50%, -100%) scaleX(${facing})`, transformOrigin: 'center bottom', position: 'relative' }}>
        <div style={{ animation: mode === 'walk' ? 'catBob 0.4s ease-in-out infinite' : 'none' }}>
          {mode === 'sleep' ? <SleepCat /> : <WalkCat />}
        </div>
        {mode === 'sleep' && (
          <div style={{ position: 'absolute', top: -6, right: -4, transform: `scaleX(${facing})` }}>
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
