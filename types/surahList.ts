export interface SurahList {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: [];
  translated_name: {
    language_name: string;
    name: string;
  };
}

// all chapter audio for specific reciter
export interface AudioFile {
  audio_url: string;
  chapter_id: number;
  file_size: number;
  format: string;
  id: number;
}
