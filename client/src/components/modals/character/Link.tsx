import React, { useState } from "react";

import Details from "./Details";
import styled from "styled-components";

export const LinkStyle = styled.div``;

interface CharacterModalProps {
  url: string;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ url }) => {
  const [show, setShow] = useState(false);

  return (
    <LinkStyle>
      {url && <button onClick={() => setShow(!show)}>Show more</button>}
      {show && <Details url={url} />}
    </LinkStyle>
  );
};

export default CharacterModal;
