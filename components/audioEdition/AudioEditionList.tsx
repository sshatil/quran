import EditionItem from "./EditionItem";
import { audiEditionData } from "./editionListData";

const AudioEditionList = () => {
  const data = audiEditionData;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((edition, i) => (
        <EditionItem key={i} edition={edition} />
      ))}
    </div>
  );
};

export default AudioEditionList;
