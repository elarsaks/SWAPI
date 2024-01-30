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
  }
`;

interface MenuProps {
  setPage: (page: number) => void;
  page: number;
}

// TODO: Bring search and pagination here

const Menu: React.FC<MenuProps> = ({ setPage, page }) => {
  return (
    <MenuStyles>
      <button onClick={() => setPage(page - 1)}>{"<"}</button>
      <SearchBox />
      <button onClick={() => setPage(page + 1)}>{">"}</button>{" "}
      {/* Increment page */}
    </MenuStyles>
  );
};

export default Menu;
