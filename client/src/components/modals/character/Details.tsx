import React, { useEffect, useState } from "react";

import NesteDetails from "components/modals/character/Details";
import styled from "styled-components";

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

interface DetailsContainerProps {
  $backgroundColor: string;
}

const DetailsContainer = styled.div<DetailsContainerProps>`
  background-color: ${(props) => props.$backgroundColor};
  padding: 5px;
  max-width: 500px;
`;

interface CharacterModalProps {
  url: string;
  isVisible: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const Details: React.FC<CharacterModalProps> = ({
  url,
  isVisible,
  setTitle,
}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    setBackgroundColor(generateRandomColor());
  }, []);

  useEffect(() => {
    if (isVisible) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          setTitle(jsonData.title);
          setData(jsonData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [url, isVisible]);

  return (
    <DetailsContainer $backgroundColor={backgroundColor}>
      {Object.keys(data || {}).map((key) => {
        const value = data[key];

        return Array.isArray(value) ? (
          <div key={key}>
            <b>{key}</b>:
            {value.map((item, index) => (
              <NesteDetails
                key={`${key}-${index}`}
                url={item}
                isVisible={true}
                setTitle={() => {}}
              />
            ))}
          </div>
        ) : (
          <div key={key}>
            <b>{key} </b>: {value}
          </div>
        );
      })}
    </DetailsContainer>
  );
};

export default Details;
