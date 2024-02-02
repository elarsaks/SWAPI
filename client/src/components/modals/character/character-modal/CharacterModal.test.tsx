import "@testing-library/jest-dom";

import * as AuthContext from "context/auth/AuthContext";

import { fireEvent, render, screen } from "@testing-library/react";

import CharacterModal from "./CharacterModal";

jest.mock("components/character-image/CharacterImage", () => () => (
  <img alt="character image" />
));

jest.mock("../details/Details", () => () => <div>Character Details</div>);

describe("CharacterModal Component", () => {
  const mockOnClose = jest.fn();
  const mockCharacter = {
    birth_year: "01.01.1001",
    created: "01.01.1001",
    edited: "01.01.1001",
    eye_color: "blue",
    films: [],
    gender: "male",
    hair_color: "white",
    height: "2m",
    homeworld: "earth",
    mass: "100kg",
    name: "Luke Skywalker",
    skin_color: "white",
    species: [],
    starships: [],
    url: "http://swapi.dev/api/people/1/",
    vehicles: [],
  };

  function mockUnauthenticated(loggedIn: boolean) {
    return {
      isAuthenticated: loggedIn,
      login: (username: string, password: string) => "",
      logout: () => {},
      setPostLoginAction: (action: () => void) => {},
      token: loggedIn ? "*****" : null,
      username: loggedIn ? "UserName2" : null,
    };
  }

  beforeEach(() => {
    // Reset the mock implementation for useAuth before each test
    jest.clearAllMocks();

    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue(mockUnauthenticated(false));
  });

  it("should not render for unauthenticated users", () => {
    render(<CharacterModal onClose={mockOnClose} character={mockCharacter} />);
    expect(screen.queryByText("Character Details")).not.toBeInTheDocument();
  });

  it("should render for authenticated users", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue(mockUnauthenticated(true));
    render(<CharacterModal onClose={mockOnClose} character={mockCharacter} />);
    expect(screen.getByText("Character Details")).toBeInTheDocument();
    expect(screen.getByAltText("character image")).toBeInTheDocument();
  });

  it("calls onClose when the modal background is clicked", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue(mockUnauthenticated(true));
    render(<CharacterModal onClose={mockOnClose} character={mockCharacter} />);
    fireEvent.click(screen.getByTestId("modal-background"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("does not call onClose when the modal content is clicked", () => {
    jest
      .spyOn(AuthContext, "useAuth")
      .mockReturnValue(mockUnauthenticated(true));
    render(<CharacterModal onClose={mockOnClose} character={mockCharacter} />);
    fireEvent.click(screen.getByTestId("modal-content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
