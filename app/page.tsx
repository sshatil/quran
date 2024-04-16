import Navbar from "@/components/containers/Navbar";
import HomePage from "@/components/home/HomePage";
import { getEditionList } from "@/hooks/useEditionList";
import { EditionList } from "@/types/editions";

const Home = async () => {
  const editionList: EditionList[] = await getEditionList();
  return (
    <main>
      <Navbar />
      <HomePage editionList={editionList} />
    </main>
  );
};

export default Home;
