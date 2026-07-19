export const profile = {
  name: "Christopher Meyer",
  role: "Software Engineer",
  location: "Edwardsville, IL · St. Louis area",

  /** Typed in the hero. See CONTEXT.md → Profile / Hero. */
  whoami: "Software engineer building practical, full-stack products.",

  status: {
    current: "SWE Intern @ Zipper",
    openTo: "Summer 2027 SWE internships & freelance",
  },

  email: "cameyer06@gmail.com",
  // Google Voice number — intentional on the site to limit spam. The personal
  // number lives on the resume PDF. See ADR 0001 and memory/.
  phone: "(314) 529-1949",
  phoneHref: "+13145291949",

  socials: {
    github: "https://github.com/cameyer260",
    linkedin: "https://www.linkedin.com/in/cameyer06/",
  },

  resume: "/christopher-meyer-resume.pdf",
} as const;
