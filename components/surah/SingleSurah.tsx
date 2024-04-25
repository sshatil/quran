import { Noto_Naskh_Arabic as Noto } from "next/font/google";
import { EditionList } from "@/types/editions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SurahList } from "@/types/surahList";
import { Button } from "../ui/button";
import Link from "next/link";

interface SingleSurahProps {
  surah: SurahList;
}
const noto = Noto({ subsets: ["arabic"] });
const SingleSurah = ({ surah }: SingleSurahProps) => {
  return (
    <div className="flex flex-col">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className={noto.className}>{surah.name}</CardTitle>
          <CardDescription>{surah.englishName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>English name: {surah.englishNameTranslation}</p>
          <p>Revelation: {surah.revelationType}</p>
          <p>Total Ayah: {surah.numberOfAyahs}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Link href={`/listen/ar.alafasy/${surah.number.toString()}`}>
            <Button variant="outline">Listen</Button>
          </Link>
          <Button variant="outline">Read</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleSurah;
