"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { useDownloadImage } from "@/hooks/useDownloadImage";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  // get profile image
  const imageUrl = useDownloadImage(url || "");

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="flex items-center gap-4">
      {imageUrl ? (
        // <Image
        //   width={size}
        //   height={size}
        //   src={avatarUrl}
        //   alt="Avatar"
        //   className="avatar image"
        //   style={{ height: size, width: size }}
        // />
        <div className="w-36 h-36 overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ) : (
        // <p>{imageUrl}</p>
        <div className="border rounded-md w-36 h-36 flex justify-center items-center">
          <PlusIcon className="w-6 h-6" />
        </div>
      )}
      <div className="mt-4">
        <label
          className="border px-4 py-1 cursor-pointer rounded-md"
          htmlFor="single"
        >
          {uploading ? "Uploading ..." : "Upload new photo"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
