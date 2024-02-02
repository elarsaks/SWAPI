// App.test.jsx

import * as AuthContext from "context/auth/AuthContext";

import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import React from "react";
import { getCharacters } from "api/characters";
import userEvent from "@testing-library/user-event";

// We are using mocked loading component, because the real one uses WebGL and testing it is an headache
jest.mock("./components/layout/loading-cube/LoadingCube.tsx", () => () => (
  <div>Loading ...</div>
));

jest.mock("api/characters");

// Mock child components if necessary
jest.mock(
  "components/modals/character/character-modal/CharacterModal",
  () => () => <div>Character Modal</div>
);
jest.mock("components/modals/login/LoginModal", () => () => (
  <div>Login Modal</div>
));

// Utility function for mocking authenticated state
function mockAuthenticated(loggedIn: boolean) {
  (AuthContext.useAuth as jest.Mock).mockReturnValue({
    isAuthenticated: loggedIn,
    login: jest.fn(),
    logout: jest.fn(),
    setPostLoginAction: jest.fn(),
    token: loggedIn ? "*****" : null,
    username: loggedIn ? "UserName2" : null,
  });
}

jest.mock("context/auth/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCharacters as jest.Mock).mockResolvedValue({
      count: 1,
      results: [
        { name: "Luke Skywalker", url: "http://swapi.dev/api/people/1/" },
      ],
    });
  });

  it("renders loading state correctly", async () => {
    mockAuthenticated(true);
    render(<App />);
    expect(screen.getByText("Loading ...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("Loading ...")).not.toBeInTheDocument()
    );
  });

  it("displays characters once loaded", async () => {
    mockAuthenticated(true);
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument()
    );
  });

  // TODO: Test authenticates user clicking on the card
  // TODO: Test unauthenticated user clicking on the card
});
