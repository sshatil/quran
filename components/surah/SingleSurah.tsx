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

interface SingleSurahProps {
  surah: SurahList;
}
const noto = Noto({ subsets: ["arabic"] });
const SingleSurah = ({ surah }: SingleSurahProps) => {
  const handlePlay = async (id: number, reciter = 7) => {
    console.log(reciter, id);
    const { data } = await axiosClient.get(
      `/chapter_recitations/${reciter}/${id}`
    );
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      <Card className="flex-1 hover:border-green-600">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="">
              <CardTitle className={noto.className}>
                {surah.name_arabic}
              </CardTitle>
              <CardDescription>{surah.name_simple}</CardDescription>
            </div>
            <button
              className="border rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
              onClick={() => handlePlay(surah.id)}
            >
              <Play />
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
