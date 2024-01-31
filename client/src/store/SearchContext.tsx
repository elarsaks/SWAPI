import React from "react";

interface SearchContextType {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue: SearchContextType = {
  setSearchWord: () => {},
};

const SearchContext = React.createContext<SearchContextType>(defaultValue);

export default SearchContext;
