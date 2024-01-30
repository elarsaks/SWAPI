import React, { useContext, useEffect, useState } from "react";

import { IoSearchSharp } from "react-icons/io5";
import SearchContext from "../../store/SearchContext";
import styled from "styled-components";

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

const SearchBox: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);

  const { setInfo, setPeople, setLoading, setError } =
    useContext(SearchContext);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchWord.length > 0) {
        setDebouncedSearchWord(searchWord);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  useEffect(() => {
    if (!debouncedSearchWord.trim()) return;

    setLoading(true);
    fetch(`https://swapi.dev/api/people/?search=${debouncedSearchWord}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
      })
      .then((data) => {
        if (data.results.length === 0) {
          setInfo("Searching for '" + searchWord + "' did not find anything");
          setPeople([]);
        } else {
          setPeople(data.results);
          setInfo("");
        }

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
      <IoSearchSharp />
    </SearchBoxContainer>
  );
};

export default SearchBox;
