import { Card, CardContent } from "@/components/ui/card";
import ResetForm from "./components/reset-form";

const ResetPage = () => {
  return (
    <div className="h-[calc(100vh-110px)] w-full flex justify-center items-center">
      <Card>
        <CardContent>
          <ResetForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPage;
