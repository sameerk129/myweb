"use client";

import * as React from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
  useReducedMotion,
} from "framer-motion";

export type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const formatted = useTransform(mv, (latest) =>
    `${prefix}${latest.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`,
  );

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
    </motion.span>
  );
}
