"use client";
// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserModel } from "@prisma/client";
import { Zap } from "lucide-react";
import { memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { ConnectSchema } from "@/Schemas";
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

interface ConnectCardProps {
  user: UserModel;
}

const ConnectCard: React.FC<ConnectCardProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<true | false>(false);

  // form
  const form = useForm<z.infer<typeof ConnectSchema>>({
    resolver: zodResolver(ConnectSchema),
    defaultValues: {
      connect: user.connect || "",
    },
  });

  // Function for update user name
  const onSubmit = (values: z.infer<typeof ConnectSchema>) => {
    const toastId = toast.loading("Connecting...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your social link!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("Social link has been updated!", {
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
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Connect</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Connect your social media profile
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending || open || !!user.connect}
            onClick={() => setOpen(true)}
          >
            Connect
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
              name="connect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="connect">Social Link</FormLabel>
                  <Input
                    type="text"
                    placeholder="https://www.facebook.com/monirhabderabby"
                    className={cn(
                      "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                    )}
                    {...field}
                    id="connect"
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
              Connect
            </Button>
          </form>
        </Form>
        <div className="w-full mt-6 space-y-3"></div>
      </Modal>
    </>
  );
};

export default memo(ConnectCard);
