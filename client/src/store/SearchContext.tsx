import React from "react";

interface SearchContextType {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

const defaultValue: SearchContextType = {
  setError: () => {},
  setInfo: () => {},
  setLoading: () => {},
  setPage: () => {},
  setPeople: () => {},
};

const SearchContext = React.createContext<SearchContextType>(defaultValue);

export default SearchContext;
