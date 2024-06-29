import AudioPlayer from "@/components/audioPlayer";
import Navbar from "@/components/containers/Navbar";
import HomePage from "@/components/home/HomePage";
import { getEditionList } from "@/hooks/useEditionList";
import { getSurahList } from "@/hooks/useSurah";
import { EditionList } from "@/types/editions";
import { SurahList } from "@/types/surahList";

const Home = async () => {
  const editionList: EditionList[] = await getEditionList();
  const surahList: SurahList[] = await getSurahList();

  return (
    <main>
      <Navbar />
      <HomePage editionList={editionList} surahList={surahList} />
      <AudioPlayer />
    </main>
  );
};

export default Home;
