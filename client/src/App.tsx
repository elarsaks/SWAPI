import './App.css';

import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: blue;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkblue;
  }
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SWAPI</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <StyledButton>Click Me</StyledButton> {/* Use your styled component */}
      </header>
    </div>
  );
}

export default App;
