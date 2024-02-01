import React, { useEffect, useState } from "react";

import Link from "./Link"; // Assuming this is a valid import
import LoadingCube from "components/util/LoadingCube";
import styled from "styled-components";

const DetailsContainer = styled.div`
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
    <DetailsContainer>
      {isLoading ? (
        <h3>Loading ... </h3>
      ) : (
        <>
          {Object.keys(data || {}).map((key) => {
            const value = data[key];

            return Array.isArray(value) ? (
              <div key={key}>
                <b>{key}</b>:
                {value.map((item, index) => (
                  <Link key={`${key}-${index}`} url={item} />
                ))}
              </div>
            ) : (
              <div key={key}>
                <b>{key} </b>: {value}
              </div>
            );
          })}
        </>
      )}
    </DetailsContainer>
  );
};

export default Details;
