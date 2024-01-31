import React, { ReactNode, createContext, useContext, useState } from "react";

// TODO: Should this be stored somewhere else?
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  token: string | null;
  username: string | null;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

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
