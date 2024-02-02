import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import FeedBack from "./Feedback";

describe("Feedback Component", () => {
  // Error
  it("displays the correct message and uses the ERROR icon for error type", () => {
    const errorMessage = "An error occurred";
    render(<FeedBack message={errorMessage} type="error" />);
    expect(screen.getByText(/ERROR: An error occurred/)).toBeInTheDocument();
    expect(screen.getByTestId("md-error-icon")).toBeInTheDocument();
  });

  // INFO
  it("displays the correct message and uses the INFO icon for info type", () => {
    const infoMessage = "Here is some information";
    render(<FeedBack message={infoMessage} type="info" />);
    expect(
      screen.getByText(/INFO: Here is some information/)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("io-md-information-circle-outline-icon")
    ).toBeInTheDocument();
  });

  // WARNING
  it("displays the correct message and uses the WARNING icon for warning type", () => {
    const warningMessage = "This is a warning";
    render(<FeedBack message={warningMessage} type="warning" />);
    expect(screen.getByText(/WARNING: This is a warning/)).toBeInTheDocument();
    expect(screen.getByTestId("io-warning-outline-icon")).toBeInTheDocument(); // Add data-testid to your icons
  });
});
