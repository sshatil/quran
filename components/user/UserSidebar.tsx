"use client";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface UserSidebarItems {
  title: string;
  href: string;
}

const UserSidebarItems: UserSidebarItems[] = [
  {
    title: "Profile",
    href: "/user",
  },
  {
    title: "Authentication",
    href: "/user/account/authentication",
  },
];

interface UserSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserSidebar({ className }: UserSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 z-40", className)}>
      <div className="space-y-2 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Account Setting
          </h2>
          <div className="space-y-1 p-2">
            {UserSidebarItems?.map((item, i) => (
              <Button
                key={`${item}-${i}`}
                variant={pathname === `${item.href}` ? "outline" : "ghost"}
                className="w-full justify-start font-normal"
              >
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
