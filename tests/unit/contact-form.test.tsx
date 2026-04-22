import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact, contactSchema } from "@/components/sections/contact";

beforeEach(() => {
  // jsdom doesn't ship fetch by default in some envs
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    ),
  );
});

describe("Contact form validation", () => {
  it("validates the schema directly", () => {
    expect(contactSchema.safeParse({ name: "", email: "x", message: "short" }).success).toBe(false);
    expect(
      contactSchema.safeParse({
        name: "Sameer",
        email: "ok@example.com",
        message: "Long enough message to pass the validator constraints.",
      }).success,
    ).toBe(true);
  });

  it("shows inline errors when the user submits empty form", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument();
    expect(await screen.findByText(/doesn't look like a valid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 20 characters/i)).toBeInTheDocument();
  });

  it("submits a valid payload to /api/contact", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText("Name"), "Sameer Kumar");
    await user.type(screen.getByLabelText("Email"), "hire@example.com");
    await user.type(
      screen.getByLabelText("Message"),
      "Hello — interested in chatting about a Staff role on our platform team.",
    );

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({ method: "POST" }),
      );
    });
  });
});
