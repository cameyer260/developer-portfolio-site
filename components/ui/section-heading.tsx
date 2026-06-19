import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Mono terminal command shown above the title, e.g. "ls ~/work" */
  command: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  command,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="font-mono text-sm text-accent">
        <span className="text-muted">$</span> {command}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}
