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
}));
