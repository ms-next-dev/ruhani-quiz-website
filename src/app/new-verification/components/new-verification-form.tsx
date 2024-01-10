"use client";

import { newVerification } from "@/actions/auth/new-verification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data: any) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <Card className="w-full md:w-[500px]">
        <CardHeader>
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold")}>🔐 Ruhani Quiz</h1>
            <p className="text-muted-foreground text-sm">
              Confirming your verification
            </p>
          </div>
        </CardHeader>
        <CardContent className="w-full flex justify-center ">
          {!success && !error} {<BeatLoader />}
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link href="/login">Back to login</Link>
          </Button>
        </CardFooter>
        <CardFooter className="w-full">
          <FormError message={error} />
          <FormSuccess message={success} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewVerificationForm;
