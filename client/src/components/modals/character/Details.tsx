import React, { useEffect, useRef, useState } from "react";

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
  // setTitle: React.Dispatch<React.SetStateAction<string>>;
}
const Details: React.FC<CharacterModalProps> = ({
  url,
  isVisible,
  // setTitle,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

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
          if (jsonData.title) setTitle(jsonData.title);
          if (jsonData.name) setTitle(jsonData.name);
          console.log(jsonData.title);

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
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>

      {isOpen && (
        <div>
          {" "}
          {Object.keys(data || {}).map((key) => {
            const value = data[key];
            return Array.isArray(value) ? (
              <div key={key}>
                <b>{key}</b>:
                {value.map((item, index) => {
                  const detailKey = `${key}-${index}`;
                  return (
                    <div key={detailKey}>
                      <NesteDetails url={item} isVisible={true} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div key={key}>
                <b>{key}</b>: {value}
              </div>
            );
          })}
        </div>
      )}
    </DetailsContainer>
  );
};

export default Details;
