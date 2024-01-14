"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmailVerificationCard {
  email: String;
}

const EmailVerificationCard: React.FC<EmailVerificationCard> = ({ email }) => {
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
          <Button variant="primary" className="rounded-[10px]">
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerificationCard;
