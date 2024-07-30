import React from "react";
import Loop from "../icons/Loop";
import Pause from "../icons/Pause";
import Play from "../icons/Play";
import Shuffle from "../icons/Shuffle";
import Cross from "../icons/Cross";
import { useAudio } from "@/store/useAudio";

interface ControlsProps {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: (v: any) => void;
  // shuffle: boolean;
  // setShuffle: (v: any) => void;
  currentSongs?: string;
  handlePlayPause: () => void;
  isActive?: boolean;
  // handlePrevSong
  // handleNextSong
}

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  // shuffle,
  // setShuffle,
  currentSongs,
  handlePlayPause,
}: ControlsProps) => {
  const { setIsActive } = useAudio();
  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80 pt-1 pb-3">
      <Loop
        color={repeat ? "red" : "var(--foreground)"}
        onClick={() => setRepeat((prev: any) => !prev)}
        className="hidden sm:block cursor-pointer"
        width={20}
        height={20}
      />
      {/* {currentSongs?.length && <Previous color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />} */}
      {isPlaying ? (
        <Pause
          color="var(--foreground)"
          onClick={handlePlayPause}
          className="cursor-pointer"
          width={24}
          height={24}
        />
      ) : (
        <Play
          color="var(--foreground)"
          onClick={handlePlayPause}
          className="cursor-pointer"
          width={24}
          height={24}
        />
      )}
      {/* {currentSongs?.length && <Next color="#FFF" className="cursor-pointer" onClick={handleNextSong} />} */}
      {/* <Shuffle
      color={shuffle ? "red" : "var(--foreground)"}
      onClick={() => setShuffle((prev: any) => !prev)}
      className="hidden sm:block cursor-pointer"
      width={20}
      height={20}
    /> */}
      <Cross
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={() => setIsActive(false)}
      />
    </div>
  );
};

export default Controls;
