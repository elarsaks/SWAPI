import React, { useContext, useEffect, useState } from "react";

import SearchContext from "../../store/SearchContext";
import styled from "styled-components";

// Styled components remain the same
const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  width: 250px;
  border: 1px solid #ffffffb8;
`;

const Input = styled.input`
  flex: 1;
  background-color: #ffffff;
  border: 1px solid #001113b8;
  border-radius: 5px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

const Icon = styled.svg`
  width: 30px;
  height: 20px;
  margin-left: -30px;
`;

const SearchBox: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);

  // Use context to get functions for updating app state
  const { setPeople, setLoading, setError } = useContext(SearchContext);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
    }, 300); // Waits 300ms after the user stops typing to set the search word

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  useEffect(() => {
    if (!debouncedSearchWord.trim()) return; // Avoid searching for empty or whitespace strings

    setLoading(true);
    fetch(`https://swapi.dev/api/people/?search=${debouncedSearchWord}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
      })
      .then((data) => {
        setPeople(data.results); // Assuming setSearchResults expects the format data.results provides
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [debouncedSearchWord, setError, setLoading, setPeople]);

  return (
    <SearchBoxContainer>
      <Input
        type="text"
        placeholder="Search People..."
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <Icon viewBox="0 0 20 20">
        <path d="M12.905 14.32l5.387 5.387-1.587 1.587-5.387-5.387a8 8 0 111.587-1.587zM10 16a6 6 0 100-12 6 6 0 000 12z" />
      </Icon>
    </SearchBoxContainer>
  );
};

export default SearchBox;
