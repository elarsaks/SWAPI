import React, { useEffect, useState } from "react";

import Details from "./Details";
import styled from "styled-components";

const generateRandomColor = () => {
  // Generates a random color in hex format
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

interface LinkStyleProps {
  $backgroundColor: string;
}

// Modify LinkStyle to accept a backgroundColor prop
const LinkStyle = styled.div<LinkStyleProps>`
  border: 1px solid;
  background-color: ${(props) =>
    props.$backgroundColor}; // Use the backgroundColor prop for styling
`;

interface CharacterModalProps {
  url: string;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ url }) => {
  const [show, setShow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    // Set a random background color when the component mounts
    setBackgroundColor(generateRandomColor());
  }, []);

  return (
    <LinkStyle $backgroundColor={backgroundColor}>
      {url && <button onClick={() => setShow(!show)}>Show more</button>}
      {show && <Details url={url} />}
    </LinkStyle>
  );
};

export default CharacterModal;
