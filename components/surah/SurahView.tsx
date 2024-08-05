"use client";

import { getChapterDetails } from "@/hooks/useSurah";
import React, { useEffect, useState } from "react";
import { Noto_Naskh_Arabic as Noto } from "next/font/google";
import { cn } from "@/lib/utils";
import { SurahVerse } from "@/types/surahList";

// font
const noto = Noto({ subsets: ["arabic"] });

// const SurahView = ({ params }: { params: { surahId: string } }) => {
const SurahView = ({ surahId }: { surahId: string }) => {
  const [verses, setVerses] = useState<SurahVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
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
      per_page: 50,
    };

    const getVerses = async () => {
      setLoading(true);
      const data = await getChapterDetails(params, surahId);
      setVerses(data);
      setLoading(false);
    };

    getVerses();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center text-2xl py-4">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </h1>
          {verses?.map((verse) => (
            <div key={verse.id}>
              <div className="flex flex-wrap justify-center items-end space-x-3 space-y-4 font-direction text-3xl ">
                {verse.words.map((word: any) => (
                  <p
                    key={word.id}
                    className={cn(noto.className, "font-semibold")}
                  >
                    {word?.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurahView;
