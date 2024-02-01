import React, { useEffect, useState } from "react";

import Feedback from "./util/Feedback";
import LoadingCube from "./util/LoadingCube";
import { getCharacterImage } from "api/characters"; // Ensure this path is correct
import styled from "styled-components";

const returnEasing = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

const ImageContainer = styled.div`
  background-color: #0000006d;
  width: 100%;
`;

const Image = styled.div<{ $image: string }>`
  opacity: 1;
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

interface CharacterImageProps {
  name: string;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ name }) => {
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

  return (
    <ImageContainer>
      {isLoading && <LoadingCube text="Loading Image" height="200px" />}
      {imageError ? (
        <Feedback
          type="error"
          message={imageError || "Failed to load image!"}
        />
      ) : (
        <Image $image={image} />
      )}
    </ImageContainer>
  );
};

export default CharacterImage;
