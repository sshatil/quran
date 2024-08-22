import HomePage from "@/components/home/HomePage";
import { getSurahList } from "@/hooks/useSurah";
import { SurahList } from "@/types/surahList";

const Home = async () => {
  const surahList: SurahList[] = await getSurahList();

  return (
    <main>
      <HomePage surahList={surahList} />
    </main>
  );
};

export default Home;
