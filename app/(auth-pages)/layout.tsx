import Navbar from "@/components/containers/Navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
