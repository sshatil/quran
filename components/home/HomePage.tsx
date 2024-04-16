import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditionList } from "@/types/editions";

interface HomepageProps {
  editionList: EditionList[];
}

const HomePage = ({ editionList }: HomepageProps) => {
  return (
    <section className="p-4">
      <h3 className="text-2xl text-center">Read Holy Quran</h3>
      <Tabs defaultValue="surah">
        <TabsList>
          <TabsTrigger value="surah">Surah</TabsTrigger>
          <TabsTrigger value="audio">Only Audio</TabsTrigger>
          <TabsTrigger value="edition">Edition</TabsTrigger>
        </TabsList>
        <TabsContent value="surah">Surah list</TabsContent>
        <TabsContent value="audio">Audio list</TabsContent>
        <TabsContent value="edition">Edition</TabsContent>
      </Tabs>
    </section>
  );
};

export default HomePage;
