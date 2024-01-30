import React from "react";

interface ContentContextType {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

// TODO: Default value
const defaultValue: ContentContextType = {
  setSearchWord: () => {},
};

const ContentContext = React.createContext<ContentContextType>(defaultValue);

export default ContentContext;
