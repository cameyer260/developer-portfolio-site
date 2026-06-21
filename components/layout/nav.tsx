import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "work", href: "/#work" },
  { label: "experience", href: "/#experience" },
  { label: "skills", href: "/#skills" },
  { label: "contact", href: "/#contact" },
] as const;

/** Sticky terminal top bar. Route-absolute hrefs so it works from /freelance too. */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/#top"
          className="font-mono text-sm font-medium tracking-tight transition-colors hover:text-accent"
        >
          <span className="text-accent">~/</span>christopher-meyer
        </Link>

        <div className="hidden items-center gap-7 font-mono text-sm text-muted md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/cameyer260"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-10 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-text"
          >
            <Github className="size-5" />
          </a>
          <Button asChild variant="outline" size="sm">
            <a
              href="/christopher-meyer-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              resume
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
