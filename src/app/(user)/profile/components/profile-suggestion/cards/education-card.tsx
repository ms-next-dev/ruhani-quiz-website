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
import { EducationSchema } from "@/Schemas";
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

interface EducationCardProps {
  user: UserModel;
}

const EducationCard: React.FC<EducationCardProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<true | false>(false);

  // form
  const form = useForm<z.infer<typeof EducationSchema>>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      educational_qualification: user.educational_qualification || "",
    },
  });

  // Function for update user name
  const onSubmit = (values: z.infer<typeof EducationSchema>) => {
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your education!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("Your educational qualification has been updated!", {
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
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Education</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Specify your education level
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending || open}
            onClick={() => setOpen(true)}
          >
            Enter
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
              name="educational_qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="educational_qualification">
                    Education
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Write your last educational degree"
                    {...field}
                    id="educational_qualification"
                    className="placeholder:text-gray-500"
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

export default memo(EducationCard);
