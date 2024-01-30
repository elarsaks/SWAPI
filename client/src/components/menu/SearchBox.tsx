import React from "react";
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

const Icon = styled.svg`
  width: 30px;
  height: 20px;
  margin-left: -30px;
`;

const SearchBox: React.FC = () => {
  return (
    <SearchBoxContainer>
      <Input type="text" placeholder="Search People..." />
      <Icon viewBox="0 0 20 20">
        <path d="M12.905 14.32l5.387 5.387-1.587 1.587-5.387-5.387a8 8 0 111.587-1.587zM10 16a6 6 0 100-12 6 6 0 000 12z" />
      </Icon>
    </SearchBoxContainer>
  );
};

export default SearchBox;
