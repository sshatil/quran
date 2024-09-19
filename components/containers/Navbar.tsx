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
import { useUser } from "@/store/useUser";
import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useDownloadImage } from "@/hooks/useDownloadImage";

const Navbar = ({ user }: { user?: User | null }) => {
  const { sidebarState, setSidebarState } = useGlobal();

  const { setUser } = useUser();

  useEffect(() => {
    setUser({ user: { id: user?.id, email: user?.email } });
  }, [user, setUser]);

  const [username, setUsername] = useState<string | null>(null);
  // get profile info
  const profile = useUserProfile(user ?? null);
  // get profile image
  // const imageUrl = useDownloadImage(user ?? null, profile?.avatar_url || "");
  const imageUrl = useDownloadImage(profile?.avatar_url || "");

  return (
    <nav className="sticky top-0 z-40 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
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
            {user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {imageUrl ? (
                    <Avatar className="w-ful h-full">
                      <AvatarImage src={imageUrl} alt="Avatar" />
                      <AvatarFallback>{username}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Button variant="outline" size="icon">
                      <p className="uppercase">{user?.email.slice(0, 1)}</p>
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/user">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <form action="/auth/signout" method="post">
                      <button className="button block" type="submit">
                        Sign out
                      </button>
                    </form>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
