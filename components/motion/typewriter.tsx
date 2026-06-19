"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cursor } from "./cursor";

interface TypewriterProps {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  startDelay?: number;
  /** show a trailing blinking cursor */
  cursor?: boolean;
  className?: string;
}

/**
 * Types `text` one character at a time. Respects prefers-reduced-motion by
 * printing the full string immediately. See ADR 0002.
 */
export function Typewriter({
  text,
  speed = 45,
  startDelay = 250,
  cursor = true,
  className,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, reduceMotion]);

  const shown = reduceMotion ? text.length : count;

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {text.slice(0, shown)}
      {cursor && <Cursor className="ml-0.5" />}
    </span>
  );
}
