import { create } from "zustand";
import { SurahList } from "@/types/surahList";

interface GlobalState {
  sidebarState: boolean;
  setSidebarState: (data: boolean) => void;
}

export const useGlobal = create<GlobalState>()((set) => ({
  sidebarState: false,
  setSidebarState: (data) => {
    set({ sidebarState: data });
  },
}));
