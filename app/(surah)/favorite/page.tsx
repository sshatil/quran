import Surah from "@/components/surah/Surah";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite",
  icons: {
    icon: "logo.png",
  },
};
const page = async () => {
  const supabase = createClient();
  const { data: favorite, error } = await supabase.from("favorite").select("*");
  return (
    <div className="p-4 pb-32">
      <h3 className="text-2xl text-center">Favorite List</h3>
      {favorite ? (
        <Surah surahList={favorite ?? []} />
      ) : (
        <p className="text-center mt-10">No surah found</p>
      )}
    </div>
  );
};

export default page;
