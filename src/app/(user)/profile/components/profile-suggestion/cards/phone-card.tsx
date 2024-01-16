"use client";
// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserModel } from "@prisma/client";
import { Phone } from "lucide-react";
import { memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { PhoneSchema } from "@/Schemas";
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

interface PhoneCardProps {
  user: UserModel;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<true | false>(false);

  // form
  const form = useForm<z.infer<typeof PhoneSchema>>({
    resolver: zodResolver(PhoneSchema),
    defaultValues: {
      phone: user.phone || "",
    },
  });

  // Function for update user name
  const onSubmit = (values: z.infer<typeof PhoneSchema>) => {
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your phone!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("Phone number has been updated!", {
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
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Phone</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Add your phone number
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending}
            onClick={() => setOpen(true)}
          >
            Enter phone
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Input
                    type="text"
                    placeholder="+880"
                    {...field}
                    id="phone"
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

export default memo(PhoneCard);
