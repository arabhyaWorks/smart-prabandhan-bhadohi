import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../utils/dataSet";

interface Entity {
  id: number;
  entity_name: string;
  entity_type: number;
  status: number;
}

interface User {
  id: number;
  userName: string;
  userEmail: string;
  userRole: number;
  entityId: number;
  entityName: string;
  entityTypeId: number;
}

interface EntitiesContextType {
  entities: Entity[] | null;
  reloadEntities: () => Promise<void>;
  user: User | null;
  setUser: (user: User | null) => void;
}

const EntitiesContext = createContext<EntitiesContextType | undefined>(
  undefined
);

export function EntitiesProvider({ children }: { children: React.ReactNode }) {
  const [entities, setEntities] = useState<Entity[] | null>(null);
  const [user, setUserState] = useState<User | null>(null);

  // Fetch entities from API
  const fetchEntities = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/entities`);
      setEntities(response.data.data);
    } catch (error) {
      console.error("Error fetching entities:", error);
    }
  };

  // Fetch user from local storage and store in context state
  const fetchUser = () => {
    const storedUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    if (storedUser) {
      setUserState(storedUser);
    }
  };

  // Update user state and optionally persist it in localStorage
  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(user);
  };

  // Reload entities manually
  const reloadEntities = async () => {
    await fetchEntities();
  };

  // Fetch entities and user on mount
  useEffect(() => {
    fetchEntities();
    fetchUser();
  }, []);

  return (
    <EntitiesContext.Provider value={{ entities, reloadEntities, user, setUser }}>
      {children}
    </EntitiesContext.Provider>
  );
}

export function useEntities() {
  const context = useContext(EntitiesContext);
  if (context === undefined) {
    throw new Error("useEntities must be used within an EntitiesProvider");
  }
  return context;
}