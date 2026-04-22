"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Country } from "@/data/travel";

/**
 * Lightweight equirectangular projection world canvas.
 * Renders:
 *  - a graticule (lat/lon lines) as the "globe" feel
 *  - a soft dotted hemisphere mask
 *  - markers for visited countries
 *  - animated great-circle-ish arcs between sequential countries
 *
 * Intentionally data-free (no country shapes) — fast, premium, and
 * scales perfectly across themes.
 */
export function WorldMap({
  countries,
  activeId,
  onSelect,
}: {
  countries: Country[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const W = 1000;
  const H = 500;

  const project = React.useCallback(
    (lon: number, lat: number) => ({
      x: ((lon + 180) / 360) * W,
      y: ((90 - lat) / 180) * H,
    }),
    [],
  );

  const points = React.useMemo(
    () => countries.map((c) => ({ ...c, ...project(c.lon, c.lat) })),
    [countries, project],
  );

  const arcs = React.useMemo(() => {
    const segs: { d: string; id: string }[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.18 - 18;
      segs.push({ id: `${a.id}-${b.id}`, d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}` });
    }
    return segs;
  }, [points]);

  const lons = React.useMemo(
    () => Array.from({ length: 13 }, (_, i) => -180 + i * 30),
    [],
  );
  const lats = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => -90 + i * 30),
    [],
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card/40 ring-soft">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-auto"
        role="img"
        aria-label="World map showing visited countries"
      >
        <defs>
          <radialGradient id="wm-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--grad-from)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="wm-arc" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--grad-from)" />
            <stop offset="100%" stopColor="var(--grad-to)" />
          </linearGradient>
          <radialGradient id="wm-marker" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--grad-from)" />
            <stop offset="100%" stopColor="var(--grad-to)" />
          </radialGradient>
          <mask id="wm-fade">
            <rect width={W} height={H} fill="black" />
            <rect
              width={W}
              height={H}
              fill="url(#wm-fade-grad)"
            />
            <linearGradient id="wm-fade-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </mask>
        </defs>

        <rect width={W} height={H} fill="url(#wm-glow)" opacity="0.5" />

        {/* graticule */}
        <g
          stroke="color-mix(in oklab, currentColor 14%, transparent)"
          strokeWidth="0.6"
          fill="none"
          className="text-foreground"
          mask="url(#wm-fade)"
        >
          {lons.map((lon) => {
            const { x } = project(lon, 0);
            return <line key={`lo-${lon}`} x1={x} y1={0} x2={x} y2={H} />;
          })}
          {lats.map((lat) => {
            const { y } = project(0, lat);
            return <line key={`la-${lat}`} x1={0} y1={y} x2={W} y2={y} />;
          })}
        </g>

        {/* dotted continent suggestion */}
        <g className="text-foreground">
          {Array.from({ length: 600 }).map((_, i) => {
            const x = (i * 53) % W;
            const y = (i * 97) % H;
            const r = ((i * 13) % 7 === 0 ? 1.2 : 0.7) * ((y > 80 && y < 420) ? 1 : 0.5);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                fill="currentColor"
                opacity={0.06}
              />
            );
          })}
        </g>

        {/* arcs */}
        <g fill="none" stroke="url(#wm-arc)" strokeWidth="1.4" strokeLinecap="round">
          {arcs.map((a, i) => (
            <motion.path
              key={a.id}
              d={a.d}
              initial={reduced ? { pathLength: 1, opacity: 0.65 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.65 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.1, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </g>

        {/* markers */}
        <g>
          {points.map((p, i) => {
            const isActive = activeId === p.id;
            return (
              <g
                key={p.id}
                transform={`translate(${p.x} ${p.y})`}
                className="cursor-pointer"
                onClick={() => onSelect?.(p.id)}
              >
                <motion.circle
                  r={isActive ? 18 : 12}
                  fill="url(#wm-marker)"
                  opacity={0.18}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, type: "spring", stiffness: 220, damping: 18 }}
                />
                <motion.circle
                  r={isActive ? 5 : 3.6}
                  fill="url(#wm-marker)"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i + 0.1, type: "spring", stiffness: 240, damping: 16 }}
                />
                <title>{`${p.flag} ${p.name} — ${p.represents}`}</title>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
