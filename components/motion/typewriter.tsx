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
  onDone?: () => void;
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
  onDone,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      onDone?.();
      return;
    }

    setCount(0);
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, reduceMotion]);

  useEffect(() => {
    if (done) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {text.slice(0, count)}
      {cursor && <Cursor className="ml-0.5" />}
    </span>
  );
}
