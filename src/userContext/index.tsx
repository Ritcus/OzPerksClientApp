import React, { createContext, useContext, useState, useEffect } from "react";
import {
  _retrieveDataFromAsyncStorage,
  _storeDataInAsyncStorage,
} from "../functions";

type UserData = {
  username: string | null;
  isAdmin: boolean;
};

type UserContextType = {
  username: string | null;
  isAdmin: boolean;
  loading: boolean;
  setUsername: (username: string | null) => void;
  setUser: (user: string | null, adminFlag: boolean) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const setUser = (user: string | null, adminFlag: boolean) => {
    setUsername(user);
    setIsAdmin(adminFlag);
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await _retrieveDataFromAsyncStorage("userData");
        console.log("userContext" + storedData);
        if (storedData) {
          const parsedData: UserData = JSON.parse(storedData);
          setUsername(parsedData.username);
          setIsAdmin(parsedData.isAdmin);
        }
      } catch (error) {
        console.error("Error loading user data", error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    };
    loadUserData();
  }, []);

  const clearUser = () => {
    setIsAdmin(false);
    const userData: UserData = { username: username, isAdmin: isAdmin };
    _storeDataInAsyncStorage("userData", userData).catch(console.error);
  };

  return (
    <UserContext.Provider
      value={{ username, isAdmin, loading, setUsername, setUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
