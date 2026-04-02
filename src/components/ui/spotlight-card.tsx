"use client";

import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan';
}

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  cyan:   { base: 190, spread: 160 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
};

// Single shared pointermove listener for all cards
let glowCards: Set<HTMLDivElement> = new Set();
let globalListenerAttached = false;

function attachGlobalListener() {
  if (globalListenerAttached || typeof window === 'undefined') return;
  // Don't attach on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;
  globalListenerAttached = true;
  window.addEventListener('pointermove', (e: PointerEvent) => {
    const { clientX: x, clientY: y } = e;
    const xp = (x / window.innerWidth).toFixed(2);
    const yp = (y / window.innerHeight).toFixed(2);
    glowCards.forEach((el) => {
      el.style.setProperty('--x', x.toFixed(2));
      el.style.setProperty('--xp', xp);
      el.style.setProperty('--y', y.toFixed(2));
      el.style.setProperty('--yp', yp);
    });
  }, { passive: true });
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'purple',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base, spread } = glowColorMap[glowColor];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Only enable spotlight on desktop (hover capable)
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    glowCards.add(el);
    attachGlobalListener();
    return () => { glowCards.delete(el); };
  }, []);

  return (
    <div
      ref={cardRef}
      data-glow
      style={{
        '--base': base,
        '--spread': spread,
        '--radius': '20',
        '--border': '1.5',
        '--backdrop': 'rgba(255,255,255,0.04)',
        '--backup-border': 'rgba(255,255,255,0.08)',
        '--size': '250',
        '--outer': '1',
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 150) * 1px)',
        '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 280) 100% 70% / 0.06), transparent
        )`,
        backgroundColor: 'var(--backdrop, transparent)',
        backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
        backgroundPosition: '50% 50%',
        border: 'var(--border-size) solid var(--backup-border)',
        position: 'relative',
      } as React.CSSProperties}
      className={`rounded-[20px] relative ${className}`}
    >
      <div data-glow />
      {children}
    </div>
  );
};

export { GlowCard };
