import React from "react";
import SearchBox from "./SearchBox";
import styled from "styled-components";

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
  }
`;

interface MenuProps {
  setPage: (page: number) => void;
  page: number;
  minPage: number;
  maxPage: number;
}

const Menu: React.FC<MenuProps> = ({ setPage, page, minPage, maxPage }) => {
  return (
    <MenuStyles>
      <button onClick={() => setPage(page - 1)} disabled={page <= minPage}>
        {`< ${page - 1}`}
      </button>
      <SearchBox />
      <div>
        <button onClick={() => setPage(page + 1)} disabled={page >= maxPage}>
          {`${page + 1} >`}
        </button>
      </div>
    </MenuStyles>
  );
};

export default Menu;
