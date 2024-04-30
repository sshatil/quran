import { EditionList } from "@/types/editions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SingleEditionProps {
  edition: EditionList;
  index: number;
}

const SingleEdition = ({ edition, index }: SingleEditionProps) => {
  return (
    <div key={index} className="flex flex-col">
      <Card className="flex-1 hover:border-green-600 cursor-pointer">
        <CardHeader>
          <CardTitle>{edition.name}</CardTitle>
          <CardDescription>{edition.englishName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Type: {edition.type}</p>
          <p>
            Format: {edition.format === "text" ? "Text" : "Text with audio"}
          </p>
          <p>Language: {edition.language}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEdition;
