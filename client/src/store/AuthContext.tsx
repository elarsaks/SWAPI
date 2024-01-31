import React, { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  token: string | null;
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

  const login = (username: string, password: string) => {
    setIsAuthenticated(true);
    setToken("mock-jwt-token");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  const value = { isAuthenticated, login, logout, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
