import React from "react";

interface ContentContextType {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

const defaultValue: ContentContextType = {
  setError: () => {},
  setInfo: () => {},
  setLoading: () => {},
  setPage: () => {},
  setPeople: () => {},
};

const ContentContext = React.createContext<ContentContextType>(defaultValue);

export default ContentContext;
