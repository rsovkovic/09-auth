import { User } from "@/types/user";
import { create } from "zustand";

// interface
type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: Boolean(user),
    });
  },
  clearIsAuthenticated: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
