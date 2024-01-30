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

const Menu = () => {
  return (
    <MenuStyles>
      <button>{"<"}</button>

      <SearchBox />
      <button>{">"}</button>
    </MenuStyles>
  );
};

export default Menu;
