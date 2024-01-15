"use client";
// Packages
import { useState, useTransition } from "react";
import { toast } from "sonner";

// Local Imports
import { resendVerificationEmail } from "@/actions/auth/sent-verification-email";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmailVerificationCard {
  email: String;
}

const EmailVerificationCard: React.FC<EmailVerificationCard> = ({ email }) => {
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  // OnClick function sent verification email to the user email
  const onClick = async () => {
    const toastId = toast.loading("Email sending...");
    startTransition(() => {
      resendVerificationEmail(email as string).then((res) => {
        toast.success(res.success, {
          id: toastId,
        });
        setSent(true);
        return;
      });
    });
  };
  return (
    <Card className="rounded-[20px]">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Please verify your email</h3>
          <p className="text-[12px] lg:text-[14px] max-w-[500px] text-slate-600">
            Welcome! 🌟 Verify your email to unlock quizzes. Check inbox/spam.
            Let's start quizzing!
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            className="rounded-[10px]"
            onClick={onClick}
            disabled={isPending || sent}
          >
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerificationCard;
