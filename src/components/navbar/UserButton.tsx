"use client";

// Packages
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// Local Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const UserButton = () => {
  const session = useSession();
  const loggedIn = session?.status == "authenticated";
  const profilePhoto =
    session?.data?.user?.avatar || "https://github.com/shadcn.png";

  return (
    <div className="hidden lg:block">
      {loggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={profilePhoto}
                alt={session?.data?.user?.name!}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem className="hover:bg-[#ff004c22] duration-500 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="hover:bg-[#ff004c22] duration-500 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button
            variant="default"
            size="lg"
            className="text-[15px] font-medium rounded-xl bg-[#FF004C] hover:bg-[#FF004C]/80"
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default UserButton;
