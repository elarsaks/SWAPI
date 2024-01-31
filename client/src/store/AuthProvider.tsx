import React, { ReactNode, useState } from "react";

import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const login = (usernameInput: string, passwordInput: string): string => {
    const DUMMY_USER_NAME = "UserName";
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
