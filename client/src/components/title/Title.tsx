import styled from "styled-components";

const TitleStyles = styled.div`
  padding-top: 10vh;
  padding-bottom: 2vh;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const TitleLetter = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 1s;
  cursor: none;

  &:hover {
    transition: color 100ms;
    color: red;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.2rem;
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
`;

const Title = (props: { text: string }) => {
  const letters = props.text.split("");
  return (
    <TitleStyles>
      {letters.map((letter, index) => (
        <TitleLetter key={index}>{letter}</TitleLetter>
      ))}
    </TitleStyles>
  );
};

export default Title;
