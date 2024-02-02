import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";

import CharacterImage from "./CharacterImage";
import Feedback from "../layout/feedback/Feedback";
import React from "react";

// Mocking the Feedback component
jest.mock(
  "../layout/Feedback",
  () =>
    ({ type, message }: { type: string; message: string }) =>
      (
        <div data-testid="feedback" data-type={type}>
          {message}
        </div>
      )
);

describe("CharacterImage", () => {
  const name = "Luke Skywalker";

  beforeEach(() => {
    // Mock global Image object
    global.Image = class {
      onload: () => void = jest.fn();
      onerror: () => void = jest.fn();
      src: string = "";
      constructor() {
        setTimeout(() => this.onload(), 500); // Simulate async image loading
      }
    } as any;
  });

  it("successfully loads an image", async () => {
    render(<CharacterImage name={name} />);

    await waitFor(() => {
      const imageContainer = screen.getByTestId("image-container");
      // Since the image URL is based on the character's name, we expect it to be part of the background-image style
      const expectedImageUrl = `https://starwars-images-api.s3.eu-north-1.amazonaws.com/${encodeURIComponent(
        name
      ).replace(/%20/g, "+")}.jpg`;

      expect(imageContainer).toHaveStyle(
        `background-image: url(${expectedImageUrl})`
      );
    });
  });

  it("displays an error message on image load failure", async () => {
    // Override global Image to simulate error
    global.Image = class {
      src: string = "";
      onload: () => void = jest.fn();
      onerror: () => void = jest.fn();

      constructor() {
        setTimeout(() => this.onerror(), 100); // Simulate loading failure
      }
    } as unknown as typeof Image;

    render(<CharacterImage name={name} />);

    // Wait for the Feedback component to render an error message
    const feedback = await screen.findByText("Failed to load image!");
    expect(feedback).toBeInTheDocument();
  });
});
