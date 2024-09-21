"use client";

import { Noto_Naskh_Arabic as Noto } from "next/font/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SurahList } from "@/types/surahList";
import Link from "next/link";
import Play from "../icons/Play";
import axiosClient from "@/utils/axiosClient";
import { useAudio } from "@/store/useAudio";
import Pause from "../icons/Pause";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface SingleSurahProps {
  surah: SurahList;
  handlePlay: (id: number) => void;
  handlePause: (id: number) => void;
  handleFavorite: (surah: SurahList, e: any) => void;
  favoriteList: boolean;
  // playing: number | null;
}
const noto = Noto({ subsets: ["arabic"] });

const SingleSurah = ({
  surah,
  handlePlay,
  handlePause,
  handleFavorite,
  favoriteList,
}: // playing,
SingleSurahProps) => {
  const router = useRouter();
  const { isPlaying, setIsPlaying, isActive, audioFile } = useAudio();

  const handlePlayPause = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isActive) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  console.log(favoriteList);

  return (
    <div className="flex flex-col">
      <Link href={`/${surah.id}`}>
        {/* <Card className="flex-1 hover:border-green-600 group"> */}
        <Card
          className={cn(
            "flex-1 hover:border-green-600 group",
            isPlaying && surah.id === audioFile.chapter_id && "border-green-600"
          )}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="border rounded-full w-7 h-7 text-center group-hover:border-primary">
                  <h3 className="text-primary">{surah.id}</h3>
                </div>
              </div>

              {favoriteList ? (
                <button
                  className="pr-2 transition duration-300 ease-in-out transform hover:scale-125"
                  onClick={(e) => handleFavorite(surah, e)}
                >
                  <HeartFilledIcon className="w-5 h-5 transition duration-300 ease-in-out opacity-70 text-green-500" />
                </button>
              ) : (
                <button
                  className="pr-2 transition duration-300 ease-in-out transform hover:scale-125"
                  onClick={(e) => handleFavorite(surah, e)}
                >
                  <HeartIcon className="w-5 h-5 transition duration-300 ease-in-out opacity-50" />
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="">
                <CardTitle className={noto.className}>
                  {surah.name_arabic}
                </CardTitle>
                <CardDescription>{surah.name_simple}</CardDescription>
              </div>
              <button className="border rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
                {/* <Play /> */}
                {isPlaying && surah.id === audioFile.chapter_id ? (
                  <Pause
                    color="var(--foreground)"
                    className="cursor-pointer"
                    // onClick={(e: any) => {
                    //   e.stopPropagation();
                    //   handlePause(surah.id);
                    // }}
                    onClick={handlePlayPause}
                  />
                ) : (
                  <Play
                    color="var(--foreground)"
                    className="cursor-pointer"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handlePlay(surah.id);
                    }}
                  />
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default SingleSurah;
