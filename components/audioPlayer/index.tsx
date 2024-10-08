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
  const [volume, setVolume] = useState<number | undefined>();
  const [repeat, setRepeat] = useState(false);
  // buffer
  const [isBuffering, setIsBuffering] = useState(false);

  // store
  const { audioFile, isPlaying, setIsPlaying, isActive, setCurrentTime } =
    useAudio();

  // store volume in localstorage
  useEffect(() => {
    const volumeValue = localStorage.getItem("quran-volume");
    if (volumeValue) {
      setVolume(Number(volumeValue));
    } else {
      setVolume(0.4);
    }
  }, []);

  useEffect(() => {
    if (volume) {
      localStorage.setItem("quran-volume", String(volume));
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (!repeat && duration === appTime) {
      setIsPlaying(false);
    }
  }, [appTime, duration]);
  // console.log("d", duration);
  // console.log("st", seekTime);
  useEffect(() => {
    setCurrentTime(appTime);
  }, [appTime]);
  // console.log("at", appTime);
  return (
    <>
      {isActive && (
        <div className="relative sm:px-12 px-8 w-full">
          <div className="flex-1 flex flex-col items-center justify-center pb-2">
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
              // shuffle={shuffle}
              // setShuffle={setShuffle}
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
      )}
    </>
  );
};

export default AudioPlayer;
