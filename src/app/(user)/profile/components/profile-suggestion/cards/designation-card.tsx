"use client";
// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { User as UserModel } from "@prisma/client";
import { Briefcase } from "lucide-react";
import { memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { DesignationSchema } from "@/Schemas";
import { updateUser } from "@/actions/user/user-update";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DesignationCardProps {
  user: UserModel;
}

const DesignationCard: React.FC<DesignationCardProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<true | false>(false);

  // form
  const form = useForm<z.infer<typeof DesignationSchema>>({
    resolver: zodResolver(DesignationSchema),
    defaultValues: {
      designation: user.designation || "",
    },
  });

  // Function for update user name
  const onSubmit = (values: z.infer<typeof DesignationSchema>) => {
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your designation!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("Designation has been updated!", {
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

  const designationLists = [
    {
      label: "Student",
      value: "Student",
    },
    {
      label: "Software Developer",
      value: "Software Developer",
    },
    {
      label: "Teacher",
      value: "Teacher",
    },
    {
      label: "Software Engineer",
      value: "Software Engineer",
    },
    {
      label: "Writer",
      value: "Writer",
    },
    {
      label: "Doctor",
      value: "Doctor",
    },
    {
      label: "Entrepreneur",
      value: "Entrepreneur",
    },
    {
      label: "Business Holder",
      value: "Business Holder",
    },
    {
      label: "Employer",
      value: "Employer",
    },
    {
      label: "Lawyer",
      value: "Lawyer",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  return (
    <>
      <Card className="rounded-[20px]">
        <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
          <div className="bg-red-100 h-[40px] w-[40px] rounded-full flex justify-center items-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Designation</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Specify your current job title
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending || open || !!user.designation}
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
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="designation">Designation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                        )}
                      >
                        <SelectValue placeholder="Select a designation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {designationLists.map(({ label, value }) => (
                        <SelectItem
                          className="w-full cursor-pointer"
                          value={value}
                          key={label}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default memo(DesignationCard);
