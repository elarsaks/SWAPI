import React from "react";
import styled from "styled-components";

export const LinkStyle = styled.div``;

interface CharacterModalProps {
  url: string;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ url }) => {
  return <LinkStyle></LinkStyle>;
};

export default CharacterModal;
