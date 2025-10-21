import { render, screen } from "@testing-library/react";
import SidebarNav from "../components/SidebarNav";

// Mock next/navigation and next/link for isolated rendering
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/link", () => {
  const MockLink = ({ href, children, ...rest }) => (
    <a href={href} {...rest}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const { usePathname } = require("next/navigation");

describe("SidebarNav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders visible navigation links (Dashboard & Insights)", () => {
    usePathname.mockReturnValue("/dashboard");
    render(<SidebarNav />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Insights")).toBeInTheDocument();
  });

  test("highlights Dashboard when pathname is /dashboard", () => {
    usePathname.mockReturnValue("/dashboard");
    render(<SidebarNav />);

    const activeLink = screen.getByText("Dashboard");
    expect(activeLink.closest("a").className).toMatch(/bg-white\/10/);

    const inactiveLink = screen.getByText("Insights");
    expect(inactiveLink.closest("a").className).not.toMatch(/bg-white\/10/);
  });

  test("highlights Insights when pathname is /insights", () => {
    usePathname.mockReturnValue("/insights");
    render(<SidebarNav />);

    const activeLink = screen.getByText("Insights");
    expect(activeLink.closest("a").className).toMatch(/bg-white\/10/);

    const inactiveLink = screen.getByText("Dashboard");
    expect(inactiveLink.closest("a").className).not.toMatch(/bg-white\/10/);
  });

  test("renders brand and subtitle", () => {
    usePathname.mockReturnValue("/dashboard");
    render(<SidebarNav />);

    expect(screen.getByText("Synsure")).toBeInTheDocument();
    expect(screen.getByText("Case Management")).toBeInTheDocument();
  });

  test("renders footer note", () => {
    usePathname.mockReturnValue("/dashboard");
    render(<SidebarNav />);

    expect(
      screen.getByText(/Manager view aggregates employee activity/i)
    ).toBeInTheDocument();
  });
});
