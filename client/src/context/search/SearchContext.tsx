import React from "react";

const defaultValue: SearchContextType = {
  setSearchWord: () => {},
};

const SearchContext = React.createContext<SearchContextType>(defaultValue);

export default SearchContext;
