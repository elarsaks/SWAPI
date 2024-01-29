import Header from "./components/header/Index"; // Import your HeaderLetter component
import React from "react";
import styled from "styled-components";

const AppStyles = styled.div`
  margin: 0;
  padding: 0;
  background-color: #2a7496;
`;

const Navigation = styled.div`
// TODO: Build Navigation component
  position: fixed;
  margin-top: 0;
  background-color: #000000;
  width: 100%;
  min-height: 5vh;
`;

// TODO: Menu and content are possible in the same component
const Menu = styled.div`
  padding-top: 5vh;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  padding-top: 5vh;
  display: flex;
  justify-content: center;
`;

const Footer = styled.div`
  padding-top: 5vh;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <AppStyles className="App">
      <Navigation>
        Buttons ...
      </Navigation>

      <Header text="STARWARS" ></Header>

      <Menu>
        A B C D
      </Menu>

      <Content>
        A B C D
      </Content>

      <Footer>
        A B C D
      </Footer>
    </AppStyles>
  );
}

export default App;
