export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { id: "work", label: "Work", href: "#experience-heading" },
  { id: "projects", label: "Projects", href: "#projects-heading" },
  { id: "skills", label: "Skills", href: "#skills-heading" },
  { id: "travel", label: "Travel", href: "#travel-heading" },
  { id: "contact", label: "Contact", href: "#contact-heading" },
];
