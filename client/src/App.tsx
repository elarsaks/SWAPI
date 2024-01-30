import Card from "./components/card/Card";
import Footer from "./components/Footer";
import Menu from "./components/menu/Menu";
import NavBar from "./components/navbar/NavBar";
import Title from "./components/title/Title"; // Import your HeaderLetter component
import styled from "styled-components";

const AppStyles = styled.div`
  margin: 0;
  padding: 0;
  background-color: #2a7496;
  min-height: 100vh;
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
  place-items: center;
`;

function App() {
  return (
    <AppStyles className="App">
      <NavBar />

      <Title text="STAR WARS" />

      <Menu />

      <Content>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>

        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
        <Card
          header={"test"}
          content={"Info"}
          dataImage="https://gorilla-labs.com/assets/logo.webp"
        ></Card>
      </Content>

      <Footer />
    </AppStyles>
  );
}

export default App;
