import { create } from "zustand";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 800));
    set({
      user: { id: "1", email, username: email.split("@")[0] },
      token: "mock-jwt-token",
      isLoading: false,
    });
  },

  signUp: async (email: string, _password: string, username: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 800));
    set({
      user: { id: "1", email, username },
      token: "mock-jwt-token",
      isLoading: false,
    });
  },

  logout: () => {
    set({ user: null, token: null });
  },
}));
