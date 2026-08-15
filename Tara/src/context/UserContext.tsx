import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { userRepository } from "../services";
import type { FarmProfile, UserProfile } from "../types/user";

interface UserContextValue {
  user: UserProfile | null;
  farm: FarmProfile | null;
  isLoading: boolean;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  updateFarm: (updates: Partial<FarmProfile>) => Promise<void>;
  addXp: (amount: number) => Promise<number>;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [farm, setFarm] = useState<FarmProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const [u, f] = await Promise.all([
        userRepository.getProfile(),
        userRepository.getFarmProfile(),
      ]);
      setUser(u);
      setFarm(f);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateUser = useCallback(async (updates: Partial<UserProfile>) => {
    const updated = await userRepository.updateProfile(updates);
    setUser(updated);
  }, []);

  const updateFarm = useCallback(async (updates: Partial<FarmProfile>) => {
    const updated = await userRepository.updateFarmProfile(updates);
    setFarm(updated);
  }, []);

  const addXp = useCallback(
    async (amount: number) => {
      const newXp = await userRepository.addXp(amount);
      if (user) {
        setUser({ ...user, xp: newXp });
      }
      return newXp;
    },
    [user]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        farm,
        isLoading,
        updateUser,
        updateFarm,
        addXp,
        refresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
