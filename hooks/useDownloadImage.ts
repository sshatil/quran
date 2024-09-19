"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";

// export function useDownloadImage(user: User | null, path: string) {
export function useDownloadImage(path: string) {
  const supabase = createClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setImageUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (path) downloadImage(path);
  }, [path, supabase]);

  return imageUrl;
}
