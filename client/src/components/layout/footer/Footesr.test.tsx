import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer Component", () => {
  it("renders the footer with all links and icons", () => {
    render(<Footer />);

    // Check for personal link
    expect(screen.getByText("© 2024 Elar Saks")).toBeInTheDocument();
    expect(screen.getByText("© 2024 Elar Saks").closest("a")).toHaveAttribute(
      "href",
      "https://www.saks.digital"
    );

    // Check for GitHub link and icon
    const githubLink = screen.getByText("GitHub").closest("a");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/elarsaks/SWAPI"
    );
    expect(githubLink).toContainElement(screen.getByLabelText("GitHub"));

    // Check for LinkedIn link and icon
    const linkedinLink = screen.getByText("LinkedIn").closest("a");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/elarsaks/"
    );
    expect(linkedinLink).toContainElement(screen.getByLabelText("LinkedIn"));
  });

  it("verifies link targets to open in a new tab", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
