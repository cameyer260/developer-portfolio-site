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
        "inline-flex items-center rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted",
        className,
      )}
      {...props}
    />
  );
}
