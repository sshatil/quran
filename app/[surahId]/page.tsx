import Navbar from "@/components/containers/Navbar";
import SurahView from "@/components/surah/SurahView";

const page = async ({ params }: { params: { surahId: string } }) => {
  return (
    <div>
      <Navbar />
      <SurahView surahId={params.surahId} />
    </div>
  );
};

export default page;
