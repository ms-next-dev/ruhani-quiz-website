"use client";

// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { NewPasswordSchema } from "@/Schemas";
import { newPassword } from "@/actions/auth/new-password";
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
import { useRouter, useSearchParams } from "next/navigation";
const AuthCardWrapper = dynamic(
  () => import("@/components/auth/auth-card-wrapper")
);

const PasswordResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Fixed Hydration Error
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // on submit function when login form is submitted
  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    const toastId = toast.loading("Please wait...");

    startTransition(() => {
      newPassword(values, token as string).then((res: any) => {
        if (res.error) {
          toast.error(res.error, {
            id: toastId,
          });
          setError(res.error);
          return;
        }

        if (res.success) {
          toast.success(res.success, {
            id: toastId,
          });
          form.reset();
          setSuccess("Password Updated!");
          setTimeout(() => {
            router.push("/login");
          }, 5000);
          return;
        }
      });
    });
  };
  return (
    <AuthCardWrapper
      headerLabel=""
      backButtonLabel=""
      backButtonHref="/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New Password"
                      disabled={isPending}
                      type="password"
                      className="border border-black/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm New Password"
                      disabled={isPending}
                      type="password"
                      className="border border-black/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending || !!success}
            className="w-full bg-black text-white hover:bg-black/80 duration-500"
          >
            Reset Now
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default PasswordResetForm;
