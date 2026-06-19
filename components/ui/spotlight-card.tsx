"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  surfaceClassName?: string;
}

/**
 * Card with a cursor-following amber spotlight. Ported from the old site and
 * restyled to the warm palette (amber glow instead of white). See ADR 0002.
 */
export function SpotlightCard({
  children,
  className = "",
  surfaceClassName = "bg-surface border border-border",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-colors duration-300",
        surfaceClassName,
        className,
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 motion-reduce:hidden"
        style={{
          opacity,
          background: `radial-gradient(540px circle at ${position.x}px ${position.y}px, rgba(245,158,11,0.10), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
