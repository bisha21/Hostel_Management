import React, { createContext, useEffect, useState } from 'react';

export type Room = {
  id: number;
  RoomNumber: string;
  Type: "Single" | "Double" | "Triple";
  Price: number;
};

export type Booking = {
  id: number;
  userId: number;
  roomId: number;
  total_amount: string;
  status: "pending" | "confirmed" | "cancelled";
  Room: Room;
};
export type UserType = {
  id: number;
  username: string;
  user_type: string;
  address: string;
  phone_number: string;
  profile_picture: string | null;
  bookings: Booking[];
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  logout: () => void;
  isLoading: boolean;
};


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType>({} as UserType);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser || '{}'));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser({} as UserType);
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
