import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import React from "react";
import styled from "styled-components";

interface FeedBackStyleProps {
  $type: "error" | "info" | "warning";
}

const FeedBackStyles = styled.div<FeedBackStyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #000000b6;
  color: ${(props) => {
    switch (props.$type) {
      case "error":
        return "#e91e63";
      case "info":
        return "#06b9fa";
      case "warning":
        return "#ff9800";
      default:
        return "#06b9fa";
    }
  }};
  border: 1px solid
    ${(props) => {
      switch (props.$type) {
        case "error":
          return "#e91e63";
        case "info":
          return "#06b9fa";
        case "warning":
          return "#ff9800";
        default:
          return "#06b9fa";
      }
    }};
  padding: 20px;
  border-radius: 5px;
  margin: 5px;

  span {
    margin: 5px;
  }
`;

interface FeedBackProps {
  message: string;
  type: "error" | "info" | "warning";
}

const Feedback: React.FC<FeedBackProps> = ({ message, type }) => {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <MdError size="40px" data-testid="md-error-icon" />;
      case "warning":
        return (
          <IoWarningOutline size="40px" data-testid="io-warning-outline-icon" />
        );
      case "info":
        return (
          <IoMdInformationCircleOutline
            size="40px"
            data-testid="io-md-information-circle-outline-icon"
          />
        );
      default:
        return null;
    }
  };

  return (
    <FeedBackStyles $type={type}>
      {getIcon()}
      <span>
        {type.toUpperCase()}: {message}
      </span>
    </FeedBackStyles>
  );
};

export default Feedback;
