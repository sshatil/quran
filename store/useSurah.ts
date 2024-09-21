import { create } from "zustand";
import { SurahList } from "@/types/surahList";

interface SurahState {
  surahList: SurahList[];
  setSurahList: (surahList: SurahList[]) => void;
  favoriteList: SurahList[];
  setFavoriteList: (surahList: SurahList[]) => void;
}

export const useSurah = create<SurahState>()((set) => ({
  surahList: [],
  setSurahList: (data) => {
    set({ surahList: data });
  },
  favoriteList: [],
  setFavoriteList: (data) => {
    set({ favoriteList: data });
  },
}));
