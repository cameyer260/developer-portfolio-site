import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-semibold whitespace-nowrap tracking-wide [&>svg]:size-3",
  {
    variants: {
      variant: {
        // Amber status pill — "open to internships", "Most Popular"
        accent: "border-accent/40 bg-accent/15 text-accent shadow-[0_0_12px_-3px_rgba(245,158,11,0.25)]",
        muted: "border-border bg-surface-2 text-text/80",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
