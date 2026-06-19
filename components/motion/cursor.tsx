import { cn } from "@/lib/utils";

/**
 * Blinking block cursor. Decorative terminal flavor.
 * Blink is paused for users who prefer reduced motion (via motion-reduce:).
 */
export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block w-[0.6em] translate-y-[0.08em] bg-accent",
        "h-[1.05em] animate-blink motion-reduce:animate-none",
        className,
      )}
    />
  );
}
