import axiosClient from "@/utils/axiosClient";
import axios from "axios";

export async function getSurahList() {
  const { data, status } = await axiosClient.get("/chapters");
  if (status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return data.chapters;
}
