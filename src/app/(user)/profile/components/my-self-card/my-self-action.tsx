"use client";
// Packages
import { User } from "@prisma/client";

// Local Imports
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useState } from "react";

interface MySelfAction {
  user: User;
}

const MySelfAction: React.FC<MySelfAction> = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="my-4">
      <div className="space-x-3">
        <Button
          variant="primary"
          className="rounded-[20px] "
          size="sm"
          onClick={() => setOpen(true)}
        >
          Edit Profile
        </Button>
        <Button
          variant="outline"
          className="rounded-[20px] border-main/80 hover:border-main text-main/80 hover:text-main"
          size="sm"
          onClick={() => setOpen(true)}
        >
          Settings
        </Button>
      </div>
      <Modal onClose={() => setOpen(false)} isOpen={open}>
        Monir Hossain
      </Modal>
    </section>
  );
};

export default MySelfAction;
