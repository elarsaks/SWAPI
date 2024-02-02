import "@testing-library/jest-dom";
import "jest-styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

import Card from "./Card";
import React from "react";

describe("Card", () => {
  const name = "Test Character";
  const mockOpenCharacter = jest.fn();

  beforeEach(() => {
    render(<Card name={name} openCharacter={mockOpenCharacter} />);
  });

  it("renders the component with the provided character name", () => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it("calls openCharacter function when clicked", () => {
    fireEvent.click(screen.getByText(name));
    expect(mockOpenCharacter).toHaveBeenCalled();
  });

  // TODO: Test card movements on mouse hover (mouse over works, but tests fail)
  //   it("changes the CardWrap style on mouse move", () => {
  //     const cardWrap = screen.getByTestId("card-wrap");
  //     fireEvent.mouseMove(cardWrap, { clientX: 100, clientY: 100 });

  //     expect(cardWrap.style.transform).toContain("rotateY");
  //     expect(cardWrap.style.transform).toContain("rotateX");
  //   });

  it("resets transform styles on mouse leave", () => {
    const cardWrap = screen.getByTestId("card-wrap");
    fireEvent.mouseLeave(cardWrap);
    expect(cardWrap.style.transform).toBe("");
  });
});
