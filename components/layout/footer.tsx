import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/cameyer260", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cameyer06/",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:cameyer06@gmail.com", icon: Mail },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row sm:px-6">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">$</span> © {new Date().getFullYear()}{" "}
          christopher meyer
        </p>
        <div className="flex items-center gap-5 font-mono text-xs text-muted">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Icon className="size-3.5" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
