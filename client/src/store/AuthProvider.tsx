import React, { ReactNode, useEffect, useState } from "react";

import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize state from localStorage or set defaults
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());

    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");

    username
      ? localStorage.setItem("username", username)
      : localStorage.removeItem("username");
  }, [isAuthenticated, token, username]);

  const login = (usernameInput: string, passwordInput: string): string => {
    const DUMMY_USER_NAME = "UserName2";
    const DUMMY_PASSWORD = "StrongPassword2";

    if (usernameInput === DUMMY_USER_NAME && passwordInput === DUMMY_PASSWORD) {
      setIsAuthenticated(true);
      setToken("mock-jwt-token"); // In a real application, this would come from your authentication server
      setUsername(usernameInput);
      return "success";
    } else {
      return "Invalid username or password";
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null);
  };

  const value = { isAuthenticated, login, logout, token, username };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
