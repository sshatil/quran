import React from "react";
import SpeakerLoud from "../icons/SpeakerLoud";
import Mute from "../icons/Mute";

interface ValueProps {
  value: number;
  min: string;
  max: string;
  onChange: (e: any) => void;
  setVolume: (value: number) => void;
}

const Volume = ({ value, min, max, onChange, setVolume }: ValueProps) => (
  <div className="w-full">
    <div className="flex items-center justify-center">
      {value <= 1 && value > 0.5 && (
        <SpeakerLoud color="#FFF" onClick={() => setVolume(0)} />
      )}
      {value <= 0.5 && value > 0 && (
        <SpeakerLoud color="#FFF" onClick={() => setVolume(0)} />
      )}
      {value === 0 && <Mute color="#FFF" onClick={() => setVolume(1)} />}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="w-[40%] h-1 ml-2"
      />
    </div>
  </div>
);

export default Volume;
