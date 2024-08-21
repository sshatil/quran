import Navbar from "@/components/containers/Navbar";
import SurahView from "@/components/surah/SurahView";
import { getChapterDetails } from "@/hooks/useSurah";

const page = async ({ params }: { params: { surahId: string } }) => {
  const fetchParams = {
    language: "en",
    words: true,
    translations: "131,161",
    audio: 7,
    tafsirs: "82641",
    word_fields:
      "verse_key,verse_id,page_number,location,text_uthmani,text_indopak,qpc_uthmani_hafs",
    translation_fields: "resource_name,language_id",
    fields: "text_uthmani,chapter_id,hizb_number,text_imlaei_simple",
    page: 1,
    per_page: 20,
  };

  const verses = await getChapterDetails(fetchParams, params.surahId);
  return (
    <div>
      <Navbar />
      <SurahView surahId={params.surahId} data={verses} />
    </div>
  );
};

export default page;
