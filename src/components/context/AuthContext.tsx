"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

export interface UserData {
  token: string;
  user: {
    _id: string;
    role: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface AuthContextType {
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  token: string | null;
  role: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const logout = () => setCurrentUser(null);

  const value: AuthContextType = {
    currentUser,
    setCurrentUser,
    token: currentUser?.token ?? null,
    role: currentUser?.user?.role ?? null,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
