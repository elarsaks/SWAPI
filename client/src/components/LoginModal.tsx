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
  background-color: #2a7496; /* Softer shade */
  border: 1px solid #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2000;

  form {
    display: flex;
    flex-direction: column;

    p {
      font-size: 1.2rem;
      color: #ffffff;
      margin-bottom: 10px;
    }

    input {
      font-size: 1rem;
      border-radius: 5px;
      border: 2px solid #0056b3; /* Enhanced border */
      padding: 0.5rem;
      margin-bottom: 1rem; /* Added spacing */

      &:focus {
        outline: none;
        border-color: #007bff; /* Focus color */
      }
    }

    h4 {
      color: #ff6347; /* Tomato for error messages */
      font-weight: bold;
      margin-top: 0.5rem;
    }

    button {
      background-color: #0056b3; /* Consistent with focus color */
      color: white;
      padding: 0.8rem;
      margin-top: 1rem; /* Adjusted spacing */

      &:hover {
        background-color: #004494; /* Darker shade for hover */
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
  const [failureMessage, setFailureMessage] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset failure message
    setFailureMessage("");

    // Validation: username length
    if (username.length < 3) {
      setFailureMessage("Username must be at least 3 characters long.");
      return;
    }

    // Validation: must contain a number
    if (!/\d/.test(username)) {
      setFailureMessage("Username must contain a number.");
      return;
    }

    // Validation: must contain a capital letter
    if (!/[A-Z]/.test(username)) {
      setFailureMessage("Username must contain a capital letter.");
      return;
    }

    const loginMessage = login(username, password);

    if (loginMessage === "success") {
      onClose();
    } else {
      setFailureMessage(loginMessage);
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <p>
            Username: <span>UserName2</span>
          </p>
          <input
            type="text"
            placeholder="Username2"
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

          {failureMessage && <h4>{failureMessage}</h4>}

          <button type="submit">Login</button>
        </form>
      </ModalContent>
    </ModalBackground>
  );
};

export default LoginModal;
