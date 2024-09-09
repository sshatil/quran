"use client";

import { cn } from "@/lib/utils";
import { useGlobal } from "@/store/useGlobal";
import React, { useEffect, useRef } from "react";
import { SurahList } from "@/types/surahList";
import Sidebar from "./Sidebar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  surahList: SurahList[];
}

const MobileSidebar = ({ surahList }: SidebarProps) => {
  const { sidebarState, setSidebarState } = useGlobal();

  return (
    <div>
      <div
        className={cn(`fixed top-0 z-50`, sidebarState ? "block" : "hidden")}
      >
        <div
          className="h-screen w-screen backdrop-blur var(-background/30) relative border"
          onClick={() => setSidebarState(false)}
        ></div>
        <div className="w-[300px] shrink-0 border bg-card h-full -ml-8 absolute top-0 left-0 right-0">
          <Sidebar surahList={surahList} />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
