"use client";

import { getChapterDetails } from "@/hooks/useSurah";
import React, { useEffect, useState } from "react";
import { Noto_Naskh_Arabic as Noto } from "next/font/google";
import { cn } from "@/lib/utils";
import { AudioFile, SurahVerse } from "@/types/surahList";
import { useAudio } from "@/store/useAudio";
import axiosClient from "@/utils/axiosClient";
import axios from "axios";

// font
const noto = Noto({ subsets: ["arabic"] });

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

  // global state
  const { setAudioFile, audioFile, isPlaying, setIsActive, setIsPlaying } =
    useAudio();
  // get specific audio file
  const handlePlay = async (id: number) => {
    try {
      const { data, status } = await axios.get(
        `https://api.qurancdn.com/api/qdc/audio/reciters/7/audio_files?chapter=${id}&segments=true`
      );
      if (status === 200) {
        setAudioFile(data.audio_files[0]);
        setIsActive(true);
        setIsPlaying(true);
      }
      console.log(data.audio_files[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center text-2xl py-4">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </h1>
          <p>{audioFile.audio_url}</p>
          <button onClick={() => handlePlay(Number(surahId))}>Play</button>
          {verses?.map((verse) => (
            <div key={verse.id}>
              {/* audio segment */}

              {/* end */}
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
              {/* <button onClick={() => handlePlay(verse.audio.url, verse.id)}>
                Play
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurahView;
