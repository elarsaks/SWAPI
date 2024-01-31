import React, { ReactNode, useState } from "react";

import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null); // Add this line

  const login = (username: string, password: string) => {
    setIsAuthenticated(true);
    setToken("mock-jwt-token");
    setUsername(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null);
  };

  const value = { isAuthenticated, login, logout, token, username }; // Include username in the context value

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
