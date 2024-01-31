import React, { useState } from "react";

import styled from "styled-components";
import { useAuth } from "../store/AuthContext";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: rgba(42, 116, 150, 1);
  border: 1px solid white;
  padding: 1rem 2rem 2rem 2rem;

  border-radius: 10px;
  z-index: 2000;

  form {
    display: flex;
    flex-direction: column;

    p {
      font-size: 1.3rem;
      color: white;
      margin-bottom: 5px;

      span {
        color: black;
        font-size: 1.2rem;
        font-style: italic;
      }
    }

    input {
      font-size: 1rem;
      border-radius: 5px;
      border: none;
      box-shadow: none;
      padding: 0.5rem;

      &:focus {
        outline: none;
      }
    }

    button {
      font-size: 1.5rem;
      border-radius: 5px;
      border: none;
      box-shadow: none;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      cursor: pointer;
      margin-top: 1.5rem;
      padding: 1rem 2rem 1rem 2rem;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
    onClose();
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <p>
            Username: <span>UserName</span>
          </p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />

          <p>
            Password: <span>StrongPassword2 </span>
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </ModalContent>
    </ModalBackground>
  );
};

export default LoginModal;
