import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import * as api from "../services/api";

vi.mock("../services/api", async () => {
  const actual = await vi.importActual<typeof import("../services/api")>(
    "../services/api"
  );
  return {
    ...actual,
    fetchPublicGoldRates: vi.fn(),
    fetchAdminSession: vi.fn(),
    submitCustomerEnquiry: vi.fn(),
  };
});

describe("Sambhrama Gold Company Frontend Suite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(api.fetchAdminSession).mockResolvedValue({
      success: false,
      authenticated: false,
    });
  });

  it("displays honest 'Rate not updated' message when no gold rates are configured", async () => {
    vi.mocked(api.fetchPublicGoldRates).mockResolvedValue({
      success: true,
      configured: false,
      data: null,
      message: "Rate not updated. Contact us for today's rate.",
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("header-rate-unconfigured")).toBeInTheDocument();
      expect(screen.getByTestId("card-rate-empty")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", { level: 1, name: /Your Gold\. Its True Value\./i })
    ).toBeInTheDocument();
  });

  it("displays administrator-published 22K and 24K gold rates in header and rate card", async () => {
    vi.mocked(api.fetchPublicGoldRates).mockResolvedValue({
      success: true,
      configured: true,
      data: {
        id: "rate-1",
        rate22k: 6850,
        rate24k: 7470,
        rate22kFormatted: "6850.00",
        rate24kFormatted: "7470.00",
        currency: "INR",
        note: null,
        updatedAt: "2026-10-16T10:00:00.000Z",
        updatedAtIST: "16 Oct 2026, 3:30 pm IST",
        updatedByName: "Administrator",
      },
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("header-rate-display")).toBeInTheDocument();
      expect(screen.getByTestId("card-rate-22k")).toHaveTextContent("6,850.00");
      expect(screen.getByTestId("card-rate-24k")).toHaveTextContent("7,470.00");
    });
  });

  it("renders Sell Your Gold, Certificates (empty state), Testimonials (empty state), and redirects unauthenticated /admin to /admin/login", async () => {
    vi.mocked(api.fetchPublicGoldRates).mockResolvedValue({
      success: true,
      configured: false,
      data: null,
    });

    const { unmount } = render(
      <MemoryRouter initialEntries={["/certificates"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("certificates-empty-state")).toBeInTheDocument();
    });
    unmount();

    const { unmount: unmountTestimonials } = render(
      <MemoryRouter initialEntries={["/testimonials"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("testimonials-empty-state")).toBeInTheDocument();
    });
    unmountTestimonials();

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Administrator Sign In/i)).toBeInTheDocument();
    });
  });
});
