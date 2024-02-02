import { act, fireEvent, render, screen } from "@testing-library/react";

import ContentMenu from "./ContentMenu";
import React from "react";
import SearchContext from "context/search/SearchContext"; // Ensure the import path is correct
import userEvent from "@testing-library/user-event";

describe("ContentMenu Component", () => {
  // Utility to render ContentMenu with mocked context and props
  const renderMenuWithPropsAndContext = (
    props: {
      page: number;
      setPage: jest.Mock;
      minPage: number;
      maxPage: number;
    },
    setSearchWordMock: jest.Mock
  ) => {
    const contextValue: Partial<SearchContextType> = {
      setSearchWord: setSearchWordMock,
    };
    return render(
      <SearchContext.Provider value={contextValue as SearchContextType}>
        <ContentMenu {...props} />
      </SearchContext.Provider>
    );
  };

  it("renders buttons with correct disabled states based on page props", () => {
    const setPageMock = jest.fn();
    const setSearchWordMock = jest.fn();
    const props = { page: 2, setPage: setPageMock, minPage: 1, maxPage: 3 };

    renderMenuWithPropsAndContext(props, setSearchWordMock);

    const prevButton = screen.getByText("< 1");
    const nextButton = screen.getByText("3 >");

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("disables prev button on minPage and next button on maxPage", () => {
    const setPageMock = jest.fn();
    const setSearchWordMock = jest.fn();
    const propsAtMinPage = {
      page: 1,
      setPage: setPageMock,
      minPage: 1,
      maxPage: 3,
    };
    const propsAtMaxPage = {
      page: 3,
      setPage: setPageMock,
      minPage: 1,
      maxPage: 3,
    };

    renderMenuWithPropsAndContext(propsAtMinPage, setSearchWordMock);
    expect(screen.getByText("< 0")).toBeDisabled();

    renderMenuWithPropsAndContext(propsAtMaxPage, setSearchWordMock);
    expect(screen.getByText("4 >")).toBeDisabled();
  });

  it("updates search context on input change with debounce", async () => {
    jest.useFakeTimers();
    const setPageMock = jest.fn();
    const setSearchWordMock = jest.fn();
    const props = { page: 2, setPage: setPageMock, minPage: 1, maxPage: 3 };

    renderMenuWithPropsAndContext(props, setSearchWordMock);
    const input = screen.getByPlaceholderText(
      "Search Character..."
    ) as HTMLInputElement;

    // Simulate typing in the search box
    fireEvent.change(input, { target: { value: "Yoda" } });

    // Fast-forward the debounce timer
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(setSearchWordMock).toHaveBeenCalledWith("Yoda");
    jest.useRealTimers();
  });

  it("calls setPage with correct argument when pagination buttons are clicked", () => {
    const setPageMock = jest.fn();
    const setSearchWordMock = jest.fn();
    const props = { page: 2, setPage: setPageMock, minPage: 1, maxPage: 3 };

    renderMenuWithPropsAndContext(props, setSearchWordMock);

    const prevButton = screen.getByText("< 1");
    const nextButton = screen.getByText("3 >");

    userEvent.click(prevButton);
    expect(setPageMock).toHaveBeenCalledWith(1);

    userEvent.click(nextButton);
    expect(setPageMock).toHaveBeenCalledWith(3);
  });
});
