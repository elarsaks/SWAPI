import { ModalBackground, ModalContent } from "./Modal";
import React, { useState } from "react";

import styled from "styled-components";

const Character = styled.div``;

interface CharacterModalProps {
  onClose: () => void;
  character: Character;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ onClose }) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Character>
          <h1>Modal</h1>
        </Character>
      </ModalContent>
    </ModalBackground>
  );
};

export default CharacterModal;
