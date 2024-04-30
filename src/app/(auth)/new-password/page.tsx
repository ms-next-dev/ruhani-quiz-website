import { Card, CardContent } from "@/components/ui/card";
import PasswordResetForm from "./components/password-reset-form";

const NewPasswordPage = () => {
  return (
    <div className="h-[calc(100vh-110px)] w-full flex justify-center items-center">
      <Card>
        <CardContent>
          <PasswordResetForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPasswordPage;
