import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

const hoverEasing = "cubic-bezier(0.23, 1, 0.32, 1)";
const returnEasing = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

const Title = styled.h1`
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5d4037;
  text-align: center;
`;

const Container = styled.div`
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CardWrap = styled.div<{ x: number; y: number }>`
  margin: 10px;
  transform: perspective(800px) rotateY(${(props) => props.x}deg) rotateX(${(props) => props.y}deg);
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    .card-info {
      transform: translateY(0);
    }
    .card-info p {
      opacity: 1;
    }
    .card-info,
    .card-info p {
      transition: 0.6s ${hoverEasing};
    }
    .card-info:after {
      transition: 5s ${hoverEasing};
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg {
      transition: 0.6s ${hoverEasing}, opacity 5s ${hoverEasing};
      opacity: 0.8;
    }
    .card {
      transition: 0.6s ${hoverEasing}, box-shadow 2s ${hoverEasing};
      box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px;
    }
  }
`;

const Card = styled.div`
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s ${returnEasing};
`;

const CardBg = styled.div<{ image: string }>`
  opacity: 0.5;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.image});
  transition: 1s ${returnEasing}, opacity 5s 1s ${returnEasing};
  pointer-events: none;
`;

const CardInfo = styled.div`
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s ${returnEasing};
  }
`;

const CardInfoHeader = styled.h1`
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
`;

const CardInfoContent = styled.p``;

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
            let { width, height } = cardRef.current.getBoundingClientRect();
            let xVal = (e.pageX - (window.innerWidth - width) / 2 - e.currentTarget.offsetLeft) / width;
            let yVal = (e.pageY - (window.innerHeight - height) / 2 - e.currentTarget.offsetTop) / height;
            setX(xVal * 20);
            setY(yVal * -20);
        }
    };

    const handleMouseEnter = () => {
        if (cardRef.current) {
            cardRef.current.style.transition = "none";
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transition = `all 0.5s ${returnEasing}`;
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
                <CardInfo>
                    <CardInfoHeader>{header}</CardInfoHeader>
                    <CardInfoContent>{content}</CardInfoContent>
                </CardInfo>
            </Card>
        </CardWrap>
    );
};

export default CardComponent;