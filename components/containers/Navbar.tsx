import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="" width={40} height={40} />
        </Link>
        <div className="flex items-center gap-5">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
