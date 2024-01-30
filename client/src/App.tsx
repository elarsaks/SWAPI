import React, { useEffect, useState } from "react";

import Card from "./components/card/Card";
import Footer from "./components/Footer";
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

const Content = styled.div`
  max-width: 1000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  place-items: center;
  min-height: 50vh;
`;

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPeople(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <AppStyles className="App">
      <NavBar />
      <Title text="STAR WARS" />
      <div>
        <Menu />

        <Content>
          {loading && <p>Loading ... </p>}
          {error && <p>Error: {error}</p>}
          {!loading &&
            !error &&
            people.map((person: Person, index) => (
              <Card key={person.url} name={person.name} />
            ))}
        </Content>
      </div>

      <Footer />
    </AppStyles>
  );
}

export default App;
