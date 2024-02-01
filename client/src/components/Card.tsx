import React, { useRef, useState } from "react";

import CharacterImage from "components/CharacterImage";
import styled from "styled-components";

const CardWrap = styled.div<{ x: number; y: number }>`
  margin: 10px;
  transform: perspective(800px) rotateY(${(props) => props.x}deg)
    rotateX(${(props) => props.y}deg);
  transform-style: preserve-3d;
  cursor: pointer;
`;

const Card = styled.div`
  position: relative;
  flex: 0 0 250px;
  width: 250px;
  height: 320px;
  background-color: #00000081;
  overflow: hidden;
  box-shadow: 0px 0px 10px 5px #051012b8;
  border-radius: 10px;
  border: 1px solid #ffffff;

  &:hover {
    border: 2px solid #0bcee8b8;
    box-shadow: 0px 0px 30px #10a1b4b8;
  }
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 1;
  ${Card}:hover & {
    opacity: 0;
  }
`;

const CardTitle = styled.div`
  position: absolute;
  color: #fff;
  bottom: 0;
  background-color: #000000c4;
  width: 100%;
  z-index: 0;
  text-align: center;

  h3 {
    margin-top: 0px;
  }
`;

interface CardProps {
  name: string;
  openCharacter: () => void;
}

const CardComponent: React.FC<CardProps> = ({ name, openCharacter }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, top, width, height } =
        cardRef.current.getBoundingClientRect();
      let xVal = ((e.clientX - left) / width - 0.5) * 2;
      let yVal = ((e.clientY - top) / height - 0.5) * -2;
      setX(xVal * 10);
      setY(yVal * 10);
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "none";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      setX(0);
      setY(0);
    }
  };

  return (
    <CardWrap
      x={x}
      y={y}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      onClick={openCharacter}
    >
      <Card>
        <Overlay />

        <CharacterImage name={name} />
        <CardTitle>
          <h3>{name}</h3>
        </CardTitle>
      </Card>
    </CardWrap>
  );
};

export default CardComponent;
