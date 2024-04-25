import { EditionList } from "@/types/editions";
import SingleEdition from "./SingleEdition";
// https://www.npmjs.com/package/locale-codes
interface EditionProps {
  editionList: EditionList[];
}
const Editions = async ({ editionList }: EditionProps) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {editionList.map((edition, i) => (
          <SingleEdition key={i} edition={edition} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Editions;
