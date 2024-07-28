"use client";

import React, { useEffect, useState } from "react";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Controls from "./Controls";
import Volume from "./Volume";
import { useAudio } from "@/store/useAudio";

const AudioPlayer = () => {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(true);
  // buffer
  const [isBuffering, setIsBuffering] = useState(false);

  // store
  const { audioFile } = useAudio();

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (duration === appTime) {
      setIsPlaying(false);
    }
  }, [appTime, duration]);
  // console.log("d", duration);
  // console.log("st", seekTime);
  // console.log("at", appTime);

  // TODO: make seektime update function and update seektime also add buffered logic
  // appTime

  return (
    <div className="relative sm:px-12 px-8 w-full border">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* audio player */}
        {/* audio range */}
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event: any) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
          isBuffering={isBuffering}
        />
        <Player
          activeSong={audioFile.audio_url}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          // currentIndex={currentIndex}
          setIsBuffering={setIsBuffering}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
        {/* audio controllers */}
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          handlePlayPause={handlePlayPause}
          currentSongs={audioFile.audio_url}
        />
        <Volume
          value={volume}
          min="0"
          max="1"
          onChange={(event) => setVolume(event.target.value)}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
