import React, { useContext, useEffect, useState } from "react";

import { IoSearchSharp } from "react-icons/io5";
import SearchContext from "../../store/SearchContext";
import styled from "styled-components";

const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  max-width: 250px;
  border: 1px solid #ffffffb8;

  @media (max-width: 768px) {
    max-width: 200px;
    margin: 3px;
  }
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
  const { setSearchWord } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");

  // Debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchWord(inputValue);
    }, 500);

    return () => clearTimeout(timerId);
  }, [inputValue, setSearchWord]);

  return (
    <SearchBoxContainer>
      <Input
        type="text"
        placeholder="Search People..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <IoSearchSharp />
    </SearchBoxContainer>
  );
};

export default SearchBox;
