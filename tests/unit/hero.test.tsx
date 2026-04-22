import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/hero";
import { siteConfig } from "@/lib/site-config";

describe("Hero CTA buttons", () => {
  it("renders all three primary CTAs with correct destinations", () => {
    render(<Hero />);

    const resume = screen.getByRole("link", { name: /view resume/i });
    expect(resume).toHaveAttribute("href", siteConfig.resumeUrl);
    expect(resume).toHaveAttribute("target", "_blank");

    const contact = screen.getByRole("link", { name: /contact me/i });
    expect(contact).toHaveAttribute("href", "#contact");

    const linkedin = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedin).toHaveAttribute("href", siteConfig.socials.linkedin);
    expect(linkedin).toHaveAttribute("target", "_blank");
  });

  it("renders the headline and impact summary", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /backend systems that/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Sameer Kumar/i)).toBeInTheDocument();
  });
});
