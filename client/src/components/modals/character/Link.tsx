import React, { useEffect, useRef, useState } from "react";

import Details from "./Details";
import styled from "styled-components";

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

interface LinkStyleProps {
  $backgroundColor: string;
}

const LinkStyle = styled.div<LinkStyleProps>`
  border: 1px solid;
  background-color: ${(props) => props.$backgroundColor};
`;

interface CharacterModalProps {
  url: string;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ url }) => {
  const [show, setShow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setBackgroundColor(generateRandomColor());
  }, []);

  useEffect(() => {
    // Copying parentRef.current to a local variable inside the effect
    const currentParent = parentRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });

    if (currentParent) {
      observer.observe(currentParent);
    }

    // Use currentParent in the cleanup function
    return () => {
      if (currentParent) {
        observer.unobserve(currentParent);
      }
    };

    // Since this effect does not depend on any props or state variables that change,
    // it's safe to leave the dependency array empty.
  }, []);

  return (
    <LinkStyle $backgroundColor={backgroundColor} ref={parentRef}>
      {url && <button onClick={() => setShow(!show)}>{title}</button>}
      {show && <Details url={url} isVisible={isVisible} setTitle={setTitle} />}
    </LinkStyle>
  );
};

export default CharacterModal;
