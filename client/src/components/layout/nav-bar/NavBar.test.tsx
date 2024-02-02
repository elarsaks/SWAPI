import { fireEvent, render, screen } from "@testing-library/react";

import NavBar from "./NavBar";
import { useAuth } from "context/auth/AuthContext";

jest.mock("context/auth/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("components/modals/login/LoginModal", () => () => (
  <div data-testid="mockLoginModal">Mock Login Modal</div>
));

// Correcting the mock setup
const mockUseAuth = useAuth as jest.MockedFunction<() => AuthContextType>;
const mockLogout = jest.fn();
const mockLogin = jest.fn();

// Helper function to configure the mock's implementation
const renderNavBar = (
  isAuthenticated = false,
  username: string | null = null
) => {
  mockUseAuth.mockReturnValue({
    isAuthenticated,
    logout: mockLogout,
    username,
    token: null,
    login: mockLogin,
    setPostLoginAction: () => {},
  });
  render(<NavBar />);
};

describe("NavBar Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockLogout.mockClear();
    mockUseAuth.mockClear();
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
});
