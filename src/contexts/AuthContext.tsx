// FILE: src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "../utility/axiosInstance";

interface AuthContextType {
  token: string | null;
  login: (address: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (address: string) => {
    try {
      const response = await axiosInstance.post<{ token: string }>(
        "/users/connect",
        { address }
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
