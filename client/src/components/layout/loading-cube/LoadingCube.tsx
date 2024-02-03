import styled, { keyframes } from "styled-components";

import React from "react";

const rotateCube = keyframes`
  from {
    transform: rotateX(0deg) rotateY(360deg) rotateZ(360deg);
  }
  to {
    transform: rotateX(360deg) rotateY(0deg) rotateZ(0deg);
  }
`;

const Cube = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  animation: ${rotateCube} 5s infinite linear;
`;

const Face = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgba(0, 255, 255, 0.2);
  border: 1px solid aqua;
`;

const Front = styled(Face)`
  transform: rotateY(0deg) translateZ(50px);
`;
const Back = styled(Face)`
  transform: rotateY(180deg) translateZ(50px);
`;
const Right = styled(Face)`
  transform: rotateY(90deg) translateZ(50px);
`;
const Left = styled(Face)`
  transform: rotateY(-90deg) translateZ(50px);
`;
const Top = styled(Face)`
  transform: rotateX(90deg) translateZ(50px);
`;
const Bottom = styled(Face)`
  transform: rotateX(-90deg) translateZ(50px);
`;

const LoadingCube: React.FC<{ height: string }> = ({ height }) => {
  return (
    <div
      style={{
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Cube>
        <Front />
        <Back />
        <Right />
        <Left />
        <Top />
        <Bottom />
      </Cube>
    </div>
  );
};

export default LoadingCube;
