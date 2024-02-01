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
  border: 1px solid white;
`;

const ListContainer = styled.div`
  background-color: #00000077;
  color: black;
  padding: 5px;
  border: 1px white solid;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;

  h3 {
    margin: 2px;
  }
`;

const OpenButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
  font-size: 1.2rem;
  color: #ffffff;

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }
`;

interface CharacterModalProps {
  url: string;
  isVisible: boolean;
}
const Details: React.FC<CharacterModalProps> = ({ url, isVisible }) => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(isVisible);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setBackgroundColor(generateRandomColor());
  }, []);

  useEffect(() => {
    if (true) {
      //! if(true) Is Magical bug!
      // Removing If statement, stops data from loading.
      // Setting it FALSE or TRUE, stops children from fetching data.
      // Setting it to "isVisible" props created infinite loop earlier, now it just stops children from loading
      // TODO: Come back to this
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          if (jsonData.title) setTitle(jsonData.title);
          if (jsonData.name) setTitle(jsonData.name);

          //* Use This console log, to make sure that it is not in inifinite loop.
          // console.log(jsonData.title);

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
      <OpenButton onClick={() => setIsOpen(!isOpen)}>
        {isLoading ? "Loading ..." : title}
      </OpenButton>

      {isOpen && (
        <div>
          {" "}
          {Object.keys(data || {}).map((key) => {
            const value = data[key];
            return Array.isArray(value) ? (
              <ListContainer key={key}>
                <h3>{key}</h3>
                {value.map((item, index) => {
                  const detailKey = `${key}-${index}`;
                  return (
                    <div key={detailKey}>
                      <NesteDetails url={item} isVisible={false} />
                    </div>
                  );
                })}
              </ListContainer>
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
