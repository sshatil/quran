import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../common/ModeToggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 border-b-2 border-primary h-16">
      <Image src="/logo.png" alt="" width={40} height={40} />
      <div className="flex items-center gap-5">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
