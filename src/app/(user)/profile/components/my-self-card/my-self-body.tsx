"use client";
// Packages
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { BioSchema } from "@/Schemas";
import { updateUser } from "@/actions/user/user-update";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface MySelfBodyProps {
  user: User;
}

const MySelfBody: React.FC<MySelfBodyProps> = ({ user }) => {
  const [onEdit, setEdit] = useState<true | false>(false);
  const [isPending, startTransition] = useTransition();

  const onProfileUpload = (result: any) => {
    const image = result.info.secure_url;

    console.log(image);
  };

  const onCoverUpload = (result: any) => {
    const image = result.info.secure_url;

    console.log(image);
  };

  const form = useForm<z.infer<typeof BioSchema>>({
    resolver: zodResolver(BioSchema),
    defaultValues: {
      bio: user.bio || "",
    },
  });
  const watch = form.watch;

  const onSubmit = (values: z.infer<typeof BioSchema>) => {
    const toastId = toast.loading("Bio updating...");
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
          setEdit(false);
          return;
        }
      });
    });
  };
  return (
    <div>
      <Textarea
        className={cn(
          "text-[14px] text-slate-600 text-left disabled:opacity-100 disabled:cursor-default disabled:text-slate-600",
          onEdit ? "border-slate-400 rounded-[6px]" : "border-none"
        )}
        value={watch("bio")}
        onChange={(e) => form.setValue("bio", e.target.value)}
        rows={4}
        disabled={isPending}
      >
        {user.bio}
      </Textarea>

      <div
        className={cn(
          "mt-6 w-full flex",
          onEdit ? "justify-between" : "justify-center"
        )}
      >
        {onEdit && (
          <CldUploadWidget onUpload={onProfileUpload} uploadPreset="tjd9rj5t">
            {({ open, isLoading }) => {
              const onClick = () => {
                open();
              };

              return (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#FF004C]/60 rounded-[20px] hover:bg-[#FF004C]/10 hover:text-[#FF004C] duration-500 text-[#FF004C]"
                  disabled={isLoading}
                  onClick={onClick}
                >
                  Change Photo
                </Button>
              );
            }}
          </CldUploadWidget>
        )}
        {onEdit ? (
          <Button
            variant="outline"
            className="border-[#FF004C]/60 rounded-[20px] hover:bg-[#FF004C]/10 hover:text-[#FF004C] duration-500 text-[#FF004C]"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-[#FF004C]/60 rounded-[20px] hover:bg-[#FF004C]/10 hover:text-[#FF004C] duration-500 text-[#FF004C]"
            onClick={() => setEdit(true)}
            disabled={isPending}
          >
            Edit Profile
          </Button>
        )}

        {onEdit && (
          <CldUploadWidget onUpload={onCoverUpload} uploadPreset="tjd9rj5t">
            {({ open, isLoading }) => {
              const onClick = () => {
                open();
              };

              return (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#FF004C]/60 rounded-[20px] hover:bg-[#FF004C]/10 hover:text-[#FF004C] duration-500 text-[#FF004C]"
                  disabled={isLoading}
                  onClick={onClick}
                >
                  Change Cover
                </Button>
              );
            }}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
};

export default MySelfBody;
