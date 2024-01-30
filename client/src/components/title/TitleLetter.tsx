import { useEffect, useState } from "react";

import styled from "styled-components";

const TitleLetterStyles = styled.div<{
  direction: number;
  $isClicked: boolean;
}>`
  color: ${(props) =>
    props.$isClicked ? "red" : props.direction < 0 ? "yellow" : "white"};
  transform: translateY(${(props) => props.direction}px);
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 1s;
  cursor: pointer;

  &:hover {
    transition: color 100ms;
    color: red;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.2rem;
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
`;

interface TitleLetterProps {
  letter: string;
  direction: number;
  onClick?: () => void;
}

const TitleLetter = (props: TitleLetterProps) => {
  const [clicked, setClicked] = useState(false);

  // Reset clicked state when props.direction changes
  useEffect(() => {
    setClicked(false);
  }, [props.direction]);

  const handleClick = () => {
    setClicked(true);
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <TitleLetterStyles
      direction={props.direction}
      $isClicked={clicked}
      onClick={handleClick}
    >
      {props.letter}
    </TitleLetterStyles>
  );
};

export default TitleLetter;
