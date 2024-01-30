import React, { useContext, useEffect, useState } from "react";

import ContentContext from "../../store/ContentContext";
import { IoSearchSharp } from "react-icons/io5";
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
  const { setSearchWord } = useContext(ContentContext);
  const [inputValue, setInputValue] = useState("");

  // Debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchWord(inputValue);
    }, 500);

    return () => clearTimeout(timerId);
  }, [inputValue]);

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
