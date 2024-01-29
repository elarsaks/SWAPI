import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

// Adjusted styled component to use props for conditional CSS, not as a DOM attribute
const HeaderLetterStyles = styled.div<{ direction: number, $isClicked: boolean }>`
  ${(props) => css`
    color: ${props.$isClicked ? 'red' : (props.direction < 0 ? 'yellow' : 'white')};
    transform: translateY(${props.direction}px);
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
    transition: all 1s;
    cursor: pointer;
  `}

  &:hover {
    transition: all 1s;
    transition: color 100ms;
    color: red;
  }

  // TODO: Mobile
`;

interface HeaderLetterProps {
  letter: string;
  direction: number;
  onClick?: () => void;
}

const HeaderLetter = (props: HeaderLetterProps) => {
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
    <HeaderLetterStyles
      direction={props.direction}
      $isClicked={clicked}
      onClick={handleClick}>
      {props.letter}
    </HeaderLetterStyles>
  );
};

export default HeaderLetter;
