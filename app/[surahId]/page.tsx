import Navbar from "@/components/containers/Navbar";
import SurahView from "@/components/surah/SurahView";

const page = ({ params }: { params: { surahId: string } }) => {
  console.log(params);

  return (
    <div>
      <Navbar />
      <SurahView surahId={params.surahId} />
    </div>
  );
};

export default page;
