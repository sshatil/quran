import { create } from "zustand";

interface AudioFile {
  audio_url: string;
  chapter_id: number;
  file_size: number;
  format: string;
  id: number;
}

interface AudioState {
  audioFile: AudioFile;
  setAudioFile: (data: AudioFile) => void;
  isPlaying: boolean;
  isActive: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsActive: (isActive: boolean) => void;
}

export const useAudio = create<AudioState>()((set) => ({
  audioFile: {
    audio_url: "",
    chapter_id: 0,
    file_size: 0,
    format: "",
    id: 0,
  },
  setAudioFile: (data) => {
    set({ audioFile: data });
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
}));
