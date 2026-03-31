"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  duration = 2,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        setDisplay(
          end % 1 !== 0 ? v.toFixed(1) : Math.round(v).toLocaleString()
        );
      },
    });
    return controls.stop;
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-xs tracking-widest uppercase text-text-light mb-2">
        {label}
      </p>
      <p className="text-4xl md:text-5xl font-bold text-soybean leading-none">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="font-mono text-xs tracking-wider text-text-muted mt-2">
        {sublabel}
      </p>
    </div>
  );
}
