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
  max-width: 500px;
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

interface CharacterModalProps {
  onClose: () => void;
  character: Character;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  onClose,
  character,
}) => {
  console.log(character);
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CharacterContainer>
          <CharacterImageContainer>
            <CharacterImage name={character.name} />
          </CharacterImageContainer>

          <Details url={character.url} isVisible={true} setTitle={() => {}} />
        </CharacterContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default CharacterModal;
