import { AuthState, UserData } from "@/types/auth.types";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  // State
  user: null,
  isAuthenticated: false,

  // Actions
  login: (userData: UserData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  userData: (userData: UserData) => set({ user: userData }),
}));
