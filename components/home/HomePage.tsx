import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditionList } from "@/types/editions";
import Editions from "../editions/Editions";

interface HomepageProps {
  editionList: EditionList[];
}

const HomePage = ({ editionList }: HomepageProps) => {
  return (
    <section className="p-4 max-w-[1300px] m-auto">
      <h3 className="text-2xl text-center">Read Holy Quran</h3>
      <Tabs defaultValue="edition" className="mt-5">
        <TabsList>
          <TabsTrigger value="edition">Edition</TabsTrigger>
          <TabsTrigger value="surah">Surah</TabsTrigger>
          <TabsTrigger value="audio">Only Audio</TabsTrigger>
        </TabsList>
        <TabsContent value="edition">
          <Editions editionList={editionList} />
        </TabsContent>
        <TabsContent value="surah">Surah list</TabsContent>
        <TabsContent value="audio">Audio list</TabsContent>
      </Tabs>
    </section>
  );
};

export default HomePage;
