"use client";

import { signOut } from "@/auth";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Menu } from "lucide-react";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import UserButton from "./UserButton";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  const currentRole = useCurrentRole();
  const router = useRouter();

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

  const menu = [
    { id: 1, link: "/", text: "Home" },
    { id: 2, link: "/", text: "Topics" },
    { id: 3, link: "/", text: "Quiz" },
    { id: 4, link: "/", text: "Quiz Results" },
    { id: 5, link: "/", text: "Blog" },
    { id: 6, link: "/", text: "Contact Us" },
    { id: 7, link: "/", text: "Our Team" },
  ];

  return (
    <nav
      className={`${
        roboto.className
      } text-white  py-4 fixed left-0 w-full z-10 flex justify-between items-center  ${
        scrolling
          ? "bg-black top-0 transition-all duration-500"
          : "top-0 bg-black"
      } `}
    >
      <section className="container flex justify-between items-center">
        <div>
          <Image
            src={"/logo/logo-white-edited.png"}
            alt="logo"
            width={87}
            height={52}
            onClick={() => router.push("/")}
          />
        </div>
        <div
          className={`hidden lg:flex justify-center items-center gap-x-5 xl:gap-x-10 `}
        >
          {menu.map((m) => (
            <Link
              key={m.id}
              href={m.link}
              className="text-[15px] hover:text-[#FF004C]"
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
                <div
                  className={`flex flex-col justify-center items-center gap-y-5 mb-5`}
                >
                  {menu.map((m) => (
                    <Link key={m.id} href={m.link} className="text-[15px]">
                      {m.text}
                    </Link>
                  ))}
                </div>
              </DrawerHeader>
              <DrawerFooter>
                {currentRole ? (
                  <div className="flex justify-center">
                    <Button
                      variant="link"
                      size={"lg"}
                      className="lg:hidden w-2/5 text-[15px] font-normal rounded-[20px] border border-[#FF004C]"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-y-5">
                    <Link href={"/sign-up"}>Sign Up</Link>
                    <Link href={"/login"}>
                      <Button
                        variant="outline"
                        size={"lg"}
                        className="text-[15px] font-normal rounded-[20px]"
                      >
                        Login
                      </Button>
                    </Link>
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
