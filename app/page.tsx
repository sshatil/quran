import AudioPlayer from "@/components/audioPlayer";
import Navbar from "@/components/containers/Navbar";
import HomePage from "@/components/home/HomePage";
import { getEditionList } from "@/hooks/useEditionList";
import {
  getAllChapterAudioForSpecificReciter,
  getSurahList,
} from "@/hooks/useSurah";
import { EditionList } from "@/types/editions";
import { ALLChapterAudio, SurahList } from "@/types/surahList";

const Home = async () => {
  const editionList: EditionList[] = await getEditionList();
  const surahList: SurahList[] = await getSurahList();
  const AllChapterAudio: ALLChapterAudio[] =
    await getAllChapterAudioForSpecificReciter(7);

  return (
    <main>
      <Navbar />
      <HomePage
        editionList={editionList}
        surahList={surahList}
        AllChapterAudio={AllChapterAudio}
      />
    </main>
  );
};

export default Home;
