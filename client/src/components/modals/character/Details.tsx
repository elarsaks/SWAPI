import React, { useEffect, useState } from "react";

import LoadingCube from "components/util/LoadingCube"; // Assuming this is a valid import
import styled from "styled-components";

const DetailsContainer = styled.div`
  background-color: #f0f0f0;
  padding: 5px;
`;

interface CharacterModalProps {
  url: string;
}

const Details: React.FC<CharacterModalProps> = ({ url }) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data asynchronously and update component state
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-fetch data if url changes

  const renderObjectDetails = (obj: any): JSX.Element => {
    const elements: JSX.Element[] = [];

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (Array.isArray(value)) {
        const listItems = value.map((item, index) => (
          <div key={`${key}-${index}`}>{item.toString()}</div>
        ));

        elements.push(
          <div key={key}>
            <b>{key}</b>:
          </div>,
          <div key={`${key}-list`}>{listItems}</div>
        );
      } else {
        elements.push(
          <div key={key}>
            <b>{key} </b>: {value.toString()}
          </div>
        );
      }
    });

    return <>{elements}</>;
  };

  return (
    <DetailsContainer>
      {isLoading ? (
        <LoadingCube text="Loading..." height="50px" />
      ) : (
        renderObjectDetails(data)
      )}
    </DetailsContainer>
  );
};

export default Details;
