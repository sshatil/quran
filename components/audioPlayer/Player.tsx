/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
interface PlayerProps {
  activeSong: string;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  repeat: boolean;
  onEnded?: () => void;
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

  return (
    <audio
      src={activeSong}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
