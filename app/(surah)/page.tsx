import HomePage from "@/components/home/HomePage";
import { getSurahList } from "@/hooks/useSurah";
import { createClient } from "@/lib/supabase/server";
import { SurahList } from "@/types/surahList";

const Home = async () => {
  const surahList: SurahList[] = await getSurahList();
  const supabase = createClient();
  const { data: favoriteList, error } = await supabase
    .from("favorite")
    .select("*");
  return (
    <main>
      <HomePage surahList={surahList} favoriteList={favoriteList ?? []} />
    </main>
  );
};

export default Home;
