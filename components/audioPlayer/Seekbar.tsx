import React from "react";
import Spinner from "../icons/Spinner";
import { Slider } from "../ui/slider";

interface SeekbarProps {
  value: number;
  min: string;
  max: number;
  onInput: (event: any) => void;
  setSeekTime: (v: number) => void;
  appTime: number;
  isBuffering: boolean;
}

const Seekbar = ({
  value,
  min,
  max,
  onInput,
  setSeekTime,
  appTime,
  isBuffering,
}: SeekbarProps) => {
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  const handleValueChange = (newValue: number[]) => {
    // event-like object
    const event = {
      target: {
        value: newValue[0],
      },
    };
    onInput(event);
  };
  // console.log(value);

  return (
    <div className="flex flex-row items-center px-4 w-full">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden lg:mr-4 lg:block text-foreground"
      >
        -
      </button>
      <div className="text-foreground w-12 text-center">
        {isBuffering ? (
          <p>
            <Spinner />
          </p>
        ) : value === 0 ? (
          "0:00"
        ) : (
          getTime(value)
        )}
        {/* {value === 0 ? "0:00" : getTime(value)} */}
      </div>
      {/* <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="w-[90%] h-1 mx-4 2xl:mx-6 rounded-lg"
      /> */}
      <Slider
        step={1}
        value={[value]}
        min={0}
        max={max}
        onValueChange={handleValueChange}
        className="w-[90%] h-1 mx-2 2xl:mx-6 rounded-lg cursor-pointer"
      />
      <p className="text-foreground w-12 text-center">
        {max === 0 ? "0:00" : getTime(max)}
      </p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden lg:ml-4 lg:block text-foreground"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;
