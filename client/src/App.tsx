import {
  Card,
  Footer,
  LoadingCube,
  Menu,
  NavBar,
  Title,
  Util,
} from "components";
import React, { useEffect, useState } from "react";

import CharacterModal from "components/modals/character/CharacterModal";
import LoginModal from "components/modals/LoginModal";
import SearchContext from "store/SearchContext";
import { getCharacters } from "api/characters";
import styled from "styled-components";
import { useAuth } from "store/AuthContext";

const AppStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  background-color: #2a7496;
  min-height: 100vh;
  width: 100%;
`;

interface ContentProps {
  $isUtil?: boolean;
}

const Content = styled.div<ContentProps>`
  max-width: 1000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: ${(props) => (props.$isUtil ? "flex" : "grid")};
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  place-items: center;
  justify-content: center;
  min-height: 50vh;

  ${(props) =>
    props.$isUtil &&
    `
    align-items: center;
    flex-direction: column;
  `}

  @media (max-width: 1100px) {
    padding: 0;
    width: 96vw;
    margin-left: 2vw;
    margin-right: 2vw;
    padding-top: 5vh;
  }
`;

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [searchWord, setSearchWord] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const { isAuthenticated, setPostLoginAction } = useAuth();
  const [showCharacterModal, setShowCharacterModal] =
    useState<Character | null>(null);

  // Set page to 1 every time searchWord changes
  useEffect(() => {
    setPage(1);
  }, [searchWord]);

  // Fetch data when page or searchWord changes
  useEffect(() => {
    setLoading(true);
    setInfo("");
    setError("");

    getCharacters(searchWord, page)
      .then((data) => {
        setMaxPage(Math.ceil(data.count / 10));
        setCharacters(data.results);
        data.results.length === 0 ? setInfo("Nothing found!") : setInfo("");
        setLoading(false);
        setError("");
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page, searchWord]);

  useEffect(() => {
    if (!isAuthenticated && showCharacterModal) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [isAuthenticated, showCharacterModal]);

  const handleCharacterClick = (character: Character) => {
    if (isAuthenticated) {
      setShowCharacterModal(character);
    } else {
      setPostLoginAction(() => () => {
        setShowCharacterModal(character);
        setShowLoginModal(false);
      });
      setShowLoginModal(true);
    }
  };

  return (
    <SearchContext.Provider value={{ setSearchWord }}>
      <AppStyles>
        <NavBar />
        <Title text="STAR WARS" />
        <Menu minPage={1} setPage={setPage} page={page} maxPage={maxPage} />
        <Content $isUtil={loading || !!error || !!info}>
          {loading ? <LoadingCube height="400px" text="Loading ..." /> : null}
          {error ? <Util type="error" message={error} /> : null}
          {info ? <Util type="info" message={info} /> : null}
          {!loading &&
            !error &&
            characters.map((character) => (
              <Card
                key={character.url}
                name={character.name}
                openCharacter={() => handleCharacterClick(character)}
              />
            ))}
        </Content>
        {showCharacterModal && (
          <CharacterModal
            character={showCharacterModal}
            onClose={() => setShowCharacterModal(null)}
          />
        )}
        {showLoginModal && (
          <LoginModal
            message="You must login to continue!"
            onClose={() => setShowLoginModal(false)}
          />
        )}
        <Footer />
      </AppStyles>
    </SearchContext.Provider>
  );
}

export default App;
