import { EditionList } from "@/types/editions";
interface EditionProps {
  data: EditionList[];
}
const Editions = async ({ data }: EditionProps) => {
  return (
    <section>
      <h3>Available Editions</h3>
      {data.map((edition, i) => (
        <div className="border-2" key={i}>
          <p>{edition.name}</p>
          <p>English Name{edition.englishName}</p>
          <p>Type: {edition.type}</p>
          <p>
            Format: {edition.format === "text" ? "Text" : "Text with audio"}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Editions;
