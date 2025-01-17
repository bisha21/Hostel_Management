import React, { createContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: Record<string, any> | null; // Add user state
  setUser: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
  logout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Record<string, any> | null>(null); // Add this line
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user'); // Retrieve user details from local storage

    if (token) {
      setUser(JSON.parse(storedUser || '{}')); // Parse and set the user
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, isLoading ,user,
        setUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};
