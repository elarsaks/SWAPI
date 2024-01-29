import Card from "./components/card/Card"
import Header from "./components/header/Index"; // Import your HeaderLetter component
import React from "react";
import styled from "styled-components";

const AppStyles = styled.div`
  margin: 0;
  padding: 0;
  background-color: #2a7496;
  min-height: 100vh;
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
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 8px; 
  background-color: rgba(0, 0, 0, 0.5); 
`;

const Footer = styled.div`
  position: relative;
  background-color: black;
  width: 100%;
  height: 5vh;
  bottom: 0;
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

        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>

        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>
        <Card header={"test"} content={"Info"} dataImage="https://gorilla-labs.com/assets/logo.webp"></Card>

      </Content>

      <Footer>
        A B C D
      </Footer>
    </AppStyles>
  );
}

export default App;
