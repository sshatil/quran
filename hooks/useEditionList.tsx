import axios from "axios";

export async function getEditionList() {
  const { data, status } = await axios.get(
    "https://api.alquran.cloud/v1/edition"
  );
  if (status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return data.data;
}
