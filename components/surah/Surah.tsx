import { SurahList } from "@/types/surahList";
import SingleSurah from "./SingleSurah";

interface SurahProps {
  surahList: SurahList[];
}

const Surah = ({ surahList }: SurahProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {surahList.map((surah) => (
        <SingleSurah key={surah.id} surah={surah} />
      ))}
    </div>
  );
};

export default Surah;
