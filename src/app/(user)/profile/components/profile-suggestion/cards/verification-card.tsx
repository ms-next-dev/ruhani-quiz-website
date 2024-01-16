"use client";
// Packages
import { User } from "@prisma/client";
import { Mail } from "lucide-react";
import { memo, useCallback, useState, useTransition } from "react";
import { toast } from "sonner";

// Local Imports
import { resendVerificationEmail } from "@/actions/auth/sent-verification-email";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationCardProps {
  user: User | null;
}

const VerificationCard: React.FC<VerificationCardProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState<true | false>(false);

  // handleVerification function sent verification email to the user email
  const handleVerification = useCallback(() => {
    const toastId = toast.loading("Email sending...");
    startTransition(() => {
      resendVerificationEmail(user?.email as string).then((res) => {
        if (res.success) {
          toast.success(res.success, {
            id: toastId,
          });
          setSent(true);
        }
      });
    });
  }, [user?.email]);

  return (
    <>
      <Card className="rounded-[20px]">
        <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
          <div className="bg-red-100 h-[40px] w-[40px] rounded-full flex justify-center items-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Verification</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Complete your email verification.
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-[20px]"
            disabled={isPending || sent}
            onClick={handleVerification}
          >
            Verify
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(VerificationCard);
