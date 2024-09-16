"use client";

import { SurahList } from "@/types/surahList";
import SingleSurah from "./SingleSurah";
import { useAudio } from "@/store/useAudio";
import axios from "axios";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SurahProps {
  surahList: SurahList[];
}

const Surah = ({ surahList }: SurahProps) => {
  const supabase = createClient();
  const router = useRouter();
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
  const handleFavorite = async (id: number, e: any) => {
    e.stopPropagation();
    e.preventDefault();
    // check user is authenticated or not

    const { error } = await supabase.auth.getUser();
    if (!error) {
      console.log(id);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {surahList.map((surah) => (
        <SingleSurah
          key={surah.id}
          surah={surah}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleFavorite={handleFavorite}
        />
      ))}
    </div>
  );
};

export default Surah;
