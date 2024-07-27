import { create } from "zustand";

interface IAudioFile {
  audio_url: string;
  chapter_id: number;
  file_size: number;
  format: string;
  id: number;
}

interface IAudioState {
  audioFile: IAudioFile;
  setAudioFile: (data: IAudioFile) => void;
}

export const useAudio = create<IAudioState>()((set) => ({
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
