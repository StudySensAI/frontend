// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

/** 1️⃣ Define the shape of your user data */
export interface User {
  id: string;
  full_name: string;
  email: string;
  // add more fields as needed
}

/** 2️⃣ Define what the context will provide */
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

/** 3️⃣ Create the context with a default undefined value */
const UserContext = createContext<UserContextType | undefined>(undefined);

/** 4️⃣ Provider component */
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

/** 5️⃣ Custom hook for safe access */
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context
}
