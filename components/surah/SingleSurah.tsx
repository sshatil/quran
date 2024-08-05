"use client";

import { Noto_Naskh_Arabic as Noto } from "next/font/google";
import { EditionList } from "@/types/editions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SurahList } from "@/types/surahList";
import { Button } from "../ui/button";
import Link from "next/link";
import Play from "../icons/Play";
import axiosClient from "@/utils/axiosClient";
import { useAudio } from "@/store/useAudio";
import Pause from "../icons/Pause";
import { redirect, useRouter } from "next/navigation";

interface SingleSurahProps {
  surah: SurahList;
  handlePlay: (id: number) => void;
  handlePause: (id: number) => void;
  // playing: number | null;
}
const noto = Noto({ subsets: ["arabic"] });

const SingleSurah = ({
  surah,
  handlePlay,
  handlePause,
}: // playing,
SingleSurahProps) => {
  const router = useRouter();
  const { isPlaying, audioFile } = useAudio();
  // console.log();
  const handleClick = (surahId: number) => {
    router.push(`/${surahId}`);
    console.log(surahId);
  };

  return (
    <div className="flex flex-col">
      <Card
        className="flex-1 hover:border-green-600"
        onClick={() => handleClick(surah.id)}
      >
        <CardHeader>
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
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handlePause(surah.id);
                  }}
                />
              ) : (
                <Play
                  color="var(--foreground)"
                  className="cursor-pointer"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handlePlay(surah.id);
                  }}
                />
              )}
            </button>
          </div>
        </CardHeader>
        {/* <CardContent>
          <p>English name: {surah.englishNameTranslation}</p>
          <p>Revelation: {surah.revelationType}</p>
          <p>Total Ayah: {surah.numberOfAyahs}</p>
        </CardContent> */}
        {/* <CardFooter className="flex gap-2">
          <Link href={`/listen/ar.alafasy/${surah.number.toString()}`}>
            <Button variant="outline">Listen</Button>
          </Link>
          <Button variant="outline">Read</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default SingleSurah;
