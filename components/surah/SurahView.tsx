"use client";

import { getChapterDetails } from "@/hooks/useSurah";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Noto_Naskh_Arabic as Noto } from "next/font/google";
import { cn } from "@/lib/utils";
import { SurahVerse } from "@/types/surahList";
import { useAudio } from "@/store/useAudio";
import axios from "axios";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { scrollCenter } from "@/utils/scroolScreen";

// font
const noto = Noto({ subsets: ["arabic"] });

const SurahView = ({
  surahId,
  data,
}: {
  surahId: string;
  data: SurahVerse;
}) => {
  const [surahVerses, setSurahVerses] = useState<SurahVerse>(data);
  const [page, setPage] = useState(2);
  console.log(surahVerses);

  // global state
  const {
    setAudioFile,
    audioFile,
    isPlaying,
    setIsActive,
    setIsPlaying,
    currentTime,
  } = useAudio();

  // fetch verses for infinite scroll
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
    page: page,
    per_page: 20,
  };

  const fetchVers = async () => {
    const data = await getChapterDetails(fetchParams, surahId);
    return data;
  };

  const fetchMorePosts = useCallback(async () => {
    if (surahVerses.pagination.total_pages > 1) {
      const newPosts = await fetchVers();
      // setSurahVerses((prev) => [...prev, ...newPosts]);
      setSurahVerses((prev) => ({
        ...prev,
        verses: [...prev.verses, ...newPosts.verses],
        pagination: newPosts.pagination,
      }));
      setPage((prev) => prev + 1);
      console.log(newPosts);

      setIsFetching(false);
    }
  }, [page]);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMorePosts);

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

  // get specific word
  const getCurrentWord = () => {
    // get sentence
    const sentence = audioFile?.verse_timings.find(
      (segment) =>
        currentTime * 1000 >= segment.timestamp_from &&
        currentTime * 1000 < segment.timestamp_to
    );
    // get word
    const surahWord = sentence?.segments?.find(
      (segment: any, i: any) =>
        currentTime * 1000 >= segment[1] && currentTime * 1000 < segment[2]
    );
    return { sentence, surahWord };
  };

  const { sentence, surahWord } = getCurrentWord();
  useEffect(() => {
    getCurrentWord();
  }, [currentTime]);
  // TODO: reload data when scrolling window
  const wordRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (surahWord) {
      const wordIndex = surahWord[0] - 1;
      const element = wordRefs.current[wordIndex];
      scrollCenter(element);
    }
  }, [sentence, surahWord]);

  return (
    <div>
      <div className="max-w-3xl mx-auto pb-32">
        <h1 className="text-center text-2xl py-4">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </h1>
        <button onClick={() => handlePlay(Number(surahId))}>Play</button>
        {surahVerses?.verses.map((verse) => (
          <div key={verse.id}>
            <div className="flex flex-wrap justify-center items-end space-x-3 space-y-4 font-direction text-3xl ">
              {verse.words.map((word: any, i: any) => (
                <p
                  ref={(el) => {
                    if (sentence?.verse_key === word?.verse_key) {
                      wordRefs.current[i] = el;
                    }
                  }}
                  key={word.id}
                  className={cn(
                    noto.className,
                    "font-semibold",
                    sentence?.verse_key === word?.verse_key &&
                      surahWord &&
                      surahWord[0] === i + 1
                      ? "text-green-500"
                      : ""
                  )}
                >
                  {word?.text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahView;
