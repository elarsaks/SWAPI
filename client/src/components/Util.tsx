import { MdError } from "react-icons/md";
import React from "react";
import styled from "styled-components";

const UtilStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #000000b6;
  color: #e91e63;
  border: 1px solid #e91e63;
  padding: 20px;
  border-radius: 5px;
  margin: 5px;

  span {
    margin: 5px;
  }
`;

interface UtilProps {
  message: string;
  type: "error" | "info" | "warning";
}

const Error: React.FC<UtilProps> = ({ message }) => {
  return (
    <UtilStyles>
      <MdError size="20px" />
      <span>Error: {message}</span>
    </UtilStyles>
  );
};

export default Error;
