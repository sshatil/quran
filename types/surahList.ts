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
  file_size?: number;
  format?: string;
  id?: number;
  duration: number;
  verse_timings: any[];
}

// surah details
export interface SurahVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: any;
  text_uthmani: string;
  chapter_id: number;
  text_imlaei_simple: string;
  page_number: number;
  juz_number: number;
  words: Words[];
  audio: {
    url: string;
    segments: [];
  };
}

// words
export interface Words {
  id: number;
  position: number;
  audio_url: string;
  char_type_name: string;
  verse_key: string;
  verse_id: number;
  location: string;
  text_uthmani: string;
  text_indopak: string;
  page_number: number;
  line_number: number;
  text: string;
  translation: Translation;
  transliteration: Transliteration;
}

export interface Translation {
  text: string;
  language_name: string;
}

export interface Transliteration {
  text: string;
  language_name: string;
}
// fetch surah verses param
export interface VersersParams {
  language: string;
  words: boolean;
  translations: string;
  audio: number;
  tafsirs: string;
  word_fields: string;
  fields: string;
  page: number;
  per_page: number;
}
