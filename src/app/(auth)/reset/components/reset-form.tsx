"use client";

// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { ResetPasswordSchema } from "@/Schemas";
import { reset } from "@/actions/auth/reset";
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
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { Input } from "@/components/ui/input";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Fixed Hydration Error
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // on submit function when login form is submitted
  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");
    const toastId = toast.loading("Sending reset email...");

    startTransition(() => {
      reset(values).then((res: any) => {
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
          setSuccess(res.success);
          return;
        }
      });
    });
  };
  return (
    <AuthCardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/login"
      showSocial={false}
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white hover:bg-black/80 duration-500"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default ResetForm;
