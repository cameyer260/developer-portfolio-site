export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export const skills: readonly SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "Java", "C++", "Rust", "PHP", "SQL", "HTML/CSS"],
  },
  {
    label: "Frameworks & Tech",
    items: [
      "React / Next.js",
      "Node",
      "Express",
      "NestJS",
      "Supabase",
      "Stripe",
      "MongoDB",
    ],
  },
  {
    label: "Tools",
    items: [
      "Claude Code",
      "Neovim",
      "Git",
      "GitHub",
      "Docker",
      "Cloudflare",
      "AWS",
      "SSH",
      "Unix",
    ],
  },
] as const;
