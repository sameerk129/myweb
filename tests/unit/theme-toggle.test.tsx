import { describe, expect, it } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/nav/theme-toggle";

describe("ThemeToggle", () => {
  it("renders an accessible toggle button", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /toggle color theme/i });
    expect(btn).toBeInTheDocument();
  });

  it("flips between dark and light when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /toggle color theme/i });

    // After mount the data-theme-current attribute reflects the current theme.
    await act(async () => {});
    expect(btn).toHaveAttribute("data-theme-current", "dark");

    await user.click(btn);
    expect(btn).toHaveAttribute("data-theme-current", "light");

    await user.click(btn);
    expect(btn).toHaveAttribute("data-theme-current", "dark");
  });
});
