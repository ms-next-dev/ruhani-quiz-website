"use client";
// Packages
import { User } from "@prisma/client";
import { Image } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { memo, useTransition } from "react";
import { toast } from "sonner";

// Local Imports
import { updateUser } from "@/actions/user/user-update";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CoverPhotoUploadCardProps {
  user: User | null;
}

const CoverPhotoUploadCard: React.FC<CoverPhotoUploadCardProps> = ({
  user,
}) => {
  const [isPending, startTransition] = useTransition();

  // function for upload profile photo
  const onUpload = (result: any) => {
    const image = result.info.secure_url;
    console.log(image);
    const data = {
      coverPhoto: image,
    };
    const toastId = toast.loading("Please wait...");
    startTransition(() => {
      updateUser(data, user?.id as string).then((res) => {
        if (res.error) {
          toast.error("Failed to update your cover photo!", {
            id: toastId,
          });
          return;
        }

        if (res.success) {
          toast.success("Cover photo has been uploaded!", {
            id: toastId,
          });
          return;
        }
      });
    });
  };

  return (
    <>
      <Card className="rounded-[20px]">
        <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
          <div className="bg-red-100 h-[40px] w-[40px] rounded-full flex justify-center items-center">
            <Image className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Cover</h3>
          <p className="text-center text-[10px] lg:text-[12px] text-slate-600">
            Upload your cover photo
          </p>
          <CldUploadWidget onUpload={onUpload} uploadPreset="tjd9rj5t">
            {({ open, isLoading }) => {
              const onClick = () => {
                open();
              };

              return (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="rounded-[20px]"
                  disabled={isLoading || isPending}
                  onClick={onClick}
                >
                  Upload
                </Button>
              );
            }}
          </CldUploadWidget>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(CoverPhotoUploadCard);
