'use client';
import { useEffect, useRef } from 'react';

interface SparkleCursorConfig {
  colors?: string[];
  glyphs?: string[];
  minSize?: number;
  maxSize?: number;
  lifetime?: number;
  spawnGap?: number;
  /** Custom cursor applied to the whole page. Set to null to keep the system cursor. */
  cursorSvg?: string | null;
  cursorHotspot?: [number, number];
}

// Pink pixel-art arrow cursor, built from a pixel grid (P = pink edge, w = light-pink fill).
const PINK = '#ff8fb8';
const FILL = '#ffd7e6';
const CURSOR_GRID = [
  'P',
  'PP',
  'PwP',
  'PwwP',
  'PwwwP',
  'PwwwwP',
  'PwwwwwP',
  'PwwwwwwP',
  'PwwwwwwwP',
  'PwwwwwwwwP',
  'PwwwwwPPPPP',
  'PwwPwwP',
  'PwP.PwwP',
  'PP..PwwP',
  'P....PwwP',
  '.....PwwP',
  '......PwP',
  '......PP',
];
const buildPixelCursor = () => {
  let rects = '';
  CURSOR_GRID.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = row[x];
      const fill = c === 'P' ? PINK : c === 'w' ? FILL : null;
      if (fill) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 11 18" shape-rendering="crispEdges">${rects}</svg>`;
};
const ARROW_CURSOR = buildPixelCursor();

export const SparkleCursor = ({
  colors = ['#c4687e', '#e8a0b4', '#f9a8d4', '#ff5fa2', '#ffffff'],
  glyphs = ['♡', '♥', '★', '☆', '✦', '✧'],
  minSize = 9,
  maxSize = 18,
  lifetime = 950,
  spawnGap = 40,
  cursorSvg = ARROW_CURSOR,
  cursorHotspot = [0, 0],
}: SparkleCursorConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply the custom page cursor.
  useEffect(() => {
    if (!cursorSvg) return;
    const url = `url("data:image/svg+xml,${encodeURIComponent(cursorSvg)}") ${cursorHotspot[0]} ${cursorHotspot[1]}, auto`;
    const style = document.createElement('style');
    style.textContent = `*, *::before, *::after { cursor: ${url} !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [cursorSvg, cursorHotspot]);

  // Sparkle trail.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastSpawn = 0;

    const spawn = (x: number, y: number) => {
      const s = document.createElement('span');
      const size = minSize + Math.random() * (maxSize - minSize);
      const color = colors[(Math.random() * colors.length) | 0];
      const glyph = glyphs[(Math.random() * glyphs.length) | 0];
      const driftX = (Math.random() - 0.5) * 26;
      const driftY = 12 + Math.random() * 22; // gentle downward drift
      const rot = (Math.random() - 0.5) * 100;

      s.textContent = glyph;
      s.style.cssText = `
        position:fixed; left:0; top:0; pointer-events:none; z-index:9999;
        font-size:${size}px; line-height:1; color:${color};
        transform:translate(${x}px,${y}px) translate(-50%,-50%) scale(0) rotate(0deg);
        opacity:1; will-change:transform,opacity;
      `;
      container.appendChild(s);

      const anim = s.animate(
        [
          { transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(0) rotate(0deg)`, opacity: 1 },
          { transform: `translate(${x}px,${y}px) translate(-50%,-50%) scale(1) rotate(${rot * 0.4}deg)`, opacity: 1, offset: 0.3 },
          { transform: `translate(${x + driftX}px,${y + driftY}px) translate(-50%,-50%) scale(0.2) rotate(${rot}deg)`, opacity: 0 },
        ],
        { duration: lifetime, easing: 'ease-out' }
      );
      anim.onfinish = () => s.remove();
    };

    const handleMove = (e: MouseEvent) => {
      // No sparkles while reading an open card.
      if ((e.target as Element | null)?.closest('[data-no-sparkle]')) return;
      const now = performance.now();
      if (now - lastSpawn < spawnGap) return;
      lastSpawn = now;
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      container.replaceChildren();
    };
  }, [colors, glyphs, minSize, maxSize, lifetime, spawnGap]);

  return <div ref={containerRef} aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />;
};

export default SparkleCursor;
