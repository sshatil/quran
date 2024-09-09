import MobileSidebar from "@/components/containers/MobileSidebar";
import Navbar from "@/components/containers/Navbar";
import Sidebar from "@/components/containers/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSurahList } from "@/hooks/useSurah";
import { SurahList } from "@/types/surahList";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const surahList: SurahList[] = await getSurahList();

  return (
    <>
      <Navbar />
      <div className="pl-6">
        <MobileSidebar surahList={surahList} />
      </div>
      <div className="border-b">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <div className="fixed top-14 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block hidden">
            <Sidebar surahList={surahList} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
