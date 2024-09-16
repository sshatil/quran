import { create } from "zustand";
import { SurahList } from "@/types/surahList";

interface UserState {
  user: {
    email: string;
    id: string;
  };
  setUser: (data: any) => void;
}

export const useUser = create<UserState>()((set) => ({
  user: {
    email: "",
    id: "",
  },
  setUser: ({ user }) => {
    set({
      user: {
        email: user.email,
        id: user.id,
      },
    });
  },
}));
