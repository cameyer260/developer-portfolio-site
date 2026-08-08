export type Recommendation = {
  /** Pulled quote shown on the card. */
  quote: string;
  /** LinkedIn recommendation headline. */
  title: string;
  name: string;
  role: string;
  company: string;
  /** How they know Christopher, e.g. "Managed Christopher directly". */
  relationship: string;
  /** When the recommendation was written, e.g. "August 7, 2026". */
  date: string;
  /** Where the recommendation lives (usually the LinkedIn profile). */
  url: string;
  /** Full, unedited recommendation text. */
  fullQuote: string;
};

/** Professional recommendations shown on the homepage. Newest first. */
export const recommendations: readonly Recommendation[] = [
  {
    title: "Exceptional Intern, Rare Find",
    quote:
      "I was really surprised with Chris's in-depth knowledge for his age and years of experience. … He quickly stood out across all other candidates I had met with over the previous months and years with his aptitude, intelligence, creativity, and drive. … Chris is a rare find and I can't recommend him enough.",
    name: "Kerry Ritter",
    role: "Co-founder",
    company: "Zipper",
    relationship: "Managed Christopher directly",
    date: "August 7, 2026",
    url: "https://www.linkedin.com/in/cameyer06/",
    fullQuote:
      "Chris and I met after I saw his post in a local social group, advertising his freelance efforts and already showing his drive and eagerness to apply his craft. I scoped out his website and resume and saw that he was a university CS student and was leverage AI tools to make him more productive. So, obviously, the question was, \"does Chris know what he's doing, or just sending AI code out the door to pad his resume and GitHub?\"\n\nI was really surprised with Chris's in-depth knowledge for his age and years of experience. We talked about his approaches to AI system context engineering and integrations, how he prefers to deploy his apps and databases, and what frameworks/libraries he enjoys and why. He quickly stood out across all other candidates I had met with over the previous months and years with his aptitude, intelligence, creativity, and drive.\n\nHe worked with us for a few months and he hit all the qualities and behaviors you could ask for in a junior, often exceeding expectations:\n\n- He worked autonomously but asked for help when he needed it, showing what he tried already and what particular sticking points he had.\n\n- He produced quality output, efficiently and well-validated.\n\n- He offered creative new solutions to our platform and to our developer experience.\n\n- He stayed on top of emerging technologies, offering his opinion and insights with clear understanding of the topic.\n\nChris is a rare find and I can't recommend him enough.",
  },
] as const;
