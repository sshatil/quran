"use client";

import { SurahList } from "@/types/surahList";
import SingleSurah from "./SingleSurah";
import { useAudio } from "@/store/useAudio";
import axios from "axios";

interface SurahProps {
  surahList: SurahList[];
}

const Surah = ({ surahList }: SurahProps) => {
  const { setAudioFile, audioFiles, isPlaying, setIsActive, setIsPlaying } =
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
    } catch (error) {
      console.error(error);
    }
  };
  // handle pause
  const handlePause = (id: number) => {
    const selectedSurah = audioFiles.find((surah) => surah.chapter_id === id);
    if (selectedSurah) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {surahList.map((surah) => (
        <SingleSurah
          key={surah.id}
          surah={surah}
          handlePlay={handlePlay}
          handlePause={handlePause}
        />
      ))}
    </div>
  );
};

export default Surah;
