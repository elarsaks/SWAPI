import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Title from "./Title";

describe("Title Component", () => {
  const testText = "Hello";

  it("renders the text prop as individual letters", () => {
    render(<Title text={testText} />);
    // Use getAllByText to handle multiple elements with the same text
    testText.split("").forEach((letter) => {
      const matchingElements = screen.getAllByText(letter);
      expect(matchingElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});
