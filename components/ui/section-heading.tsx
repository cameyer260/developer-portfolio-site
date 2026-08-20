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
      <p className="font-mono text-sm font-semibold text-accent">
        <span className="text-muted/80">$</span> {command}
      </p>
      <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-text sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base text-muted leading-relaxed sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
