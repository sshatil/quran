import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { HomeIcon, ActivityLogIcon } from "@radix-ui/react-icons";

export type Playlist = (typeof playlists)[number];

export const playlists = [
  "Surah 1",
  "Surah 2",
  "Surah 3",
  "Surah 15",
  "Surah 19",
  "Surah 46",
  "Surah 100",
  "Surah 110",
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 z-40", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button variant="default" className="w-full justify-start">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ActivityLogIcon className="mr-2 h-4 w-4" />
              Playlist
            </Button>
          </div>
        </div>
        {/* library */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Surah
          </h2>
          <ScrollArea className="h-[100px] px-1">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                Surah 1
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Surah 2
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Surah 3
              </Button>
            </div>
          </ScrollArea>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
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
