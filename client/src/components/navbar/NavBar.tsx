import logoImage from "../../assets/logo-w.png";
import styled from "styled-components";

const NavBarStyles = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: #000000b6;
  width: 100%;
`;

const LeftContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const Logo = styled.img`
  height: 3vh;
  margin-left: 1vw;
`;

const UserName = styled.span`
  margin-left: 1rem;
  color: white;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  margin-right: 1vw;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const NavBar: React.FC = () => {
  const isLoggedIn = true;
  const userName = "User Name";

  return (
    <NavBarStyles>
      <LeftContainer>
        <Logo src={logoImage} alt="Logo" />
        <h3>{isLoggedIn && <UserName>{userName}</UserName>}</h3>
      </LeftContainer>
      <div>
        {isLoggedIn ? (
          <LoginButton
            onClick={() => {
              /* logic to log out */
            }}
          >
            Log Out
          </LoginButton>
        ) : (
          <LoginButton
            onClick={() => {
              /* logic to log in */
            }}
          >
            Log In
          </LoginButton>
        )}
      </div>
    </NavBarStyles>
  );
};

export default NavBar;
