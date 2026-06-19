"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** stagger offset in seconds */
  delay?: number;
  /** translate-up distance in px */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

/**
 * Fade + translate-up on scroll into view. Reduced motion → instant, no shift.
 * See ADR 0002.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.5, 0.27, 1] }}
    >
      {children}
    </MotionTag>
  );
}
