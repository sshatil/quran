"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import { AvatarIcon, TextAlignLeftIcon } from "@radix-ui/react-icons";
import { useGlobal } from "@/store/useGlobal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { useUser } from "@/store/useUser";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Navbar = ({ user }: any) => {
  const supabase = createClient();
  const { toast } = useToast();

  const { sidebarState, setSidebarState } = useGlobal();

  const { user: userData, setUser } = useUser();
  useEffect(() => {
    setUser(user?.email);
  }, [user, setUser]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser("");
      toast({
        description: "Logged out successfully",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarState(!sidebarState)}
          >
            <TextAlignLeftIcon className="w-8 h-8" />
          </div>
          <Link href="/">
            <Image src="/logo.png" alt="" width={40} height={40} />
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <ModeToggle />
          <div className="">
            {userData?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    {/* <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar> */}
                    {/* <p className="uppercase">{user?.email.slice(0, 1)}</p> */}
                    <p className="uppercase">{userData?.email.slice(0, 1)}</p>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="icon">
                  <AvatarIcon className="w-6 h-6" />
                </Button>
              </Link>
            )}
          </div>
          {/* TODO: store auth in global state */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
