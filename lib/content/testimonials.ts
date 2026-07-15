export type Testimonial = {
  /** The pulled quote shown on the card. */
  quote: string;
  name: string;
  /** Job title, e.g. "Founder & President". */
  role: string;
  company: string;
  /** Link to the client's live site (the one I built). */
  companyUrl?: string;
  /** Short descriptor of what I built, e.g. "nonprofit website". */
  projectSummary: string;
  /** Star rating out of 5. */
  rating: number;
  /** Full, unedited testimonial — kept for reference / a future "read more". */
  fullQuote?: string;
};

/** Client reviews shown on the freelance page. Newest first. */
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "He completed his work in a timely fashion, was very responsive to change orders, affordable, and easy to work with. … I highly recommend Christopher Meyer for anyone's website development.",
    name: "Melissa Meske",
    role: "Founder & President",
    company: "Miles to Go",
    companyUrl: "https://www.milestogohelps.org/",
    projectSummary: "nonprofit website",
    rating: 5,
    fullQuote:
      "Miles to Go, a new nonprofit startup, chose Christopher Meyer to develop its website because of his portfolio of previous work as well as because of his professionalism, promptness, and willingness to adapt to the needs of a nonprofit that is just getting started. He completed his work in a timely fashion, was very responsive to change orders, affordable, and was easy to work with as well. As the founder and president of Miles to Go, I highly recommend Christopher Meyer for anyone's website development. ~ Melissa Meske.",
  },
] as const;
