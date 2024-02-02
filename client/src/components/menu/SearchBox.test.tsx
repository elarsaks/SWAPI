import { act, fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import SearchBox from "./SearchBox";
import SearchContext from "context/search/SearchContext";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  // Utility function to render the component within the mocked context
  const renderSearchBoxWithMockedContext = (setSearchWordMock: jest.Mock) => {
    // Create a mock context value with the same shape as your SearchContextType
    const contextValue: Partial<SearchContextType> = {
      setSearchWord: setSearchWordMock,
    };

    return render(
      <SearchContext.Provider value={contextValue as SearchContextType}>
        <SearchBox />
      </SearchContext.Provider>
    );
  };

  it("renders correctly", () => {
    const setSearchWordMock = jest.fn();
    renderSearchBoxWithMockedContext(setSearchWordMock);
    expect(
      screen.getByPlaceholderText("Search Character...")
    ).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    const setSearchWordMock = jest.fn();
    renderSearchBoxWithMockedContext(setSearchWordMock);
    const input = screen.getByPlaceholderText(
      "Search Character..."
    ) as HTMLInputElement;
    userEvent.type(input, "Luke");
    expect(input.value).toBe("Luke");
  });

  it("calls setSearchWord from context after debouncing", async () => {
    jest.useFakeTimers();
    const setSearchWordMock = jest.fn();
    renderSearchBoxWithMockedContext(setSearchWordMock);
    const input = screen.getByPlaceholderText(
      "Search Character..."
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Luke" } });

    // Advance timers to simulate debounce effect
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(setSearchWordMock).toHaveBeenCalledWith("Luke");
    jest.useRealTimers();
  });
});
