"use client";

import { SurahList } from "@/types/surahList";
import SingleSurah from "./SingleSurah";
import { useAudio } from "@/store/useAudio";
import axios from "axios";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  // fetch favorite list
  const [favoriteList, setFavoriteList] = useState<SurahList[]>([]);

  const fetchFavoriteList = async () => {
    const { data: favoriteList, error } = await supabase
      .from("favorite")
      .select("*");
    if (error) {
      console.error("Error fetching favorite list:", error);
    } else {
      setFavoriteList(favoriteList ?? []); // Update the favorite list
    }
  };
  // add to favorite
  const handleFavorite = async (surah: SurahList, e: any) => {
    e.stopPropagation();
    e.preventDefault();
    // check user is authenticated or not

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!error && user) {
      const { data, error } = await supabase.from("favorite").insert([
        {
          user_id: user.id,
          id: surah.id,
          revelation_place: surah.revelation_place,
          revelation_order: surah.revelation_order,
          bismillah_pre: surah.bismillah_pre,
          name_simple: surah.name_simple,
          name_complex: surah.name_complex,
          name_arabic: surah.name_arabic,
          verses_count: surah.verses_count,
          pages: surah.pages,
          translated_name: surah.translated_name,
        },
      ]);
      fetchFavoriteList();
    } else {
      router.push("/login");
    }
  };
  const deleteFavorite = async (surah: SurahList, e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const { data, error } = await supabase
      .from("favorite")
      .delete()
      .eq("id", surah.id);

    fetchFavoriteList();
    if (error) {
      console.error("Error deleting favorite:", error);
    } else {
      console.log("Favorite deleted:", data);
    }
    console.log(surah);
  };
  useEffect(() => {
    fetchFavoriteList();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {surahList.map((surah) => (
        <SingleSurah
          key={surah.id}
          surah={surah}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleFavorite={handleFavorite}
          favoriteList={favoriteList?.some((f) => f?.id === surah.id)}
          deleteFavorite={deleteFavorite}
        />
      ))}
    </div>
  );
};

export default Surah;
