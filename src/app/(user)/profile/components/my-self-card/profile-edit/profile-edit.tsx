// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { updateUser } from "@/actions/user/user-update";
import { Button } from "@/components/ui/button";
import DistrictSwitcher from "@/components/ui/district-switcher";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import designationLists from "@/content/designationList";
import { cn } from "@/lib/utils";

interface ProfileEdit {
  user: User;
  onClose: () => void;
}

const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  avatar: z.string().optional(),
  educational_qualification: z.string().optional(),
  designation: z.string().optional(),
  district: z.string().optional(),
  phone: z.string().optional(),
  connect: z.string().optional(),
});

const ProfileEdit: React.FC<ProfileEdit> = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState<"personal" | "professional">(
    "personal"
  );
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      avatar: user.avatar || "",
      educational_qualification: user.educational_qualification || "",
      designation: user.designation || "",
      district: user.district || "",
      phone: user.phone || "",
      connect: user.connect || "",
    },
  });

  const { avatar } = form.watch();

  const profilePhoto =
    avatar ||
    "https://res.cloudinary.com/dn2pqzag1/image/upload/v1703740293/ruhani%20quiz/avatar_itcz1v.jpg";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Updating...");
    startTransition(() => {
      updateUser(values, user.id).then((res) => {
        if (res.error) {
          toast.error("Failed to update your info!", {
            id: toastId,
          });
        }
        if (res.success) {
          toast.success("Your info has been updated!", {
            id: toastId,
          });
          form.reset();
          onClose();
        }
      });
    });
  };

  return (
    <div>
      <h3 className="text-[20px] font-medium text-gray-700">Edit Profile</h3>
      <p className="text-[14px] text-slate-500">
        Provide detailes about yourself and any other partinent information
      </p>
      <hr className="my-3" />

      <Form {...form}>
        <form className="space-y-3">
          <section className="grid w-full grid-cols-2">
            <Button
              type="button"
              variant={activeTab === "personal" ? "primary" : "link"}
              onClick={() => setActiveTab("personal")}
              className={cn(
                activeTab === "personal" && "bg-main/90 rounded-[8px]"
              )}
            >
              Personal
            </Button>
            <Button
              type="button"
              variant={activeTab === "professional" ? "primary" : "link"}
              onClick={() => setActiveTab("professional")}
              className={cn(
                activeTab === "professional" && "bg-main/90 rounded-[8px]"
              )}
            >
              Professional
            </Button>
          </section>
          <motion.div
            key={activeTab}
            initial={{ height: "0" }}
            animate={{ height: "auto" }}
            exit={{ height: "0" }}
            transition={{ duration: 0.4 }}
          >
            <section
              className={cn(
                "space-y-3",
                activeTab === "personal" ? "block" : "hidden"
              )}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Profile photo</p>
                  <p className="text-[12px] text-gray-400">
                    Recomended 300x300
                  </p>
                  <CldUploadWidget
                    onUpload={(result: any) => {
                      const image = result.info.secure_url;
                      form.setValue("avatar", image);
                    }}
                    uploadPreset="tjd9rj5t"
                  >
                    {({ open, isLoading }) => {
                      const onClick = () => {
                        open();
                      };

                      return (
                        <button
                          type="button"
                          className="rounded-[4px] text-[12px] border-[1px] border-main/50 px-3 py-1 hover:bg-main/10 mt-1 disabled:opacity-50"
                          onClick={onClick}
                          disabled={isLoading}
                        >
                          Change
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
                <div className="relative h-[80px] w-[80px] rounded-full">
                  <Image
                    src={profilePhoto!}
                    alt="profile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full shadow-sm"
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="Your first name"
                      {...field}
                      className={cn(
                        "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Your last name"
                      {...field}
                      className={cn(
                        "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="educational_qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <Input
                      placeholder="Educational Qualification"
                      {...field}
                      className={cn(
                        "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section
              className={cn(
                "space-y-3",
                activeTab === "professional" ? "block" : "hidden"
              )}
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
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-2">
                    <FormLabel htmlFor="designation">District</FormLabel>
                    <DistrictSwitcher
                      user={user}
                      field={field}
                      isPending={isPending}
                      className={cn(
                        "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      className={cn(
                        "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                      )}
                      disabled={isPending || !open}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </section>
          </motion.div>
          <Button
            type="button"
            className="w-full rounded-[8px]"
            variant="primary"
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={isPending}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileEdit;
