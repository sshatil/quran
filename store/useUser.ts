import { create } from "zustand";
import { SurahList } from "@/types/surahList";

interface UserState {
  user: {
    email: string;
  };
  setUser: (data: string) => void;
}

export const useUser = create<UserState>()((set) => ({
  user: {
    email: "",
  },
  setUser: (data) => {
    set({
      user: {
        email: data,
      },
    });
  },
}));
