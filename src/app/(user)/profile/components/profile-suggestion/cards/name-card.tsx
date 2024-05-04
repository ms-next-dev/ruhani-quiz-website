"use client";
// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserModel } from "@prisma/client";
import { User } from "lucide-react";
import { memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { NameSchema } from "@/Schemas";
import { updateUser } from "@/actions/user/user-update";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { cn } from "@/lib/utils";

interface NameCardProps {
  user: UserModel;
}

const NameCard: React.FC<NameCardProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<true | false>(false);

  // form
  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  // Function for update user name
  const onSubmit = (values: z.infer<typeof NameSchema>) => {
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your name!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("Your name has been updated!", {
            id: toastId,
          });
          setOpen(false);
          form.reset();
          return;
        }
      });
    });
  };
  return (
    <>
      <Card className="rounded-[20px]">
        <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
          <div className="bg-red-100 h-[40px] w-[40px] rounded-full flex justify-center items-center">
            <User className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Name</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Enter name to personalize profile.
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending || open || !!user.name}
            onClick={() => setOpen(true)}
          >
            Enter name
          </Button>
        </CardContent>
      </Card>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first_name">Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Your Name"
                    {...field}
                    id="first_name"
                    className={cn(
                      "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                    )}
                    disabled={isPending || !open}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="primary"
              className="w-full"
              disabled={isPending || !open}
            >
              Enter
            </Button>
          </form>
        </Form>
        <div className="w-full mt-6 space-y-3"></div>
      </Modal>
    </>
  );
};

export default memo(NameCard);
