import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Amber signature CTA — dark text on amber, glows on hover
        primary:
          "bg-accent text-bg hover:bg-accent/90 hover:shadow-[0_0_24px_-4px_var(--color-accent)]",
        // Hairline outline that lights up amber on hover
        outline:
          "border border-border bg-surface/40 text-text hover:border-accent/50 hover:text-accent hover:bg-surface",
        ghost: "text-muted hover:text-text hover:bg-surface",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        lg: "h-11 rounded-md px-6 text-[0.95rem] has-[>svg]:px-5",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
