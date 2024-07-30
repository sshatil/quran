import axiosClient from "@/utils/axiosClient";
import axios from "axios";

export async function getSurahList() {
  const { data, status } = await axiosClient.get("/chapters");
  if (status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return data.chapters;
}
export async function getAllChapterAudioForSpecificReciter(reciterId: number) {
  const { data, status } = await axiosClient.get(
    `/chapter_recitations/${reciterId}`
  );
  if (status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return data.audio_files;
}
