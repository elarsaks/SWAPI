import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

const returnEasing = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

const CardWrap = styled.div<{ x: number; y: number }>`
  margin: 10px;
  transform: perspective(800px) rotateY(${(props) => props.x}deg) rotateX(${(props) => props.y}deg);
  transform-style: preserve-3d;
  transition: transform 0.5s ${returnEasing};
  cursor: pointer;
`;

const Card = styled.div`
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #00000081;
  overflow: hidden;
  box-shadow: 0px 0px 10px 5px #051012b8 ;
  border-radius: 10px;
  transition: box-shadow 0.5s ${returnEasing};
  border: 1px solid #ffffff;

  &:hover {
    border: 2px solid #0bcee8b8;
    box-shadow:  0px 0px 30px #10a1b4b8;
  }
`;

const InnerBorder = styled.div`
  position: relative;
  height: 90%;
  width: 90%;
  margin: 5%;
  border-radius: 5px;
  opacity: 0; 
  transition: opacity 0.5s ${returnEasing};

  ${Card}:hover & {
    opacity: 1; 
    border: 1px solid #0bcee8b8;
  }
`;

const CardBg = styled.div<{ image: string }>`
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.image});
  transition: 1s ${returnEasing}, opacity 5s 1s ${returnEasing};
  pointer-events: none;
`;

const CardTitle = styled.div`
  padding-left: 10px;
  position: absolute;
  color: #fff;
  bottom: 0;
  background-color: #000000c4;
  width: 100%;
  h1 {
    margin: 5px;
  }
`;

interface CardProps {
  dataImage: string;
  header: React.ReactNode;
  content: React.ReactNode;
}

const CardComponent: React.FC<CardProps> = ({ dataImage, header, content }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      // Mouse position relative to the card
      let xVal = ((e.clientX - left) / width - 0.5) * 2; // Center is 0, edges are -1 to 1
      let yVal = ((e.clientY - top) / height - 0.5) * -2; // Invert Y for a natural "lift" effect
      setX(xVal * 10); // Adjust for a subtle effect
      setY(yVal * 10);
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "none"; // Disable transition for immediate response
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = `transform 0.5s ${returnEasing}`;
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
    >
      <Card>
        <CardBg image={dataImage} />
        <InnerBorder />
        <CardTitle>
          <h1>{header}</h1>
        </CardTitle>
      </Card>
    </CardWrap>
  );
};

export default CardComponent;
