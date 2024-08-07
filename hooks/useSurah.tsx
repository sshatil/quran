import { VersersParams } from "@/types/surahList";
import axiosClient from "@/utils/axiosClient";
import { buildQueryString } from "@/utils/buildQueryString";

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

export async function getChapterDetails(
  params: VersersParams,
  surahId: string
) {
  const queryString = buildQueryString(params);
  const url = `/verses/by_chapter/${surahId}?${queryString}`;
  const { data, status } = await axiosClient.get(url);
  if (status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return data;
}
