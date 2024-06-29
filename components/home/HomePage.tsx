import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditionList } from "@/types/editions";
import Editions from "../editions/Editions";
import { SurahList } from "@/types/surahList";
import Surah from "../surah/Surah";
import AudioEditionList from "../audioEdition/AudioEditionList";

interface HomepageProps {
  surahList: SurahList[];
  editionList: EditionList[];
}

const HomePage = ({ editionList, surahList }: HomepageProps) => {
  return (
    <section className="p-4 max-w-[1300px] m-auto">
      <h3 className="text-2xl text-center">Holy Quran</h3>
      {/* <Tabs defaultValue="audio" className="mt-5">
        <TabsList>
          <TabsTrigger value="audio-edition">Audio</TabsTrigger>
          <TabsTrigger value="edition">Edition</TabsTrigger>
        </TabsList>
        <TabsContent value="audio-edition">
          <AudioEditionList />
        </TabsContent>
        <TabsContent value="edition">
          <Editions editionList={editionList} />
        </TabsContent>
      </Tabs> */}
      <Surah surahList={surahList} />
    </section>
  );
};

export default HomePage;
