export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Sameer treats reliability like a product. The capacity work he led didn't just unblock growth — it changed how the team reasons about scale.",
    name: "Engineering Manager",
    role: "Platform Org",
    company: "Atlassian",
  },
  {
    id: "t2",
    quote:
      "One of those rare engineers who can hold a system in their head end-to-end and still ship clean abstractions everyone else can build on.",
    name: "Staff Engineer",
    role: "Backend Platform",
    company: "Instawork",
  },
  {
    id: "t3",
    quote:
      "Calm in incidents, opinionated in design reviews, generous in code reviews. Exactly the senior you want on a tier-1 service.",
    name: "Director of Engineering",
    role: "Core Services",
    company: "Bizongo",
  },
];
