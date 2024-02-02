import React, { useEffect, useState } from "react";

import Feedback from "../layout/Feedback";
import styled from "styled-components";

const ImageContainer = styled.div<{ $image?: string }>`
  background-color: #0000006d;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.$image});
  transition: opacity 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

interface CharacterImageProps {
  name: string;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ name }) => {
  const [imageError, setImageError] = useState<string | null>(null);
  const [image, setImage] = useState<string>("");

  const imageUrl = `https://starwars-images-api.s3.eu-north-1.amazonaws.com/${encodeURIComponent(
    name
  ).replace(/%20/g, "+")}.jpg`;

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(imageUrl);
      setImageError(null);
    };
    img.onerror = () => {
      setImageError("Failed to load image!");
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [name, imageUrl]);

  return (
    <ImageContainer $image={imageError ? undefined : image}>
      {imageError && <Feedback type="error" message={imageError} />}
    </ImageContainer>
  );
};

export default CharacterImage;
