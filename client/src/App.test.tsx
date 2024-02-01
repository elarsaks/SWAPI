import * as characterApi from "api/characters";

import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import { CharacterResponse } from "types";
import React from "react";
import { getCharacters } from "api/characters";
import { useAuth } from "store/AuthContext";
import userEvent from "@testing-library/user-event";

jest.mock("api/characters", () => ({
  getCharacters: jest.fn(),
}));

const mockGetCharacters = characterApi.getCharacters as jest.MockedFunction<
  typeof characterApi.getCharacters
>;

// Mock the entire AuthContext module
jest.mock("store/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Cast the mocked useAuth to jest.Mock
const mockUseAuth = useAuth as jest.Mock;

test("example test", () => {
  // Define the mock return value for useAuth
  mockUseAuth.mockReturnValue({
    isAuthenticated: true,
    setPostLoginAction: jest.fn(),
    // Add any other properties or methods needed from the hook
  });

  // Your test logic here
});
