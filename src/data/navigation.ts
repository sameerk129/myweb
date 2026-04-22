export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { id: "work", label: "Work", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "travel", label: "Travel", href: "#travel" },
  { id: "contact", label: "Contact", href: "#contact" },
];
