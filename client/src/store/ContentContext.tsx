import React from "react";

interface ContentContextType {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

// TODO: Rename this to serach context
const defaultValue: ContentContextType = {
  setSearchWord: () => {},
};

const ContentContext = React.createContext<ContentContextType>(defaultValue);

export default ContentContext;
