"use client";

// Packages
import { Subject } from "@prisma/client";
import {
  BookCopy,
  Contact,
  HeartHandshake,
  Menu,
  Settings,
  Trophy,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";

// Local Imports
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import SubjectDropDown from "./subjectDropDown";

const UserButton = dynamic(() => import("./UserButton"));

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

interface NavbarProps {
  subjects: Subject[];
}

const Navbar: React.FC<NavbarProps> = ({ subjects }) => {
  const [scrolling, setScrolling] = useState(false);

  const currentRole = useCurrentRole();
  const session = useSession();
  const profilePhoto =
    session?.data?.user?.avatar || "https://github.com/shadcn.png";
  const router = useRouter();

  console.log(profilePhoto);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  const menu = [
    { id: 2, link: "/topics", text: "Topics", icon: BookCopy },
    { id: 3, link: "/", text: "Leaderboard", icon: Trophy },
    { id: 4, link: "/", text: "Blog", icon: FaBlog },
    { id: 5, link: "/", text: "Contact Us", icon: Contact },
    { id: 6, link: "/", text: "Our Team", icon: HeartHandshake },
  ];

  return (
    <nav
      className={`${
        roboto.className
      } text-white py-4 sticky top-0 w-full z-50 flex justify-between items-center  ${
        scrolling
          ? "bg-black top-0 transition-all duration-500"
          : "top-0 bg-black"
      } `}
    >
      <section className="container flex justify-between items-center">
        <Link href="/">
          <Image
            src={"/logo/logo-white-edited.png"}
            alt="logo"
            width={87}
            height={52}
            className="cursor-pointer hover:scale-105 duration-500 ease-in-out"
          />
        </Link>
        <div
          className={`hidden lg:flex justify-center items-center gap-x-5 xl:gap-x-10 `}
        >
          <SubjectDropDown subjects={subjects} />
          {menu.map((m) => (
            <Link
              key={m.id}
              href={m.link}
              className="text-[15px] hover:text-[#FF004C] duration-500"
            >
              {m.text}
            </Link>
          ))}
        </div>
        <UserButton />

        {/* mobile nav */}
        <div className="lg:hidden">
          <Drawer>
            <DrawerTrigger>
              <Menu className="w-8 h-8" />
            </DrawerTrigger>
            <DrawerContent className="bg-white text-black">
              <DrawerHeader>
                <div className={`flex flex-col justify-center items-start`}>
                  <SubjectDropDown subjects={subjects} />
                  {menu.map((m) => (
                    <Link
                      key={m.id}
                      href={m.link}
                      className="w-full p-3 text-[15px] text-left hover:bg-[#FF004C]/25 rounded-xl duration-500 flex items-center"
                    >
                      <m.icon className="mr-2 h-4 w-4" />
                      {m.text}
                    </Link>
                  ))}
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <Separator className="bg-black/30 h-[1px] mb-[10px]" />
                {currentRole ? (
                  <>
                    <div className="flex items-center gap-x-3 px-3">
                      <Avatar>
                        <AvatarImage src={profilePhoto} alt="profile" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[15px] font-semibold">
                          Monir Abde Rabby
                        </p>
                        <p className="text-sm">example.user@gmail.com</p>
                      </div>
                    </div>
                    <Link
                      href={"/profile"}
                      className="w-full px-3 py-2 text-[15px] text-left hover:bg-[#FF004C]/25 rounded-xl duration-500 flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href={"/"}
                      className="w-full px-3 py-2 text-[15px] text-left hover:bg-[#FF004C]/25 rounded-xl duration-500 flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <div className="flex justify-center mt-2">
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full text-[15px] font-medium rounded-xl text-white bg-[#FF004C] hover:bg-[#FF004C]/80 duration-300"
                        onClick={() => signOut()}
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => router.push("/sign-up")}
                      className="w-full text-[15px] font-medium rounded-xl text-white bg-[#FF004C] hover:bg-[#FF004C]/80 duration-300"
                    >
                      Sign Up
                    </Button>
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => router.push("/login")}
                      className="w-full text-[15px] font-medium rounded-xl text-white bg-[#FF004C] hover:bg-[#FF004C]/80 duration-300"
                    >
                      Login
                    </Button>
                  </div>
                )}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
