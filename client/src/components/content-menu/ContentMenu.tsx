import React, { useContext, useEffect, useState } from "react";

import { IoSearchSharp } from "react-icons/io5";
import SearchContext from "context/search/SearchContext";
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

const MenuStyles = styled.div`
  display: flex;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 3px;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);

  button {
    color: white;
    font-size: 2rem;
    border: 1px solid white;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;

    &:hover {
      background-color: white;
      color: black;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      margin: 3px;
    }
  }

  @media (max-width: 1100px) {
    padding: 0;
    width: 96vw;
    margin-left: 2vw;
    margin-right: 2vw;
  }
`;

interface MenuProps {
  setPage: (page: number) => void;
  page: number;
  minPage: number;
  maxPage: number;
}

const Menu: React.FC<MenuProps> = ({ setPage, page, minPage, maxPage }) => {
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
    <MenuStyles>
      <button onClick={() => setPage(page - 1)} disabled={page <= minPage}>
        {`< ${page - 1}`}
      </button>

      <SearchBoxContainer>
        <Input
          type="text"
          placeholder="Search Character..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IoSearchSharp />
      </SearchBoxContainer>

      <button onClick={() => setPage(page + 1)} disabled={page >= maxPage}>
        {`${page + 1} >`}
      </button>
    </MenuStyles>
  );
};

export default Menu;
