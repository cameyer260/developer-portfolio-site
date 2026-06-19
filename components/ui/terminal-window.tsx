import * as React from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps extends React.ComponentProps<"div"> {
  /** Mono label shown in the title bar, e.g. "about.md" or "whoami" */
  title?: string;
  /** Extra classes for the body wrapper */
  bodyClassName?: string;
}

/**
 * Window chrome wrapper giving any section a terminal "soul" — three warm
 * traffic-light dots and a mono title bar. Flavor, never a real terminal.
 * See ADR 0002.
 */
export function TerminalWindow({
  title,
  className,
  bodyClassName,
  children,
  ...props
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-3">
        <span className="size-3 rounded-full bg-accent-2/80" aria-hidden />
        <span className="size-3 rounded-full bg-accent/80" aria-hidden />
        <span className="size-3 rounded-full bg-muted/40" aria-hidden />
        {title ? (
          <span className="ml-2 font-mono text-xs text-muted">{title}</span>
        ) : null}
      </div>
      <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
    </div>
  );
}
