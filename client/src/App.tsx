import { useEffect, useState } from "react";

import Card from "./components/card/Card";
import Error from "./components/Error";
import Footer from "./components/Footer";
import LoadingCube from "./components/LoadingCube";
import Menu from "./components/menu/Menu";
import NavBar from "./components/navbar/NavBar";
import Title from "./components/title/Title";
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
  $isLoading?: boolean;
  $isError?: boolean;
}

const Content = styled.div<ContentProps>`
  max-width: 1000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: ${(props) => (props.$isLoading || props.$isError ? "flex" : "grid")};
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  place-items: center;
  justify-content: center;
  min-height: 50vh;

  /* Apply flex-specific styles only when loading or error is true */
  ${(props) =>
    (props.$isLoading || props.$isError) &&
    `
    align-items: center;
    flex-direction: column;
  `}
`;

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/?page=" + page)
      .then((response) => {
        if (!response.ok) {
          setError("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        setPeople(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page]);

  return (
    <AppStyles className="App">
      <NavBar />
      <Title text="STAR WARS" />

      <div>
        <Menu setPage={setPage} page={page} />

        <Content $isLoading={loading} $isError={error ? true : false}>
          {loading && <LoadingCube height="400px" text="Loading ..." />}
          {error && <Error message={error} />}
          {!loading &&
            !error &&
            people.map((person: Person) => (
              <Card key={person.url} name={person.name} />
            ))}
        </Content>
      </div>

      <Footer />
    </AppStyles>
  );
}

export default App;
