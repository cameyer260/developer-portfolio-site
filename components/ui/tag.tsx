import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Mono tech tag — used for skills and project tech stacks.
 * Flat, hairline-bordered chip on a nested surface. No emoji (per CONTEXT).
 */
export function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border/80 bg-surface-2 px-2.5 py-1 font-mono text-xs font-medium text-text/90 transition-colors hover:border-accent/40 hover:text-text",
        className,
      )}
      {...props}
    />
  );
}
