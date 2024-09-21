"use client";

import { SurahList } from "@/types/surahList";
import Surah from "../surah/Surah";

interface HomepageProps {
  surahList: SurahList[];
  favoriteList: SurahList[];
}

const HomePage = ({ surahList, favoriteList }: HomepageProps) => {
  return (
    <section className="p-4 max-w-[1300px] m-auto pb-32">
      <h3 className="text-2xl text-center">Surah List</h3>
      <Surah surahList={surahList} favoriteList={favoriteList} />
    </section>
  );
};

export default HomePage;
