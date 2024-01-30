import React from "react";

interface SearchContextType {
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const defaultValue: SearchContextType = {
  setPeople: () => {},
  setLoading: () => {},
  setError: () => {},
  setPage: () => {},
};

const SearchContext = React.createContext<SearchContextType>(defaultValue);

export default SearchContext;
