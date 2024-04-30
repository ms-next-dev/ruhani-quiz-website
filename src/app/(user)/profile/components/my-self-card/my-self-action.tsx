"use client";
// Packages
import { User } from "@prisma/client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Local Imports
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
const Settings = dynamic(() => import("./account-settings/settings"));
const ProfileEdit = dynamic(() => import("./profile-edit/profile-edit"));

interface MySelfAction {
  user: User;
}

const MySelfAction: React.FC<MySelfAction> = ({ user }) => {
  const [open, setOpen] = useState<true | false>(false);
  const [modal, setModalFor] = useState<"settings" | "profile">();

  return (
    <section className="my-4">
      <div className="space-x-3">
        <Button
          variant="primary"
          className="rounded-[20px] "
          size="sm"
          onClick={() => {
            setOpen(true);
            setModalFor("profile");
          }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outline"
          className="rounded-[20px] border-main/80 hover:border-main text-main/80 hover:text-main"
          size="sm"
          onClick={() => {
            setOpen(true);
            setModalFor("settings");
          }}
        >
          Settings
        </Button>
      </div>
      <Modal onClose={() => setOpen(false)} isOpen={open}>
        {modal === "profile" && (
          <ProfileEdit onClose={() => setOpen(false)} user={user} />
        )}
        {modal === "settings" && (
          <Settings user={user} onClose={() => setOpen(false)} />
        )}
      </Modal>
    </section>
  );
};

export default MySelfAction;
