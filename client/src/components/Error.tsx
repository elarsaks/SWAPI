import { MdError } from "react-icons/md";
import React from "react";
import styled from "styled-components";

const ErrorStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #000000b6;
  color: #e91e63;
  border: 1px solid #e91e63;
  padding: 20px;
  border-radius: 5px;

  span {
    margin: 5px;
  }
`;

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <ErrorStyles>
      <MdError size="20px" />
      <span>Error: {message}</span>
    </ErrorStyles>
  );
};

export default Error;
