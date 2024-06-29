import React from "react";
import Loop from "../icons/Loop";
import Pause from "../icons/Pause";
import Play from "../icons/Play";
import Shuffle from "../icons/Shuffle";
// import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
// import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

interface ControlsProps {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: (v: any) => void;
  shuffle: boolean;
  setShuffle: (v: any) => void;
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
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
}: ControlsProps) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80 py-3">
    <Loop
      color={repeat ? "red" : "white"}
      onClick={() => setRepeat((prev: any) => !prev)}
      className="hidden sm:block cursor-pointer"
    />
    {/* {currentSongs?.length && <Previous color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />} */}
    {isPlaying ? (
      <Pause
        color="#FFF"
        onClick={handlePlayPause}
        className="cursor-pointer"
      />
    ) : (
      <Play color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {/* {currentSongs?.length && <Next color="#FFF" className="cursor-pointer" onClick={handleNextSong} />} */}
    <Shuffle
      color={shuffle ? "red" : "white"}
      onClick={() => setShuffle((prev: any) => !prev)}
      className="hidden sm:block cursor-pointer"
    />
  </div>
);

export default Controls;
