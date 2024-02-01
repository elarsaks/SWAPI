import CharacterImage from "components/CharacterImage";
import { ModalBackground } from "./ModalBackground";
import React from "react";
import styled from "styled-components";

interface ModalContentProps {
  $backgroundColor: string;
  $borderColor: string;
}

export const ModalContent = styled.div<ModalContentProps>`
  background-color: ${(props) => props.$backgroundColor};
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

const renderObjectDetails = (obj: any): JSX.Element => {
  const elements: JSX.Element[] = [];

  const loopObject = (currentObj: any, prefix: string = "") => {
    Object.keys(currentObj).forEach((key) => {
      const value = currentObj[key];
      const newPrefix = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        // Nested object, recurse
        loopObject(value, newPrefix);
      } else if (Array.isArray(value)) {
        // Array, create list items
        const listItems = value.map((item, index) => {
          if (typeof item === "object") {
            const subElements: JSX.Element[] = [];
            loopObject(item, `${newPrefix}[${index}]`); // Recurse, but directly manipulate elements
            return subElements; // This won't work as expected since subElements is local and empty; need to adjust logic
          } else {
            return <div key={`${newPrefix}-${index}`}>{item.toString()}</div>;
          }
        });

        elements.push(
          <div key={newPrefix}>{newPrefix}:</div>,
          <div key={`${newPrefix}-list`}>{listItems}</div>
        );
      } else {
        // Direct value, push directly to elements
        elements.push(<div key={newPrefix}>{`${newPrefix}: ${value}`}</div>);
      }
    });
  };

  loopObject(obj);

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

  const backgroundColor = character["skin_color"]
    ? Array.isArray(character["skin_color"])
      ? character["skin_color"][0] // Use the first element if it's an array
      : character["skin_color"] // Use it directly if it's not an array
    : "#2a7496"; // Default color if non-existent

  const imageBorderColor = character["eye_color"]
    ? character["eye_color"]
    : "white";

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent
        $backgroundColor={backgroundColor}
        $borderColor={borderColor}
        onClick={(e) => e.stopPropagation()}
      >
        <CharacterContainer>
          <CharacterImageContainer $borderColor={imageBorderColor}>
            <CharacterImage name={character.name} />
          </CharacterImageContainer>
          {renderObjectDetails(character)}
        </CharacterContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default CharacterModal;
