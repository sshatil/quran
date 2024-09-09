"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SurahList } from "@/types/surahList";
import { useGlobal } from "@/store/useGlobal";

interface SurahLinkProps {
  pathname: string;
  surah: SurahList;
}
const SurahLink = ({ pathname, surah }: SurahLinkProps) => {
  const { setSidebarState } = useGlobal();
  return (
    <div className="space-y-1" key={surah.id}>
      <Link href={`/${surah.id}`}>
        <Button
          variant={pathname === `/${surah.id}` ? "default" : "ghost"}
          className="w-full justify-start mb-1"
          onClick={() => setSidebarState(false)}
        >
          {surah.name_simple}
        </Button>
      </Link>
    </div>
  );
};

export default SurahLink;
