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
import { DistrictSchema } from "@/Schemas";
import { updateUser } from "@/actions/user/user-update";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DistrictSwitcher from "@/components/ui/district-switcher";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Modal from "@/components/ui/modal";

interface DistrictCardProps {
  user: UserModel;
}

const DistrictCard: React.FC<DistrictCardProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<true | false>(false);

  // form
  const form = useForm<z.infer<typeof DistrictSchema>>({
    resolver: zodResolver(DistrictSchema),
    defaultValues: {
      district: user.district || "",
    },
  });

  // Function for update user name
  const onSubmit = (values: z.infer<typeof DistrictSchema>) => {
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your district!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("District has been updated!", {
            id: toastId,
          });
          setTimeout(() => {
            setOpen(false);
          }, 1000);
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
          <h3 className="font-semibold">District</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Select your residential district location
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending || open}
            onClick={() => setOpen(true)}
          >
            Select
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
              name="district"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-2">
                  <FormLabel htmlFor="designation">Designation</FormLabel>
                  <DistrictSwitcher
                    user={user}
                    field={field}
                    isPending={isPending}
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
              Submit
            </Button>
          </form>
        </Form>
        <div className="w-full mt-6 space-y-3"></div>
      </Modal>
    </>
  );
};

export default memo(DistrictCard);
