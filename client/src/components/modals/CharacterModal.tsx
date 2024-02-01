import { ModalBackground, ModalContent } from "./Modal";

import CharacterImage from "components/CharacterImage";
import React from "react";
import styled from "styled-components";

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const CharacterImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Detail = styled.div`
  margin-bottom: 8px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  /* Styling for list items */
`;

// Assuming the Character type is defined elsewhere
interface CharacterModalProps {
  onClose: () => void;
  character: any; // Ideally, you should replace 'any' with the actual type for character
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  onClose,
  character,
}) => {
  // Placeholder for a function that could fetch and return the title of a film based on its URL
  // In a real app, you might fetch the film title from the API and store it in the state
  const getFilmTitle = async (url: string) => {
    // Fetch logic here
    return url; // Placeholder return
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CharacterContainer>
          <CharacterImageContainer>
            <CharacterImage name={character.name} />
          </CharacterImageContainer>

          <Info>
            <Detail>Birth Year: {character.birth_year}</Detail>
            <Detail>Eye Color: {character.eye_color}</Detail>
            <Detail>Gender: {character.gender}</Detail>
            <Detail>Hair Color: {character.hair_color}</Detail>
            <Detail>Height: {character.height}</Detail>
            <Detail>Mass: {character.mass}</Detail>
            <Detail>Skin Color: {character.skin_color}</Detail>
            <Detail>
              Films:
              <List>
                {character.films.map((film: string, index: number) => (
                  <ListItem key={index}>
                    {/* Here you could use getFilmTitle(film) to fetch and display the film title */}
                    {film}
                  </ListItem>
                ))}
              </List>
            </Detail>
            {/* Similar mapping for species and starships if needed */}
          </Info>
        </CharacterContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default CharacterModal;
