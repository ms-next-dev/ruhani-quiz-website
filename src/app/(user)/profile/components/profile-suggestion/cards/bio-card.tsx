"use client";
// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserModel } from "@prisma/client";
import { GraduationCap } from "lucide-react";
import { memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { BioSchema } from "@/Schemas";
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
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";

interface BioCardProps {
  user: UserModel;
}

const BioCard: React.FC<BioCardProps> = ({ user }) => {
  const [open, setOpen] = useState<true | false>(false);
  const [isPending, startTransition] = useTransition();

  // form
  const form = useForm<z.infer<typeof BioSchema>>({
    resolver: zodResolver(BioSchema),
    defaultValues: {
      bio: user.bio || "",
    },
  });

  // function for update bio
  const onSubmit = (values: z.infer<typeof BioSchema>) => {
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your bio!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("Your bio has been updated!", {
            id: toastId,
          });
          setOpen(false);
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
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Bio</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Tell our networks a bit about yourself.
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending}
            onClick={() => setOpen(true)}
          >
            Enter bio
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
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Textarea
                    placeholder="Tell our networks a bit about yourself."
                    id="bio"
                    className="placeholder:text-gray-500"
                    {...field}
                    disabled={isPending}
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <Button
              variant="primary"
              className="w-full"
              disabled={isPending || !open}
            >
              Add Bio
            </Button>
          </form>
        </Form>
        <div className="w-full mt-6 space-y-3"></div>
      </Modal>
    </>
  );
};

export default memo(BioCard);
