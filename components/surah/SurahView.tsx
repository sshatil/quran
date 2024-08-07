"use client";

import { getChapterDetails } from "@/hooks/useSurah";
import React, { useEffect, useRef, useState } from "react";
import { Noto_Naskh_Arabic as Noto } from "next/font/google";
import { cn } from "@/lib/utils";
import { SurahVerse } from "@/types/surahList";
import { useAudio } from "@/store/useAudio";
import axios from "axios";

// font
const noto = Noto({ subsets: ["arabic"] });

const scrollCenter = (element: HTMLElement | null) => {
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const SurahView = ({
  surahId,
  data,
}: {
  surahId: string;
  data: SurahVerse[];
}) => {
  const [verses, setVerses] = useState<SurahVerse[]>(data);

  // global state
  const {
    setAudioFile,
    audioFile,
    isPlaying,
    setIsActive,
    setIsPlaying,
    currentTime,
  } = useAudio();
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

  console.log(sentence);

  return (
    <div>
      <div className="max-w-3xl mx-auto pb-32">
        <h1 className="text-center text-2xl py-4">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </h1>
        <button onClick={() => handlePlay(Number(surahId))}>Play</button>
        {verses?.map((verse) => (
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
