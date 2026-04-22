import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Projects } from "@/components/sections/projects";
import { projects } from "@/data/projects";

describe("Project cards rendering", () => {
  it("renders one card per project with name + status", () => {
    render(<Projects />);
    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(projects.length);

    for (const p of projects) {
      expect(screen.getByRole("heading", { name: p.name })).toBeInTheDocument();
    }
  });

  it("links GitHub and demo when provided", () => {
    render(<Projects />);
    const sample = projects.find((p) => !!p.github && !!p.demo);
    if (!sample) return;
    expect(
      screen.getByRole("link", { name: new RegExp(`${sample.name} on github`, "i") }),
    ).toHaveAttribute("href", sample.github!);
    expect(
      screen.getByRole("link", { name: new RegExp(`${sample.name} live demo`, "i") }),
    ).toHaveAttribute("href", sample.demo!);
  });

  it("renders status labels visible to users", () => {
    render(<Projects />);
    expect(screen.getAllByText(/shipped|beta|in progress|archived/i).length).toBeGreaterThan(0);
  });
});
