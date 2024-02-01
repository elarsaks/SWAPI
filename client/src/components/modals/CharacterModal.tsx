import CharacterImage from "components/CharacterImage";
import { ModalBackground } from "./ModalBackground";
import React from "react";
import styled from "styled-components";

interface ModalContentProps {
  $borderColor: string;
}

export const ModalContent = styled.div<ModalContentProps>`
  border: ${(props) => props.$borderColor};
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  overflow: hidden;
`;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #2a7496;
`;

interface CharacterImageContainerProps {
  $borderColor: string;
}

const CharacterImageContainer = styled.div<CharacterImageContainerProps>`
  display: flex;
  width: 99%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  border: 1px solid ${(props) => props.$borderColor};
`;

interface DetailsContainerProps {
  $backgroundColor: string;
}

const DetailsContainer = styled.div<DetailsContainerProps>`
  background-color: ${(props) => props.$backgroundColor};
  padding: 5px;
`;

const renderObjectDetails = (obj: any): JSX.Element => {
  const elements: JSX.Element[] = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newPrefix = key;

    if (Array.isArray(value)) {
      // Array, create list items
      const listItems = value.map((item, index) => (
        <div key={`${newPrefix}-${index}`}>{item.toString()}</div>
      ));

      elements.push(
        <div key={newPrefix}>{newPrefix}:</div>,
        <div key={`${newPrefix}-list`}>{listItems}</div>
      );
    } else {
      // Direct value, push directly to elements
      elements.push(<div key={newPrefix}>{`${newPrefix}: ${value}`}</div>);
    }
  });

  return <>{elements}</>;
};

// Assuming the Character type is defined elsewhere
interface CharacterModalProps {
  onClose: () => void;
  character: any; // Ideally, you should replace 'any' with the actual type for character
}
const CharacterModal: React.FC<CharacterModalProps> = ({
  onClose,
  character,
}) => {
  console.log(character);

  const borderColor = character["hair_color"]
    ? character["hair_color"]
    : "#fff";

  let backgroundColor = character["skin_color"]
    ? character["skin_color"].split(", ")[0]
    : "#2a7496";

  if (backgroundColor === "light") backgroundColor = "white";

  const imageBorderColor = character["eye_color"]
    ? character["eye_color"]
    : "white";

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent
        $borderColor={borderColor}
        onClick={(e) => e.stopPropagation()}
      >
        <CharacterContainer>
          <CharacterImageContainer $borderColor={imageBorderColor}>
            <CharacterImage name={character.name} />
          </CharacterImageContainer>

          <DetailsContainer $backgroundColor={backgroundColor}>
            {renderObjectDetails(character)}
          </DetailsContainer>
        </CharacterContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default CharacterModal;
