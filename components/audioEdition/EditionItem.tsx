import { AudioEditionList } from "@/types/editions";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface EditionItemProps {
  edition: AudioEditionList;
}

const EditionItem = ({ edition }: EditionItemProps) => {
  return (
    <div className="flex flex-col">
      <Card className="flex-1 hover:border-green-600 cursor-pointer">
        <CardHeader>
          <CardTitle>{edition.name}</CardTitle>
          <CardDescription>{edition.englishName}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default EditionItem;
