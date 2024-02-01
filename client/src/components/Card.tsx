import React, { useEffect, useRef, useState } from "react";

import LoadingCube from "./util/LoadingCube";
import Util from "./util/Feedback";
import { getCharacterImage } from "api/characters";
import styled from "styled-components";

const returnEasing = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

const CardWrap = styled.div<{ x: number; y: number }>`
  margin: 10px;
  transform: perspective(800px) rotateY(${(props) => props.x}deg)
    rotateX(${(props) => props.y}deg);
  transform-style: preserve-3d;
  transition: transform 0.5s ${returnEasing};
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
  transition: box-shadow 0.5s ${returnEasing};
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
  transition: opacity 0.5s ${returnEasing};
  opacity: 1;
  ${Card}:hover & {
    opacity: 0;
  }
`;

const InnerBorder = styled.div`
  position: absolute;
  z-index: 1;
  height: 90%;
  width: 90%;
  margin: 5%;
  border-radius: 5px;
  opacity: 1;
  transition: opacity 0.5s ${returnEasing};

  ${Card}:hover & {
    opacity: 1;
    border: 1px solid #0bcee8b8;
  }
`;

const CardBg = styled.div<{ $image: string }>`
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.$image});
  transition: 1s ${returnEasing}, opacity 5s 1s ${returnEasing};
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getCharacterImage(name)
      .then((imgUrl) => {
        setImage(imgUrl);
        setImageError("");
      })
      .catch((error) => setImageError(error.message))
      .finally(() => setIsLoading(false));
  }, [name]);

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
      onClick={openCharacter}
    >
      <Card>
        {isLoading && <LoadingCube height="200px" text="Loading image" />}
        <Overlay />

        {imageError ? (
          <Util type="error" message={imageError || "Failed to load image!"} />
        ) : (
          <>
            <InnerBorder />
            <CardBg $image={image} />
          </>
        )}
        <CardTitle>
          <h3>{name}</h3>
        </CardTitle>
      </Card>
    </CardWrap>
  );
};

export default CardComponent;
