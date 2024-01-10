import Link from "next/link";
import { Button } from "../ui/button";

const UserButton = () => {
  return (
    <div className="hidden lg:flex justify-end items-center gap-x-6">
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
  );
};

export default UserButton;