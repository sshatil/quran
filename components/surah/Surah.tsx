"use client";

import { SurahList } from "@/types/surahList";
import SingleSurah from "./SingleSurah";
import { useAudio } from "@/store/useAudio";
import { useState } from "react";

interface SurahProps {
  surahList: SurahList[];
}

const Surah = ({ surahList }: SurahProps) => {
  const { setAudioFile, audioFiles, isPlaying, setIsActive, setIsPlaying } =
    useAudio();
  // const playing = new Set();
  // const [playing, setPlaying] = useState<number | null>(0);

  // get specific audio file
  const handlePlay = async (id: number) => {
    try {
      const selectedSurah = audioFiles.find((surah) => surah.chapter_id === id);
      if (selectedSurah) {
        // setPlaying(selectedSurah.chapter_id);
        setAudioFile(selectedSurah);
        setIsActive(true);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // handle pause
  const handlePause = (id: number) => {
    const selectedSurah = audioFiles.find((surah) => surah.chapter_id === id);
    if (selectedSurah) {
      setIsPlaying(false);
      // setPlaying(null);
    }
  };
  // console.log(playing);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {surahList.map((surah) => (
        <SingleSurah
          key={surah.id}
          surah={surah}
          handlePlay={handlePlay}
          handlePause={handlePause}
          // playing={playing}
        />
      ))}
    </div>
  );
};

export default Surah;
