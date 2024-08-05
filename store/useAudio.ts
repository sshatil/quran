import { AudioFile } from "@/types/surahList";
import { create } from "zustand";

interface AudioState {
  audioFile: AudioFile;
  setAudioFile: (data: AudioFile) => void;
  setClearAudioFile: () => void;
  audioFiles: AudioFile[];
  setAudioFiles: (data: AudioFile[]) => void;
  isPlaying: boolean;
  isActive: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsActive: (isActive: boolean) => void;
  //
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

export const useAudio = create<AudioState>()((set) => ({
  audioFile: {
    audio_url: "",
    chapter_id: 0,
    file_size: 0,
    format: "",
    id: 0,
    duration: 0,
    verse_timings: [],
  },
  setAudioFile: (data) => {
    set({ audioFile: data });
  },
  setClearAudioFile: () => {
    set({
      audioFile: {
        audio_url: "",
        chapter_id: 0,
        file_size: 0,
        format: "",
        id: 0,
        duration: 0,
        verse_timings: [],
      },
    });
  },
  // all audio file for specific reciter
  audioFiles: [],
  setAudioFiles: (data) => {
    set({ audioFiles: data });
  },
  // global audio control
  isPlaying: false,
  isActive: false,
  setIsPlaying: (isPlaying) => {
    set({ isPlaying });
  },
  setIsActive: (isActive) => {
    set({ isActive });
  },
  currentTime: 0,
  setCurrentTime: (time) => {
    set({ currentTime: time });
  },
}));
