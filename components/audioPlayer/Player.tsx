/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState, useEffect } from "react";
interface PlayerProps {
  activeSong: string;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  repeat: boolean;
  onEnded?: () => void;
  setIsBuffering: (buffer: boolean) => void;
  onTimeUpdate: (event: any) => void;
  onLoadedData: (event: any) => void;
}

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  repeat,
  onEnded,
  setIsBuffering,
  onTimeUpdate,
  onLoadedData,
}: PlayerProps) => {
  const ref = useRef<any>(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);
  const handleTimeUpdate = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    if (ref.current) {
      const audio = ref.current;
      const currentTime = audio.currentTime;
      const buffered = audio.buffered;

      if (buffered.length) {
        const bufferedEnd = buffered.end(buffered.length - 1);
        if (bufferedEnd - currentTime <= 2) {
          setIsBuffering(true);
        } else {
          setIsBuffering(false);
        }
      }
    }
    onTimeUpdate(e);
  };
  return (
    <>
      <audio
        src={activeSong}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        // onTimeUpdate={onTimeUpdate}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={onLoadedData}
      />
    </>
  );
};

export default Player;
