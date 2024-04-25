import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditionList } from "@/types/editions";
import Editions from "../editions/Editions";
import { SurahList } from "@/types/surahList";
import Surah from "../surah/Surah";

interface HomepageProps {
  surahList: SurahList[];
  // editionList?: EditionList[];
}

const HomePage = ({ surahList }: HomepageProps) => {
  return (
    <section className="p-4 max-w-[1300px] m-auto">
      <h3 className="text-2xl text-center">Holy Quran</h3>
      <Tabs defaultValue="audio" className="mt-5">
        <TabsList>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="surah">Surah</TabsTrigger>
          {/* <TabsTrigger value="edition">Edition</TabsTrigger> */}
        </TabsList>
        <TabsContent value="audio">
          <Surah surahList={surahList} />
        </TabsContent>
        <TabsContent value="surah">coming soon.....</TabsContent>
        {/* <TabsContent value="surah">Surah list</TabsContent>
                <TabsContent value="edition">
          <Editions editionList={editionList} />
        </TabsContent> */}
      </Tabs>
    </section>
  );
};

export default HomePage;
