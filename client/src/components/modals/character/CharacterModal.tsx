import CharacterImage from "components/CharacterImage";
import Details from "./Details";
import { ModalBackground } from "../ModalBackground";
import React from "react";
import styled from "styled-components";

export const ModalContent = styled.div`
  position: absolute;
  top: 10vh;
  border: 1px solid #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  overflow-x: hidden;
  overflow-y: scroll;
  max-width: 700px;
  max-height: 90vh;
  min-width: 320px;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px; /* Scrollbar width */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track background color */
    border-radius: 10px; /* Match ModalContent border-radius */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Thumb color */
    border-radius: 10px; /* Rounded corners for the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color when hovering over the thumb */
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1; /* Thumb and track color */
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
  height: 450px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  border: 1px solid #ffffff;
`;

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

          <Details url={character.url} isVisible={true} />
        </CharacterContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default CharacterModal;
