import { fireEvent, render, screen } from "@testing-library/react";

import NavBar from "./NavBar";
import React from "react";
import { useAuth } from "context/auth/AuthContext";

// Mock the AuthContext and LoginModal component
jest.mock("context/auth/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("components/modals/login/LoginModal", () => () => (
  <div data-testid="mockLoginModal">Mock Login Modal</div>
));

// Mock implementations
const mockLogout = jest.fn();
const mockLogin = jest.fn();

// Helper function to configure the mock's implementation
const renderNavBar = (
  isAuthenticated = false,
  username: string | null = null
) => {
  (useAuth as jest.Mock).mockReturnValue({
    isAuthenticated,
    logout: mockLogout,
    username,
    token: isAuthenticated ? "dummyToken" : null,
    login: mockLogin,
    setPostLoginAction: jest.fn(),
  });

  render(<NavBar />);
};

describe("NavBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks to their initial state before each test
  });

  it("displays Log In button for unauthenticated users", () => {
    renderNavBar();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  it("displays username and Log Out button for authenticated users", () => {
    renderNavBar(true, "Luke Skywalker");
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("opens login modal when Log In button is clicked", () => {
    renderNavBar();
    fireEvent.click(screen.getByText("Log In"));
    expect(screen.getByTestId("mockLoginModal")).toBeInTheDocument();
  });

  it("calls logout function when Log Out button is clicked", () => {
    renderNavBar(true);
    fireEvent.click(screen.getByText("Log Out"));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("displays the username on the upper left side for authenticated users", () => {
    const testUsername = "Luke Skywalker";
    renderNavBar(true, testUsername);

    const usernameDisplay = screen.getByText(testUsername);
    expect(usernameDisplay).toBeInTheDocument();
  });
});
