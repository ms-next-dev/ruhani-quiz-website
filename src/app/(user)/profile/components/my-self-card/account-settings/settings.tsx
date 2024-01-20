// Packages
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Local Imports
import { NewPasswordSchema, ResetPasswordSchema } from "@/Schemas";
import { emailVerify, passwordReset } from "@/actions/auth/password-reset";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SettingsProps {
  user: User;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onClose }) => {
  // emailVerified and emailVerifiedState will be true and "YES" when email is verified
  const [emailVerified, setEmailVerified] = useState<true | false>(false);
  const [emailVerifiedState, setEmailVerifiedState] = useState<"YES" | "NO">(
    "NO"
  );
  const [isPending, startTransition] = useTransition();

  // email verification form
  const emailForm = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // reset password form
  const passwordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handler for email verification
  const emailHandler = (values: z.infer<typeof ResetPasswordSchema>) => {
    const toastId = toast.loading("Email verifying...");
    startTransition(() => {
      emailVerify(values).then((res) => {
        if (res.error) {
          toast.error(res.error, {
            id: toastId,
          });
        }

        if (res.success) {
          toast.success(res.success, {
            id: toastId,
          });
          setEmailVerified(true);
          setEmailVerifiedState("YES");
          emailForm.reset();
        }
      });
    });
  };

  // Handler for password reset
  const passwordHandler = (values: z.infer<typeof NewPasswordSchema>) => {
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      passwordReset(values).then((res) => {
        if (res.error) {
          toast.error(res.error, {
            id: toastId,
          });
        }

        if (res.success) {
          toast.success(res.success, {
            id: toastId,
            action: {
              label: "Logout",
              onClick: () => signOut(),
            },
          });
          onClose();
        }
      });
    });
  };

  return (
    <section>
      <motion.div
        key={emailVerifiedState}
        initial={{ height: "0" }}
        animate={{ height: "auto" }}
        exit={{ height: "0" }}
        transition={{ duration: 0.4 }}
      >
        {/* form 1 is for email verification and form 2 is for password reset */}
        {!emailVerified && (
          <div>
            <h3 className="text-[20px] font-medium text-gray-700">
              Email Verification
            </h3>
            <p className="text-[14px] text-slate-500">
              To reset your password, enter the email address <br /> you use
              sign in to Ruhani Quiz
            </p>
            <hr className="my-3" />
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(emailHandler)}
                className="space-y-3"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                        className={cn(
                          "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full rounded-[4px]"
                  disabled={isPending}
                >
                  Verify
                </Button>
              </form>
            </Form>
          </div>
        )}
        {emailVerified && (
          <div>
            <h3 className="text-[20px] font-medium text-gray-700">
              Password Reset
            </h3>
            <p className="text-[14px] text-slate-500">
              To reset your password, enter new password
            </p>
            <hr className="my-3" />
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(passwordHandler)}
                className="space-y-3"
              >
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
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
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <Input
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                        className={cn(
                          "placeholder:text-gray-400 text-[12px] border-gray-400 rounded-[4px]"
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full rounded-[4px]"
                  disabled={isPending}
                >
                  Verify
                </Button>
              </form>
            </Form>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Settings;
