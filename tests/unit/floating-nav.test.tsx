import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommandPaletteProvider } from "@/components/nav/command-palette";
import { FloatingNav } from "@/components/nav/floating-nav";
import { navItems } from "@/data/navigation";

function renderNav() {
  return render(
    <CommandPaletteProvider>
      <FloatingNav />
    </CommandPaletteProvider>,
  );
}

describe("FloatingNav", () => {
  it("renders the nav landmark with all primary items", () => {
    renderNav();
    expect(screen.getByTestId("floating-nav")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(nav).toBeInTheDocument();
    for (const item of navItems) {
      expect(
        screen.getByRole("link", { name: new RegExp(`^${item.label}$`, "i") }),
      ).toHaveAttribute("href", item.href);
    }
  });

  it("exposes the theme toggle and command-palette trigger", () => {
    renderNav();
    expect(
      screen.getByRole("button", { name: /toggle color theme/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open command palette/i }),
    ).toBeInTheDocument();
  });
});
