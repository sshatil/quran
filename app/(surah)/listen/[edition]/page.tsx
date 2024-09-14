import Surah from "@/components/surah/Surah";
import { getSurahList } from "@/hooks/useSurah";
import { SurahList } from "@/types/surahList";

const page = async ({ params }: { params: { edition: string } }) => {
  console.log(params);
  // fetch the sura list
  const surahList: SurahList[] = await getSurahList();

  return (
    <div className="h-screen overflow-scroll">
      <div className="">
        <Surah surahList={surahList} />
      </div>
      <div className="w-full absolute bottom-0">{/* <AudioPlayer /> */}</div>
    </div>
  );
};

export default page;
