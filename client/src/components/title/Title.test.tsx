import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Title from "./Title";

describe("Title Component", () => {
  const testText = "Hello";

  it("renders the text prop as individual letters", () => {
    render(<Title text={testText} />);
    // Verify that each letter is rendered
    testText.split("").forEach((letter) => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  it("applies correct styling to each letter", () => {
    render(<Title text={testText} />);
    const firstLetter = screen.getByText(testText.charAt(0));
    expect(firstLetter).toHaveStyle("color: white");
    expect(firstLetter).toHaveStyle("font-size: 2rem");
    expect(firstLetter).toHaveStyle("font-weight: bold");
    expect(firstLetter).toHaveStyle("cursor: none");
  });
});
