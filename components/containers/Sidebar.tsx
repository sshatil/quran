"use client";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  HomeIcon,
  HeartFilledIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { SurahList } from "@/types/surahList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SurahLink from "./SurahLink";
import { useState } from "react";

export type Playlist = (typeof playlists)[number];

export const playlists = ["Surah 1", "Surah 2", "Surah 3", "Surah 15"];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  surahList: SurahList[];
}

export default function Sidebar({ surahList, className }: SidebarProps) {
  const pathname = usePathname();
  const [totalShowSurah, setTotalShowSurah] = useState(10);

  return (
    <div className={cn("pb-12 z-40", className)}>
      <div className="space-y-2 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link href="/">
              <Button
                variant={pathname === `/` ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant={"ghost"}
                className="w-full justify-start"
                disabled
              >
                <HeartFilledIcon className="mr-2 h-4 w-4" />
                Favorite
              </Button>
            </Link>
          </div>
        </div>
        {/* library */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Surah
          </h2>
          {/* <ScrollArea className="h-[250px] px-1"> */}
          {surahList.slice(0, totalShowSurah).map((surah) => (
            <SurahLink key={surah.id} surah={surah} pathname={pathname} />
          ))}
          {totalShowSurah === surahList.length ? (
            <Button
              variant={"ghost"}
              className="w-full justify-start"
              onClick={() => setTotalShowSurah(10)}
            >
              <ChevronUpIcon className="mr-2 h-4 w-4" />
              Show Less
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              className="w-full justify-start"
              onClick={() => setTotalShowSurah(surahList.length)}
            >
              <ChevronDownIcon className="mr-2 h-4 w-4" />
              Show More
            </Button>
          )}
          {/* </ScrollArea> */}
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Favorite List
          </h2>
          <ScrollArea className="h-[120px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  disabled
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
