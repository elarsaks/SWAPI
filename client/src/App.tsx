import React, { useEffect, useState } from "react";

import Card from "./components/card/Card";
import ContentContext from "./store/ContentContext";
import Footer from "./components/Footer";
import LoadingCube from "./components/LoadingCube";
import Menu from "./components/menu/Menu";
import NavBar from "./components/navbar/NavBar";
import Title from "./components/title/Title";
import Util from "./components/Util";
import styled from "styled-components";

const AppStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  background-color: #2a7496;
  min-height: 100vh;
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
`;

function App() {
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [maxPage, setMaxPage] = useState(1);

  // Set page to 1 every time searchWord changes
  useEffect(() => {
    setPage(1);
  }, [searchWord]);

  // Fetch data when page or searchWord changes
  useEffect(() => {
    setLoading(true);
    setInfo("");
    setError("");

    fetch(`https://swapi.dev/api/people/?search=${searchWord}&page=${page}`)
      .then((response) => {
        if (!response.ok) {
          setError(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const calculatedMaxPage = Math.ceil(data.count / 10);
        setMaxPage(calculatedMaxPage);
        setPeople(data.results);
        setLoading(false);

        data.results.length === 0 ? setInfo("Nothing found!") : setInfo("");
        setError("");
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page, searchWord]);

  const ContentContextValue = {
    setSearchWord,
  };

  return (
    <ContentContext.Provider value={ContentContextValue}>
      <AppStyles className="App">
        <NavBar />
        <Title text={"STAR WARS"} />
        <div>
          <Menu setPage={setPage} page={page} minPage={1} maxPage={maxPage} />
          <Content $isUtil={loading || error.length > 0 || info.length > 0}>
            {loading && <LoadingCube height="400px" text="Loading ..." />}
            {error && <Util type="error" message={error} />}
            {info && <Util type="info" message={info} />}
            {!loading &&
              !error &&
              people.map((person: Person) => (
                <Card key={person.url} name={person.name} />
              ))}
          </Content>
        </div>
        <Footer />
      </AppStyles>
    </ContentContext.Provider>
  );
}

export default App;
