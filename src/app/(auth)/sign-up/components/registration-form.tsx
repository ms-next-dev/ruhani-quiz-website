"use client";

// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountType } from "@prisma/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Local Imports
import { RegistrationSchema } from "@/Schemas";
import { register } from "@/actions/auth/register";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { Input } from "@/components/ui/input";
const AuthCardWrapper = dynamic(
  () => import("@/components/auth/auth-card-wrapper")
);

const RegistrationForm = () => {
  // Component State
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  // form Object
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "member" as AccountType,
      name: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // on submit function when registration form is submitted
  const onSubmit = async (values: z.infer<typeof RegistrationSchema>) => {
    setError("");
    setSuccess("");

    // Dynamic import for performance
    const { loading, success, error } = (await import("sonner")).toast;

    // const toastId = toast.loading("Please wait...");
    const toastId = loading("Please wait...");
    startTransition(() => {
      register(values).then((res) => {
        if (res.error) {
          error(res.error, {
            id: toastId,
          });
          setError(res.error);
          return;
        }

        if (res.success) {
          success(res.success, {
            id: toastId,
          });
          setSuccess(res.success);
        }
      });
    });
  };
  return (
    <AuthCardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      className="border border-black/50 h-[30px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="abc@gmail.com"
                      type="email"
                      className="border border-black/50 h-[30px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      disabled={isPending}
                      type="password"
                      className="border border-black/50 h-[30px]"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                    disabled={isPending}
                  >
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white hover:bg-black/80 duration-500 h-[35px] text-[12px] font-normal"
          >
            Registration
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default RegistrationForm;
