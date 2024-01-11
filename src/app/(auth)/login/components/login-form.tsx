"use client";

// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountType } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { LoginSchema } from "@/Schemas";
import { login } from "@/actions/auth/login";
import { AuthCardWrapper } from "@/components/auth/auth-card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "member" as AccountType,
    },
  });

  // Fixed Hydration Error
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // on submit function when login form is submitted
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const toastId = toast.loading("Logging in...");

    startTransition(() => {
      login(values).then((res: any) => {
        if (res.error) {
          toast.error(res.error, {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success(res.success, {
            id: toastId,
          });
          return;
        }
      });
    });
  };
  return (
    <AuthCardWrapper
      headerLabel="Welcom back! Please enter your details"
      backButtonLabel="Don't have an account?"
      backButtonHref="/sign-up"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="abc@gmail.com"
                      disabled={isPending}
                      type="email"
                      className="border border-black/50"
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
                      type="password"
                      disabled={isPending}
                      className="border border-black/50"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white hover:bg-black/80 duration-500"
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default LoginForm;
