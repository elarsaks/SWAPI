import CharacterImage from "components/CharacterImage";
import { ModalBackground } from "../ModalBackground";
import React from "react";
import styled from "styled-components";

export const ModalContent = styled.div`
  border: 1px solid #ffffff;
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

const CharacterImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  border: 1px solid #ffffff;
`;

const DetailsContainer = styled.div`
  background-color: #f0f0f0;
  padding: 5px;
`;

const renderObjectDetails = (obj: any): JSX.Element => {
  const elements: JSX.Element[] = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newPrefix = key;

    if (Array.isArray(value)) {
      const listItems = value.map((item, index) => (
        <div key={`${newPrefix}-${index}`}>{item.toString()}</div>
      ));

      // Arrays
      elements.push(
        <div key={newPrefix}>
          <b>{newPrefix}</b>:
        </div>,

        // TODO: Insert Link itme here
        <div key={`${newPrefix}-list`}>{listItems}</div>
      );
    } else {
      // Single Elements
      elements.push(
        <div key={newPrefix}>
          <b>{newPrefix} </b>: {value}
        </div>
      );
    }
  });

  return <>{elements}</>;
};

interface CharacterModalProps {
  onClose: () => void;
  character: Character;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  onClose,
  character,
}) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CharacterContainer>
          <CharacterImageContainer>
            <CharacterImage name={character.name} />
          </CharacterImageContainer>

          <DetailsContainer>{renderObjectDetails(character)}</DetailsContainer>
        </CharacterContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default CharacterModal;
